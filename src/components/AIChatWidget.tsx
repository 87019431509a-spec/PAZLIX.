import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Puzzle } from 'lucide-react';

interface ChatMessage {
  role: 'bot' | 'user';
  text: string;
}

const quickReplies = [
  'Что такое PAZLIX?',
  'Сколько стоит?',
  'Как создать сайт?',
  'Какие сферы поддерживаются?',
];

const botResponses: Record<string, string> = {
  'Что такое PAZLIX?': 'PAZLIX — это платформа для создания сайтов-визиток и управления бизнесом. Вы получаете красивую клиентскую страницу и рабочий кабинет: календарь, записи, клиенты, команда — всё в одном месте.',
  'Сколько стоит?': 'У нас три тарифа: Соло (890 ₽/мес) для одного мастера, Команда (1 800 ₽/мес) до 3 сотрудников и Про (3 200 ₽/мес) до 7 сотрудников. Новым пользователям доступен бесплатный пробный период 14 дней.',
  'Как создать сайт?': 'Очень просто! Зарегистрируйтесь, нажмите «Создать сайт» — и пошаговый мастер поможет выбрать дизайн, добавить услуги, мастеров и контакты. Всё готово за пару минут, без программирования.',
  'Какие сферы поддерживаются?': 'PAZLIX подходит для бьюти-сферы (салоны, массаж, маникюр, брови, ресницы), медицины, фитнеса, автосервиса и других сфер. Каждый дизайн адаптирован под конкретную нишу.',
};

function generateReply(userText: string): string {
  const lower = userText.toLowerCase();
  if (lower.includes('цен') || lower.includes('стои') || lower.includes('тариф')) return botResponses['Сколько стоит?'];
  if (lower.includes('что') && lower.includes('пазликс')) return botResponses['Что такое PAZLIX?'];
  if (lower.includes('созд') || lower.includes('сайт') || lower.includes('начат')) return botResponses['Как создать сайт?'];
  if (lower.includes('сфер') || lower.includes('ниш') || lower.includes('отрасл')) return botResponses['Какие сферы поддерживаются?'];
  if (lower.includes('привет') || lower.includes('здрав')) return 'Здравствуйте! Я ИИ-консультант PAZLIX. Чем могу помочь? Выберите вопрос ниже или напишите свой.';
  return 'Отличный вопрос! Вы можете зарегистрироваться и попробовать PAZLIX бесплатно в течение 14 дней. Если не нашли ответ — напишите нам на почту или создайте аккаунт, и всё станет понятно на практике.';
}

export function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'bot', text: 'Здравствуйте! Я ИИ-консультант PAZLIX. Помогу разобраться с платформой, расскажу про тарифы и функции. Чем могу помочь?' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { role: 'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'bot', text: generateReply(text) }]);
      setTyping(false);
    }, 900);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 flex h-14 items-center gap-2.5 rounded-full bg-ink-900 px-5 text-sm font-semibold text-white shadow-2xl shadow-ink-900/30 transition-all hover:scale-105 active:scale-95 dark:bg-white dark:text-ink-900"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-500 text-white">
          <Sparkles className="h-4 w-4" />
        </span>
        <span className="hidden sm:inline">Спросить ИИ</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex h-[480px] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-ink-800">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-ink-100 bg-ink-900 px-4 py-3 dark:border-ink-800 dark:bg-ink-950">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-white">
            <Puzzle className="h-4 w-4" />
          </span>
          <div>
            <div className="text-sm font-bold text-white">PAZLIX ИИ</div>
            <div className="flex items-center gap-1 text-[10px] text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" /> Онлайн
            </div>
          </div>
        </div>
        <button onClick={() => setOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-ink-900 text-white dark:bg-white dark:text-ink-900'
                : 'bg-ink-50 text-ink-700 dark:bg-ink-800 dark:text-ink-200'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="flex gap-1 rounded-2xl bg-ink-50 px-4 py-3 dark:bg-ink-800">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-2 w-2 animate-bounce rounded-full bg-ink-400" style={{ animationDelay: `${i * 150}ms` }} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick replies */}
      {messages.length <= 2 && (
        <div className="flex flex-wrap gap-1.5 px-4 pb-2">
          {quickReplies.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              className="rounded-full bg-ink-50 px-3 py-1.5 text-xs font-medium text-ink-600 transition hover:bg-brand-50 hover:text-brand-600 dark:bg-ink-800 dark:text-ink-400 dark:hover:bg-brand-500/10"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex items-center gap-2 border-t border-ink-100 p-3 dark:border-ink-800">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send(input)}
          placeholder="Напишите вопрос..."
          className="flex-1 rounded-full bg-ink-50 px-4 py-2.5 text-sm outline-none ring-1 ring-ink-100 focus:ring-2 focus:ring-brand-400 dark:bg-ink-800 dark:text-white dark:ring-ink-700"
        />
        <button
          onClick={() => send(input)}
          className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-brand-500 text-white transition hover:bg-brand-600 active:scale-90"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
