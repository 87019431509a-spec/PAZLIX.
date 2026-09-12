import { useState } from 'react';
import { designVariants } from '@/data';
import { Check } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

interface DesignsProps {
  onAuthClick?: () => void;
}

export function Designs({ onAuthClick }: DesignsProps) {
  const { ref, inView } = useReveal();
  const [active, setActive] = useState(0);

  return (
    <section id="designs" className="relative overflow-hidden bg-ink-50/50 py-16 lg:py-24 dark:bg-ink-900/50" ref={ref}>
      <div className="section-padding mx-auto max-w-7xl">
        <div className={`mb-12 text-center lg:mb-16 ${inView ? 'in-view' : ''} reveal`}>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-600">
            5 профессиональных дизайнов
          </p>
          <h2 className="text-balance text-3xl font-bold text-ink-950 sm:text-4xl lg:text-5xl dark:text-white">
            Не смена цвета — разная композиция
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-500 dark:text-ink-400">
            Каждый дизайн имеет собственную подачу фотографий, карточек услуг, заголовков и кнопок. Все выглядят дорого и современно.
          </p>
        </div>

        <div className={`mb-8 flex flex-wrap justify-center gap-2 ${inView ? 'in-view' : ''} reveal`}>
          {designVariants.map((variant, i) => (
            <button
              key={variant.id}
              onClick={() => setActive(i)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                active === i
                  ? 'bg-ink-900 text-white shadow-lg dark:bg-white dark:text-ink-900'
                  : 'bg-white text-ink-600 ring-1 ring-ink-200 hover:bg-ink-50 dark:bg-ink-900 dark:text-ink-400 dark:ring-ink-800 dark:hover:bg-ink-800'
              }`}
            >
              {variant.name}
            </button>
          ))}
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div
            key={active}
            className="animate-scale-in relative overflow-hidden rounded-3xl card-shadow-lg ring-1 ring-ink-100 dark:ring-ink-800"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={designVariants[active].image}
                alt={designVariants[active].name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className={`mb-2 inline-block rounded-full px-3 py-1 text-xs font-bold text-white ${designVariants[active].accent}`}>
                  {designVariants[active].name}
                </div>
                <p className="text-sm leading-relaxed text-white/90">{designVariants[active].description}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold text-ink-900 dark:text-white">
              Дизайн «{designVariants[active].name}»
            </h3>
            <p className="text-ink-500 dark:text-ink-400">{designVariants[active].description}</p>
            <ul className="mt-2 space-y-3">
              {[
                'Собственная композиция и сетка',
                'Уникальная подача фотографий и портфолио',
                'Индивидуальные карточки услуг и CTA',
                'Адаптация под мобильные устройства',
                'Переключение в один клик без потери данных',
              ].map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand-500/10 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm text-ink-700 dark:text-ink-300">{feature}</span>
                </li>
              ))}
            </ul>
            <button onClick={onAuthClick} className="btn-brand mt-4 self-start">
              Создать свой сайт
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
