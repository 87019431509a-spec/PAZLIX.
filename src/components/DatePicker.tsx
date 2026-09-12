import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerProps {
  selectedDate: string | null;
  onSelect: (date: string) => void;
}

const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export function DatePicker({ selectedDate, onSelect }: DatePickerProps) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const days = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1);
    const lastDay = new Date(viewYear, viewMonth + 1, 0);
    const startWeekday = (firstDay.getDay() + 6) % 7;
    const totalDays = lastDay.getDate();

    const arr: (number | null)[] = [];
    for (let i = 0; i < startWeekday; i++) arr.push(null);
    for (let d = 1; d <= totalDays; d++) arr.push(d);
    while (arr.length % 7 !== 0) arr.push(null);
    return arr;
  }, [viewMonth, viewYear]);

  const isToday = (d: number) => {
    return today.getDate() === d && today.getMonth() === viewMonth && today.getFullYear() === viewYear;
  };

  const isPast = (d: number) => {
    const date = new Date(viewYear, viewMonth, d);
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < todayMidnight;
  };

  const formatDate = (d: number) => {
    const date = new Date(viewYear, viewMonth, d);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}.${month}.${date.getFullYear()}`;
  };

  const selectedDay = selectedDate
    ? parseInt(selectedDate.split('.')[0], 10)
    : null;
  const selectedMonth = selectedDate
    ? parseInt(selectedDate.split('.')[1], 10) - 1
    : null;
  const selectedYear = selectedDate
    ? parseInt(selectedDate.split('.')[2], 10)
    : null;

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-4 ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-ink-800">
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={prevMonth}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 transition hover:bg-ink-50 dark:text-ink-400 dark:hover:bg-ink-800"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-sm font-bold text-ink-900 dark:text-white">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          onClick={nextMonth}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 transition hover:bg-ink-50 dark:text-ink-400 dark:hover:bg-ink-800"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1">
        {WEEKDAYS.map((wd) => (
          <div key={wd} className="text-center text-[10px] font-semibold uppercase text-ink-400">
            {wd}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => {
          if (d === null) return <div key={i} />;
          const past = isPast(d);
          const isSelected = d === selectedDay && viewMonth === selectedMonth && viewYear === selectedYear;
          const isTodayDay = isToday(d);

          return (
            <button
              key={i}
              disabled={past}
              onClick={() => onSelect(formatDate(d))}
              className={`flex h-10 items-center justify-center rounded-xl text-sm font-medium transition ${
                isSelected
                  ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30'
                  : past
                    ? 'text-ink-300 cursor-not-allowed dark:text-ink-700'
                    : isTodayDay
                      ? 'bg-brand-50 text-brand-600 ring-1 ring-brand-200 hover:bg-brand-100 dark:bg-brand-500/10 dark:text-brand-400 dark:ring-brand-500/30'
                      : 'text-ink-700 hover:bg-ink-50 dark:text-ink-300 dark:hover:bg-ink-800'
              }`}
            >
              {d}
            </button>
          );
        })}
      </div>
    </div>
  );
}
