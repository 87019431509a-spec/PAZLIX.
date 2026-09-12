import { useState } from 'react';
import {
  Phone, MapPin, Clock, Star, Calendar, MessageSquare,
  Send, ChevronLeft, Check, X,
} from 'lucide-react';
import { demoBusiness } from '@/data';
import { DatePicker } from '@/components/DatePicker';

interface BusinessPageProps {
  onBack: () => void;
}

type ContactChannel = {
  label: string;
  icon: typeof Send;
  color: string;
};

const channels: ContactChannel[] = [
  { label: 'Telegram', icon: Send, color: 'bg-[#2AABEE] text-white' },
  { label: 'WhatsApp', icon: Phone, color: 'bg-[#25D366] text-white' },
  { label: 'MAX', icon: MessageSquare, color: 'bg-[#0077FF] text-white' },
  { label: 'VK', icon: Send, color: 'bg-[#0077FF] text-white' },
  { label: 'Позвонить', icon: Phone, color: 'bg-brand-500 text-white' },
];

export function BusinessPage({ onBack }: BusinessPageProps) {
  const biz = demoBusiness;
  const [activeTab, setActiveTab] = useState<'services' | 'team' | 'photos' | 'reviews' | 'contacts'>('services');
  const [contactOpen, setContactOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingStep, setBookingStep] = useState(0);
  const [bookingData, setBookingData] = useState({ service: '', specialist: '', date: '', time: '' });

  const tabs = [
    { id: 'services' as const, label: 'Услуги' },
    { id: 'team' as const, label: 'Специалисты' },
    { id: 'photos' as const, label: 'Фото' },
    { id: 'reviews' as const, label: 'Отзывы' },
    { id: 'contacts' as const, label: 'Контакты' },
  ];

  const times = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
  ];

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setRequestOpen(false);
      setBookingOpen(false);
    }, 2000);
  };

  const startBooking = (serviceName: string) => {
    setBookingData({ ...bookingData, service: serviceName });
    setBookingStep(0);
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back button */}
      <button
        onClick={onBack}
        className="fixed left-4 top-4 z-50 flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-ink-700 shadow-md backdrop-blur transition hover:bg-white"
      >
        <ChevronLeft className="h-4 w-4" />
        На главную
      </button>

      {/* Cover */}
      <div className="relative h-48 overflow-hidden sm:h-64 lg:h-80">
        <img src={biz.cover} alt={biz.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/40 via-ink-900/10 to-white/80" />
      </div>

      {/* Header */}
      <div className="section-padding mx-auto max-w-3xl">
        <div className="flex items-end gap-4 pt-6">
          <div className="h-24 w-24 flex-none overflow-hidden rounded-3xl ring-1 ring-ink-100 shadow-xl sm:h-28 sm:w-28">
            <img src={biz.logo} alt={biz.name} className="h-full w-full object-cover" />
          </div>
          <div className="flex-1 pb-2">
            <h1 className="text-xl font-bold text-ink-950 sm:text-2xl lg:text-3xl">{biz.name}</h1>
            <p className="mt-1 text-sm text-ink-500 sm:text-base">{biz.tagline}</p>
            <div className="mt-2 flex items-center gap-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent-400 text-accent-400" />
                ))}
              </div>
              <span className="text-xs text-ink-400">4.9 · 127 отзывов</span>
            </div>
          </div>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-ink-600 sm:text-base">{biz.description}</p>

        {/* Action buttons */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setRequestOpen(true)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-500 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-600 active:scale-95"
          >
            <MessageSquare className="h-4 w-4" />
            Оставить заявку
          </button>
          <button
            onClick={() => setContactOpen(true)}
            className="flex items-center justify-center gap-2 rounded-xl bg-ink-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-ink-800 active:scale-95"
          >
            <Phone className="h-4 w-4" />
            Связаться
          </button>
        </div>

        {/* Tabs */}
        <div className="sticky top-0 z-20 -mx-5 mt-6 bg-white/90 px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-none rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-ink-900 text-white'
                    : 'bg-ink-50 text-ink-600 hover:bg-ink-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="mt-6 pb-32">
          {activeTab === 'services' && (
            <div className="space-y-3">
              {biz.services.map((service) => (
                <div
                  key={service.name}
                  className="overflow-hidden rounded-2xl card-shadow ring-1 ring-ink-100 transition hover:card-shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative h-32 flex-none overflow-hidden sm:h-auto sm:w-40">
                      <img src={service.image} alt={service.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="text-base font-bold text-ink-900">{service.name}</h3>
                      <p className="mt-1 text-sm text-ink-400">{service.duration}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-lg font-bold text-brand-600">{service.price}</span>
                        <button
                          onClick={() => startBooking(service.name)}
                          className="flex items-center gap-1.5 rounded-full bg-brand-500/10 px-4 py-2 text-xs font-semibold text-brand-600 transition hover:bg-brand-500 hover:text-white"
                        >
                          <Calendar className="h-3.5 w-3.5" />
                          Записаться
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'team' && (
            <div className="grid gap-4 sm:grid-cols-3">
              {biz.team.map((member) => (
                <div key={member.name} className="overflow-hidden rounded-2xl card-shadow ring-1 ring-ink-100 transition hover:-translate-y-1 hover:card-shadow-lg">
                  <div className="relative aspect-square overflow-hidden">
                    <img src={member.avatar} alt={member.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-ink-900">{member.name}</h3>
                    <p className="mt-1 text-xs text-ink-400">{member.role}</p>
                    <button
                      onClick={() => {
                        setBookingData({ service: '', specialist: member.name, date: '', time: '' });
                        setBookingStep(1);
                        setBookingOpen(true);
                      }}
                      className="mt-3 w-full rounded-lg bg-ink-50 py-2 text-xs font-semibold text-ink-700 transition hover:bg-ink-100"
                    >
                      Записаться к специалисту
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'photos' && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {biz.photos.concat(biz.photos).map((photo, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-2xl ring-1 ring-ink-100 transition hover:ring-ink-200">
                  <img src={photo} alt={`Фото ${i + 1}`} className="h-full w-full object-cover transition duration-500 hover:scale-110" loading="lazy" />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {biz.reviews.map((review) => (
                <div key={review.name} className="rounded-2xl bg-ink-50/50 p-5 ring-1 ring-ink-100">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/10 text-sm font-bold text-brand-600">
                        {review.name.charAt(0)}
                      </div>
                      <span className="text-sm font-semibold text-ink-900">{review.name}</span>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-accent-400 text-accent-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-ink-600">{review.text}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="space-y-3">
              <div className="rounded-2xl card-shadow ring-1 ring-ink-100 overflow-hidden">
                <div className="flex items-center gap-4 p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-ink-900">Адрес</div>
                    <div className="text-sm text-ink-500">{biz.address}</div>
                  </div>
                </div>
                <div className="flex gap-2 px-5 pb-5">
                  {['Яндекс Карты', '2ГИС', 'Google Maps'].map((map) => (
                    <button key={map} className="rounded-full bg-ink-50 px-3 py-1.5 text-xs font-medium text-ink-600 transition hover:bg-ink-100">
                      {map}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl card-shadow ring-1 ring-ink-100 p-5 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/10 text-accent-600">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-ink-900">График работы</div>
                  <div className="text-sm text-ink-500">{biz.hours}</div>
                </div>
              </div>

              <div className="rounded-2xl card-shadow ring-1 ring-ink-100 p-5 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink-900/10 text-ink-700">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-ink-900">Телефон</div>
                  <div className="text-sm text-ink-500">{biz.phone}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating contact button */}
      <button
        onClick={() => setContactOpen(!contactOpen)}
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-ink-900 text-white shadow-2xl transition-all active:scale-90 hover:bg-ink-800"
      >
        {contactOpen ? <X className="h-6 w-6" /> : <Phone className="h-6 w-6" />}
      </button>

      {/* Contact channels popup */}
      {contactOpen && (
        <div className="fixed bottom-24 right-5 z-40 animate-slide-down">
          <div className="rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-ink-100">
            {channels.map((ch) => (
              <button
                key={ch.label}
                onClick={() => setContactOpen(false)}
                className="flex w-44 items-center gap-3 rounded-xl p-3 transition hover:bg-ink-50"
              >
                <span className={`flex h-9 w-9 items-center justify-center rounded-full ${ch.color}`}>
                  <ch.icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium text-ink-900">{ch.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Request modal */}
      {requestOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink-950/40 backdrop-blur-sm sm:items-center" onClick={() => setRequestOpen(false)}>
          <div
            className="animate-slide-down w-full max-w-md rounded-t-3xl bg-white p-6 sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {submitted ? (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-500/10 text-brand-600">
                  <Check className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-ink-900">Заявка отправлена!</h3>
                <p className="mt-2 text-sm text-ink-500">Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <>
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-ink-900">Оставить заявку</h3>
                  <button onClick={() => setRequestOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-full text-ink-400 hover:bg-ink-50">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    className="w-full rounded-xl bg-ink-50 px-4 py-3 text-sm outline-none ring-1 ring-ink-100 transition focus:ring-2 focus:ring-brand-400"
                  />
                  <input
                    type="tel"
                    placeholder="Телефон"
                    className="w-full rounded-xl bg-ink-50 px-4 py-3 text-sm outline-none ring-1 ring-ink-100 transition focus:ring-2 focus:ring-brand-400"
                  />
                  <textarea
                    placeholder="Комментарий (необязательно)"
                    rows={3}
                    className="w-full resize-none rounded-xl bg-ink-50 px-4 py-3 text-sm outline-none ring-1 ring-ink-100 transition focus:ring-2 focus:ring-brand-400"
                  />
                  <button onClick={handleSubmit} className="w-full rounded-xl bg-brand-500 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-600">
                    Отправить заявку
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Booking modal */}
      {bookingOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink-950/40 backdrop-blur-sm sm:items-center" onClick={() => setBookingOpen(false)}>
          <div
            className="animate-slide-down w-full max-w-md rounded-t-3xl bg-white p-6 sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {submitted ? (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-500/10 text-brand-600">
                  <Check className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-ink-900">Запись подтверждена!</h3>
                <p className="mt-2 text-sm text-ink-500">
                  {bookingData.service && `Услуга: ${bookingData.service}. `}
                  {bookingData.date && `${bookingData.date}, ${bookingData.time}`}
                </p>
              </div>
            ) : (
              <>
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-ink-900">
                    {bookingStep === 0 ? 'Выберите специалиста' : bookingStep === 1 ? 'Выберите дату' : 'Выберите время'}
                  </h3>
                  <button onClick={() => setBookingOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-full text-ink-400 hover:bg-ink-50">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {bookingStep === 0 && (
                  <div className="space-y-2">
                    {biz.team.map((member) => (
                      <button
                        key={member.name}
                        onClick={() => {
                          setBookingData({ ...bookingData, specialist: member.name });
                          setBookingStep(1);
                        }}
                        className="flex w-full items-center gap-3 rounded-xl bg-ink-50 p-3 text-left transition hover:bg-ink-100"
                      >
                        <img src={member.avatar} alt={member.name} className="h-12 w-12 rounded-full object-cover" />
                        <div>
                          <div className="text-sm font-semibold text-ink-900">{member.name}</div>
                          <div className="text-xs text-ink-400">{member.role}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {bookingStep === 1 && (
                  <div className="max-h-[60vh] overflow-y-auto">
                    <DatePicker
                      selectedDate={bookingData.date || null}
                      onSelect={(date) => {
                        setBookingData({ ...bookingData, date });
                        setBookingStep(2);
                      }}
                    />
                  </div>
                )}

                {bookingStep === 2 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-ink-500">
                      <Calendar className="h-4 w-4" />
                      <span>{bookingData.date}</span>
                      {bookingData.specialist && <span>· {bookingData.specialist}</span>}
                    </div>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                      {times.map((time) => (
                        <button
                          key={time}
                          onClick={() => setBookingData({ ...bookingData, time })}
                          className={`rounded-xl py-3 text-sm font-medium transition ${
                            bookingData.time === time ? 'bg-brand-500 text-white' : 'bg-ink-50 text-ink-700 hover:bg-ink-100'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    {bookingData.time && (
                      <div className="space-y-3 border-t border-ink-100 pt-4">
                        <input
                          type="text"
                          placeholder="Ваше имя"
                          className="w-full rounded-xl bg-ink-50 px-4 py-3 text-sm outline-none ring-1 ring-ink-100 transition focus:ring-2 focus:ring-brand-400"
                        />
                        <input
                          type="tel"
                          placeholder="Телефон"
                          className="w-full rounded-xl bg-ink-50 px-4 py-3 text-sm outline-none ring-1 ring-ink-100 transition focus:ring-2 focus:ring-brand-400"
                        />
                        <button onClick={handleSubmit} className="w-full rounded-xl bg-brand-500 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-600">
                          Подтвердить запись
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
