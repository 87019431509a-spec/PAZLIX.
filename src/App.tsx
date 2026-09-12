import { useState, useLayoutEffect, useEffect, useCallback } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Spheres } from '@/components/sections/Spheres';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Designs } from '@/components/sections/Designs';
import { BeautyDesigns } from '@/components/sections/BeautyDesigns';
import { Features } from '@/components/sections/Features';
import { MobileShowcase } from '@/components/sections/MobileShowcase';
import { Pricing } from '@/components/sections/Pricing';
import { Footer } from '@/components/sections/Footer';
import { BusinessPage } from '@/components/BusinessPage';
import { AuthPage } from '@/components/AuthPage';
import { AIChatWidget } from '@/components/AIChatWidget';
import { SetupWizard } from '@/components/SetupWizard';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { OverviewPage } from '@/components/dashboard/pages/OverviewPage';
import { CalendarPage } from '@/components/dashboard/pages/CalendarPage';
import { InboxPage } from '@/components/dashboard/pages/InboxPage';
import { ClientsPage } from '@/components/dashboard/pages/ClientsPage';
import { HistoryPage } from '@/components/dashboard/pages/HistoryPage';
import { AssistantPage } from '@/components/dashboard/pages/AssistantPage';
import { TeamPage } from '@/components/dashboard/pages/TeamPage';
import { RulesPage } from '@/components/dashboard/pages/RulesPage';
import { SettingsPage } from '@/components/dashboard/pages/SettingsPage';
import { SubscriptionPage } from '@/components/dashboard/pages/SubscriptionPage';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import type { DashboardPage } from '@/types/dashboard';

type Page = 'landing' | 'demo' | 'dashboard';
type AuthMode = 'signin' | 'signup' | 'reset';

