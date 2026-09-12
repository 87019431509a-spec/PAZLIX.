export interface Client {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  notes: string | null;
  created_at: string;
}

export interface Booking {
  id: string;
  client_name: string;
  client_phone: string | null;
  service_name: string;
  team_member_name: string | null;
  booking_date: string;
  booking_time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes: string | null;
  created_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: 'master' | 'admin';
  avatar: string | null;
  services: string[] | null;
  phone: string | null;
  is_active: boolean;
  created_at: string;
}

export interface BusinessSettings {
  id: string;
  business_name: string;
  description: string | null;
  logo_url: string | null;
  theme: 'light' | 'dark';
  sphere: string | null;
  address: string | null;
  phone: string | null;
  hours: string | null;
  working_hours: Record<string, string>;
  slot_duration: number;
  buffer_time: number;
  auto_confirm: boolean;
  cancel_policy: string | null;
}

export type DashboardPage =
  | 'overview'
  | 'calendar'
  | 'inbox'
  | 'clients'
  | 'history'
  | 'assistant'
  | 'team'
  | 'rules'
  | 'settings'
  | 'subscription';
