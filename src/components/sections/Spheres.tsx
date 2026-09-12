import { spheres } from '@/data';
import { useReveal } from '@/hooks/useReveal';

export function Spheres() {
  const { ref, inView } = useReveal();

  return (
    <section className="section-padding py-16 lg:py-24 dark:bg-ink-950" ref={ref}>
      <div className={`mx-auto max-w-7xl ${inView ? 'in-view' : ''} reveal`}>
        <div className="mb-10 text-center lg:mb-14">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-600">
            Любая сфера
          </p>
          <h2 className="text-balance text-3xl font-bold text-ink-950 sm:text-4xl lg:text-5xl dark:text-white">
            Подходит для любого бизнеса
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-500 dark:text-ink-400">
            Не только салоны и мастера. PAZLIX работает везде, где есть клиенты, заявки, запись или бронирование.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {spheres.map((sphere, i) => (
            <div
              key={sphere.label}
              className="group relative overflow-hidden rounded-2xl card-shadow ring-1 ring-ink-100 transition-all duration-500 hover:card-shadow-lg hover:-translate-y-1"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={sphere.image}
                  alt={sphere.label}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-4">
                  <sphere.icon className="mb-2 h-7 w-7 text-white/90" />
                  <span className="text-sm font-semibold text-white">{sphere.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
