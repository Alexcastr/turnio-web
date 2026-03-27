import type { LucideIcon } from 'lucide-react';

interface PolicyItem {
  title: string;
  content: React.ReactNode;
}

interface PolicySectionProps {
  id: string;
  icon: LucideIcon;
  title: string;
  intro?: string;
  items: PolicyItem[];
}

export function PolicySection({ id, icon: Icon, title, intro, items }: PolicySectionProps) {
  return (
    <>
      <div id={id} className="-mt-20 pt-20" />
      <section className="mb-20">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
        </div>

        {intro && (
          <p className="mb-8 text-text-secondary leading-relaxed">{intro}</p>
        )}

        <div className="space-y-8">
          {items.map((item) => (
            <div key={item.title}>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-text-primary/70">
                {item.title}
              </h3>
              <div className="text-[15px] text-text-secondary leading-relaxed">
                {item.content}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
