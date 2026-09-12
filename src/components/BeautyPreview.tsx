import { useState } from 'react';
import {
  Phone, MapPin, Clock, Star, Calendar, MessageSquare,
  ChevronLeft, Check, X, Monitor, Smartphone, Heart,
} from 'lucide-react';
import { AIChatWidget } from '@/components/AIChatWidget';
import { DatePicker } from '@/components/DatePicker';
import { SocialIcon } from '@/components/SocialIcons';
import type { DemoBusiness } from '@/data';

interface BeautyPreviewProps {
  business: DemoBusiness;
  themeColor: string;
  designName: string;
  onBack: () => void;
}

const TIMES = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

interface ThemeStyle {
  bg: string; text: string; bgLight: string; gradient: string; buttonHover: string;
  page: string; heroMask: string; logo: string; card: string; tabActive: string; tabIdle: string;
  heroOverlay: string; sectionGap: string; priceFont: string;
  cardTitle: string; cardSub: string;
}

const themeStyles: Record<string, ThemeStyle> = {
  pink: {
    bg: 'bg-pink-500', text: 'text-pink-600', bgLight: 'bg-pink-50',
    gradient: 'from-pink-400 to-pink-600', buttonHover: 'hover:bg-pink-600',
    page: 'bg-[#fff5f9]', heroMask: 'rounded-b-[2.5rem]',
    logo: 'rounded-[1.2rem] bg-pink-100 text-pink-600',
    card: 'rounded-[1.5rem] border border-pink-100 shadow-[0_8px_30px_rgba(236,72,153,0.07)]',
    tabActive: 'rounded-full bg-pink-500 text-white', tabIdle: 'rounded-full bg-pink-50 text-pink-500',
    heroOverlay: 'bg-gradient-to-b from-pink-500/20 to-pink-500/40 mix-blend-multiply',
    sectionGap: 'gap-4', priceFont: 'font-bold',
    cardTitle: 'text-ink-900', cardSub: 'text-ink-500',
  },
  teal: {
    bg: 'bg-teal-600', text: 'text-teal-700', bgLight: 'bg-teal-50',
    gradient: 'from-teal-500 to-teal-700', buttonHover: 'hover:bg-teal-700',
    page: 'bg-[#f0f7f5]', heroMask: 'rounded-none',
    logo: 'rounded-full bg-teal-100 text-teal-700 border-2 border-teal-300',
    card: 'rounded-lg border-l-4 border-teal-500 bg-white shadow-sm',
    tabActive: 'rounded-none border-b-2 border-teal-600 text-teal-700 font-semibold', tabIdle: 'rounded-none border-b-2 border-transparent text-ink-400',
    heroOverlay: 'bg-gradient-to-b from-teal-600/25 to-teal-800/45 mix-blend-multiply',
    sectionGap: 'gap-3', priceFont: 'font-bold tracking-tight',
    cardTitle: 'text-ink-900', cardSub: 'text-ink-500',
  },
  fuchsia: {
    bg: 'bg-fuchsia-600', text: 'text-fuchsia-600', bgLight: 'bg-fuchsia-50',
    gradient: 'from-fuchsia-500 to-fuchsia-700', buttonHover: 'hover:bg-fuchsia-700',
    page: 'bg-[#fff5fc]', heroMask: 'rounded-none',
    logo: 'rounded-none bg-fuchsia-600 text-white',
    card: 'rounded-none border-2 border-fuchsia-300 bg-white shadow-[5px_5px_0_#e879f9]',
    tabActive: 'rounded-none bg-fuchsia-600 text-white uppercase tracking-wider text-[10px]', tabIdle: 'rounded-none bg-fuchsia-100 text-fuchsia-500 uppercase tracking-wider text-[10px]',
    heroOverlay: 'bg-gradient-to-b from-fuchsia-600/20 to-fuchsia-800/40 mix-blend-multiply',
    sectionGap: 'gap-4', priceFont: 'font-black uppercase',
    cardTitle: 'text-ink-900', cardSub: 'text-ink-500',
  },
  amber: {
    bg: 'bg-amber-700', text: 'text-amber-800', bgLight: 'bg-amber-50',
    gradient: 'from-amber-500 to-amber-700', buttonHover: 'hover:bg-amber-800',
    page: 'bg-[#fdfbf4]', heroMask: 'rounded-b-2xl',
    logo: 'rounded-xl bg-amber-100 text-amber-800 border border-amber-200',
    card: 'rounded-xl border border-amber-200 bg-white shadow-sm',
    tabActive: 'rounded-lg bg-amber-700 text-white', tabIdle: 'rounded-lg bg-amber-50 text-amber-700',
    heroOverlay: 'bg-gradient-to-b from-amber-600/20 to-amber-800/35 mix-blend-multiply',
    sectionGap: 'gap-3', priceFont: 'font-bold',
    cardTitle: 'text-ink-900', cardSub: 'text-ink-500',
  },
  violet: {
    bg: 'bg-violet-600', text: 'text-violet-700', bgLight: 'bg-violet-50',
    gradient: 'from-violet-400 to-violet-600', buttonHover: 'hover:bg-violet-700',
    page: 'bg-[#f7f5ff]', heroMask: 'rounded-b-[3rem]',
    logo: 'rounded-[1.8rem] bg-violet-100 text-violet-700 border border-violet-200',
    card: 'rounded-[1.8rem] border border-violet-100 bg-white shadow-[0_6px_24px_rgba(139,92,246,0.06)]',
    tabActive: 'rounded-full bg-violet-600 text-white', tabIdle: 'rounded-full bg-violet-50 text-violet-500',
    heroOverlay: 'bg-gradient-to-b from-violet-500/20 to-violet-700/35 mix-blend-multiply',
    sectionGap: 'gap-5', priceFont: 'font-bold',
    cardTitle: 'text-ink-900', cardSub: 'text-ink-500',
  },
  ivory: {
    bg: 'bg-stone-800', text: 'text-stone-800', bgLight: 'bg-stone-50',
    gradient: 'from-stone-600 to-stone-800', buttonHover: 'hover:bg-stone-900',
    page: 'bg-[#faf8f5]', heroMask: 'rounded-b-xl',
    logo: 'rounded-full bg-stone-100 text-stone-800 border border-stone-200',
    card: 'rounded-2xl border border-stone-200 bg-white shadow-sm',
    tabActive: 'rounded-full bg-stone-800 text-white', tabIdle: 'rounded-full bg-stone-100 text-stone-600',
    heroOverlay: 'bg-gradient-to-b from-stone-800/10 to-stone-900/40 mix-blend-multiply',
    sectionGap: 'gap-4', priceFont: 'font-semibold tracking-tight',
    cardTitle: 'text-ink-900', cardSub: 'text-ink-500',
  },
  carbon: {
    bg: 'bg-zinc-900', text: 'text-zinc-200', bgLight: 'bg-zinc-800',
    gradient: 'from-zinc-700 to-zinc-900', buttonHover: 'hover:bg-zinc-800',
    page: 'bg-zinc-950', heroMask: 'rounded-none',
    logo: 'rounded-lg bg-zinc-800 text-white border border-zinc-700',
    card: 'rounded-xl border border-zinc-800 bg-zinc-900 shadow-none',
    tabActive: 'rounded-lg bg-white text-zinc-900 font-bold', tabIdle: 'rounded-lg bg-zinc-800 text-zinc-400',
    heroOverlay: 'bg-gradient-to-b from-zinc-900/20 to-zinc-950/60',
    sectionGap: 'gap-3', priceFont: 'font-bold',
    cardTitle: 'text-white', cardSub: 'text-zinc-400',
  },
  ocean: {
    bg: 'bg-blue-600', text: 'text-blue-700', bgLight: 'bg-blue-50',
    gradient: 'from-blue-500 to-blue-700', buttonHover: 'hover:bg-blue-700',
    page: 'bg-[#f0f5ff]', heroMask: 'rounded-b-3xl',
    logo: 'rounded-2xl bg-blue-100 text-blue-700',
    card: 'rounded-2xl border border-blue-100 bg-white shadow-[0_4px_20px_rgba(37,99,235,0.06)]',
    tabActive: 'rounded-full bg-blue-600 text-white', tabIdle: 'rounded-full bg-blue-50 text-blue-600',
    heroOverlay: 'bg-gradient-to-b from-blue-600/15 to-blue-800/40 mix-blend-multiply',
    sectionGap: 'gap-4', priceFont: 'font-bold',
    cardTitle: 'text-ink-900', cardSub: 'text-ink-500',
  },
  sage: {
    bg: 'bg-emerald-700', text: 'text-emerald-800', bgLight: 'bg-emerald-50',
    gradient: 'from-emerald-500 to-emerald-700', buttonHover: 'hover:bg-emerald-800',
    page: 'bg-[#f2f7f4]', heroMask: 'rounded-b-[2rem]',
    logo: 'rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200',
    card: 'rounded-xl border border-emerald-100 bg-white shadow-sm',
    tabActive: 'rounded-lg bg-emerald-700 text-white', tabIdle: 'rounded-lg bg-emerald-50 text-emerald-700',
    heroOverlay: 'bg-gradient-to-b from-emerald-700/15 to-emerald-900/40 mix-blend-multiply',
    sectionGap: 'gap-4', priceFont: 'font-semibold',
    cardTitle: 'text-ink-900', cardSub: 'text-ink-500',
  },
  copper: {
    bg: 'bg-orange-700', text: 'text-orange-800', bgLight: 'bg-orange-50',
    gradient: 'from-orange-500 to-orange-700', buttonHover: 'hover:bg-orange-800',
    page: 'bg-[#fdf6f0]', heroMask: 'rounded-b-2xl',
    logo: 'rounded-xl bg-orange-100 text-orange-800 border border-orange-200',
    card: 'rounded-2xl border border-orange-100 bg-white shadow-[0_4px_16px_rgba(194,65,12,0.05)]',
    tabActive: 'rounded-full bg-orange-700 text-white', tabIdle: 'rounded-full bg-orange-50 text-orange-700',
    heroOverlay: 'bg-gradient-to-b from-orange-600/15 to-orange-800/40 mix-blend-multiply',
    sectionGap: 'gap-4', priceFont: 'font-bold',
    cardTitle: 'text-ink-900', cardSub: 'text-ink-500',
  },
  slate: {
    bg: 'bg-slate-700', text: 'text-slate-700', bgLight: 'bg-slate-50',
    gradient: 'from-slate-500 to-slate-700', buttonHover: 'hover:bg-slate-800',
    page: 'bg-[#f5f6f8]', heroMask: 'rounded-none',
    logo: 'rounded-lg bg-slate-100 text-slate-700 border border-slate-200',
    card: 'rounded-lg border border-slate-200 bg-white shadow-sm',
    tabActive: 'rounded-none border-b-2 border-slate-700 text-slate-800 font-bold', tabIdle: 'rounded-none border-b-2 border-transparent text-slate-400',
    heroOverlay: 'bg-gradient-to-b from-slate-700/15 to-slate-900/45 mix-blend-multiply',
    sectionGap: 'gap-3', priceFont: 'font-semibold',
    cardTitle: 'text-ink-900', cardSub: 'text-ink-500',
  },
  coral: {
    bg: 'bg-rose-500', text: 'text-rose-600', bgLight: 'bg-rose-50',
    gradient: 'from-rose-400 to-rose-600', buttonHover: 'hover:bg-rose-600',
    page: 'bg-[#fff5f5]', heroMask: 'rounded-b-[2.5rem]',
    logo: 'rounded-[1.5rem] bg-rose-100 text-rose-600',
    card: 'rounded-[1.5rem] border border-rose-100 bg-white shadow-[0_6px_24px_rgba(244,63,94,0.06)]',
    tabActive: 'rounded-full bg-rose-500 text-white', tabIdle: 'rounded-full bg-rose-50 text-rose-500',
    heroOverlay: 'bg-gradient-to-b from-rose-500/15 to-rose-700/40 mix-blend-multiply',
    sectionGap: 'gap-4', priceFont: 'font-bold',
    cardTitle: 'text-ink-900', cardSub: 'text-ink-500',
  },
  midnight: {
    bg: 'bg-indigo-900', text: 'text-indigo-300', bgLight: 'bg-indigo-950',
    gradient: 'from-indigo-700 to-indigo-900', buttonHover: 'hover:bg-indigo-800',
    page: 'bg-indigo-950', heroMask: 'rounded-b-3xl',
    logo: 'rounded-2xl bg-indigo-800 text-indigo-200 border border-indigo-700',
    card: 'rounded-2xl border border-indigo-800 bg-indigo-900/80 shadow-none',
    tabActive: 'rounded-full bg-indigo-400 text-indigo-950 font-bold', tabIdle: 'rounded-full bg-indigo-800 text-indigo-400',
    heroOverlay: 'bg-gradient-to-b from-indigo-950/30 to-indigo-950/70',
    sectionGap: 'gap-4', priceFont: 'font-bold',
    cardTitle: 'text-indigo-100', cardSub: 'text-indigo-400',
  },
  forest: {
    bg: 'bg-green-800', text: 'text-green-800', bgLight: 'bg-green-50',
    gradient: 'from-green-600 to-green-800', buttonHover: 'hover:bg-green-900',
    page: 'bg-[#f0f5f1]', heroMask: 'rounded-b-xl',
    logo: 'rounded-xl bg-green-100 text-green-800 border border-green-200',
    card: 'rounded-xl border border-green-100 bg-white shadow-sm',
    tabActive: 'rounded-lg bg-green-800 text-white', tabIdle: 'rounded-lg bg-green-50 text-green-700',
    heroOverlay: 'bg-gradient-to-b from-green-800/15 to-green-900/45 mix-blend-multiply',
    sectionGap: 'gap-3', priceFont: 'font-bold',
    cardTitle: 'text-ink-900', cardSub: 'text-ink-500',
  },
  sand: {
    bg: 'bg-yellow-700', text: 'text-yellow-800', bgLight: 'bg-yellow-50',
    gradient: 'from-yellow-600 to-yellow-800', buttonHover: 'hover:bg-yellow-800',
    page: 'bg-[#fdfaf2]', heroMask: 'rounded-b-2xl',
    logo: 'rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200',
    card: 'rounded-2xl border border-yellow-100 bg-white shadow-sm',
    tabActive: 'rounded-full bg-yellow-700 text-white', tabIdle: 'rounded-full bg-yellow-50 text-yellow-700',
    heroOverlay: 'bg-gradient-to-b from-yellow-700/15 to-yellow-800/40 mix-blend-multiply',
    sectionGap: 'gap-4', priceFont: 'font-semibold',
    cardTitle: 'text-ink-900', cardSub: 'text-ink-500',
  },
};

