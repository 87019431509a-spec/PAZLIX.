import { useEffect, useState, useCallback } from 'react';
import { Save, Check, Upload, Globe } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';

export function SettingsPage() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [settings, setSettings] = useState({
    business_name: '',
    description: '',
    logo_url: '',
    sphere: '',
    address: '',
    phone: '',
    hours: '',
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase.from('business_settings').select('*').maybeSingle();
    if (data) {
      setSettings({
        business_name: data.business_name || '',
        description: data.description || '',
        logo_url: data.logo_url || '',
        sphere: data.sphere || '',
        address: data.address || '',
        phone: data.phone || '',
        hours: data.hours || '',
      });
    }
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  const handleSave = async () => {
    if (!user) return;
    const { data: existing } = await supabase.from('business_settings').select('id').maybeSingle();
    const payload = {
      business_name: settings.business_name,
      description: settings.description || null,
      logo_url: settings.logo_url || null,
      sphere: settings.sphere || null,
      address: settings.address || null,
      phone: settings.phone || null,
      hours: settings.hours || null,
      theme: theme,
    };
    if (existing) {
      await supabase.from('business_settings').update(payload).eq('id', existing.id);
    } else {
      await supabase.from('business_settings').insert(payload);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (loading) {
    return <div className="flex h-64 items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-ink-200 border-t-brand-500" /></div>;
  }

  const spheres = ['Салон красоты', 'Массаж и спа', 'Маникюр', 'Брови и ресницы', 'Стоматология', 'Фитнес', 'Автосервис', 'Другое'];

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-ink-900 dark:text-white">Настройки проекта</h2>
        <button onClick={handleSave} className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${saved ? 'bg-brand-100 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400' : 'bg-brand-500 text-white hover:bg-brand-600'}`}>
          {saved ? <><Check className="h-4 w-4" />Сохранено</> : <><Save className="h-4 w-4" />Сохранить</>}
        </button>
      </div>

      {/* Logo */}
      <div className="rounded-2xl bg-white p-5 ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-ink-800">
        <h3 className="mb-4 text-sm font-bold text-ink-900 dark:text-white">Логотип</h3>
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 flex-none items-center justify-center overflow-hidden rounded-2xl bg-ink-50 ring-1 ring-ink-100 dark:bg-ink-800 dark:ring-ink-700">
            {settings.logo_url ? (
              <img src={settings.logo_url} alt="Логотип" className="h-full w-full object-cover" />
            ) : (
              <Upload className="h-8 w-8 text-ink-300 dark:text-ink-600" />
            )}
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder="URL логотипа"
              value={settings.logo_url}
              onChange={(e) => setSettings({ ...settings, logo_url: e.target.value })}
              className="w-full rounded-xl bg-ink-50 px-4 py-3 text-sm outline-none ring-1 ring-ink-100 focus:ring-2 focus:ring-brand-400 dark:bg-ink-800 dark:text-white dark:ring-ink-700"
            />
            <p className="mt-1.5 text-xs text-ink-400 dark:text-ink-500">Вставьте ссылку на изображение</p>
          </div>
        </div>
      </div>

      {/* Business info */}
      <div className="rounded-2xl bg-white p-5 ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-ink-800">
        <h3 className="mb-4 text-sm font-bold text-ink-900 dark:text-white">Информация о бизнесе</h3>
        <div className="space-y-3">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-ink-600 dark:text-ink-400">Название</label>
            <input type="text" value={settings.business_name} onChange={(e) => setSettings({ ...settings, business_name: e.target.value })}
              className="w-full rounded-xl bg-ink-50 px-4 py-3 text-sm outline-none ring-1 ring-ink-100 focus:ring-2 focus:ring-brand-400 dark:bg-ink-800 dark:text-white dark:ring-ink-700" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-ink-600 dark:text-ink-400">Сфера</label>
            <div className="flex flex-wrap gap-2">
              {spheres.map((s) => (
                <button key={s} onClick={() => setSettings({ ...settings, sphere: s })}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${settings.sphere === s ? 'bg-brand-500 text-white' : 'bg-ink-50 text-ink-600 dark:bg-ink-800 dark:text-ink-400'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-ink-600 dark:text-ink-400">Описание</label>
            <textarea value={settings.description} onChange={(e) => setSettings({ ...settings, description: e.target.value })}
              rows={3} placeholder="Расскажите о вашем бизнесе..."
              className="w-full resize-none rounded-xl bg-ink-50 px-4 py-3 text-sm outline-none ring-1 ring-ink-100 focus:ring-2 focus:ring-brand-400 dark:bg-ink-800 dark:text-white dark:ring-ink-700" />
          </div>
        </div>
      </div>

      {/* Contact info */}
      <div className="rounded-2xl bg-white p-5 ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-ink-800">
        <h3 className="mb-4 text-sm font-bold text-ink-900 dark:text-white">Контакты</h3>
        <div className="space-y-3">
          <input type="text" placeholder="Адрес" value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            className="w-full rounded-xl bg-ink-50 px-4 py-3 text-sm outline-none ring-1 ring-ink-100 focus:ring-2 focus:ring-brand-400 dark:bg-ink-800 dark:text-white dark:ring-ink-700" />
          <input type="tel" placeholder="Телефон" value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
            className="w-full rounded-xl bg-ink-50 px-4 py-3 text-sm outline-none ring-1 ring-ink-100 focus:ring-2 focus:ring-brand-400 dark:bg-ink-800 dark:text-white dark:ring-ink-700" />
          <input type="text" placeholder="График работы" value={settings.hours} onChange={(e) => setSettings({ ...settings, hours: e.target.value })}
            className="w-full rounded-xl bg-ink-50 px-4 py-3 text-sm outline-none ring-1 ring-ink-100 focus:ring-2 focus:ring-brand-400 dark:bg-ink-800 dark:text-white dark:ring-ink-700" />
        </div>
      </div>

      {/* Theme */}
      <div className="rounded-2xl bg-white p-5 ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-ink-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-ink-900 dark:text-white">Тема оформления</h3>
            <p className="mt-1 text-xs text-ink-500 dark:text-ink-400">Переключить между светлой и тёмной</p>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative h-7 w-12 rounded-full transition ${theme === 'dark' ? 'bg-brand-500' : 'bg-ink-200 dark:bg-ink-700'}`}
          >
            <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${theme === 'dark' ? 'left-6' : 'left-1'}`} />
          </button>
        </div>
      </div>

      {/* Public link */}
      <div className="rounded-2xl bg-ink-900 p-5 text-white">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-brand-400" />
          <h3 className="text-sm font-bold">Ваша публичная страница</h3>
        </div>
        <p className="mt-2 text-xs text-ink-400">После публикации клиенты смогут записываться по этой ссылке</p>
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-ink-800 px-4 py-3">
          <span className="flex-1 truncate text-sm text-ink-300">pazlix.ru/{user?.email?.split('@')[0] || 'business'}</span>
          <button className="rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-600">
            Копировать
          </button>
        </div>
      </div>
    </div>
  );
}
