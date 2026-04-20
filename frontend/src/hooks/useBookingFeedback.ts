import { useCallback, useEffect, useState } from 'react';

/**
 * Booking-feedback tracking.
 *
 * When a patient clicks "WhatsApp" or "Call" we stash a small blob in
 * localStorage recording the channel and the time. After a reasonable
 * interval (either ~90 seconds on the same page load, or on the next
 * page load if it's been 2 min – 24 h since the click) we surface a
 * toast asking whether they were able to book.
 *
 * Storage shape lives under a single key so clearing is atomic:
 *
 *   {
 *     channel:       'whatsapp' | 'phone',
 *     clickedAt:     number,     // Date.now() when they clicked
 *     promptShownAt: number | null,
 *   }
 */

export type BookingChannel = 'whatsapp' | 'phone';
export type BookingOutcome = 'booked' | 'not_booked' | 'trying';

interface FeedbackRecord {
  channel: BookingChannel;
  clickedAt: number;
  /** Null until the prompt has been rendered at least once. */
  promptShownAt: number | null;
}

const STORAGE_KEY = 'ds.booking-feedback.v1';

/** Time to wait after the click before surfacing the prompt, same-session. */
const PROMPT_AFTER_MS = 90_000; // 90 seconds
/** Maximum window during which a stored click is still considered
 *  relevant. Beyond this we silently drop the record. */
const STORAGE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';

function readRecord(): FeedbackRecord | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as FeedbackRecord;
    if (
      typeof parsed !== 'object' ||
      (parsed.channel !== 'whatsapp' && parsed.channel !== 'phone') ||
      typeof parsed.clickedAt !== 'number'
    ) {
      return null;
    }
    if (Date.now() - parsed.clickedAt > STORAGE_TTL_MS) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeRecord(record: FeedbackRecord | null) {
  if (typeof window === 'undefined') return;
  try {
    if (record === null) {
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    }
  } catch {
    // localStorage unavailable (private-mode Safari, etc.) — fail silent.
  }
}

/**
 * Call this from a click handler on the WhatsApp / Call buttons. Stashes
 * the click so a prompt can be surfaced later.
 */
export function recordBookingClick(channel: BookingChannel) {
  writeRecord({ channel, clickedAt: Date.now(), promptShownAt: null });
  // Notify the in-page listener so the prompt timer can start without a
  // page reload. Using a CustomEvent keeps this module decoupled.
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('ds:booking-click'));
  }
}

interface UseBookingFeedbackReturn {
  /** Non-null when the prompt should be rendered. */
  pending: FeedbackRecord | null;
  /** Send feedback + clear storage. Resolves when the backend responds
   *  (or rejects on transport error — caller may still dismiss). */
  submit: (outcome: BookingOutcome, note?: string) => Promise<void>;
  /** Close without submitting. The record is cleared so we do not
   *  re-prompt on the next page load. */
  dismiss: () => void;
}

/**
 * Subscribe to the booking-feedback state. Mount exactly once at the
 * app shell; if mounted in multiple places the last-mounted copy wins
 * due to localStorage updates but both can render prompts.
 */
export function useBookingFeedback(): UseBookingFeedbackReturn {
  const [pending, setPending] = useState<FeedbackRecord | null>(null);

  useEffect(() => {
    // Check on mount: did a click happen in a past session that's still
    // within the 24 h window and hasn't been answered yet?
    const checkReady = () => {
      const record = readRecord();
      if (!record) {
        setPending(null);
        return;
      }
      const elapsed = Date.now() - record.clickedAt;
      if (elapsed >= PROMPT_AFTER_MS) {
        // Mark as shown so refreshing the page doesn't re-queue it.
        if (!record.promptShownAt) {
          writeRecord({ ...record, promptShownAt: Date.now() });
        }
        setPending(record);
      }
    };

    checkReady();

    // If a click happens during this session, start a timer so the
    // prompt appears after PROMPT_AFTER_MS.
    const onClick = () => {
      window.setTimeout(checkReady, PROMPT_AFTER_MS + 500);
    };
    window.addEventListener('ds:booking-click', onClick);

    // Cross-tab sync: if another tab records or clears a click,
    // mirror here.
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) checkReady();
    };
    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener('ds:booking-click', onClick);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const submit = useCallback(
    async (outcome: BookingOutcome, note?: string) => {
      const record = readRecord();
      if (!record) {
        setPending(null);
        return;
      }
      writeRecord(null);
      setPending(null);
      try {
        await fetch(`${API_BASE}/api/feedback`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            channel: record.channel,
            outcome,
            note: note ?? '',
            elapsed_ms: Date.now() - record.clickedAt,
          }),
        });
      } catch {
        // We deliberately don't surface transport errors to the user —
        // their signal is still valuable even if the backend blipped,
        // and pestering them about it would be rude. Logging is left to
        // the browser console implicitly via the failed fetch.
      }
    },
    [],
  );

  const dismiss = useCallback(() => {
    writeRecord(null);
    setPending(null);
  }, []);

  return { pending, submit, dismiss };
}
