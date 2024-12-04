import { Database } from '@/supabase/database.types';
import { TreeType } from '@/types/tree';

export const parseTree = (tree: Database['public']['Tables']['trees']['Row']): TreeType => {
  return {
    ...tree,
    createdAt: new Date(tree.created_at),
  };
};
