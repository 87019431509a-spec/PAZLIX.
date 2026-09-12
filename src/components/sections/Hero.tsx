import { ArrowRight, Sparkles, Calendar, MessageSquare, MapPin } from 'lucide-react';

interface HeroProps {
  onAuthClick?: () => void;
}

export function Hero({ onAuthClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 xl:pt-36 xl:pb-28 dark:bg-ink-950">
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-brand-100/60 blur-3xl" />
      <div className="absolute top-20 -left-20 h-72 w-72 rounded-full bg-accent-100/40 blur-3xl" />

      <div className="section-padding relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-start">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-ink-600 ring-1 ring-ink-100 card-shadow dark:bg-ink-900 dark:text-ink-300 dark:ring-ink-800">
              <Sparkles className="h-4 w-4 text-brand-500" />
              Без программирования — готово за 15 минут
            </div>

            <h1 className="text-balance text-4xl font-extrabold leading-[1.08] text-ink-950 sm:text-5xl lg:text-6xl xl:text-7xl dark:text-white">
              Красивая страница
              <br />
              вашего бизнеса
              <br />
              <span className="gradient-text">и заявки онлайн</span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-500 sm:text-lg dark:text-ink-400">
              Создайте готовый сайт или Web App для любой сферы — услуги, ремонт, медицина, аренда, автосервис, юристы и другие. Клиенты записываются и оставляют заявки прямо со смартфона.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button onClick={onAuthClick} className="btn-brand group">
                Создать свой сайт
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary"
              >
                Смотреть пример
              </button>
            </div>

            <div className="mt-10 flex items-center gap-6">
              <div>
                <div className="text-2xl font-bold text-ink-900 dark:text-white">5</div>
                <div className="text-xs text-ink-400 dark:text-ink-500">дизайнов</div>
              </div>
              <div className="h-8 w-px bg-ink-200 dark:bg-ink-700" />
              <div>
                <div className="text-2xl font-bold text-ink-900 dark:text-white">11+</div>
                <div className="text-xs text-ink-400 dark:text-ink-500">сфер бизнеса</div>
              </div>
              <div className="h-8 w-px bg-ink-200 dark:bg-ink-700" />
              <div>
                <div className="text-2xl font-bold text-ink-900 dark:text-white">∞</div>
                <div className="text-xs text-ink-400 dark:text-ink-500">заявок</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-brand-100 to-accent-100/50 opacity-60 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] bg-white card-shadow-lg ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-ink-800">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/13068377/pexels-photo-13068377.jpeg?auto=compress&cs=tinysrgb&h=400&w=600"
                    alt="Бизнес-страница"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/40 to-transparent" />
                </div>
                <div className="p-5">
                  <div className="mb-3 flex items-end gap-3">
                    <div className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-white text-brand-500 ring-1 ring-ink-100 shadow-lg dark:bg-ink-800 dark:ring-ink-700">
                      <Sparkles className="h-7 w-7" />
                    </div>
                    <div className="pb-1">
                      <div className="text-sm font-bold text-ink-900 dark:text-white">Стоматология Aurora</div>
                      <div className="text-xs text-ink-400 dark:text-ink-500">Москва</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-3 rounded-xl bg-ink-50 p-3 dark:bg-ink-800">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-ink-900 dark:text-white">Онлайн-запись</div>
                        <div className="text-[11px] text-ink-400 dark:text-ink-500">Выберите дату и время</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl bg-ink-50 p-3 dark:bg-ink-800">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-500/10 text-accent-600 dark:bg-accent-500/20 dark:text-accent-400">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-ink-900 dark:text-white">Оставить заявку</div>
                        <div className="text-[11px] text-ink-400 dark:text-ink-500">Имя, телефон, комментарий</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl bg-ink-50 p-3 dark:bg-ink-800">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-900/10 text-ink-700 dark:bg-white/10 dark:text-ink-300">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-ink-900 dark:text-white">На карте</div>
                        <div className="text-[11px] text-ink-400 dark:text-ink-500">Яндекс, 2ГИС, Google</div>
                      </div>
                    </div>
                  </div>

                  <button className="mt-4 w-full rounded-xl bg-brand-500 py-2.5 text-xs font-semibold text-white transition hover:bg-brand-600">
                    Записаться онлайн
                  </button>
                </div>
              </div>

              <div className="absolute hidden -right-4 top-8 animate-float rounded-2xl bg-white p-3 card-shadow ring-1 ring-ink-100 sm:flex" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-ink-900">Новая заявка</div>
                    <div className="text-[10px] text-ink-400">+7 999 123-45-67</div>
                  </div>
                </div>
              </div>

              <div className="absolute hidden -left-6 top-28 animate-float rounded-2xl bg-white p-3 card-shadow ring-1 ring-ink-100 sm:flex">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-500 text-white">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-ink-900">Запись подтверждена</div>
                    <div className="text-[10px] text-ink-400">Сегодня, 14:30</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
