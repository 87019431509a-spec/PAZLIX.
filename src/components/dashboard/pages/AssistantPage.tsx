import { useState } from 'react';
import { Sparkles, Loader2, Check, Wand2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

export function AssistantPage() {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [currentDesc, setCurrentDesc] = useState('');

  const suggestions = [
    'Сделай описание более привлекательным для клиентов',
    'Напиши описание для салона красоты в Москве',
    'Добавь призыв к действию в конце описания',
    'Сократи описание до 2 предложений',
    'Сделай тон более дружелюбным и тёплым',
  ];

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setResult('');
    setSaved(false);

    const { data: settings } = await supabase.from('business_settings').select('*').maybeSingle();
    const context = settings?.description || currentDesc || '';
    const bizName = settings?.business_name || '';

    const fullPrompt = `Ты — ИИ-помощник для бизнеса. Задача: улучшить текст для клиентской страницы.
Бизнес: ${bizName}
Текущее описание: "${context}"
Запрос пользователя: ${prompt}
Напиши только готовый текст описания на русском языке, без пояснений.`;

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-assistant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ prompt: fullPrompt }),
      });

      if (!response.ok) throw new Error('Request failed');
      const data = await response.json();
      setResult(data.text || data.result || data.description || 'Не удалось получить результат. Попробуйте другой запрос.');
      if (context) setCurrentDesc(context);
    } catch {
      setResult('ИИ-помощник временно недоступен. Вы можете отредактировать описание вручную в Настройках проекта.');
    }
    setLoading(false);
  };

  const handleApply = async () => {
    if (!result || !user) return;
    const { data: existing } = await supabase.from('business_settings').select('id').maybeSingle();
    if (existing) {
      await supabase.from('business_settings').update({ description: result }).eq('id', existing.id);
    } else {
      await supabase.from('business_settings').insert({ business_name: '', description: result });
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="text-center">
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-lg shadow-brand-500/20">
          <Sparkles className="h-7 w-7" />
        </div>
        <h2 className="text-xl font-bold text-ink-900 dark:text-white">ИИ-помощник</h2>
        <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
          Опишите, что хотите изменить — помощник улучшит текст для вашей страницы
        </p>
      </div>

      {currentDesc && (
        <div className="rounded-2xl bg-ink-50 p-4 dark:bg-ink-800">
          <div className="mb-1 text-xs font-semibold text-ink-500 dark:text-ink-400">Текущее описание:</div>
          <p className="text-sm text-ink-700 dark:text-ink-300">{currentDesc}</p>
        </div>
      )}

      <div className="space-y-3">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Например: сделай описание более привлекательным для клиентов..."
          rows={3}
          className="w-full resize-none rounded-2xl bg-white px-4 py-3 text-sm outline-none ring-1 ring-ink-100 focus:ring-2 focus:ring-brand-400 dark:bg-ink-900 dark:text-white dark:ring-ink-800"
        />
        <div className="flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => setPrompt(s)}
              className="rounded-full bg-ink-50 px-3 py-1.5 text-xs font-medium text-ink-600 transition hover:bg-brand-50 hover:text-brand-600 dark:bg-ink-800 dark:text-ink-400 dark:hover:bg-brand-500/10 dark:hover:text-brand-400"
            >
              {s}
            </button>
          ))}
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading || !prompt}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
          {loading ? 'Генерация...' : 'Сгенерировать'}
        </button>
      </div>

      {result && (
        <div className="rounded-2xl bg-white p-5 ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-ink-800">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-xs font-semibold text-ink-500 dark:text-ink-400">Результат:</div>
            <button
              onClick={handleApply}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                saved ? 'bg-brand-100 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400' : 'bg-brand-500 text-white hover:bg-brand-600'
              }`}
            >
              {saved ? <><Check className="h-3.5 w-3.5" />Сохранено</> : 'Применить к проекту'}
            </button>
          </div>
          <p className="text-sm leading-relaxed text-ink-700 dark:text-ink-300">{result}</p>
        </div>
      )}
    </div>
  );
}
