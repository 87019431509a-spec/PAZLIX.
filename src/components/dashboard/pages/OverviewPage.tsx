import { useEffect, useState, useCallback } from 'react';
import { Calendar, Users, Inbox, TrendingUp, Clock, Check, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Booking } from '@/types/dashboard';

export function OverviewPage() {
  const [stats, setStats] = useState({ total: 0, pending: 0, confirmed: 0, clients: 0 });
  const [todayBookings, setTodayBookings] = useState<Booking[]>([]);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const today = new Date();
  const todayStr = `${today.getDate().toString().padStart(2, '0')}.${(today.getMonth() + 1).toString().padStart(2, '0')}.${today.getFullYear()}`;

  const fetchData = useCallback(async () => {
    const { data: bookings } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
    const { count: clientCount } = await supabase.from('clients').select('*', { count: 'exact', head: true });

    const all = bookings ?? [];
    setStats({
      total: all.length,
      pending: all.filter((b) => b.status === 'pending').length,
      confirmed: all.filter((b) => b.status === 'confirmed').length,
      clients: clientCount ?? 0,
    });
    setTodayBookings(all.filter((b) => b.booking_date === todayStr && b.status !== 'cancelled').slice(0, 6));
    setRecentBookings(all.slice(0, 8));
    setLoading(false);
  }, [todayStr]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const updateStatus = async (id: string, status: Booking['status']) => {
    await supabase.from('bookings').update({ status }).eq('id', id);
    fetchData();
  };

  const statusLabels: Record<string, string> = {
    pending: 'Ожидает',
    confirmed: 'Подтверждена',
    cancelled: 'Отменена',
    completed: 'Завершена',
  };

  const statusColors: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
    confirmed: 'bg-brand-100 text-brand-700 dark:bg-brand-500/10 dark:text-brand-400',
    cancelled: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
    completed: 'bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-400',
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-ink-200 border-t-brand-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Всего записей', value: stats.total, icon: Calendar, color: 'bg-brand-500' },
          { label: 'Ожидают подтверждения', value: stats.pending, icon: Inbox, color: 'bg-amber-500' },
          { label: 'Подтверждено', value: stats.confirmed, icon: TrendingUp, color: 'bg-teal-500' },
          { label: 'Клиентов в базе', value: stats.clients, icon: Users, color: 'bg-violet-500' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-white p-5 ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-ink-800">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-ink-900 dark:text-white">{stat.value}</div>
                <div className="mt-1 text-xs text-ink-500 dark:text-ink-400">{stat.label}</div>
              </div>
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.color} text-white`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Today's schedule */}
      <div className="rounded-2xl bg-white p-5 ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-ink-800 lg:p-6">
        <div className="mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-brand-500" />
          <h2 className="text-base font-bold text-ink-900 dark:text-white">Сегодня</h2>
        </div>
        {todayBookings.length === 0 ? (
          <p className="py-8 text-center text-sm text-ink-400 dark:text-ink-500">На сегодня записей нет</p>
        ) : (
          <div className="space-y-2">
            {todayBookings.map((b) => (
              <div key={b.id} className="flex items-center gap-3 rounded-xl bg-ink-50 p-3 dark:bg-ink-800">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-brand-500/10 text-sm font-bold text-brand-600 dark:text-brand-400">
                  {b.booking_time}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="truncate text-sm font-semibold text-ink-900 dark:text-white">{b.service_name}</div>
                  <div className="truncate text-xs text-ink-500 dark:text-ink-400">{b.client_name}{b.team_member_name ? ` · ${b.team_member_name}` : ''}</div>
                </div>
                <span className={`flex-none rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusColors[b.status]}`}>
                  {statusLabels[b.status]}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent bookings */}
      <div className="rounded-2xl bg-white p-5 ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-ink-800 lg:p-6">
        <h2 className="mb-4 text-base font-bold text-ink-900 dark:text-white">Последние записи</h2>
        {recentBookings.length === 0 ? (
          <p className="py-8 text-center text-sm text-ink-400 dark:text-ink-500">Записей пока нет</p>
        ) : (
          <div className="space-y-2">
            {recentBookings.map((b) => (
              <div key={b.id} className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-ink-50 dark:hover:bg-ink-800">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-ink-100 text-sm font-bold text-ink-600 dark:bg-ink-800 dark:text-ink-300">
                  {b.client_name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="truncate text-sm font-semibold text-ink-900 dark:text-white">{b.client_name}</div>
                  <div className="truncate text-xs text-ink-500 dark:text-ink-400">{b.service_name} · {b.booking_date} · {b.booking_time}</div>
                </div>
                <span className={`flex-none rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusColors[b.status]}`}>
                  {statusLabels[b.status]}
                </span>
                {b.status === 'pending' && (
                  <div className="flex gap-1">
                    <button onClick={() => updateStatus(b.id, 'confirmed')} className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600 transition hover:bg-brand-500 hover:text-white dark:text-brand-400">
                      <Check className="h-4 w-4" />
                    </button>
                    <button onClick={() => updateStatus(b.id, 'cancelled')} className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500/10 text-red-600 transition hover:bg-red-500 hover:text-white dark:text-red-400">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