export function BeautyPreview({ business, themeColor, designName, onBack }: BeautyPreviewProps) {
  const biz = business;
  const s = themeStyles[themeColor] ?? themeStyles.pink;
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'services' | 'team' | 'photos' | 'reviews' | 'contacts'>('services');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(0);
  const [bookingData, setBookingData] = useState({ service: '', specialist: '', date: '', time: '' });
  const [toast, setToast] = useState(false);
  const [tipsOpen, setTipsOpen] = useState(false);
  const [tipsAmount, setTipsAmount] = useState<number | null>(null);
  const [tipsSent, setTipsSent] = useState(false);
  const [contactsOpen, setContactsOpen] = useState(false);

  const isSolo = biz.team.length <= 1;

  const handleSubmit = () => {
    setBookingOpen(false);
    setToast(true);
    setTimeout(() => {
      setToast(false);
      setTimeout(() => setTipsOpen(true), 2000);
    }, 3000);
  };

  const startBooking = (serviceName: string) => {
    if (isSolo) {
      setBookingData({ service: serviceName, specialist: biz.team[0]?.name || '', date: '', time: '' });
      setBookingStep(1);
    } else {
      setBookingData({ service: serviceName, specialist: '', date: '', time: '' });
      setBookingStep(0);
    }
    setBookingOpen(true);
  };

  const tabs = [
    { id: 'services' as const, label: 'Услуги' },
    ...(!isSolo ? [{ id: 'team' as const, label: 'Мастера' }] : []),
    { id: 'photos' as const, label: 'Фото' },
    { id: 'reviews' as const, label: 'Отзывы' },
    { id: 'contacts' as const, label: 'Контакты' },
  ];

  const BizContent = () => (
    <div className={`relative min-h-full ${s.page}`}>
      {/* Hero — cover image with business info overlaid */}
      <div className={`relative h-56 overflow-hidden sm:h-64 lg:h-80 ${s.heroMask}`}>
        <img src={biz.cover} alt={biz.name} className="h-full w-full object-cover" />
        <div className={`absolute inset-0 ${s.heroOverlay}`} />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />



        {/* Business name overlaid on hero bottom */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
          {isSolo ? (
            <div className="flex flex-col items-center text-center">
              <img
                src={biz.team[0]?.avatar || biz.logo}
                alt={biz.team[0]?.name || biz.name}
                className="h-20 w-20 rounded-full border-[3px] border-white object-cover shadow-xl sm:h-24 sm:w-24"
              />
              <h1 className="mt-2 text-lg font-bold text-white drop-shadow-lg sm:text-2xl">
                {biz.team[0]?.name || biz.name}
              </h1>
              <p className="mt-0.5 text-xs text-white/85 sm:text-sm">
                {biz.team[0]?.role || biz.tagline}
              </p>
            </div>
          ) : (
            <div className="flex items-end gap-3">
              <div className={`flex h-14 w-14 flex-none items-center justify-center text-xl font-black shadow-lg sm:h-16 sm:w-16 ${s.logo}`}>
                {biz.name.charAt(0)}
              </div>
              <div className="flex-1 pb-1">
                <h1 className="text-lg font-bold text-white drop-shadow-lg sm:text-2xl">{biz.name}</h1>
                <p className="mt-0.5 text-xs text-white/85 sm:text-sm">{biz.tagline}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky bar */}
      <div className="sticky top-0 z-20 flex items-center justify-between gap-2 border-b border-ink-100 bg-white/95 px-4 py-2.5 backdrop-blur dark:border-ink-800 dark:bg-ink-900/95">
        <div className="flex items-center gap-1.5 text-xs text-ink-500 dark:text-ink-400">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="font-semibold text-ink-700 dark:text-ink-300">4.9</span>
          <span>· {biz.reviews.length} отз.</span>
        </div>
        <button
          onClick={() => startBooking('')}
          className={`flex items-center gap-1 rounded-lg ${s.bg} px-2.5 py-1.5 text-xs font-semibold text-white transition ${s.buttonHover}`}
        >
          <Calendar className="h-3 w-3" /> Записаться
        </button>
      </div>

      {/* Floating contacts button */}
      <button
        onClick={() => setContactsOpen(true)}
        className={`fixed bottom-20 left-4 z-30 flex h-12 w-12 items-center justify-center rounded-full ${s.bg} text-white shadow-xl transition hover:scale-110 active:scale-95`}
      >
        <MessageSquare className="h-5 w-5" />
      </button>

      {/* Contacts floating popup */}
      {contactsOpen && (
        <div className="fixed inset-0 z-40 flex items-end justify-center sm:items-center" onClick={() => setContactsOpen(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="relative z-10 w-full max-w-sm rounded-t-3xl bg-white p-5 shadow-2xl dark:bg-ink-900 sm:rounded-3xl sm:m-4 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold text-ink-900 dark:text-white">Связаться</h3>
              <button onClick={() => setContactsOpen(false)} className="text-ink-400 transition hover:text-ink-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-2">
              <a href={`tel:${biz.phone}`} className="flex items-center gap-3 rounded-2xl bg-ink-50 p-3.5 transition hover:bg-ink-100 dark:bg-ink-800 dark:hover:bg-ink-700">
                <div className={`flex h-10 w-10 flex-none items-center justify-center rounded-xl ${s.bg} text-white`}>
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-ink-900 dark:text-white">Позвонить</div>
                  <div className="text-xs text-ink-400">{biz.phone}</div>
                </div>
              </a>
              {biz.socials.map((soc) => (
                <a key={soc.label} href={soc.url} className="flex items-center gap-3 rounded-2xl bg-ink-50 p-3.5 transition hover:bg-ink-100 dark:bg-ink-800 dark:hover:bg-ink-700">
                  <div className={`flex h-10 w-10 flex-none items-center justify-center rounded-xl ${s.bg} text-white`}>
                    <SocialIcon label={soc.label} className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-ink-900 dark:text-white">{soc.label}</div>
                    <div className="text-xs text-ink-400">Написать</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
        <p className={`mb-4 text-sm leading-relaxed ${s.cardSub}`}>{biz.description}</p>

        {/* Tabs */}
        <div className="mb-4 flex gap-1.5 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-none px-3.5 py-1.5 text-xs font-medium transition sm:text-sm ${
                activeTab === tab.id ? s.tabActive : s.tabIdle
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className={`flex flex-col ${s.sectionGap} pb-16`}>
          {activeTab === 'services' && (
            <>
              {biz.services.map((service) => (
                <div key={service.name} className={`flex items-center gap-3 p-3.5 ${s.card}`}>
                  <div className="relative h-16 w-16 flex-none overflow-hidden rounded-xl sm:h-20 sm:w-20">
                    <img src={service.image} alt={service.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col min-w-0">
                    <h3 className={`text-sm font-bold ${s.cardTitle}`}>{service.name}</h3>
                    <p className="mt-0.5 text-xs text-ink-400">{service.duration}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className={`text-base ${s.priceFont} ${s.text}`}>{service.price}</span>
                      <button
                        onClick={() => startBooking(service.name)}
                        className={`flex items-center gap-1 rounded-lg ${s.bg} px-3 py-1.5 text-xs font-semibold text-white transition ${s.buttonHover} shadow-sm`}
                      >
                        <Calendar className="h-3.5 w-3.5" />
                        Записаться
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {activeTab === 'team' && (
            <div className="grid gap-3 sm:grid-cols-3">
              {biz.team.map((member) => (
                <div key={member.name} className={`overflow-hidden ${s.card} transition hover:-translate-y-1`}>
                  <div className="relative aspect-square overflow-hidden">
                    <img src={member.avatar} alt={member.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-3">
                    <h3 className={`text-sm font-bold ${s.cardTitle}`}>{member.name}</h3>
                    <p className="mt-0.5 text-xs text-ink-400">{member.role}</p>
                    <button
                      onClick={() => { setBookingData({ service: '', specialist: member.name, date: '', time: '' }); setBookingStep(1); setBookingOpen(true); }}
                      className={`mt-3 w-full rounded-lg ${s.bgLight} py-2 text-xs font-semibold ${s.text} transition ${s.bg} hover:text-white`}
                    >
                      Записаться
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'photos' && (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {biz.photos.map((photo, i) => (
                <div key={i} className={`relative aspect-square overflow-hidden ${s.card}`}>
                  <img src={photo} alt={`Фото ${i + 1}`} className="h-full w-full object-cover transition duration-500 hover:scale-110" loading="lazy" />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className={`flex flex-col ${s.sectionGap}`}>
              {biz.reviews.map((review) => (
                <div key={review.name} className={`p-4 ${s.card}`}>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full ${s.bgLight} ${s.text} text-xs font-bold`}>
                        {review.name.charAt(0)}
                      </div>
                      <span className={`text-sm font-semibold ${s.cardTitle}`}>{review.name}</span>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className={`text-sm leading-relaxed ${s.cardSub}`}>{review.text}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className={`flex flex-col ${s.sectionGap}`}>
              <div className={`flex items-center gap-3 p-4 ${s.card}`}>
                <div className={`flex h-10 w-10 flex-none items-center justify-center rounded-xl ${s.bgLight} ${s.text}`}>
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className={`text-sm font-bold ${s.cardTitle}`}>Адрес</div>
                  <div className={`text-sm ${s.cardSub}`}>{biz.address}</div>
                </div>
              </div>
              <div className={`flex items-center gap-3 p-4 ${s.card}`}>
                <div className={`flex h-10 w-10 flex-none items-center justify-center rounded-xl ${s.bgLight} ${s.text}`}>
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className={`text-sm font-bold ${s.cardTitle}`}>График работы</div>
                  <div className={`text-sm ${s.cardSub}`}>{biz.hours}</div>
                </div>
              </div>
              <div className={`flex items-center gap-3 p-4 ${s.card}`}>
                <div className={`flex h-10 w-10 flex-none items-center justify-center rounded-xl ${s.bgLight} ${s.text}`}>
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className={`text-sm font-bold ${s.cardTitle}`}>Телефон</div>
                  <div className={`text-sm ${s.cardSub}`}>{biz.phone}</div>
                </div>
              </div>
              <div className="flex gap-2">
                {biz.socials.map((soc) => (
                  <a key={soc.label} href={soc.url} className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl ${s.bg} py-3 text-xs font-semibold text-white transition ${s.buttonHover}`}>
                    <SocialIcon label={soc.label} className="h-3.5 w-3.5" />
                    {soc.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-ink-100 dark:bg-ink-950">
      {/* Top toolbar */}
      <div className="flex flex-none items-center justify-between border-b border-ink-200 bg-white px-4 py-3 dark:border-ink-800 dark:bg-ink-900">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-ink-600 transition hover:bg-ink-50 dark:text-ink-400 dark:hover:bg-ink-800"
        >
          <ChevronLeft className="h-4 w-4" />
          Назад
        </button>
        <div className="flex items-center gap-2">
          <span className="hidden text-sm font-bold text-ink-900 dark:text-white sm:block">Дизайн «{designName}»</span>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${s.bg}`}>
            Превью
          </span>
        </div>
        <div className="flex items-center gap-1 rounded-xl bg-ink-50 p-1 dark:bg-ink-800">
          <button
            onClick={() => setDevice('desktop')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              device === 'desktop' ? 'bg-white text-ink-900 shadow-sm dark:bg-ink-700 dark:text-white' : 'text-ink-500 dark:text-ink-400'
            }`}
          >
            <Monitor className="h-4 w-4" />
            <span className="hidden sm:inline">ПК</span>
          </button>
          <button
            onClick={() => setDevice('mobile')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              device === 'mobile' ? 'bg-white text-ink-900 shadow-sm dark:bg-ink-700 dark:text-white' : 'text-ink-500 dark:text-ink-400'
            }`}
          >
            <Smartphone className="h-4 w-4" />
            <span className="hidden sm:inline">Телефон</span>
          </button>
        </div>
      </div>

      {/* Preview area */}
      <div className="flex flex-1 justify-center overflow-y-auto">
        {device === 'mobile' ? (
          <div className="relative my-4 flex h-[820px] w-[390px] flex-none overflow-hidden rounded-[2.5rem] border-8 border-ink-800 bg-white shadow-2xl dark:border-ink-700">
            {/* Scrollable content inside phone frame */}
            <div className="flex-1 overflow-y-auto">
              <BizContent />
            </div>

            {/* Toast — top of phone frame */}
            {toast && (
              <div className="absolute inset-x-4 top-4 z-50 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-ink-700 animate-slide-down">
                <div className={`flex h-10 w-10 flex-none items-center justify-center rounded-full ${s.bgLight} ${s.text}`}>
                  <Check className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-ink-900">Запись подтверждена!</div>
                  <div className="truncate text-xs text-ink-500">
                    {bookingData.service && `${bookingData.service} · `}
                    {bookingData.date && `${bookingData.date}, ${bookingData.time}`}
                  </div>
                </div>
              </div>
            )}

            {/* Tips modal — phone frame */}
            {tipsOpen && (
              <div className="absolute inset-0 z-40 flex items-end justify-center bg-black/40 backdrop-blur-sm" onClick={() => setTipsOpen(false)}>
                <div className="w-full rounded-t-3xl bg-white p-5 shadow-2xl dark:bg-ink-900 animate-slide-up" onClick={(e) => e.stopPropagation()}>
                  {tipsSent ? (
                    <div className="flex flex-col items-center py-6">
                      <div className={`mb-3 flex h-14 w-14 items-center justify-center rounded-full ${s.bgLight}`}>
                        <Heart className={`h-7 w-7 ${s.text}`} />
                      </div>
                      <div className="text-base font-bold text-ink-900 dark:text-white">Спасибо за чаевые!</div>
                      <div className="mt-1 text-sm text-ink-500">{bookingData.specialist || biz.team[0]?.name} будет рад(а)</div>
                    </div>
                  ) : (
                    <>
                      <div className="mb-1 text-center text-base font-bold text-ink-900 dark:text-white">Оставить чаевые?</div>
                      <div className="mb-4 text-center text-xs text-ink-500 dark:text-ink-400">
                        Ваш визит к {bookingData.specialist || biz.team[0]?.name} завершён
                      </div>
                      <div className="mb-4 grid grid-cols-4 gap-2">
                        {[100, 200, 500, 1000].map((amt) => (
                          <button
                            key={amt}
                            onClick={() => setTipsAmount(amt)}
                            className={`rounded-xl py-3 text-sm font-semibold transition ${
                              tipsAmount === amt ? `${s.bg} text-white` : 'bg-ink-50 text-ink-700 hover:bg-ink-100 dark:bg-ink-800 dark:text-ink-300'
                            }`}
                          >
                            {amt} ₽
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setTipsOpen(false)} className="flex-1 rounded-xl bg-ink-100 py-3 text-sm font-medium text-ink-600 transition hover:bg-ink-200 dark:bg-ink-800 dark:text-ink-400">
                          Не сейчас
                        </button>
                        <button
                          onClick={() => { if (tipsAmount) { setTipsSent(true); setTimeout(() => { setTipsOpen(false); setTipsSent(false); setTipsAmount(null); }, 2000); } }}
                          disabled={!tipsAmount}
                          className={`flex-1 rounded-xl py-3 text-sm font-semibold text-white transition ${tipsAmount ? `${s.bg} ${s.buttonHover}` : 'bg-ink-200 text-ink-400 cursor-not-allowed'}`}
                        >
                          Отправить
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Booking modal — top of phone frame */}
            {bookingOpen && (
              <div className="absolute inset-0 z-40 flex items-start justify-center bg-black/40 backdrop-blur-sm" onClick={() => setBookingOpen(false)}>
                <div className="mt-10 w-[340px] rounded-3xl bg-white p-5 shadow-2xl dark:bg-ink-900 animate-slide-down" onClick={(e) => e.stopPropagation()}>
                  <BookingModalContent
                    bookingStep={bookingStep}
                    setBookingStep={setBookingStep}
                    bookingData={bookingData}
                    setBookingData={setBookingData}
                    biz={biz}
                    s={s}
                    onClose={() => setBookingOpen(false)}
                    onSubmit={handleSubmit}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="relative w-full max-w-5xl">
            <BizContent />

            {/* Toast — top of desktop preview */}
            {toast && (
              <div className="fixed top-20 right-6 z-50 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-ink-700 animate-slide-down">
                <div className={`flex h-10 w-10 flex-none items-center justify-center rounded-full ${s.bgLight} ${s.text}`}>
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-ink-900">Запись подтверждена!</div>
                  <div className="text-xs text-ink-500">
                    {bookingData.service && `${bookingData.service} · `}
                    {bookingData.date && `${bookingData.date}, ${bookingData.time}`}
                  </div>
                </div>
              </div>
            )}

            {/* Tips modal — desktop */}
            {tipsOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setTipsOpen(false)}>
                <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl dark:bg-ink-900" onClick={(e) => e.stopPropagation()}>
                  {tipsSent ? (
                    <div className="flex flex-col items-center py-6">
                      <div className={`mb-3 flex h-14 w-14 items-center justify-center rounded-full ${s.bgLight}`}>
                        <Heart className={`h-7 w-7 ${s.text}`} />
                      </div>
                      <div className="text-base font-bold text-ink-900 dark:text-white">Спасибо за чаевые!</div>
                      <div className="mt-1 text-sm text-ink-500">{bookingData.specialist || biz.team[0]?.name} будет рад(а)</div>
                    </div>
                  ) : (
                    <>
                      <div className="mb-1 text-center text-base font-bold text-ink-900 dark:text-white">Оставить чаевые?</div>
                      <div className="mb-4 text-center text-xs text-ink-500 dark:text-ink-400">
                        Ваш визит к {bookingData.specialist || biz.team[0]?.name} завершён
                      </div>
                      <div className="mb-4 grid grid-cols-4 gap-2">
                        {[100, 200, 500, 1000].map((amt) => (
                          <button
                            key={amt}
                            onClick={() => setTipsAmount(amt)}
                            className={`rounded-xl py-3 text-sm font-semibold transition ${
                              tipsAmount === amt ? `${s.bg} text-white` : 'bg-ink-50 text-ink-700 hover:bg-ink-100 dark:bg-ink-800 dark:text-ink-300'
                            }`}
                          >
                            {amt} ₽
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setTipsOpen(false)} className="flex-1 rounded-xl bg-ink-100 py-3 text-sm font-medium text-ink-600 transition hover:bg-ink-200 dark:bg-ink-800 dark:text-ink-400">
                          Не сейчас
                        </button>
                        <button
                          onClick={() => { if (tipsAmount) { setTipsSent(true); setTimeout(() => { setTipsOpen(false); setTipsSent(false); setTipsAmount(null); }, 2000); } }}
                          disabled={!tipsAmount}
                          className={`flex-1 rounded-xl py-3 text-sm font-semibold text-white transition ${tipsAmount ? `${s.bg} ${s.buttonHover}` : 'bg-ink-200 text-ink-400 cursor-not-allowed'}`}
                        >
                          Отправить
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Booking modal — desktop centered */}
            {bookingOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setBookingOpen(false)}>
                <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:bg-ink-900" onClick={(e) => e.stopPropagation()}>
                  <BookingModalContent
                    bookingStep={bookingStep}
                    setBookingStep={setBookingStep}
                    bookingData={bookingData}
                    setBookingData={setBookingData}
                    biz={biz}
                    s={s}
                    onClose={() => setBookingOpen(false)}
                    onSubmit={handleSubmit}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <AIChatWidget businessName={biz.name} />
    </div>
  );
}

interface BookingModalContentProps {
  bookingStep: number;
  setBookingStep: (step: number) => void;
  bookingData: { service: string; specialist: string; date: string; time: string };
  setBookingData: (data: { service: string; specialist: string; date: string; time: string }) => void;
  biz: DemoBusiness;
  s: ThemeStyle;
  onClose: () => void;
  onSubmit: () => void;
}

function BookingModalContent({ bookingStep, setBookingStep, bookingData, setBookingData, biz, s, onClose, onSubmit }: BookingModalContentProps) {
  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-bold text-ink-900 dark:text-white">
          {bookingStep === 0 ? 'Выберите мастера' : bookingStep === 1 ? 'Выберите дату' : 'Выберите время'}
        </h3>
        <button onClick={onClose} className="text-ink-400">
          <X className="h-5 w-5" />
        </button>
      </div>

      {bookingStep === 0 && (
        <div className="space-y-2">
          {biz.team.map((member) => (
            <button
              key={member.name}
              onClick={() => { setBookingData({ ...bookingData, specialist: member.name }); setBookingStep(1); }}
              className="flex w-full items-center gap-3 rounded-xl bg-ink-50 p-3 text-left transition hover:bg-ink-100 dark:bg-ink-800 dark:hover:bg-ink-700"
            >
              <img src={member.avatar} alt={member.name} className="h-11 w-11 rounded-full object-cover" />
              <div>
                <div className="text-sm font-semibold text-ink-900 dark:text-white">{member.name}</div>
                <div className="text-xs text-ink-400">{member.role}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {bookingStep === 1 && (
        <DatePicker
          selectedDate={bookingData.date || null}
          onSelect={(date) => { setBookingData({ ...bookingData, date }); setBookingStep(2); }}
        />
      )}

      {bookingStep === 2 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-ink-500">
            <Calendar className="h-4 w-4" />
            <span>{bookingData.date}</span>
            {bookingData.specialist && <span>· {bookingData.specialist}</span>}
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {TIMES.map((time) => (
              <button
                key={time}
                onClick={() => setBookingData({ ...bookingData, time })}
                className={`rounded-xl py-2.5 text-sm font-medium transition ${
                  bookingData.time === time ? `${s.bg} text-white` : 'bg-ink-50 text-ink-700 hover:bg-ink-100 dark:bg-ink-800 dark:text-ink-300'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
          {bookingData.time && (
            <div className="space-y-3 border-t border-ink-100 pt-4 dark:border-ink-700">
              <input type="text" placeholder="Ваше имя" className="w-full rounded-xl bg-ink-50 px-4 py-3 text-sm outline-none ring-1 ring-ink-100 focus:ring-2 focus:ring-brand-400 dark:bg-ink-800 dark:text-white dark:ring-ink-700" />
              <input type="tel" placeholder="Телефон" className="w-full rounded-xl bg-ink-50 px-4 py-3 text-sm outline-none ring-1 ring-ink-100 focus:ring-2 focus:ring-brand-400 dark:bg-ink-800 dark:text-white dark:ring-ink-700" />
              <button onClick={onSubmit} className={`w-full rounded-xl ${s.bg} py-3.5 text-sm font-semibold text-white transition ${s.buttonHover}`}>
                Подтвердить запись
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
