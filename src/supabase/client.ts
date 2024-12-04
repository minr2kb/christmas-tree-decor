import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // Supabase 프로젝트 URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY; // Supabase anon key
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
