import { useEffect, useState } from 'react';
import { Menu, X, Puzzle, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';

interface NavbarProps {
  onNavigate: (page: 'landing' | 'demo') => void;
  currentPage: 'landing' | 'demo';
  onAuthClick: () => void;
  onDashboardClick: () => void;
}

const links = [
  { label: 'Возможности', id: 'features' },
  { label: 'Дизайны', id: 'designs' },
  { label: 'Бьюти-дизайны', id: 'beauty-designs' },
  { label: 'Как это работает', id: 'how' },
  { label: 'Тарифы', id: 'pricing' },
  { label: 'Демо', id: 'demo' },
];

export function Navbar({ onNavigate, currentPage, onAuthClick, onDashboardClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setOpen(false);
    if (currentPage !== 'landing') {
      onNavigate('landing');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="section-padding mx-auto flex h-16 max-w-7xl items-center justify-between xl:h-20">
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-ink-900 dark:text-white"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink-900 text-white">
            <Puzzle className="h-5 w-5" />
          </span>
          <span className="font-display">PAZLIX</span>
        </button>

        <div className="hidden items-center gap-1 lg:flex lg:gap-2">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="rounded-full px-3 py-2 text-sm font-medium text-ink-600 transition-colors hover:bg-ink-50 hover:text-ink-900 lg:px-4 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-white"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-600 transition hover:bg-ink-50 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-white"
            aria-label="Переключить тему"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
          {user ? (
            <>
              <button
                onClick={() => onDashboardClick()}
                className="btn-primary hidden text-sm lg:inline-flex"
              >
                Кабинет
              </button>
              <button
                onClick={() => signOut()}
                className="hidden rounded-full bg-ink-100 px-4 py-2 text-sm font-medium text-ink-700 transition hover:bg-ink-200 dark:bg-ink-800 dark:text-ink-300 dark:hover:bg-ink-700 lg:block"
              >
                Выйти
              </button>
            </>
          ) : (
            <button
              onClick={() => onAuthClick()}
              className="btn-primary hidden text-sm lg:block"
            >
              Создать свой сайт
            </button>
          )}
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-ink-700 dark:text-ink-200 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Меню"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="glass border-t border-ink-100 px-5 py-4 lg:hidden dark:border-ink-800">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="rounded-lg px-4 py-3 text-left text-sm font-medium text-ink-700 hover:bg-ink-50 dark:text-ink-300 dark:hover:bg-ink-800"
              >
                {link.label}
              </button>
            ))}
            {user && (
              <button
                onClick={() => onDashboardClick()}
                className="btn-primary mt-2 w-full"
              >
                Открыть кабинет
              </button>
            )}
            {user && (
              <button
                onClick={() => signOut()}
                className="rounded-lg px-4 py-3 text-left text-sm font-medium text-ink-500 hover:bg-ink-50 dark:hover:bg-ink-800"
              >
                Выйти из аккаунта
              </button>
            )}
            {!user && (
              <button onClick={() => onAuthClick()} className="btn-primary mt-3 w-full">Создать свой сайт</button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
