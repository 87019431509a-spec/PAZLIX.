import { useEffect, useState, useCallback } from 'react';
import { Save, Clock, Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

const DAYS = [
  { key: 'mon', label: 'Понедельник' },
  { key: 'tue', label: 'Вторник' },
  { key: 'wed', label: 'Среда' },
  { key: 'thu', label: 'Четверг' },
  { key: 'fri', label: 'Пятница' },
  { key: 'sat', label: 'Суббота' },
  { key: 'sun', label: 'Воскресенье' },
];

const SLOT_OPTIONS = [30, 60, 90, 120];

export function RulesPage() {
  const { user } = useAuth();
  const [workingHours, setWorkingHours] = useState<Record<string, string>>({
    mon: '09:00-21:00', tue: '09:00-21:00', wed: '09:00-21:00', thu: '09:00-21:00',
    fri: '09:00-21:00', sat: '10:00-18:00', sun: 'closed',
  });
  const [slotDuration, setSlotDuration] = useState(60);
  const [bufferTime, setBufferTime] = useState(0);
  const [autoConfirm, setAutoConfirm] = useState(false);
  const [cancelPolicy, setCancelPolicy] = useState('');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase.from('business_settings').select('*').maybeSingle();
    if (data) {
      setWorkingHours(data.working_hours || workingHours);
      setSlotDuration(data.slot_duration || 60);
      setBufferTime(data.buffer_time || 0);
      setAutoConfirm(data.auto_confirm || false);
      setCancelPolicy(data.cancel_policy || '');
    }
    setLoading(false);
  }, [user, workingHours]);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  const handleSave = async () => {
    if (!user) return;
    const { data: existing } = await supabase.from('business_settings').select('id').maybeSingle();
    const payload = { working_hours: workingHours, slot_duration: slotDuration, buffer_time: bufferTime, auto_confirm: autoConfirm, cancel_policy: cancelPolicy || null };
    if (existing) {
      await supabase.from('business_settings').update(payload).eq('id', existing.id);
    } else {
      await supabase.from('business_settings').insert({ business_name: '', ...payload });
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (loading) {
    return <div className="flex h-64 items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-ink-200 border-t-brand-500" /></div>;
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-ink-900 dark:text-white">Правила записи</h2>
        <button onClick={handleSave} className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${saved ? 'bg-brand-100 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400' : 'bg-brand-500 text-white hover:bg-brand-600'}`}>
          {saved ? <><Check className="h-4 w-4" />Сохранено</> : <><Save className="h-4 w-4" />Сохранить</>}
        </button>
      </div>

      {/* Working hours */}
      <div className="rounded-2xl bg-white p-5 ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-ink-800">
        <div className="mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-brand-500" />
          <h3 className="text-sm font-bold text-ink-900 dark:text-white">Часы работы</h3>
        </div>
        <div className="space-y-3">
          {DAYS.map((day) => (
            <div key={day.key} className="flex items-center justify-between gap-3">
              <span className="flex-1 text-sm text-ink-700 dark:text-ink-300">{day.label}</span>
              <button
                onClick={() => setWorkingHours({ ...workingHours, [day.key]: workingHours[day.key] === 'closed' ? '09:00-21:00' : 'closed' })}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${workingHours[day.key] === 'closed' ? 'bg-ink-100 text-ink-400 dark:bg-ink-800' : 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400'}`}
              >
                {workingHours[day.key] === 'closed' ? 'Выходной' : 'Работает'}
              </button>
              {workingHours[day.key] !== 'closed' && (
                <input
                  type="text"
                  value={workingHours[day.key]}
                  onChange={(e) => setWorkingHours({ ...workingHours, [day.key]: e.target.value })}
                  className="w-28 rounded-lg bg-ink-50 px-3 py-1.5 text-sm outline-none ring-1 ring-ink-100 focus:ring-2 focus:ring-brand-400 dark:bg-ink-800 dark:text-white dark:ring-ink-700"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Slot settings */}
      <div className="rounded-2xl bg-white p-5 ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-ink-800">
        <h3 className="mb-4 text-sm font-bold text-ink-900 dark:text-white">Интервалы записи</h3>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-xs font-semibold text-ink-600 dark:text-ink-400">Длительность слота</label>
            <div className="flex gap-2">
              {SLOT_OPTIONS.map((s) => (
                <button key={s} onClick={() => setSlotDuration(s)}
                  className={`flex-1 rounded-xl py-3 text-sm font-medium transition ${slotDuration === s ? 'bg-brand-500 text-white' : 'bg-ink-50 text-ink-600 dark:bg-ink-800 dark:text-ink-400'}`}>
                  {s} мин
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold text-ink-600 dark:text-ink-400">Буфер между записями: {bufferTime} мин</label>
            <input type="range" min={0} max={60} step={5} value={bufferTime} onChange={(e) => setBufferTime(parseInt(e.target.value))}
              className="w-full accent-brand-500" />
          </div>
        </div>
      </div>

      {/* Auto-confirm */}
      <div className="rounded-2xl bg-white p-5 ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-ink-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-ink-900 dark:text-white">Автоматическое подтверждение</h3>
            <p className="mt-1 text-xs text-ink-500 dark:text-ink-400">Записи подтверждаются без вашего участия</p>
          </div>
          <button
            onClick={() => setAutoConfirm(!autoConfirm)}
            className={`relative h-7 w-12 rounded-full transition ${autoConfirm ? 'bg-brand-500' : 'bg-ink-200 dark:bg-ink-700'}`}
          >
            <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${autoConfirm ? 'left-6' : 'left-1'}`} />
          </button>
        </div>
      </div>

      {/* Cancel policy */}
      <div className="rounded-2xl bg-white p-5 ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-ink-800">
        <h3 className="mb-3 text-sm font-bold text-ink-900 dark:text-white">Политика отмены</h3>
        <textarea
          value={cancelPolicy}
          onChange={(e) => setCancelPolicy(e.target.value)}
          placeholder="Например: Отмена не позднее чем за 2 часа до записи..."
          rows={3}
          className="w-full resize-none rounded-xl bg-ink-50 px-4 py-3 text-sm outline-none ring-1 ring-ink-100 focus:ring-2 focus:ring-brand-400 dark:bg-ink-800 dark:text-white dark:ring-ink-700"
        />
      </div>
    </div>
  );
}
