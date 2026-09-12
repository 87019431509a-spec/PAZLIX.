import { useState } from 'react';
import { beautyDesigns, beautyDemos } from '@/data';
import { Check, Sun, Moon, Monitor, Smartphone } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { useTheme } from '@/hooks/useTheme';
import { BeautyPreview } from '@/components/BeautyPreview';

export function BeautyDesigns() {
  const { ref, inView } = useReveal();
  const { theme, toggleTheme } = useTheme();
  const [active, setActive] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);

  const design = beautyDesigns[active];

  const themeAccentClasses: Record<string, { bg: string; text: string; bgLight: string; ring: string }> = {
    pink: { bg: 'bg-pink-500', text: 'text-pink-600', bgLight: 'bg-pink-50', ring: 'ring-pink-200' },
    teal: { bg: 'bg-teal-500', text: 'text-teal-600', bgLight: 'bg-teal-50', ring: 'ring-teal-200' },
    fuchsia: { bg: 'bg-fuchsia-500', text: 'text-fuchsia-600', bgLight: 'bg-fuchsia-50', ring: 'ring-fuchsia-200' },
    amber: { bg: 'bg-amber-600', text: 'text-amber-700', bgLight: 'bg-amber-50', ring: 'ring-amber-200' },
    violet: { bg: 'bg-violet-500', text: 'text-violet-600', bgLight: 'bg-violet-50', ring: 'ring-violet-200' },
  };

  const accent = themeAccentClasses[design.themeColor];
  const demoData = beautyDemos.find((d) => d.designId === design.id);

  return (
    <>
      <section id="beauty-designs" className="relative overflow-hidden bg-ink-50/50 py-16 lg:py-24 dark:bg-ink-900/50" ref={ref}>
        <div className="section-padding mx-auto max-w-7xl">
          <div className={`mb-10 text-center lg:mb-14 ${inView ? 'in-view' : ''} reveal`}>
            <p className={`mb-2 text-sm font-semibold uppercase tracking-wider ${accent.text}`}>
              5 премиальных дизайнов для бьюти-сфер
            </p>
            <h2 className="text-balance text-3xl font-bold text-ink-950 dark:text-white sm:text-4xl lg:text-5xl">
              Дизайны, которые продают красоту
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-ink-500 dark:text-ink-400">
              Каждый дизайн создан под конкретную сферу: салоны красоты, массаж, маникюр, брови и ресницы. Выберите и посмотрите пример — как на компьютере, так и на телефоне.
            </p>
          </div>

          {/* Theme toggle */}
          <div className="mb-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <div className="inline-flex items-center gap-1 rounded-full bg-white p-1 ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-ink-800">
              <button
                onClick={() => theme !== 'light' && toggleTheme()}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition ${
                  theme === 'light'
                    ? 'bg-ink-900 text-white'
                    : 'text-ink-500 hover:text-ink-900 dark:text-ink-400 dark:hover:text-white'
                }`}
              >
                <Sun className="h-4 w-4" />
                Светлая
              </button>
              <button
                onClick={() => theme !== 'dark' && toggleTheme()}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition ${
                  theme === 'dark'
                    ? 'bg-white text-ink-900'
                    : 'text-ink-500 hover:text-ink-900 dark:text-ink-400 dark:hover:text-white'
                }`}
              >
                <Moon className="h-4 w-4" />
                Тёмная
              </button>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-ink-400 dark:text-ink-500">
              <Monitor className="h-4 w-4" />
              <Smartphone className="h-4 w-4" />
              Переключатель устройства в превью
            </div>
          </div>

          {/* Design tabs */}
          <div className={`mb-8 flex flex-wrap justify-center gap-2 ${inView ? 'in-view' : ''} reveal`}>
            {beautyDesigns.map((d, i) => {
              const dAccent = themeAccentClasses[d.themeColor];
              return (
                <button
                  key={d.id}
                  onClick={() => setActive(i)}
                  className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                    active === i
                      ? `${dAccent.bg} text-white shadow-lg`
                      : 'bg-white text-ink-600 ring-1 ring-ink-200 hover:bg-ink-50 dark:bg-ink-900 dark:text-ink-400 dark:ring-ink-800 dark:hover:bg-ink-800'
                  }`}
                >
                  {d.name}
                </button>
              );
            })}
          </div>

          {/* Preview */}
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div
              key={active}
              className="animate-scale-in relative overflow-hidden rounded-3xl card-shadow-lg ring-1 ring-ink-100 dark:ring-ink-800"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={design.image}
                  alt={design.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className={`mb-2 inline-block rounded-full px-3 py-1 text-xs font-bold text-white ${design.accent}`}>
                    {design.sphere}
                  </div>
                  <p className="text-sm leading-relaxed text-white/90">{design.description}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold text-ink-900 dark:text-white">
                Дизайн «{design.name}» — {design.sphere}
              </h3>
              <p className="text-ink-500 dark:text-ink-400">{design.description}</p>
              <ul className="mt-2 space-y-3">
                {[
                  'Полноценная страница-визитка с услугами и мастерами',
                  'Рабочая онлайн-запись с календарём и выбором времени',
                  'Переключение между компьютером и телефоном в превью',
                  'Собственная цветовая палитра под сферу',
                  'Тёмная и светлая тема — переключение в один клик',
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full ${accent.bgLight} ${accent.text} dark:bg-ink-800`}>
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm text-ink-700 dark:text-ink-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => setPreviewOpen(true)}
                  className={`flex items-center gap-2 rounded-xl ${accent.bg} px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 active:scale-95`}
                >
                  Открыть страницу
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full preview */}
      {previewOpen && demoData && (
        <BeautyPreview
          business={demoData.business}
          themeColor={design.themeColor}
          designName={design.name}
          onBack={() => setPreviewOpen(false)}
        />
      )}
    </>
  );
}
