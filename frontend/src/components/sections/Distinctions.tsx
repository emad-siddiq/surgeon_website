import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { distinctions } from '@/content/distinctions';

export function Distinctions() {
  return (
    <Section id="distinctions" tone="cream" size="md" aria-labelledby="distinctions-heading">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <Eyebrow rule>Distinctions</Eyebrow>
          <h2
            id="distinctions-heading"
            className="font-display t-h1 mt-4 max-w-[22ch]"
          >
            Training, board certification, and long follow-through.
          </h2>
        </div>
      </div>
      <ul
        role="list"
        className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {distinctions.map((item) => (
          <li key={item.title}>
            <Card padding="md" interactive>
              <Tag tone="lilac">{item.year}</Tag>
              <h3
                className="font-display mt-4 text-[22px]"
                style={{ fontWeight: 500, lineHeight: 1.2 }}
              >
                {item.title}
              </h3>
              <p className="t-body mt-2 text-ink2">{item.body}</p>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
