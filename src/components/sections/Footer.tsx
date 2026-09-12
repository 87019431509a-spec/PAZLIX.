import { Puzzle, ArrowUpRight } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

interface FooterProps {
  onAuthClick?: () => void;
}

export function Footer({ onAuthClick }: FooterProps) {
  const { ref, inView } = useReveal();

  return (
    <footer className="bg-ink-50/50 pt-16 pb-8 dark:bg-ink-900/50" ref={ref}>
      <div className="section-padding mx-auto max-w-7xl">
        <div className={`mb-12 overflow-hidden rounded-3xl bg-ink-950 p-10 text-center lg:p-16 ${inView ? 'in-view' : ''} reveal`}>
          <h2 className="text-balance text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Создайте красивую страницу
            <br />
            своего бизнеса сегодня
          </h2>
          <p className="mx-auto mt-4 max-w-md text-ink-400">
            Без программирования. Готово за 15 минут. Заявки и записи — сразу.
          </p>
          <button onClick={onAuthClick} className="btn-brand mt-8 group">
            Создать свой сайт
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 text-lg font-bold text-ink-900 dark:text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-900 text-white dark:bg-white dark:text-ink-900">
                <Puzzle className="h-4 w-4" />
              </span>
              <span className="font-display">PAZLIX</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-ink-500 dark:text-ink-400">
              Универсальный конструктор клиентских страниц и Web App для любого бизнеса.
            </p>
          </div>

          {[
            { title: 'Продукт', links: [
              { label: 'Возможности', id: 'features' },
              { label: 'Дизайны', id: 'designs' },
              { label: 'Тарифы', id: 'pricing' },
              { label: 'Демо', id: 'demo' },
            ]},
            { title: 'Сферы', links: [
              { label: 'Медицина', id: 'features' },
              { label: 'Автосервис', id: 'features' },
              { label: 'Услуги', id: 'features' },
              { label: 'Все сферы', id: 'features' },
            ]},
          ].map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-sm font-bold text-ink-900 dark:text-white">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })}
                      className="text-sm text-ink-500 transition-colors hover:text-ink-900 dark:text-ink-400 dark:hover:text-white"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-ink-200 pt-6 sm:flex-row dark:border-ink-800">
          <p className="text-xs text-ink-400 dark:text-ink-500">© 2026 PAZLIX. Все права защищены.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-ink-400 hover:text-ink-700 dark:hover:text-white">Политика конфиденциальности</a>
            <a href="#" className="text-xs text-ink-400 hover:text-ink-700 dark:hover:text-white">Условия использования</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
