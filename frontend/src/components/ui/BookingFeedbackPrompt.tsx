import { useEffect, useRef, useState } from 'react';
import {
  useBookingFeedback,
  type BookingOutcome,
} from '@/hooks/useBookingFeedback';
import { cn } from '@/lib/cn';

/**
 * Toast asking the patient whether they were able to book after
 * clicking WhatsApp or Call. Mounts once in the app shell; renders
 * nothing until the hook signals a pending record.
 *
 * UX:
 *   - Fixed bottom-right card on sm+, bottom-full strip on phones.
 *   - Three one-tap outcome buttons.
 *   - "Not yet" expands a compact textarea + submit so the practice
 *     can learn what went wrong (common pattern on post-task surveys).
 *   - Dismiss (×) clears the record so we don't re-prompt tomorrow.
 *   - Success state thanks the user, then auto-dismisses after 4 s.
 */
export function BookingFeedbackPrompt() {
  const { pending, submit, dismiss } = useBookingFeedback();
  const [mode, setMode] = useState<'choose' | 'note' | 'thanks'>('choose');
  const [noteOutcome, setNoteOutcome] = useState<BookingOutcome | null>(null);
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const noteRef = useRef<HTMLTextAreaElement>(null);

  // When the panel switches into the note-writing mode, move focus into
  // the textarea so the user can type immediately. Using an effect +
  // ref instead of the autoFocus JSX attribute satisfies
  // jsx-a11y/no-autofocus; the behaviour only triggers on an explicit
  // user action (choosing "Not yet" or "Still trying"), not on the
  // toast's initial appearance.
  useEffect(() => {
    if (mode === 'note') {
      noteRef.current?.focus();
    }
  }, [mode]);

  if (!pending) return null;

  const channelLabel = pending.channel === 'whatsapp' ? 'WhatsApp' : 'the call';

  const handleQuick = async (outcome: BookingOutcome) => {
    if (outcome === 'booked') {
      setSubmitting(true);
      await submit(outcome);
      setSubmitting(false);
      setMode('thanks');
      window.setTimeout(() => dismiss(), 4000);
      return;
    }
    // For "not_booked" and "trying" we offer a short free-text field so
    // the practice can see why. Patients can skip by pressing Submit
    // with an empty note — still one extra tap but worth the signal.
    setNoteOutcome(outcome);
    setMode('note');
  };

  const handleSubmitNote = async () => {
    if (!noteOutcome) return;
    setSubmitting(true);
    await submit(noteOutcome, note.trim() || undefined);
    setSubmitting(false);
    setMode('thanks');
    window.setTimeout(() => dismiss(), 4000);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Booking feedback"
      style={{
        paddingBottom:
          'max(1rem, calc(1rem + env(safe-area-inset-bottom, 0px)))',
      }}
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 px-3 sm:left-auto sm:right-6 sm:top-auto sm:w-[22rem] sm:px-0',
      )}
    >
      <div
        className={cn(
          'relative rounded-xl border border-border1 bg-white p-5 shadow-raised',
          'animate-[rise_200ms_cubic-bezier(.2,.7,.2,1)_both]',
        )}
      >
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss"
          className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full text-textMuted hover:bg-surface hover:text-textPrimary"
        >
          <svg
            viewBox="0 0 14 14"
            width={12}
            height={12}
            aria-hidden="true"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        </button>

        {mode === 'choose' && (
          <div>
            <p className="t-eyebrow text-primary">A quick follow-up</p>
            <h2 className="mt-1 pr-6 text-base font-medium leading-snug">
              Were you able to book a consultation after {channelLabel}?
            </h2>
            <p className="t-caption mt-2 text-textMuted">
              Takes a second &mdash; helps us improve how the practice responds.
            </p>
            <div className="mt-4 grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() => handleQuick('booked')}
                disabled={submitting}
                className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors duration-[180ms] ease-breathe hover:bg-primaryHover disabled:opacity-60"
              >
                Yes, got an appointment
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuick('not_booked')}
                  disabled={submitting}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-border2 bg-white px-4 py-2 text-sm font-medium text-textPrimary transition-colors duration-[180ms] ease-breathe hover:border-primary hover:text-primary disabled:opacity-60"
                >
                  Not yet
                </button>
                <button
                  type="button"
                  onClick={() => handleQuick('trying')}
                  disabled={submitting}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-border2 bg-white px-4 py-2 text-sm font-medium text-textPrimary transition-colors duration-[180ms] ease-breathe hover:border-primary hover:text-primary disabled:opacity-60"
                >
                  Still trying
                </button>
              </div>
            </div>
          </div>
        )}

        {mode === 'note' && (
          <div>
            <p className="t-eyebrow text-primary">Thanks for letting us know</p>
            <h2 className="mt-1 pr-6 text-base font-medium leading-snug">
              Anything we should know? (optional)
            </h2>
            <textarea
              ref={noteRef}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              maxLength={1000}
              placeholder="e.g. reception tried to book me with another consultant"
              className="mt-3 w-full rounded-md border border-border1 bg-white px-3 py-2 text-sm leading-snug text-textPrimary placeholder:text-textMuted focus:border-primary focus:outline-none focus:shadow-[0_0_0_3px_rgba(13,110,253,0.2)]"
            />
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={handleSubmitNote}
                disabled={submitting}
                className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors duration-[180ms] ease-breathe hover:bg-primaryHover disabled:opacity-60"
              >
                {submitting ? 'Sending…' : 'Send'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('choose');
                  setNoteOutcome(null);
                  setNote('');
                }}
                disabled={submitting}
                className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-border2 bg-white px-4 py-2 text-sm font-medium text-textPrimary hover:border-primary disabled:opacity-60"
              >
                Back
              </button>
            </div>
          </div>
        )}

        {mode === 'thanks' && (
          <div>
            <p className="t-eyebrow text-primary">Thanks</p>
            <p className="mt-1 pr-6 text-base leading-snug text-textPrimary">
              Appreciate the feedback &mdash; it genuinely helps the practice.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
