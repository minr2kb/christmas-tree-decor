import supabase from '@/supabase/client';
import { Database } from '@/supabase/database.types';
import { TreeState } from '@/types/tree';
import { logger } from '@/utils/logger';
import { parseTreeState } from '@/utils/tree';

class TreeStatesAPI {
  static getTreeState = async (treeId: string) => {
    const { data, error } = await supabase.from('tree_states').select().eq('tree_id', treeId).single();
    if (error) {
      logger.error('Error fetching tree state', error, {
        treeId,
      });
      throw error;
    }
    return parseTreeState(data);
  };

  static createTreeState = async (treeId: string) => {
    const { error } = await supabase.from('tree_states').insert([{ tree_id: treeId }]);
    if (error) {
      logger.error('Error creating tree state', error, {
        treeId,
      });
      throw error;
    }
  };

  static subscribeToTreeState = (treeId: string, onChange: (state: TreeState) => void) => {
    return supabase
      .channel(`tree_state_${treeId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'tree_states',
          filter: `tree_id=eq.${treeId}`,
        },
        (payload) => {
          onChange(parseTreeState(payload.new as Database['public']['Tables']['tree_states']['Row']));
        },
      )
      .subscribe();
  };

  static updateTreeState = async (
    treeId: string,
    updates: {
      showTriangle?: boolean;
      showCount?: boolean;
      showSnow?: boolean;
      showStar?: boolean;
      showTitle?: boolean;
    },
  ) => {
    const { error } = await supabase
      .from('tree_states')
      .update({
        show_triangle: updates.showTriangle,
        show_count: updates.showCount,
        show_snow: updates.showSnow,
        show_star: updates.showStar,
        show_title: updates.showTitle,
      })
      .eq('tree_id', treeId);

    if (error) {
      logger.error('Error updating tree state', error, {
        treeId,
        updates,
      });
      throw error;
    }
  };
}

export default TreeStatesAPI;
