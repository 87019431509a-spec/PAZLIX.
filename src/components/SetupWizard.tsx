import { useState } from 'react';
import {
  Puzzle, Check, ChevronRight, ChevronLeft, Sparkles,
  Store, Scissors, HeartPulse, Dumbbell, Wrench, Building2,
} from 'lucide-react';
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
  { id: 'bloom', name: 'Bloom', color: 'bg-pink-500', desc: 'Мягкий, цветочный' },
  { id: 'serenity', name: 'Serenity', color: 'bg-teal-600', desc: 'Минималистичный, спокойный' },
  { id: 'lacquer', name: 'Lacquer', color: 'bg-fuchsia-600', desc: 'Дерзкий, неоновый' },
  { id: 'arch', name: 'Arch', color: 'bg-amber-700', desc: 'Чистый, строгий' },
  { id: 'flutter', name: 'Flutter', color: 'bg-violet-600', desc: 'Плавный, нежный' },
];

export function SetupWizard({ onComplete, onCancel }: WizardProps) {
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    businessName: '',
    sphere: '',
    design: 'bloom',
    description: '',
    phone: '',
    address: '',
  });
  const [saving, setSaving] = useState(false);

  const steps = ['Сфера', 'Название', 'Дизайн', 'Контакты', 'Готово'];

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

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-950">
      {/* Header */}
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

        {step === 2 && (
          <div className="animate-fade-up">
            <h2 className="text-2xl font-bold text-ink-900 dark:text-white">Выберите дизайн</h2>
            <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">Можно поменять позже в настройках</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {designs.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setData({ ...data, design: d.id })}
                  className={`group flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition ${
                    data.design === d.id
                      ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/10'
                      : 'border-ink-100 bg-white hover:border-ink-200 dark:border-ink-800 dark:bg-ink-900'
                  }`}
                >
                  <div className={`flex h-14 w-14 flex-none items-center justify-center rounded-xl ${d.color} text-white`}>
                    <span className="text-lg font-bold">{d.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-ink-900 dark:text-white">{d.name}</div>
                    <div className="text-xs text-ink-400">{d.desc}</div>
                  </div>
                  {data.design === d.id && <Check className="ml-auto h-5 w-5 text-brand-500" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-up">
            <h2 className="text-2xl font-bold text-ink-900 dark:text-white">Контактные данные</h2>
            <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">Клиенты будут использовать их для связи и записи</p>
            <div className="mt-6 space-y-4">
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                placeholder="Телефон, например: +7 (495) 123-45-67"
                className="w-full rounded-2xl bg-white px-5 py-4 text-base outline-none ring-1 ring-ink-100 focus:ring-2 focus:ring-brand-400 dark:bg-ink-900 dark:text-white dark:ring-ink-800"
              />
              <input
                type="text"
                value={data.address}
                onChange={(e) => setData({ ...data, address: e.target.value })}
                placeholder="Адрес, например: ул. Малая Бронная, 12, Москва"
                className="w-full rounded-2xl bg-white px-5 py-4 text-base outline-none ring-1 ring-ink-100 focus:ring-2 focus:ring-brand-400 dark:bg-ink-900 dark:text-white dark:ring-ink-800"
              />
            </div>
          </div>
        )}

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
