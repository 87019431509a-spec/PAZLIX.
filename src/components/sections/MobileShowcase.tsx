import { useReveal } from '@/hooks/useReveal';
import { Calendar, MessageSquare, MapPin, Star } from 'lucide-react';

export function MobileShowcase({ onAuthClick }: { onAuthClick?: () => void }) {
  const { ref, inView } = useReveal();

  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 lg:py-32" ref={ref}>
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(34, 145, 95, 0.5) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(255, 127, 15, 0.3) 0%, transparent 50%)' }} />

      <div className="section-padding relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className={`flex flex-col items-start ${inView ? 'in-view' : ''} reveal`}>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-400">
              Web App — главный приоритет
            </p>
            <h2 className="text-balance text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Как нативное приложение
              <br />
              прямо в браузере
            </h2>
            <p className="mt-5 max-w-md text-ink-300">
              Большинство клиентов откроют страницу по ссылке с телефона. Мобильная версия ощущается как хорошее нативное приложение: крупные кнопки, плавные переходы, минимум лишних экранов.
            </p>

            <div className="mt-8 grid w-full gap-3 sm:grid-cols-2">
              {[
                { icon: Calendar, label: 'Быстрая запись', text: 'Услуга → время → готово' },
                { icon: MessageSquare, label: 'Заявка в тап', text: 'Имя и телефон за 10 секунд' },
                { icon: MapPin, label: 'Маршрут', text: 'Карты в один клик' },
                { icon: Star, label: 'Удобно', text: 'Плавная навигация снизу' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur-sm">
                  <item.icon className="mb-2 h-5 w-5 text-brand-400" />
                  <div className="text-sm font-semibold text-white">{item.label}</div>
                  <div className="text-xs text-ink-400">{item.text}</div>
                </div>
              ))}
            </div>

            <button onClick={onAuthClick} className="btn-brand mt-8">
              Создать свой сайт
            </button>
          </div>

          <div className="relative flex justify-center">
            <div className="relative">
              <div className="relative h-[520px] w-[260px] overflow-hidden rounded-[2.5rem] bg-white card-shadow-lg ring-8 ring-ink-800/50">
                <div className="relative h-32 overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/39219674/pexels-photo-39219674.jpeg?auto=compress&cs=tinysrgb&h=300&w=400"
                    alt="Бизнес"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 to-transparent" />
                </div>
                <div className="p-4">
                  <div className="mb-3 flex items-end gap-2">
                    <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-brand-500 text-white shadow-lg">
                      <span className="text-lg font-bold">F</span>
                    </div>
                    <div className="pb-1">
                      <div className="text-sm font-bold text-ink-900">FitPro Studio</div>
                      <div className="text-[10px] text-ink-400">Персональные тренировки</div>
                    </div>
                  </div>

                  <div className="mb-3 flex gap-2">
                    {['Услуги', 'Тренеры', 'Контакты'].map((tab, i) => (
                      <span
                        key={tab}
                        className={`rounded-full px-3 py-1 text-[10px] font-medium ${
                          i === 0 ? 'bg-ink-900 text-white' : 'bg-ink-50 text-ink-500'
                        }`}
                      >
                        {tab}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-2">
                    {[
                      { name: 'Персональная тренировка', price: '2 500 ₽' },
                      { name: 'Программа питания', price: '1 500 ₽' },
                      { name: 'Групповое занятие', price: '800 ₽' },
                    ].map((s) => (
                      <div key={s.name} className="flex items-center justify-between rounded-xl bg-ink-50 p-2.5">
                        <div>
                          <div className="text-[11px] font-semibold text-ink-900">{s.name}</div>
                          <div className="text-[10px] text-ink-400">60 мин</div>
                        </div>
                        <div className="text-[11px] font-bold text-brand-600">{s.price}</div>
                      </div>
                    ))}
                  </div>

                  <button className="mt-3 w-full rounded-xl bg-brand-500 py-2.5 text-xs font-semibold text-white">
                    Записаться
                  </button>
                </div>
              </div>

              <div className="absolute hidden -right-8 top-40 animate-float rounded-2xl bg-white p-3 card-shadow-lg lg:block" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-white">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-ink-900">Сегодня 14:30</div>
                    <div className="text-[10px] text-ink-400">Запись подтверждена</div>
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
