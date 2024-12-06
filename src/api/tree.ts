import supabase from '@/supabase/client';

export const createTree = async (treeName: string, description: string, userId: string) => {
  const { data, error } = await supabase
    .from('trees')
    .insert([{ name: treeName, description, user_id: userId }])
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const getTree = async (treeId: string) => {
  const { data, error } = await supabase.from('trees').select().eq('id', treeId).single();
  if (error) throw error;
  return data;
};

export const deleteTree = async (treeId: string) => {
  const { error } = await supabase.from('trees').delete().eq('id', treeId);
  if (error) throw error;
  // ornamet 삭제
  const { error: ornamentError } = await supabase.from('ornaments').delete().eq('tree_id', treeId);
  if (ornamentError) throw ornamentError;
};
