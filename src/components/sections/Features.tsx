import {
  CalendarCheck, MessageSquare, MapPin, Share2, Clock, Star,
  Image, Users, FileText, Smartphone,
} from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const features = [
  {
    icon: MessageSquare,
    title: 'Простая заявка',
    text: 'Клиент выбирает услугу, оставляет имя, телефон и комментарий. Бизнес мгновенно получает заявку.',
    color: 'bg-brand-500',
  },
  {
    icon: CalendarCheck,
    title: 'Онлайн-запись',
    text: 'Услуга → сотрудник → дата → свободное время → данные клиента → подтверждение. Полный цикл записи.',
    color: 'bg-accent-500',
  },
  {
    icon: Clock,
    title: 'Бронирование',
    text: 'Объект или услуга → дата → время → данные клиента → подтверждение. Для аренды и бронирования.',
    color: 'bg-ink-900',
  },
  {
    icon: MapPin,
    title: 'Карты и адрес',
    text: 'Яндекс Карты, 2ГИС и Google Maps. Клиент видит адрес и может построить маршрут в один тап.',
    color: 'bg-brand-600',
  },
  {
    icon: Share2,
    title: 'Соцсети и контакты',
    text: 'Telegram, WhatsApp, MAX, VK, телефон. Плавающая кнопка связи раскрывает все доступные каналы.',
    color: 'bg-accent-600',
  },
  {
    icon: Image,
    title: 'Фотографии и портфолио',
    text: 'Загружайте фото офиса, помещений или выполненных работ. Отличная подача на любом экране.',
    color: 'bg-ink-700',
  },
  {
    icon: Users,
    title: 'Сотрудники и расписание',
    text: 'Добавляйте специалистов с аватарами, услугами и расписанием. Каждый может иметь своё расписание.',
    color: 'bg-brand-500',
  },
  {
    icon: FileText,
    title: 'Услуги с деталями',
    text: 'Для каждой услуги — отдельная фотография, описание, цена и длительность. Гибкая настройка.',
    color: 'bg-accent-500',
  },
  {
    icon: Smartphone,
    title: 'Web App для клиентов',
    text: 'Большинство клиентов откроют страницу со смартфона. Мобильная версия ощущается как нативное приложение.',
    color: 'bg-ink-900',
  },
];

export function Features() {
  const { ref, inView } = useReveal();

  return (
    <section id="features" className="section-padding py-16 lg:py-24 dark:bg-ink-950" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <div className={`mb-12 text-center lg:mb-16 ${inView ? 'in-view' : ''} reveal`}>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-600">
            Возможности
          </p>
          <h2 className="text-balance text-3xl font-bold text-ink-950 sm:text-4xl lg:text-5xl dark:text-white">
            Всё, что нужно бизнесу и клиенту
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-500 dark:text-ink-400">
            Разные сценарии работы — от простого «оставить номер» до записи по календарю и бронирования.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`group rounded-2xl bg-white p-6 card-shadow ring-1 ring-ink-100 transition-all duration-500 hover:-translate-y-1 hover:card-shadow-lg dark:bg-ink-900 dark:ring-ink-800 ${
                inView ? 'in-view' : ''
              } reveal`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${feature.color} text-white transition-transform duration-300 group-hover:scale-110`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-base font-bold text-ink-900 dark:text-white">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-ink-500 dark:text-ink-400">{feature.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {[
            { tag: 'Заявки', id: 'features' },
            { tag: 'Онлайн-запись', id: 'how' },
            { tag: 'Бронирование', id: 'how' },
            { tag: 'Календарь', id: 'how' },
            { tag: 'Уведомления', id: 'how' },
            { tag: 'Отзывы', id: 'beauty-designs' },
          ].map((item) => (
            <button
              key={item.tag}
              onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full bg-ink-50 px-4 py-2 text-xs font-medium text-ink-600 ring-1 ring-ink-100 transition hover:bg-brand-50 hover:text-brand-600 hover:ring-brand-200 dark:bg-ink-800 dark:text-ink-400 dark:ring-ink-700 dark:hover:bg-brand-500/10 dark:hover:text-brand-400"
            >
              {item.tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
