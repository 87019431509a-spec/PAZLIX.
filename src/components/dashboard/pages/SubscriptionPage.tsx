import { useEffect, useState, useCallback } from 'react';
import { Check, Crown, Calendar, CreditCard, Zap, Users, Building2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

interface SubscriptionData {
  plan: string;
  status: string;
  expires_at: string;
  auto_renew: boolean;
}

const plans = [
  {
    id: 'solo',
    name: 'Соло',
    price: '890 ₽',
    period: '/ месяц',
    icon: Zap,
    staff: '1 сотрудник',
    features: ['1 специалист с расписанием', 'Безлимитные услуги и заявки', 'Все 5 дизайнов страниц', 'Онлайн-запись'],
  },
  {
    id: 'team',
    name: 'Команда',
    price: '1 800 ₽',
    period: '/ месяц',
    icon: Users,
    staff: 'До 3 сотрудников',
    features: ['До 3 специалистов', 'Безлимитные услуги и заявки', 'Все 5 дизайнов страниц', 'Онлайн-запись', 'Приоритетная поддержка'],
    highlight: true,
  },
  {
    id: 'pro',
    name: 'Про',
    price: '3 200 ₽',
    period: '/ месяц',
    icon: Building2,
    staff: 'До 7 сотрудников',
    features: ['До 7 специалистов', 'Безлимитные услуги и заявки', 'Все 5 дизайнов страниц', 'Онлайн-запись', 'Приоритетная поддержка', 'ИИ-помощник'],
  },
];

export function SubscriptionPage() {
  const { user } = useAuth();
  const [sub, setSub] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const fetchSub = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase.from('subscriptions').select('*').maybeSingle();
    setSub(data as SubscriptionData | null);
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchSub(); }, [fetchSub]);

  const daysLeft = sub ? Math.max(0, Math.ceil((new Date(sub.expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24))) : 0;
  const isTrial = sub?.plan === 'trial';
  const isActive = sub?.status === 'active' && daysLeft > 0;

  const handleSelectPlan = async (planId: string) => {
    setSelectedPlan(planId);
    if (!user) return;
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    const { data: existing } = await supabase.from('subscriptions').select('id').maybeSingle();
    if (existing) {
      await supabase.from('subscriptions').update({
        plan: planId,
        status: 'active',
        expires_at: expires,
        auto_renew: true,
      }).eq('id', existing.id);
    } else {
      await supabase.from('subscriptions').insert({
        plan: planId,
        status: 'active',
        expires_at: expires,
        auto_renew: true,
      });
    }
    setTimeout(() => {
      setSelectedPlan(null);
      fetchSub();
    }, 1500);
  };

  if (loading) {
    return <div className="flex h-64 items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-ink-200 border-t-brand-500" /></div>;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Current status */}
      <div className="rounded-2xl bg-white p-6 ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-ink-800">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-ink-900 dark:text-white">Моя подписка</h2>
            <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
              {isActive
                ? isTrial
                  ? `Пробный период · ${daysLeft} дн. осталось`
                  : `Тариф «${plans.find((p) => p.id === sub?.plan)?.name || sub?.plan}» · ${daysLeft} дн. осталось`
                : 'Подписка не активна'}
            </p>
          </div>
          <div className={`flex h-12 w-12 flex-none items-center justify-center rounded-xl ${
            isActive ? 'bg-brand-500/10 text-brand-600' : 'bg-ink-100 text-ink-400 dark:bg-ink-800'
          }`}>
            <Crown className="h-6 w-6" />
          </div>
        </div>

        {isActive && (
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between text-xs text-ink-400">
              <span>Осталось {daysLeft} дней</span>
              <span>{isTrial ? 'Пробный период' : 'Активна'}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-ink-100 dark:bg-ink-800">
              <div
                className={`h-full rounded-full transition-all ${isTrial ? 'bg-accent-500' : 'bg-brand-500'}`}
                style={{ width: `${Math.min(100, (daysLeft / (isTrial ? 14 : 30)) * 100)}%` }}
              />
            </div>
            {isTrial && daysLeft <= 3 && (
              <div className="mt-3 flex items-center gap-2 rounded-xl bg-accent-50 px-4 py-3 text-sm text-accent-700 dark:bg-accent-500/10 dark:text-accent-400">
                <Calendar className="h-4 w-4 flex-none" />
                Пробный период скоро закончится — выберите тариф ниже
              </div>
            )}
          </div>
        )}
      </div>

      {/* Plans */}
      <div>
        <h3 className="mb-4 text-base font-bold text-ink-900 dark:text-white">Выберите тариф</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl bg-white p-6 ring-1 transition dark:bg-ink-900 ${
                plan.highlight
                  ? 'ring-2 ring-brand-500 dark:ring-brand-500'
                  : 'ring-ink-100 dark:ring-ink-800'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  Популярный
                </div>
              )}
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  plan.highlight ? 'bg-brand-500 text-white' : 'bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-300'
                }`}>
                  <plan.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-ink-900 dark:text-white">{plan.name}</div>
                  <div className="text-xs text-ink-400">{plan.staff}</div>
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-2xl font-bold text-ink-900 dark:text-white">{plan.price}</span>
                <span className="text-sm text-ink-400">{plan.period}</span>
              </div>
              <ul className="mt-4 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-ink-600 dark:text-ink-400">
                    <Check className={`mt-0.5 h-3.5 w-3.5 flex-none ${plan.highlight ? 'text-brand-500' : 'text-ink-400'}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSelectPlan(plan.id)}
                disabled={selectedPlan !== null}
                className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition active:scale-95 disabled:opacity-60 ${
                  plan.highlight
                    ? 'bg-brand-500 text-white hover:bg-brand-600'
                    : 'bg-ink-900 text-white hover:bg-ink-800 dark:bg-white dark:text-ink-900'
                }`}
              >
                {selectedPlan === plan.id ? (
                  <><Check className="h-4 w-4" /> Оплата...</>
                ) : (
                  <><CreditCard className="h-4 w-4" /> Выбрать</>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
