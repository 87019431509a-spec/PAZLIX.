import { steps } from '@/data';
import { useReveal } from '@/hooks/useReveal';

export function HowItWorks() {
  const { ref, inView } = useReveal();

  return (
    <section id="how" className="section-padding py-16 lg:py-24 dark:bg-ink-950">
      <div className="mx-auto max-w-7xl" ref={ref}>
        <div className={`mb-12 text-center lg:mb-16 ${inView ? 'in-view' : ''} reveal`}>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-600">
            Как это работает
          </p>
          <h2 className="text-balance text-3xl font-bold text-ink-950 sm:text-4xl lg:text-5xl dark:text-white">
            От регистрации до первых заявок
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-500 dark:text-ink-400">
            Без программирования и сложных настроек. Вы заполняете карточку бизнеса — PAZLIX собирает готовую страницу.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`group relative rounded-2xl bg-white p-6 card-shadow ring-1 ring-ink-100 transition-all duration-500 hover:-translate-y-1 hover:card-shadow-lg dark:bg-ink-900 dark:ring-ink-800 ${
                inView ? 'in-view' : ''
              } reveal`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-3xl font-extrabold text-ink-100 transition-colors group-hover:text-brand-100 dark:text-ink-800 dark:group-hover:text-brand-500/30">
                  {step.num}
                </span>
                <span className="h-2 w-2 rounded-full bg-brand-400" />
              </div>
              <h3 className="mb-2 text-base font-bold text-ink-900 dark:text-white">{step.title}</h3>
              <p className="text-sm leading-relaxed text-ink-500 dark:text-ink-400">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
