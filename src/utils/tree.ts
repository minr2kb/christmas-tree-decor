import { Database } from '@/supabase/database.types';
import { TreeState, TreeType } from '@/types/tree';

export const parseTree = (tree: Database['public']['Tables']['trees']['Row']): TreeType => {
  return {
    ...tree,
    createdAt: new Date(tree.created_at),
    userId: tree.user_id || '',
  };
};

export const parseTreeState = (state: Database['public']['Tables']['tree_states']['Row']): TreeState => {
  return {
    ...state,
    treeId: state.tree_id || '',
    updatedAt: new Date(state.updated_at || ''),
    showCount: state.show_count || false,
    showSnow: state.show_snow || false,
    showStar: state.show_star || false,
    showTitle: state.show_title || false,
  };
};
