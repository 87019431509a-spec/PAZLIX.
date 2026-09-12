import { useState } from 'react';
import {
  Puzzle, Check, ChevronRight, ChevronLeft, Sparkles, Eye,
  Store, Scissors, HeartPulse, Dumbbell, Wrench, Building2,
  Plus, Trash2, MapPin, Phone, Calendar, Star, Clock,
} from 'lucide-react';
import { TelegramIcon, WhatsAppIcon, InstagramIcon, VKIcon } from '@/components/SocialIcons';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

interface WizardProps {
  onComplete: () => void;
  onCancel: () => void;
}

const spheres = [
  { id: 'beauty', label: 'Салон красоты', icon: Scissors },
  { id: 'spa', label: 'Массаж и спа', icon: HeartPulse },
  { id: 'nails', label: 'Маникюр', icon: Sparkles },
  { id: 'brows', label: 'Брови и ресницы', icon: Sparkles },
  { id: 'fitness', label: 'Фитнес', icon: Dumbbell },
  { id: 'auto', label: 'Автосервис', icon: Wrench },
  { id: 'medical', label: 'Медицина', icon: Building2 },
  { id: 'other', label: 'Другое', icon: Store },
];

const designs = [
  { id: 'bloom', name: 'Bloom', color: 'bg-pink-500', desc: 'Мягкий, цветочный', preview: 'rounded-[1.5rem] bg-pink-50 border-pink-200' },
  { id: 'serenity', name: 'Serenity', color: 'bg-teal-600', desc: 'Минималистичный, спокойный', preview: 'rounded-lg bg-teal-50 border-teal-200' },
  { id: 'lacquer', name: 'Lacquer', color: 'bg-fuchsia-600', desc: 'Дерзкий, неоновый', preview: 'rounded-none bg-fuchsia-50 border-fuchsia-300' },
  { id: 'arch', name: 'Arch', color: 'bg-amber-700', desc: 'Чистый, строгий', preview: 'rounded-xl bg-amber-50 border-amber-200' },
  { id: 'flutter', name: 'Flutter', color: 'bg-violet-600', desc: 'Плавный, нежный', preview: 'rounded-[1.8rem] bg-violet-50 border-violet-200' },
];

const accentColors = [
  { id: 'pink', label: 'Розовый', tw: 'bg-pink-500', ring: 'ring-pink-500' },
  { id: 'teal', label: 'Бирюзовый', tw: 'bg-teal-600', ring: 'ring-teal-600' },
  { id: 'fuchsia', label: 'Фуксия', tw: 'bg-fuchsia-600', ring: 'ring-fuchsia-600' },
  { id: 'amber', label: 'Янтарь', tw: 'bg-amber-600', ring: 'ring-amber-600' },
  { id: 'blue', label: 'Синий', tw: 'bg-blue-600', ring: 'ring-blue-600' },
  { id: 'emerald', label: 'Изумруд', tw: 'bg-emerald-600', ring: 'ring-emerald-600' },
  { id: 'rose', label: 'Коралл', tw: 'bg-rose-500', ring: 'ring-rose-500' },
  { id: 'slate', label: 'Графит', tw: 'bg-slate-700', ring: 'ring-slate-700' },
];

const fonts = [
  { id: 'inter', name: 'Inter', family: 'Inter, system-ui, sans-serif', sample: 'Современный и чистый' },
  { id: 'manrope', name: 'Manrope', family: 'Manrope, Inter, sans-serif', sample: 'Геометрический и строгий' },
  { id: 'georgia', name: 'Georgia', family: 'Georgia, Times, serif', sample: 'Классический с засечками' },
  { id: 'system', name: 'Системный', family: 'system-ui, sans-serif', sample: 'Нативный интерфейс' },
];

interface SocialLink {
  type: string;
  url: string;
}

