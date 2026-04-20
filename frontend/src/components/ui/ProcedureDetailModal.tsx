import { Modal } from './Modal';
import { ButtonRouterLink } from './Button';
import type { DetailSection } from '@/content/services';

interface ProcedureDetailModalProps {
  open: boolean;
  onClose: () => void;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  summary: string;
  sections: DetailSection[];
}

/**
 * Presentation-only wrapper around Modal that renders a procedure's
 * detailed, patient-oriented content: summary on top, then a sequence
 * of headed sections, ending with a consultation CTA.
 */
export function ProcedureDetailModal({
  open,
  onClose,
  eyebrow,
  title,
  subtitle,
  summary,
  sections,
}: ProcedureDetailModalProps) {
  return (
    <Modal open={open} onClose={onClose} title={title} eyebrow={eyebrow}>
      {subtitle ? <p className="t-caption -mt-2 mb-4 text-textMuted">{subtitle}</p> : null}

      <p className="t-body-lg text-textSecondary">{summary}</p>

      <div className="mt-6 space-y-6 border-t border-border1 pt-6">
        {sections.map((section) => (
          <section key={section.heading}>
            <h3 className="t-h3 font-medium">{section.heading}</h3>
            <p className="t-body mt-2 text-textSecondary">{section.body}</p>
          </section>
        ))}
      </div>

      <footer className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border1 bg-surface px-5 py-4">
        <p className="t-caption text-textSecondary">
          Individual cases vary — details and suitability are reviewed in consultation.
        </p>
        <ButtonRouterLink to="/consultation" variant="primary" size="sm" onClick={onClose}>
          Book a consultation
        </ButtonRouterLink>
      </footer>
    </Modal>
  );
}
