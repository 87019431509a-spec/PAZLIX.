import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Sparkles, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';

interface AuthPageProps {
  mode: 'signin' | 'signup' | 'reset';
  onNavigate: (mode: 'signin' | 'signup' | 'reset') => void;
  onSuccess: () => void;
}

export function AuthPage({ mode, onNavigate, onSuccess }: AuthPageProps) {
  const { signIn, signUp, resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (mode === 'signup') {
      const { error } = await signUp(email, password, fullName);
      if (error) setError(error);
      else setSuccess('Аккаунт создан! Вы вошли в систему.');
    } else if (mode === 'signin') {
      const { error } = await signIn(email, password);
      if (error) setError(error);
      else onSuccess();
    } else {
      const { error } = await resetPassword(email);
      if (error) setError(error);
      else setSuccess('Ссылка для восстановления отправлена на ваш email.');
    }
    setLoading(false);
  };

  const titles = {
    signin: 'Вход в аккаунт',
    signup: 'Создать аккаунт',
    reset: 'Восстановление пароля',
  };

  const buttonText = {
    signin: 'Войти',
    signup: 'Зарегистрироваться',
    reset: 'Отправить ссылку',
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-ink-50 px-4 dark:bg-ink-950">
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-brand-100/60 blur-3xl dark:bg-brand-500/10" />
      <div className="absolute top-20 -left-20 h-72 w-72 rounded-full bg-accent-100/40 blur-3xl dark:bg-accent-500/10" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-lg shadow-brand-500/30">
            <Sparkles className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold text-ink-950 dark:text-white">{titles[mode]}</h1>
          <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
            {mode === 'signin' && 'Войдите, чтобы управлять своим бизнесом'}
            {mode === 'signup' && 'Создайте аккаунт за минуту — без программирования'}
            {mode === 'reset' && 'Введите email, мы пришлём ссылку для сброса пароля'}
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 card-shadow-lg ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-ink-800 sm:p-8">
          {error && (
            <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-ink-600 dark:text-ink-400">Имя</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ваше имя"
                    className="w-full rounded-xl bg-ink-50 py-3 pl-10 pr-4 text-sm text-ink-900 outline-none ring-1 ring-ink-100 transition focus:ring-2 focus:ring-brand-400 dark:bg-ink-800 dark:text-white dark:ring-ink-700"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink-600 dark:text-ink-400">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl bg-ink-50 py-3 pl-10 pr-4 text-sm text-ink-900 outline-none ring-1 ring-ink-100 transition focus:ring-2 focus:ring-brand-400 dark:bg-ink-800 dark:text-white dark:ring-ink-700"
                />
              </div>
            </div>

            {mode !== 'reset' && (
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-ink-600 dark:text-ink-400">Пароль</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Минимум 6 символов"
                    minLength={6}
                    className="w-full rounded-xl bg-ink-50 py-3 pl-10 pr-4 text-sm text-ink-900 outline-none ring-1 ring-ink-100 transition focus:ring-2 focus:ring-brand-400 dark:bg-ink-800 dark:text-white dark:ring-ink-700"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-600 active:scale-95 disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  {buttonText[mode]}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 space-y-2 text-center text-sm">
            {mode === 'signin' && (
              <>
                <button
                  onClick={() => onNavigate('signup')}
                  className="text-ink-500 transition hover:text-brand-600 dark:text-ink-400 dark:hover:text-brand-400"
                >
                  Нет аккаунта? <span className="font-semibold text-brand-600 dark:text-brand-400">Создать</span>
                </button>
                <br />
                <button
                  onClick={() => onNavigate('reset')}
                  className="text-ink-400 transition hover:text-brand-600 dark:text-ink-500 dark:hover:text-brand-400"
                >
                  Забыли пароль?
                </button>
              </>
            )}
            {mode === 'signup' && (
              <button
                onClick={() => onNavigate('signin')}
                className="text-ink-500 transition hover:text-brand-600 dark:text-ink-400 dark:hover:text-brand-400"
              >
                Уже есть аккаунт? <span className="font-semibold text-brand-600 dark:text-brand-400">Войти</span>
              </button>
            )}
            {mode === 'reset' && (
              <button
                onClick={() => onNavigate('signin')}
                className="text-ink-500 transition hover:text-brand-600 dark:text-ink-400 dark:hover:text-brand-400"
              >
                <span className="font-semibold text-brand-600 dark:text-brand-400">Назад ко входу</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
