import supabase from '@/supabase/client';
import { Database } from '@/supabase/database.types';
import { createOrnament, parseOrnament } from '@/utils/ornament';

class OrnamentAPI {
  static getOrnamentsByTreeId = async (treeId: string) => {
    const { data, error } = await supabase
      .from('ornaments')
      .select('*')
      .eq('tree_id', treeId)
      .order('created_at', { ascending: true });

    if (error) {
      throw error;
    }

    return data ? data.map(parseOrnament) : [];
  };

  static subscribeToOrnaments = (
    treeId: string,
    onInsert: (ornament: Database['public']['Tables']['ornaments']['Row']) => void,
  ) => {
    const channel = supabase
      .channel('ornaments_channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'ornaments',
          filter: `tree_id=eq.${treeId}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            onInsert(payload.new as Database['public']['Tables']['ornaments']['Row']);
          }
        },
      )
      .subscribe();

    return channel;
  };

  static addOrnamentToTree = async (name: string, selectedType: number, treeId: string) => {
    const { createdAt, ...ornament } = createOrnament(name, selectedType);

    const { error } = await supabase.from('ornaments').insert([
      {
        ...ornament,
        tree_id: treeId,
        created_at: createdAt.toISOString(),
      },
    ]);

    if (error) {
      console.error('Error inserting ornament:', error);
      throw error;
    }
  };

  static deleteOrnament = async (ornamentId: string) => {
    const { error } = await supabase.from('ornaments').delete().eq('id', ornamentId);
    if (error) throw error;
  };

  static deleteOrnamentsByTreeId = async (treeId: string) => {
    const { error } = await supabase.from('ornaments').delete().eq('tree_id', treeId);
    if (error) throw error;
  };
}

export default OrnamentAPI;
