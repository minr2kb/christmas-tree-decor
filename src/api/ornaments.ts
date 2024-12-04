import supabase from '@/supabase/client';
import { Database } from '@/supabase/database.types';
import { createOrnament, getInitialPosition, parseOrnament } from '@/utils/ornament';

export const loadOrnaments = async (treeId: string) => {
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

export const subscribeToOrnaments = (
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

export const addOrnamentToTree = async (name: string, selectedType: number, treeId: string) => {
  const { createdAt, ...ornament } = createOrnament(name, selectedType);
  const initialPosition = getInitialPosition();

  const { error } = await supabase.from('ornaments').insert([
    {
      ...ornament,
      tree_id: treeId,
      initial_position: initialPosition,
      created_at: createdAt.toISOString(),
    },
  ]);

  if (error) {
    console.error('Error inserting ornament:', error);
    throw error;
  }
};
