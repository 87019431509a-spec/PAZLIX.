import { pricingTiers } from '@/data';
import { Check, Users, Plus } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

interface PricingProps {
  onAuthClick?: () => void;
}

export function Pricing({ onAuthClick }: PricingProps) {
  const { ref, inView } = useReveal();

  return (
    <section id="pricing" className="section-padding py-16 lg:py-24 dark:bg-ink-950" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <div className={`mb-12 text-center lg:mb-16 ${inView ? 'in-view' : ''} reveal`}>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-600">
            Тарифы
          </p>
          <h2 className="text-balance text-3xl font-bold text-ink-950 sm:text-4xl lg:text-5xl dark:text-white">
            Платите за сотрудников
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-500 dark:text-ink-400">
            Цена зависит от количества специалистов, которым нужны собственные услуги и расписание. Без сотрудников — работает от 890 ₽.
          </p>
        </div>

        <div className={`grid gap-5 lg:grid-cols-3 ${inView ? 'in-view' : ''} reveal`}>
          {pricingTiers.map((tier) => (
            <div
              key={tier.staff}
              className={`relative rounded-3xl p-7 transition-all duration-500 ${
                tier.highlight
                  ? 'bg-ink-900 text-white card-shadow-lg ring-1 ring-ink-800 lg:-translate-y-4 lg:scale-105 dark:bg-white dark:text-ink-950 dark:ring-ink-200'
                  : 'bg-white card-shadow ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-ink-800'
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-4 py-1 text-xs font-bold text-white">
                  Популярный
                </div>
              )}

              <div className="mb-5 flex items-center gap-2">
                <Users className={`h-5 w-5 ${tier.highlight ? 'text-brand-400' : 'text-brand-500'}`} />
                <span className={`text-sm font-medium ${tier.highlight ? 'text-ink-300' : 'text-ink-500'}`}>
                  {tier.staff}
                </span>
              </div>

              <div className="mb-6">
                <span className={`text-4xl font-extrabold ${tier.highlight ? 'text-white' : 'text-ink-950 dark:text-white'}`}>
                  {tier.price}
                </span>
                <span className={`text-sm ${tier.highlight ? 'text-ink-400 dark:text-ink-500' : 'text-ink-400 dark:text-ink-500'}`}>
                  {' '}{tier.period}
                </span>
              </div>

              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full ${
                      tier.highlight ? 'bg-brand-500/20 text-brand-400' : 'bg-brand-500/10 text-brand-600'
                    }`}>
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className={`text-sm ${tier.highlight ? 'text-ink-200' : 'text-ink-700'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={onAuthClick}
                className={`mt-7 w-full rounded-full py-3 text-sm font-semibold transition-all duration-300 ${
                  tier.highlight
                    ? 'bg-brand-500 text-white hover:bg-brand-600 hover:shadow-xl hover:shadow-brand-500/30'
                    : 'bg-ink-900 text-white hover:bg-ink-800 dark:bg-white dark:text-ink-900 dark:hover:bg-ink-100'
                }`}
              >
                Создать свой сайт
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl bg-ink-50 p-5 text-center ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-ink-800">
          <div className="flex items-center justify-center gap-2 text-sm text-ink-600 dark:text-ink-400">
            <Plus className="h-4 w-4 text-brand-500" />
            Больше 7 сотрудников? Каждый дополнительный —
            <span className="font-bold text-ink-900 dark:text-white">+350 ₽ / месяц</span>
          </div>
          <p className="mt-1 text-xs text-ink-400 dark:text-ink-500">
            8 сотрудников — 3 550 ₽ · 9 сотрудников — 3 900 ₽ · 10 сотрудников — 4 250 ₽
          </p>
        </div>
      </div>
    </section>
  );
}
