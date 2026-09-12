import { useEffect, useState, useCallback } from 'react';
import { Plus, Search, Phone, Mail, X, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Client } from '@/types/dashboard';

export function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', phone: '', email: '', notes: '' });
  const [loading, setLoading] = useState(true);

  const fetchClients = useCallback(async () => {
    const { data } = await supabase.from('clients').select('*').order('created_at', { ascending: false });
    setClients(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchClients(); }, [fetchClients]);

  const handleAdd = async () => {
    if (!newClient.name) return;
    await supabase.from('clients').insert({
      name: newClient.name,
      phone: newClient.phone || null,
      email: newClient.email || null,
      notes: newClient.notes || null,
    });
    setNewClient({ name: '', phone: '', email: '', notes: '' });
    setShowAdd(false);
    fetchClients();
  };

  const handleDelete = async (id: string) => {
    await supabase.from('clients').delete().eq('id', id);
    fetchClients();
  };

  const filtered = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.phone ?? '').includes(search) ||
    (c.email ?? '').toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="flex h-64 items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-ink-200 border-t-brand-500" /></div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <input
            type="text"
            placeholder="Поиск по имени, телефону, email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl bg-white py-3 pl-10 pr-4 text-sm outline-none ring-1 ring-ink-100 focus:ring-2 focus:ring-brand-400 dark:bg-ink-900 dark:text-white dark:ring-ink-800"
          />
        </div>
        <button onClick={() => setShowAdd(true)} className="flex flex-none items-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-600">
          <Plus className="h-4 w-4" />Добавить
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl bg-white p-12 text-center ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-ink-800">
          <p className="text-sm text-ink-400 dark:text-ink-500">{search ? 'Ничего не найдено' : 'Клиентов пока нет. Добавьте первого!'}</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <div key={c.id} className="group rounded-2xl bg-white p-5 ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-ink-800">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/10 text-base font-bold text-brand-600 dark:text-brand-400">
                    {c.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-ink-900 dark:text-white">{c.name}</div>
                  </div>
                </div>
                <button onClick={() => handleDelete(c.id)} className="text-ink-300 opacity-0 transition hover:text-red-500 group-hover:opacity-100 dark:text-ink-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-4 space-y-2">
                {c.phone && (
                  <div className="flex items-center gap-2 text-xs text-ink-500 dark:text-ink-400">
                    <Phone className="h-3.5 w-3.5" />{c.phone}
                  </div>
                )}
                {c.email && (
                  <div className="flex items-center gap-2 text-xs text-ink-500 dark:text-ink-400">
                    <Mail className="h-3.5 w-3.5" />{c.email}
                  </div>
                )}
                {c.notes && <p className="mt-2 text-xs text-ink-400 dark:text-ink-500">{c.notes}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink-950/40 backdrop-blur-sm sm:items-center" onClick={() => setShowAdd(false)}>
          <div className="w-full max-w-md rounded-t-3xl bg-white p-6 dark:bg-ink-900 sm:rounded-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-bold text-ink-900 dark:text-white">Новый клиент</h3>
              <button onClick={() => setShowAdd(false)} className="text-ink-400"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-3">
              <input type="text" placeholder="Имя" value={newClient.name} onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                className="w-full rounded-xl bg-ink-50 px-4 py-3 text-sm outline-none ring-1 ring-ink-100 focus:ring-2 focus:ring-brand-400 dark:bg-ink-800 dark:text-white dark:ring-ink-700" />
              <input type="tel" placeholder="Телефон" value={newClient.phone} onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                className="w-full rounded-xl bg-ink-50 px-4 py-3 text-sm outline-none ring-1 ring-ink-100 focus:ring-2 focus:ring-brand-400 dark:bg-ink-800 dark:text-white dark:ring-ink-700" />
              <input type="email" placeholder="Email" value={newClient.email} onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                className="w-full rounded-xl bg-ink-50 px-4 py-3 text-sm outline-none ring-1 ring-ink-100 focus:ring-2 focus:ring-brand-400 dark:bg-ink-800 dark:text-white dark:ring-ink-700" />
              <textarea placeholder="Заметки" rows={2} value={newClient.notes} onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })}
                className="w-full resize-none rounded-xl bg-ink-50 px-4 py-3 text-sm outline-none ring-1 ring-ink-100 focus:ring-2 focus:ring-brand-400 dark:bg-ink-800 dark:text-white dark:ring-ink-700" />
              <button onClick={handleAdd} className="w-full rounded-xl bg-brand-500 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-600">
                Добавить клиента
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
