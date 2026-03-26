
import { supabase } from './supabaseClient';

export interface Project {
  id: string;
  title: string;
  year: string;
  status: 'active' | 'completed';
  desc_text: string; 
  image_url?: string;
  link_url?: string;
  pinned?: boolean;
  position?: number;
  tech_stack?: string[];
  created_at?: string;
}

export interface Certificate {
  id: string;
  file_url: string;
  title: string;
  issuer: string;
  created_at?: string;
}

export interface Skill {
  id: string;
  name: string;
  icon: string;
  category: string;
  created_at?: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  content: string;
  status: 'unread' | 'read';
  created_at?: string;
  date?: string; // For frontend compatibility
}

// Check if Supabase is configured
const isSupabaseConfigured = () => {
    return !!import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_URL !== 'YOUR_SUPABASE_URL';
}

export const db = {
  // --- Projects ---
  getProjects: async (): Promise<Project[]> => {
    if (!isSupabaseConfigured()) return getLocalData('projects', []);
    const { data, error } = await supabase.from('projects').select('*').order('position', { ascending: true, nullsFirst: false }).order('created_at', { ascending: false });
    if (error) { console.error(error); return getLocalData('projects', []); }
    return data as Project[];
  },
  saveProject: async (project: Partial<Project>) => {
    if (!isSupabaseConfigured()) return;
    const { data, error } = await supabase.from('projects').upsert(project).select();
    if (error) throw error;
    return data;
  },
  deleteProject: async (id: string) => {
    if (!isSupabaseConfigured()) return;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw error;
  },
  getPinnedProjects: async (): Promise<Project[]> => {
    if (!isSupabaseConfigured()) return getLocalData('projects', []).filter((p: Project) => p.pinned).slice(0, 9);
    const { data, error } = await supabase.from('projects').select('*').eq('pinned', true).order('position', { ascending: true, nullsFirst: false }).order('created_at', { ascending: false }).limit(9);
    if (error) { console.error(error); return []; }
    return data as Project[];
  },
  togglePin: async (id: string, pinned: boolean) => {
    if (!isSupabaseConfigured()) return;
    const { error } = await supabase.from('projects').update({ pinned }).eq('id', id);
    if (error) throw error;
  },
  updateProjectPositions: async (orderedProjects: Project[]) => {
    if (!isSupabaseConfigured()) return;
    const updates = orderedProjects.map((p, index) => ({
      id: p.id,
      title: p.title,
      year: p.year,
      status: p.status,
      desc_text: p.desc_text,
      image_url: p.image_url,
      link_url: p.link_url,
      pinned: p.pinned,
      tech_stack: p.tech_stack,
      position: index
    }));
    const { error } = await supabase.from('projects').upsert(updates);
    if (error) console.error('Error updating positions:', error);
  },

  // --- Certificates ---
  getCerts: async (): Promise<Certificate[]> => {
    if (!isSupabaseConfigured()) return getLocalData('certs', []);
    const { data, error } = await supabase.from('certificates').select('*').order('created_at', { ascending: false });
    if (error) { console.error(error); return getLocalData('certs', []); }
    return data as Certificate[];
  },
  saveCert: async (cert: Partial<Certificate>) => {
    if (!isSupabaseConfigured()) return;
    const { data, error } = await supabase.from('certificates').upsert(cert).select();
    if (error) throw error;
    return data;
  },
  deleteCert: async (id: string) => {
    if (!isSupabaseConfigured()) return;
    const { error } = await supabase.from('certificates').delete().eq('id', id);
    if (error) throw error;
  },

  // --- Skills ---
  getSkills: async (): Promise<Skill[]> => {
    if (!isSupabaseConfigured()) return getLocalData('skills', []);
    const { data, error } = await supabase.from('skills').select('*').order('created_at', { ascending: true });
    if (error) { console.error(error); return getLocalData('skills', []); }
    return data as Skill[];
  },
  saveSkill: async (skill: Partial<Skill>) => {
    if (!isSupabaseConfigured()) return;
    const { data, error } = await supabase.from('skills').upsert(skill).select();
    if (error) throw error;
    return data;
  },
  deleteSkill: async (id: string) => {
    if (!isSupabaseConfigured()) return;
    const { error } = await supabase.from('skills').delete().eq('id', id);
    if (error) throw error;
  },

  // --- Messages ---
  getMessages: async (): Promise<Message[]> => {
    if (!isSupabaseConfigured()) return getLocalData('messages', []);
    const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
    if (error) { console.error(error); return getLocalData('messages', []); }
    return data.map(m => ({ ...m, date: m.created_at || new Date().toISOString() })) as Message[];
  },
  addMessage: async (msg: Omit<Message, 'id' | 'date' | 'status'>) => {
    if (!isSupabaseConfigured()) return;
    const { data, error } = await supabase.from('messages').insert([msg]).select();
    if (error) throw error;
    return data;
  },
  deleteMessage: async (id: string) => {
     if (!isSupabaseConfigured()) return;
     const { error } = await supabase.from('messages').delete().eq('id', id);
     if (error) throw error;
  }
};

// Fallback/Local Helper
const getLocalData = (key: string, defaultVal: any) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultVal;
}
