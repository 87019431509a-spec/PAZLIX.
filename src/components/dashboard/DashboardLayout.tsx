import { useState, useEffect, useCallback } from 'react';
import {
  LayoutDashboard, Calendar, Inbox, Users, History, Sparkles,
  UserCog, Settings, BookOpen, Menu, X, LogOut, Puzzle, CreditCard, Crown,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import type { DashboardPage } from '@/types/dashboard';
import { supabase } from '@/lib/supabase';

interface DashboardLayoutProps {
  currentPage: DashboardPage;
  onNavigate: (page: DashboardPage) => void;
  onExit: () => void;
  children: React.ReactNode;
}

const navItems: { id: DashboardPage; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Кабинет', icon: LayoutDashboard },
  { id: 'calendar', label: 'Календарь', icon: Calendar },
  { id: 'inbox', label: 'Входящие', icon: Inbox },
  { id: 'clients', label: 'Клиенты', icon: Users },
  { id: 'history', label: 'История', icon: History },
  { id: 'assistant', label: 'Помощник', icon: Sparkles },
  { id: 'team', label: 'Команда', icon: UserCog },
  { id: 'rules', label: 'Правила записи', icon: BookOpen },
  { id: 'settings', label: 'Настройки проекта', icon: Settings },
  { id: 'subscription', label: 'Подписка', icon: CreditCard },
];

export function DashboardLayout({ currentPage, onNavigate, onExit, children }: DashboardLayoutProps) {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inboxCount, setInboxCount] = useState(0);
  const [businessName, setBusinessName] = useState('');
  const [subInfo, setSubInfo] = useState<{ plan: string; daysLeft: number } | null>(null);

  const fetchInboxCount = useCallback(async () => {
    if (!user) return;
    const { count } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');
    setInboxCount(count ?? 0);
  }, [user]);

  const fetchBusinessName = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from('business_settings')
      .select('business_name')
      .maybeSingle();
    setBusinessName(data?.business_name || '');
  }, [user]);

  const fetchSub = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase.from('subscriptions').select('plan, expires_at, status').maybeSingle();
    if (data && data.status === 'active') {
      const daysLeft = Math.max(0, Math.ceil((new Date(data.expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
      setSubInfo({ plan: data.plan, daysLeft });
    } else {
      setSubInfo(null);
    }
  }, [user]);

  useEffect(() => {
    fetchInboxCount();
    fetchBusinessName();
    fetchSub();
  }, [fetchInboxCount, fetchBusinessName, fetchSub, currentPage]);

  const handleSignOut = async () => {
    await signOut();
    onExit();
  };

  const renderSidebarContent = (isMobile: boolean) => (
    <>
      {/* Logo */}
      <button
        onClick={() => { onExit(); isMobile && setSidebarOpen(false); }}
        className="flex h-16 items-center gap-2.5 border-b border-ink-100 px-5 transition hover:bg-ink-50 dark:border-ink-800 dark:hover:bg-ink-800"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-white shadow-lg shadow-brand-500/20">
          <Puzzle className="h-5 w-5" />
        </span>
        <div className="text-left">
          <div className="font-display text-base font-bold text-ink-900 dark:text-white">PAZLIX</div>
          <div className="text-[10px] text-ink-400 dark:text-ink-500">На сайт</div>
        </div>
      </button>

      {/* Nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => { onNavigate(item.id); isMobile && setSidebarOpen(false); }}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
              currentPage === item.id
                ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20'
                : 'text-ink-600 hover:bg-ink-50 dark:text-ink-300 dark:hover:bg-ink-800'
            }`}
          >
            <item.icon className="h-[18px] w-[18px] flex-none" />
            <span className="flex-1 text-left">{item.label}</span>
            {item.id === 'inbox' && inboxCount > 0 && (
              <span className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                currentPage === item.id ? 'bg-white text-brand-600' : 'bg-brand-500 text-white'
              }`}>
                {inboxCount}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Subscription status */}
      {subInfo && (
        <button
          onClick={() => { onNavigate('subscription'); isMobile && setSidebarOpen(false); }}
          className="mx-3 mb-3 flex items-center gap-3 rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 p-3 text-left transition hover:from-brand-100 hover:to-brand-200 dark:from-brand-500/10 dark:to-brand-500/5 dark:hover:from-brand-500/20"
        >
          <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-brand-500 text-white">
            <Crown className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-brand-700 dark:text-brand-400">
              {subInfo.plan === 'trial' ? 'Пробный период' : `Тариф ${subInfo.plan}`}
            </div>
            <div className="text-[10px] text-brand-600 dark:text-brand-500">
              {subInfo.daysLeft} дн. осталось
            </div>
          </div>
        </button>
      )}

      {/* Bottom controls */}
      <div className="border-t border-ink-100 p-3 dark:border-ink-800">
        <button
          onClick={toggleTheme}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-600 transition hover:bg-ink-50 dark:text-ink-300 dark:hover:bg-ink-800"
        >
          <span className="text-base">{theme === 'light' ? '🌙' : '☀️'}</span>
          <span>{theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}</span>
        </button>
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-600 transition hover:bg-ink-50 dark:text-ink-300 dark:hover:bg-ink-800"
        >
          <LogOut className="h-[18px] w-[18px]" />
          Выйти
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-ink-50 dark:bg-ink-950">
      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-64 flex-col border-r border-ink-100 bg-white dark:border-ink-800 dark:bg-ink-900 lg:flex">
        {renderSidebarContent(false)}
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-ink-950/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 flex h-full w-64 flex-col bg-white dark:bg-ink-900 animate-slide-down">
            {renderSidebarContent(true)}
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex flex-1 flex-col lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-ink-100 bg-white/90 px-4 backdrop-blur-xl dark:border-ink-800 dark:bg-ink-900/90 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-600 hover:bg-ink-50 dark:text-ink-300 dark:hover:bg-ink-800 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="font-display text-base font-bold text-ink-900 dark:text-white lg:text-lg">
              {businessName || 'Мой бизнес'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {subInfo && subInfo.daysLeft <= 3 && (
              <button
                onClick={() => onNavigate('subscription')}
                className="hidden rounded-full bg-accent-50 px-3 py-1.5 text-xs font-semibold text-accent-700 transition hover:bg-accent-100 dark:bg-accent-500/10 dark:text-accent-400 sm:block"
              >
                {subInfo.daysLeft} дн. до окончания
              </button>
            )}
            <div className="hidden text-sm text-ink-500 dark:text-ink-400 sm:block">
              {user?.email}
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500/10 text-sm font-bold text-brand-600 dark:text-brand-400">
              {user?.email?.charAt(0).toUpperCase() ?? '?'}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
