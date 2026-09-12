import { useEffect, useState, useCallback } from 'react';
import { Check, X, Clock } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Booking } from '@/types/dashboard';

export function HistoryPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = useCallback(async () => {
    const { data } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
    setBookings(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  const statusLabels: Record<string, string> = {
    pending: 'Ожидает', confirmed: 'Подтверждена', cancelled: 'Отменена', completed: 'Завершена',
  };
  const statusColors: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
    confirmed: 'bg-brand-100 text-brand-700 dark:bg-brand-500/10 dark:text-brand-400',
    cancelled: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
    completed: 'bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-400',
  };

  if (loading) {
    return <div className="flex h-64 items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-ink-200 border-t-brand-500" /></div>;
  }

  const grouped: Record<string, Booking[]> = {};
  bookings.forEach((b) => {
    const key = b.booking_date;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(b);
  });
  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div className="space-y-6">
      <h2 className="text-base font-bold text-ink-900 dark:text-white">История записей</h2>

      {sortedDates.length === 0 ? (
        <div className="rounded-2xl bg-white p-12 text-center ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-ink-800">
          <p className="text-sm text-ink-400 dark:text-ink-500">История пуста</p>
        </div>
      ) : (
        sortedDates.map((date) => (
          <div key={date}>
            <div className="mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4 text-ink-400" />
              <h3 className="text-sm font-semibold text-ink-700 dark:text-ink-300">{date}</h3>
              <span className="text-xs text-ink-400">· {grouped[date].length} зап.</span>
            </div>
            <div className="space-y-2">
              {grouped[date].map((b) => (
                <div key={b.id} className="flex items-center gap-3 rounded-xl bg-white p-4 ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-ink-800">
                  <div className="flex h-10 w-14 flex-none items-center justify-center rounded-lg bg-brand-500/10 text-xs font-bold text-brand-600 dark:text-brand-400">
                    {b.booking_time}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="truncate text-sm font-semibold text-ink-900 dark:text-white">{b.client_name} — {b.service_name}</div>
                    <div className="truncate text-xs text-ink-500 dark:text-ink-400">{b.team_member_name || 'Без мастера'}</div>
                  </div>
                  <span className={`flex-none rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusColors[b.status]}`}>
                    {statusLabels[b.status]}
                  </span>
                  {b.status === 'confirmed' && (
                    <button onClick={async () => { await supabase.from('bookings').update({ status: 'completed' }).eq('id', b.id); fetchBookings(); }}
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600 transition hover:bg-brand-500 hover:text-white dark:text-brand-400">
                      <Check className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
