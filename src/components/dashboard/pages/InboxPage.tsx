import { useEffect, useState, useCallback } from 'react';
import { Check, X, Clock, Phone, Calendar } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Booking } from '@/types/dashboard';

export function InboxPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('pending');
  const [loading, setLoading] = useState(true);

  const fetchBookings = useCallback(async () => {
    const { data } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
    setBookings(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  const updateStatus = async (id: string, status: Booking['status']) => {
    await supabase.from('bookings').update({ status }).eq('id', id);
    fetchBookings();
  };

  const filtered = filter === 'all' ? bookings : bookings.filter((b) => b.status === filter);

  const statusLabels: Record<string, string> = {
    pending: 'Ожидает', confirmed: 'Подтверждена', cancelled: 'Отменена', completed: 'Завершена',
  };
  const statusColors: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
    confirmed: 'bg-brand-100 text-brand-700 dark:bg-brand-500/10 dark:text-brand-400',
    cancelled: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
    completed: 'bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-400',
  };

  const filters = [
    { id: 'pending' as const, label: 'Ожидают' },
    { id: 'confirmed' as const, label: 'Подтверждены' },
    { id: 'cancelled' as const, label: 'Отменены' },
    { id: 'all' as const, label: 'Все' },
  ];

  if (loading) {
    return <div className="flex h-64 items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-ink-200 border-t-brand-500" /></div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`flex-none rounded-full px-4 py-2 text-sm font-medium transition ${
              filter === f.id ? 'bg-ink-900 text-white dark:bg-white dark:text-ink-900' : 'bg-white text-ink-600 ring-1 ring-ink-100 dark:bg-ink-900 dark:text-ink-400 dark:ring-ink-800'
            }`}
          >
            {f.label}
            {f.id === 'pending' && bookings.filter((b) => b.status === 'pending').length > 0 && (
              <span className="ml-1.5 text-xs">({bookings.filter((b) => b.status === 'pending').length})</span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl bg-white p-12 text-center ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-ink-800">
          <p className="text-sm text-ink-400 dark:text-ink-500">Нет записей в этой категории</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((b) => (
            <div key={b.id} className="rounded-2xl bg-white p-5 ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-ink-800">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-brand-500/10 text-base font-bold text-brand-600 dark:text-brand-400">
                    {b.client_name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-ink-900 dark:text-white">{b.client_name}</div>
                    <div className="mt-1 text-sm text-ink-600 dark:text-ink-300">{b.service_name}</div>
                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-ink-500 dark:text-ink-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />{b.booking_date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />{b.booking_time}
                      </span>
                      {b.client_phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="h-3.5 w-3.5" />{b.client_phone}
                        </span>
                      )}
                      {b.team_member_name && <span>Мастер: {b.team_member_name}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`rounded-full px-3 py-1 text-[10px] font-semibold ${statusColors[b.status]}`}>
                    {statusLabels[b.status]}
                  </span>
                  {b.status === 'pending' && (
                    <div className="flex gap-2">
                      <button onClick={() => updateStatus(b.id, 'confirmed')} className="flex items-center gap-1.5 rounded-lg bg-brand-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-brand-600">
                        <Check className="h-4 w-4" />Подтвердить
                      </button>
                      <button onClick={() => updateStatus(b.id, 'cancelled')} className="flex items-center gap-1.5 rounded-lg bg-ink-100 px-3 py-2 text-xs font-semibold text-ink-600 transition hover:bg-ink-200 dark:bg-ink-800 dark:text-ink-400">
                        <X className="h-4 w-4" />Отклонить
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
