import { useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Booking } from '@/types/dashboard';

const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const TIMES = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

export function CalendarPage() {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newBooking, setNewBooking] = useState({ client_name: '', service_name: '', booking_time: '09:00', team_member_name: '' });

  const formatDate = (d: number) => {
    const date = new Date(viewYear, viewMonth, d);
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
  };

  const fetchBookings = useCallback(async () => {
    const { data } = await supabase.from('bookings').select('*').order('booking_date').order('booking_time');
    setBookings(data ?? []);
  }, []);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  const firstDay = new Date(viewYear, viewMonth, 1);
  const lastDay = new Date(viewYear, viewMonth + 1, 0);
  const startWeekday = (firstDay.getDay() + 6) % 7;
  const totalDays = lastDay.getDate();
  const days: (number | null)[] = [];
  for (let i = 0; i < startWeekday; i++) days.push(null);
  for (let d = 1; d <= totalDays; d++) days.push(d);
  while (days.length % 7 !== 0) days.push(null);

  const bookingsByDate = (dateStr: string) => bookings.filter((b) => b.booking_date === dateStr && b.status !== 'cancelled');

  const prev = () => { if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); } else setViewMonth(viewMonth - 1); };
  const next = () => { if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); } else setViewMonth(viewMonth + 1); };

  const handleAdd = async () => {
    if (!selectedDate || !newBooking.client_name || !newBooking.service_name) return;
    await supabase.from('bookings').insert({
      client_name: newBooking.client_name,
      service_name: newBooking.service_name,
      booking_date: selectedDate,
      booking_time: newBooking.booking_time,
      team_member_name: newBooking.team_member_name || null,
      status: 'confirmed',
    });
    setNewBooking({ client_name: '', service_name: '', booking_time: '09:00', team_member_name: '' });
    setShowAdd(false);
    fetchBookings();
  };

  const dayBookings = selectedDate ? bookingsByDate(selectedDate) : [];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        {/* Calendar */}
        <div className="rounded-2xl bg-white p-5 ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-ink-800">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-bold text-ink-900 dark:text-white">{MONTHS[viewMonth]} {viewYear}</h2>
            <div className="flex gap-1">
              <button onClick={prev} className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50 dark:text-ink-400 dark:hover:bg-ink-800">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button onClick={next} className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50 dark:text-ink-400 dark:hover:bg-ink-800">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="mb-2 grid grid-cols-7 gap-1">
            {WEEKDAYS.map((wd) => (
              <div key={wd} className="text-center text-[10px] font-semibold uppercase text-ink-400">{wd}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((d, i) => {
              if (d === null) return <div key={i} />;
              const dateStr = formatDate(d);
              const dayBks = bookingsByDate(dateStr);
              const isSelected = dateStr === selectedDate;
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`relative flex h-16 flex-col items-center rounded-xl p-1 text-sm transition sm:h-20 ${
                    isSelected ? 'bg-brand-500 text-white shadow-lg' : dayBks.length > 0 ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-400' : 'text-ink-600 hover:bg-ink-50 dark:text-ink-400 dark:hover:bg-ink-800'
                  }`}
                >
                  <span className="mt-1 font-medium">{d}</span>
                  {dayBks.length > 0 && (
                    <div className="mt-1 flex gap-0.5">
                      {dayBks.slice(0, 3).map((b) => (
                        <div key={b.id} className={`h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-brand-500'}`} />
                      ))}
                      {dayBks.length > 3 && <span className={`text-[8px] ${isSelected ? 'text-white' : 'text-brand-500'}`}>+{dayBks.length - 3}</span>}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Day detail */}
        <div className="rounded-2xl bg-white p-5 ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-ink-800">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-bold text-ink-900 dark:text-white">
              {selectedDate || 'Выберите дату'}
            </h2>
            {selectedDate && (
              <button onClick={() => setShowAdd(true)} className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white transition hover:bg-brand-600">
                <Plus className="h-4 w-4" />
              </button>
            )}
          </div>

          {!selectedDate ? (
            <p className="py-8 text-center text-sm text-ink-400 dark:text-ink-500">Нажмите на день в календаре</p>
          ) : dayBookings.length === 0 ? (
            <p className="py-8 text-center text-sm text-ink-400 dark:text-ink-500">На этот день записей нет</p>
          ) : (
            <div className="space-y-2">
              {dayBookings.map((b) => (
                <div key={b.id} className="flex items-center gap-3 rounded-xl bg-ink-50 p-3 dark:bg-ink-800">
                  <div className="flex h-9 w-12 flex-none items-center justify-center rounded-lg bg-brand-500/10 text-xs font-bold text-brand-600 dark:text-brand-400">
                    {b.booking_time}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="truncate text-sm font-semibold text-ink-900 dark:text-white">{b.service_name}</div>
                    <div className="truncate text-xs text-ink-500 dark:text-ink-400">{b.client_name}{b.team_member_name ? ` · ${b.team_member_name}` : ''}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add booking modal */}
      {showAdd && selectedDate && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink-950/40 backdrop-blur-sm sm:items-center" onClick={() => setShowAdd(false)}>
          <div className="w-full max-w-md rounded-t-3xl bg-white p-6 dark:bg-ink-900 sm:rounded-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-bold text-ink-900 dark:text-white">Новая запись · {selectedDate}</h3>
              <button onClick={() => setShowAdd(false)} className="text-ink-400"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-3">
              <input type="text" placeholder="Имя клиента" value={newBooking.client_name} onChange={(e) => setNewBooking({ ...newBooking, client_name: e.target.value })}
                className="w-full rounded-xl bg-ink-50 px-4 py-3 text-sm outline-none ring-1 ring-ink-100 focus:ring-2 focus:ring-brand-400 dark:bg-ink-800 dark:ring-ink-700 dark:text-white" />
              <input type="text" placeholder="Услуга" value={newBooking.service_name} onChange={(e) => setNewBooking({ ...newBooking, service_name: e.target.value })}
                className="w-full rounded-xl bg-ink-50 px-4 py-3 text-sm outline-none ring-1 ring-ink-100 focus:ring-2 focus:ring-brand-400 dark:bg-ink-800 dark:ring-ink-700 dark:text-white" />
              <input type="text" placeholder="Мастер (необязательно)" value={newBooking.team_member_name} onChange={(e) => setNewBooking({ ...newBooking, team_member_name: e.target.value })}
                className="w-full rounded-xl bg-ink-50 px-4 py-3 text-sm outline-none ring-1 ring-ink-100 focus:ring-2 focus:ring-brand-400 dark:bg-ink-800 dark:ring-ink-700 dark:text-white" />
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-ink-600 dark:text-ink-400">Время</label>
                <div className="grid grid-cols-4 gap-2">
                  {TIMES.map((t) => (
                    <button key={t} onClick={() => setNewBooking({ ...newBooking, booking_time: t })}
                      className={`rounded-lg py-2 text-xs font-medium transition ${newBooking.booking_time === t ? 'bg-brand-500 text-white' : 'bg-ink-50 text-ink-600 dark:bg-ink-800 dark:text-ink-400'}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={handleAdd} className="w-full rounded-xl bg-brand-500 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-600">
                Добавить запись
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