const socialOptions = [
  { type: 'telegram', label: 'Telegram', placeholder: 'https://t.me/your_name', icon: TelegramIcon },
  { type: 'whatsapp', label: 'WhatsApp', placeholder: 'https://wa.me/79001234567', icon: WhatsAppIcon },
  { type: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/your_name', icon: InstagramIcon },
  { type: 'vk', label: 'VK', placeholder: 'https://vk.com/your_name', icon: VKIcon },
];

export function SetupWizard({ onComplete, onCancel }: WizardProps) {
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    businessName: '',
    sphere: '',
    design: 'bloom',
    accentColor: 'pink',
    font: 'inter',
    description: '',
    phone: '',
    address: '',
    yandexMaps: '',
    twoGis: '',
    socials: [] as SocialLink[],
  });
  const [saving, setSaving] = useState(false);

  const steps = ['Сфера', 'Название', 'Дизайн и стиль', 'Контакты и ссылки', 'Готово'];

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);

    const { data: existing } = await supabase.from('business_settings').select('id').maybeSingle();
    const payload = {
      business_name: data.businessName,
      sphere: data.sphere,
      description: data.description || null,
      phone: data.phone || null,
      address: data.address || null,
    };
    if (existing) {
      await supabase.from('business_settings').update(payload).eq('id', existing.id);
    } else {
      await supabase.from('business_settings').insert(payload);
    }

    const { data: existingSub } = await supabase.from('subscriptions').select('id').maybeSingle();
    if (!existingSub) {
      await supabase.from('subscriptions').insert({
        plan: 'trial',
        status: 'active',
        expires_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      });
    }

    setSaving(false);
    setStep(4);
  };

  const canProceed = () => {
    if (step === 0) return data.sphere !== '';
    if (step === 1) return data.businessName.trim() !== '';
    if (step === 2) return data.design !== '';
    if (step === 3) return true;
    return false;
  };

  const addSocial = (type: string) => {
    if (data.socials.some((s) => s.type === type)) return;
    setData({ ...data, socials: [...data.socials, { type, url: '' }] });
  };

  const updateSocial = (index: number, url: string) => {
    const next = [...data.socials];
    next[index] = { ...next[index], url };
    setData({ ...data, socials: next });
  };

  const removeSocial = (index: number) => {
    setData({ ...data, socials: data.socials.filter((_, i) => i !== index) });
  };

  const selectedDesign = designs.find((d) => d.id === data.design)!;
  const selectedColor = accentColors.find((c) => c.id === data.accentColor)!;
  const selectedFont = fonts.find((f) => f.id === data.font)!;

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-950">
      <header className="sticky top-0 z-20 border-b border-ink-100 bg-white/90 backdrop-blur-xl dark:border-ink-800 dark:bg-ink-900/90">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-white">
              <Puzzle className="h-5 w-5" />
            </span>
            <div className="font-display text-base font-bold text-ink-900 dark:text-white">PAZLIX</div>
          </div>
          <button onClick={onCancel} className="text-sm font-medium text-ink-500 transition hover:text-ink-900 dark:text-ink-400 dark:hover:text-white">
            Выйти
          </button>
        </div>
      </header>

      {/* Progress */}
      <div className="mx-auto max-w-4xl px-5 pt-8">
        <div className="flex items-center gap-2">
          {steps.map((label, i) => (
            <div key={label} className="flex flex-1 items-center gap-2">
              <div className={`flex h-8 w-8 flex-none items-center justify-center rounded-full text-xs font-bold transition ${
                i <= step ? 'bg-brand-500 text-white' : 'bg-ink-100 text-ink-400 dark:bg-ink-800'
              }`}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={`hidden text-xs font-medium sm:inline ${i <= step ? 'text-ink-900 dark:text-white' : 'text-ink-400'}`}>
                {label}
              </span>
              {i < steps.length - 1 && <div className={`h-0.5 flex-1 rounded-full ${i < step ? 'bg-brand-500' : 'bg-ink-100 dark:bg-ink-800'}`} />}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-5 py-8">
        {/* Step 0 — sphere */}
        {step === 0 && (
          <div className="animate-fade-up">
            <h2 className="text-2xl font-bold text-ink-900 dark:text-white">Чем занимаетесь?</h2>
            <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">Выберите сферу — мы подберём подходящие дизайны</p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {spheres.map((sp) => (
                <button
                  key={sp.id}
                  onClick={() => setData({ ...data, sphere: sp.label })}
                  className={`flex flex-col items-center gap-3 rounded-2xl border-2 p-5 transition ${
                    data.sphere === sp.label
                      ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/10'
                      : 'border-ink-100 bg-white hover:border-ink-200 dark:border-ink-800 dark:bg-ink-900'
                  }`}
                >
                  <sp.icon className={`h-7 w-7 ${data.sphere === sp.label ? 'text-brand-600' : 'text-ink-400'}`} />
                  <span className={`text-center text-xs font-medium ${data.sphere === sp.label ? 'text-brand-600' : 'text-ink-600 dark:text-ink-300'}`}>
                    {sp.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1 — name */}
        {step === 1 && (
          <div className="animate-fade-up">
            <h2 className="text-2xl font-bold text-ink-900 dark:text-white">Как называется бизнес?</h2>
            <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">Это название увидят клиенты на вашей странице</p>
            <div className="mt-6 space-y-4">
              <input
                type="text"
                value={data.businessName}
                onChange={(e) => setData({ ...data, businessName: e.target.value })}
                placeholder="Например: Салон красоты Bloom"
                className="w-full rounded-2xl bg-white px-5 py-4 text-base outline-none ring-1 ring-ink-100 focus:ring-2 focus:ring-brand-400 dark:bg-ink-900 dark:text-white dark:ring-ink-800"
                autoFocus
              />
              <textarea
                value={data.description}
                onChange={(e) => setData({ ...data, description: e.target.value })}
                placeholder="Краткое описание (необязательно)..."
                rows={3}
                className="w-full resize-none rounded-2xl bg-white px-5 py-4 text-sm outline-none ring-1 ring-ink-100 focus:ring-2 focus:ring-brand-400 dark:bg-ink-900 dark:text-white dark:ring-ink-800"
              />
            </div>
          </div>
        )}

        {/* Step 2 — design, color, font with live preview */}
        {step === 2 && (
          <div className="animate-fade-up">
            <h2 className="text-2xl font-bold text-ink-900 dark:text-white">Дизайн и стиль</h2>
            <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">Выберите макет, цвет и шрифт — всё можно поменять позже</p>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr,320px]">
              {/* Controls */}
              <div className="space-y-6">
                {/* Design layout */}
                <div>
                  <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">Макет</div>
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {designs.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => setData({ ...data, design: d.id })}
                        className={`flex items-center gap-3 rounded-2xl border-2 p-3 text-left transition ${
                          data.design === d.id
                            ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/10'
                            : 'border-ink-100 bg-white hover:border-ink-200 dark:border-ink-800 dark:bg-ink-900'
                        }`}
                      >
                        <div className={`flex h-10 w-10 flex-none items-center justify-center rounded-xl ${d.color} text-white text-sm font-bold`}>
                          {d.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-ink-900 dark:text-white">{d.name}</div>
                          <div className="text-[11px] text-ink-400 truncate">{d.desc}</div>
                        </div>
                        {data.design === d.id && <Check className="ml-auto h-4 w-4 flex-none text-brand-500" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Accent color */}
                <div>
                  <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">Цвет акцента</div>
                  <div className="flex flex-wrap gap-2">
                    {accentColors.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setData({ ...data, accentColor: c.id })}
                        className={`flex items-center gap-2 rounded-full border-2 px-3 py-1.5 text-xs font-medium transition ${
                          data.accentColor === c.id
                            ? 'border-ink-900 dark:border-white'
                            : 'border-ink-100 hover:border-ink-200 dark:border-ink-800'
                        }`}
                      >
                        <span className={`h-4 w-4 rounded-full ${c.tw}`} />
                        <span className="text-ink-700 dark:text-ink-300">{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font */}
                <div>
                  <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">Шрифт</div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {fonts.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setData({ ...data, font: f.id })}
                        className={`flex flex-col rounded-2xl border-2 p-4 text-left transition ${
                          data.font === f.id
                            ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/10'
                            : 'border-ink-100 bg-white hover:border-ink-200 dark:border-ink-800 dark:bg-ink-900'
                        }`}
                      >
                        <span className="text-lg font-bold text-ink-900 dark:text-white" style={{ fontFamily: f.family }}>{f.name}</span>
                        <span className="mt-1 text-xs text-ink-400" style={{ fontFamily: f.family }}>{f.sample}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live preview card */}
              <div className="hidden lg:block">
                <div className="sticky top-28">
                  <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-ink-400">
                    <Eye className="h-3.5 w-3.5" /> Предпросмотр
                  </div>
                  <div className={`overflow-hidden border-2 ${selectedDesign.preview} p-0`}>
                    {/* Mini hero */}
                    <div className={`relative h-28 ${selectedColor.tw}`}>
                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="text-sm font-bold text-white" style={{ fontFamily: selectedFont.family }}>
                          {data.businessName || 'Название бизнеса'}
                        </div>
                        <div className="mt-0.5 text-[10px] text-white/80" style={{ fontFamily: selectedFont.family }}>
                          {data.sphere || 'Сфера'}
                        </div>
                      </div>
                    </div>
                    {/* Mini content */}
                    <div className="space-y-2 p-3" style={{ fontFamily: selectedFont.family }}>
                      <div className="flex gap-1.5">
                        <div className={`rounded-full ${selectedColor.tw} px-2 py-0.5 text-[9px] font-semibold text-white`}>Услуги</div>
                        <div className="rounded-full bg-ink-100 px-2 py-0.5 text-[9px] font-medium text-ink-500 dark:bg-ink-700 dark:text-ink-400">Отзывы</div>
                        <div className="rounded-full bg-ink-100 px-2 py-0.5 text-[9px] font-medium text-ink-500 dark:bg-ink-700 dark:text-ink-400">Контакты</div>
                      </div>
                      {[1, 2].map((i) => (
                        <div key={i} className="flex items-center gap-2 rounded-xl bg-white p-2 shadow-sm ring-1 ring-ink-100 dark:bg-ink-800 dark:ring-ink-700">
                          <div className="h-8 w-8 flex-none rounded-lg bg-ink-100 dark:bg-ink-700" />
                          <div className="flex-1 min-w-0">
                            <div className="h-2 w-16 rounded bg-ink-200 dark:bg-ink-600" />
                            <div className="mt-1 h-1.5 w-10 rounded bg-ink-100 dark:bg-ink-700" />
                          </div>
                          <div className={`rounded-md ${selectedColor.tw} px-1.5 py-1 text-[8px] font-bold text-white`}>
                            <Calendar className="h-2.5 w-2.5" />
                          </div>
                        </div>
                      ))}
                      <div className="flex items-center gap-1 pt-1">
                        <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                        <span className="text-[9px] font-semibold text-ink-700 dark:text-ink-300">4.9</span>
                        <span className="text-[9px] text-ink-400">· 28 отзывов</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3 — contacts, socials, maps */}
        {step === 3 && (
          <div className="animate-fade-up">
            <h2 className="text-2xl font-bold text-ink-900 dark:text-white">Контакты и ссылки</h2>
            <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">Всё необязательно — можно заполнить позже</p>

            <div className="mt-6 space-y-6">
              {/* Phone & Address */}
              <div className="space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">Основные</div>
                <div className="flex items-center gap-3 rounded-2xl bg-white p-1 ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-ink-800">
                  <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-ink-50 text-ink-400 dark:bg-ink-800">
                    <Phone className="h-5 w-5" />
                  </div>
                  <input
                    type="tel"
                    value={data.phone}
                    onChange={(e) => setData({ ...data, phone: e.target.value })}
                    placeholder="Телефон: +7 (495) 123-45-67"
                    className="flex-1 bg-transparent py-3 pr-4 text-sm outline-none text-ink-900 placeholder:text-ink-400 dark:text-white"
                  />
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-white p-1 ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-ink-800">
                  <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-ink-50 text-ink-400 dark:bg-ink-800">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    value={data.address}
                    onChange={(e) => setData({ ...data, address: e.target.value })}
                    placeholder="Адрес: ул. Малая Бронная, 12"
                    className="flex-1 bg-transparent py-3 pr-4 text-sm outline-none text-ink-900 placeholder:text-ink-400 dark:text-white"
                  />
                </div>
              </div>

              {/* Maps */}
              <div className="space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">Карты</div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-2xl bg-white p-1 ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-ink-800">
                    <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-red-50 text-red-500 dark:bg-red-500/10">
                      <span className="text-xs font-black">Я</span>
                    </div>
                    <input
                      type="url"
                      value={data.yandexMaps}
                      onChange={(e) => setData({ ...data, yandexMaps: e.target.value })}
                      placeholder="Ссылка на Яндекс Карты"
                      className="flex-1 bg-transparent py-3 pr-4 text-sm outline-none text-ink-900 placeholder:text-ink-400 dark:text-white"
                    />
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-white p-1 ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-ink-800">
                    <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-green-50 text-green-600 dark:bg-green-500/10">
                      <span className="text-xs font-black">2G</span>
                    </div>
                    <input
                      type="url"
                      value={data.twoGis}
                      onChange={(e) => setData({ ...data, twoGis: e.target.value })}
                      placeholder="Ссылка на 2ГИС"
                      className="flex-1 bg-transparent py-3 pr-4 text-sm outline-none text-ink-900 placeholder:text-ink-400 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">Соцсети и мессенджеры</div>

                {data.socials.map((social, i) => {
                  const opt = socialOptions.find((o) => o.type === social.type)!;
                  return (
                    <div key={`${social.type}-${i}`} className="flex items-center gap-3 rounded-2xl bg-white p-1 ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-ink-800">
                      <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-ink-50 text-ink-500 dark:bg-ink-800">
                        <opt.icon className="h-5 w-5" />
                      </div>
                      <input
                        type="url"
                        value={social.url}
                        onChange={(e) => updateSocial(i, e.target.value)}
                        placeholder={opt.placeholder}
                        className="flex-1 bg-transparent py-3 text-sm outline-none text-ink-900 placeholder:text-ink-400 dark:text-white"
                      />
                      <button
                        onClick={() => removeSocial(i)}
                        className="flex h-10 w-10 flex-none items-center justify-center rounded-xl text-ink-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  );
                })}

                {/* Add social buttons */}
                <div className="flex flex-wrap gap-2">
                  {socialOptions
                    .filter((opt) => !data.socials.some((s) => s.type === opt.type))
                    .map((opt) => (
                      <button
                        key={opt.type}
                        onClick={() => addSocial(opt.type)}
                        className="flex items-center gap-1.5 rounded-full border border-dashed border-ink-200 px-3 py-2 text-xs font-medium text-ink-500 transition hover:border-brand-400 hover:text-brand-600 dark:border-ink-700 dark:text-ink-400 dark:hover:border-brand-400 dark:hover:text-brand-400"
                      >
                        <Plus className="h-3 w-3" />
                        <opt.icon className="h-3.5 w-3.5" />
                        {opt.label}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4 — done */}
        {step === 4 && (
          <div className="animate-fade-up text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-500 text-white shadow-xl shadow-brand-500/20">
              <Check className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-bold text-ink-900 dark:text-white">Сайт готов!</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-ink-500 dark:text-ink-400">
              «{data.businessName}» успешно создан. Ваш пробный период активирован на 14 дней.
            </p>

            <div className="mx-auto mt-8 max-w-md space-y-3">
              <button
                onClick={onComplete}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-500 py-4 text-sm font-semibold text-white transition hover:bg-brand-600 active:scale-95"
              >
                Открыть кабинет
                <ChevronRight className="h-4 w-4" />
              </button>
              <p className="text-xs text-ink-400">Позже вы сможете посмотреть демо-страницу и оплатить подписку</p>
            </div>
          </div>
        )}

        {/* Navigation */}
        {step < 4 && (
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => step === 0 ? onCancel() : setStep(step - 1)}
              className="flex items-center gap-1.5 rounded-xl px-5 py-3 text-sm font-medium text-ink-600 transition hover:bg-ink-100 dark:text-ink-400 dark:hover:bg-ink-800"
            >
              <ChevronLeft className="h-4 w-4" />
              {step === 0 ? 'Отмена' : 'Назад'}
            </button>
            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="flex items-center gap-1.5 rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 active:scale-95 disabled:opacity-50"
              >
                Далее
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleSave}
                disabled={saving || !canProceed()}
                className="flex items-center gap-1.5 rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 active:scale-95 disabled:opacity-50"
              >
                {saving ? 'Сохранение...' : 'Создать сайт'}
                {!saving && <ChevronRight className="h-4 w-4" />}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
