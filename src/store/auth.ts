import { atom } from 'jotai';
import { Session } from '@supabase/supabase-js';

export const sessionAtom = atom<Session | null>(null);
export const isAuthenticatedAtom = atom((get) => get(sessionAtom) !== null);
export const userAtom = atom((get) => get(sessionAtom)?.user ?? null);