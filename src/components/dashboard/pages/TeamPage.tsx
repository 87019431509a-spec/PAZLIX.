import { useEffect, useState, useCallback } from 'react';
import { Plus, X, Trash2, Phone, UserCog } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { TeamMember } from '@/types/dashboard';

export function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', role: 'master' as 'master' | 'admin', phone: '', services: '' });
  const [loading, setLoading] = useState(true);

  const fetchMembers = useCallback(async () => {
    const { data } = await supabase.from('team_members').select('*').order('created_at', { ascending: false });
    setMembers(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchMembers(); }, [fetchMembers]);

  const handleAdd = async () => {
    if (!newMember.name) return;
    await supabase.from('team_members').insert({
      name: newMember.name,
      role: newMember.role,
      phone: newMember.phone || null,
      services: newMember.services ? newMember.services.split(',').map((s) => s.trim()) : [],
    });
    setNewMember({ name: '', role: 'master', phone: '', services: '' });
    setShowAdd(false);
    fetchMembers();
  };

  const handleDelete = async (id: string) => {
    await supabase.from('team_members').delete().eq('id', id);
    fetchMembers();
  };

  const toggleActive = async (m: TeamMember) => {
    await supabase.from('team_members').update({ is_active: !m.is_active }).eq('id', m.id);
    fetchMembers();
  };

  if (loading) {
    return <div className="flex h-64 items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-ink-200 border-t-brand-500" /></div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-ink-900 dark:text-white">Команда · {members.length}</h2>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-600">
          <Plus className="h-4 w-4" />Добавить
        </button>
      </div>

      {members.length === 0 ? (
        <div className="rounded-2xl bg-white p-12 text-center ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-ink-800">
          <UserCog className="mx-auto mb-3 h-10 w-10 text-ink-300 dark:text-ink-600" />
          <p className="text-sm text-ink-400 dark:text-ink-500">Добавьте мастеров и администраторов в команду</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((m) => (
            <div key={m.id} className="group rounded-2xl bg-white p-5 ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-ink-800">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full text-base font-bold ${m.role === 'admin' ? 'bg-ink-900 text-white' : 'bg-brand-500/10 text-brand-600 dark:text-brand-400'}`}>
                    {m.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-ink-900 dark:text-white">{m.name}</div>
                    <div className="text-xs text-ink-500 dark:text-ink-400">{m.role === 'admin' ? 'Администратор' : 'Мастер'}</div>
                  </div>
                </div>
                <button onClick={() => handleDelete(m.id)} className="text-ink-300 opacity-0 transition hover:text-red-500 group-hover:opacity-100 dark:text-ink-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              {m.phone && (
                <div className="mt-3 flex items-center gap-2 text-xs text-ink-500 dark:text-ink-400">
                  <Phone className="h-3.5 w-3.5" />{m.phone}
                </div>
              )}
              {m.services && m.services.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {m.services.map((s, i) => (
                    <span key={i} className="rounded-full bg-ink-50 px-2.5 py-1 text-[10px] font-medium text-ink-600 dark:bg-ink-800 dark:text-ink-400">
                      {s}
                    </span>
                  ))}
                </div>
              )}
              <button
                onClick={() => toggleActive(m)}
                className={`mt-4 w-full rounded-lg py-2 text-xs font-semibold transition ${m.is_active ? 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400' : 'bg-ink-50 text-ink-500 dark:bg-ink-800 dark:text-ink-400'}`}
              >
                {m.is_active ? 'Активен — нажмите для паузы' : 'На паузе — нажмите для активации'}
              </button>
            </div>
          ))}
        </div>
      )}

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink-950/40 backdrop-blur-sm sm:items-center" onClick={() => setShowAdd(false)}>
          <div className="w-full max-w-md rounded-t-3xl bg-white p-6 dark:bg-ink-900 sm:rounded-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-bold text-ink-900 dark:text-white">Новый сотрудник</h3>
              <button onClick={() => setShowAdd(false)} className="text-ink-400"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-3">
              <input type="text" placeholder="Имя" value={newMember.name} onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                className="w-full rounded-xl bg-ink-50 px-4 py-3 text-sm outline-none ring-1 ring-ink-100 focus:ring-2 focus:ring-brand-400 dark:bg-ink-800 dark:text-white dark:ring-ink-700" />
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-ink-600 dark:text-ink-400">Роль</label>
                <div className="flex gap-2">
                  <button onClick={() => setNewMember({ ...newMember, role: 'master' })}
                    className={`flex-1 rounded-xl py-3 text-sm font-medium transition ${newMember.role === 'master' ? 'bg-brand-500 text-white' : 'bg-ink-50 text-ink-600 dark:bg-ink-800 dark:text-ink-400'}`}>
                    Мастер
                  </button>
                  <button onClick={() => setNewMember({ ...newMember, role: 'admin' })}
                    className={`flex-1 rounded-xl py-3 text-sm font-medium transition ${newMember.role === 'admin' ? 'bg-ink-900 text-white' : 'bg-ink-50 text-ink-600 dark:bg-ink-800 dark:text-ink-400'}`}>
                    Администратор
                  </button>
                </div>
              </div>
              <input type="tel" placeholder="Телефон" value={newMember.phone} onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                className="w-full rounded-xl bg-ink-50 px-4 py-3 text-sm outline-none ring-1 ring-ink-100 focus:ring-2 focus:ring-brand-400 dark:bg-ink-800 dark:text-white dark:ring-ink-700" />
              <input type="text" placeholder="Услуги (через запятую)" value={newMember.services} onChange={(e) => setNewMember({ ...newMember, services: e.target.value })}
                className="w-full rounded-xl bg-ink-50 px-4 py-3 text-sm outline-none ring-1 ring-ink-100 focus:ring-2 focus:ring-brand-400 dark:bg-ink-800 dark:text-white dark:ring-ink-700" />
              <button onClick={handleAdd} className="w-full rounded-xl bg-brand-500 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-600">
                Добавить сотрудника
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