function App() {
  const [page, setPage] = useState<Page>('landing');
  const [authMode, setAuthMode] = useState<AuthMode | null>(null);
  const [dashboardPage, setDashboardPage] = useState<DashboardPage>('overview');
  const [showWizard, setShowWizard] = useState(false);
  const [hasBusiness, setHasBusiness] = useState<boolean | null>(null);
  const { user, loading } = useAuth();

  useLayoutEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    return () => { window.history.scrollRestoration = previousRestoration; };
  }, [page, authMode, dashboardPage, showWizard]);

  const checkBusiness = useCallback(async () => {
    if (!user) { setHasBusiness(null); return; }
    const { data } = await supabase.from('business_settings').select('business_name').maybeSingle();
    setHasBusiness(!!data?.business_name);
  }, [user]);

  useEffect(() => {
    if (user && page === 'dashboard' && hasBusiness === null) {
      checkBusiness();
    }
  }, [user, page, hasBusiness, checkBusiness]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-ink-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-ink-200 border-t-brand-500" />
      </div>
    );
  }

  if (authMode && !user) {
    return (
      <AuthPage
        mode={authMode}
        onNavigate={setAuthMode}
        onSuccess={() => { setAuthMode(null); setPage('dashboard'); }}
      />
    );
  }

  // Show wizard for logged-in users who haven't set up their business yet
  if (user && page === 'dashboard' && hasBusiness === false && !showWizard) {
    setShowWizard(true);
  }

  if (showWizard && user) {
    return (
      <SetupWizard
        onComplete={() => { setShowWizard(false); setHasBusiness(true); setDashboardPage('overview'); }}
        onCancel={() => { setShowWizard(false); setPage('landing'); }}
      />
    );
  }

  if (user && page !== 'demo') {
    const renderDashboardPage = () => {
      switch (dashboardPage) {
        case 'overview': return <OverviewPage />;
        case 'calendar': return <CalendarPage />;
        case 'inbox': return <InboxPage />;
        case 'clients': return <ClientsPage />;
        case 'history': return <HistoryPage />;
        case 'assistant': return <AssistantPage />;
        case 'team': return <TeamPage />;
        case 'rules': return <RulesPage />;
        case 'settings': return <SettingsPage />;
        case 'subscription': return <SubscriptionPage />;
        default: return <OverviewPage />;
      }
    };

    return (
      <>
        <DashboardLayout
          currentPage={dashboardPage}
          onNavigate={setDashboardPage}
          onExit={() => setPage('landing')}
        >
          {renderDashboardPage()}
        </DashboardLayout>
        <AIChatWidget />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-ink-950">
      {page === 'landing' && <Navbar onNavigate={setPage} currentPage={page} onAuthClick={() => setAuthMode('signup')} onDashboardClick={() => setPage('dashboard')} />}

      {page === 'landing' ? (
        <main>
          <Hero onAuthClick={() => setAuthMode('signup')} />
          <Spheres />
          <Features />
          <Designs onAuthClick={() => setAuthMode('signup')} />
          <BeautyDesigns />
          <HowItWorks />
          <MobileShowcase onAuthClick={() => setAuthMode('signup')} />

          {/* Demo CTA section */}
          <section id="demo" className="section-padding py-16 lg:py-24 dark:bg-ink-900/30">
            <div className="mx-auto max-w-7xl">
              <div className="mb-10 text-center">
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  Живой пример
                </p>
                <h2 className="text-balance text-3xl font-bold text-ink-950 dark:text-white sm:text-4xl lg:text-5xl">
                  Как выглядит страница бизнеса
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-ink-500 dark:text-ink-400">
                  Так увидят вашу страницу клиенты — красивый сайт конкретного бизнеса, а не шаблон.
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => setPage('demo')}
                  className="btn-brand group"
                >
                  Открыть демо-страницу
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>

              {/* Preview cards */}
              <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { name: 'Стоматология Aurora', sphere: 'Медицина', image: 'https://images.pexels.com/photos/305567/pexels-photo-305567.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
                  { name: 'AutoFix Сервис', sphere: 'Автосервис', image: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
                  { name: 'FitPro Studio', sphere: 'Фитнес', image: 'https://images.pexels.com/photos/39219674/pexels-photo-39219674.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
                ].map((biz) => (
                  <button
                    key={biz.name}
                    onClick={() => setPage('demo')}
                    className="group overflow-hidden rounded-3xl card-shadow ring-1 ring-ink-100 transition-all hover:-translate-y-1 hover:card-shadow-lg text-left dark:ring-ink-800"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img src={biz.image} alt={biz.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent" />
                      <div className="absolute bottom-0 p-5">
                        <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                          {biz.sphere}
                        </span>
                        <h3 className="text-lg font-bold text-white">{biz.name}</h3>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Auth CTA section */}
          <section className="section-padding py-16 lg:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-balance text-3xl font-bold text-ink-950 dark:text-white sm:text-4xl">
                {user ? 'Открыть рабочий кабинет' : 'Начните бесплатно'}
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-ink-500 dark:text-ink-400">
                {user
                  ? 'Управляйте своим бизнесом — клиенты, записи, команда и настройки.'
                  : 'Создайте аккаунт и соберите свою страницу бизнеса за минуту. Без программирования.'}
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <button
                  onClick={() => user ? setPage('dashboard') : setAuthMode('signup')}
                  className="btn-brand"
                >
                  {user ? 'Войти в кабинет' : 'Создать аккаунт'}
                </button>
                {!user && (
                  <button
                    onClick={() => setAuthMode('signin')}
                    className="rounded-xl bg-ink-100 px-6 py-3.5 text-sm font-semibold text-ink-700 transition hover:bg-ink-200 dark:bg-ink-800 dark:text-ink-300 dark:hover:bg-ink-700"
                  >
                    У меня уже есть аккаунт
                  </button>
                )}
              </div>
            </div>
          </section>

          <Pricing onAuthClick={() => setAuthMode('signup')} />
          <Footer onAuthClick={() => setAuthMode('signup')} />
        </main>
      ) : (
        <BusinessPage onBack={() => setPage('landing')} />
      )}

      <AIChatWidget />
    </div>
  );
}

export default App;
