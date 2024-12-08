import supabase from '@/supabase/client';
import { parseTree } from '@/utils/tree';

class TreeAPI {
  static createTree = async (treeName: string, description: string, userId: string) => {
    const { data, error } = await supabase
      .from('trees')
      .insert([{ name: treeName, description, user_id: userId }])
      .select()
      .single();

    if (error) throw error;

    return parseTree(data);
  };

  static getTree = async (treeId: string) => {
    const { data, error } = await supabase.from('trees').select().eq('id', treeId).single();
    if (error) throw error;
    return parseTree(data);
  };

  static deleteTree = async (treeId: string) => {
    const { error } = await supabase.from('trees').delete().eq('id', treeId);
    if (error) throw error;
  };

  static updateTree = async (treeId: string, treeName: string, description: string | null) => {
    const { data, error } = await supabase.from('trees').update({ name: treeName, description }).eq('id', treeId);
    if (error || !data) throw error;
    return parseTree(data);
  };

  static getAllTrees = async () => {
    const { data, error } = await supabase.from('trees').select();
    if (error) throw error;
    return data.map(parseTree);
  };

  static getTreesByUserId = async (userId: string) => {
    const { data, error } = await supabase.from('trees').select().eq('user_id', userId);
    if (error) throw error;
    return data.map(parseTree);
  };
}

export default TreeAPI;
