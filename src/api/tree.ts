import supabase from '@/supabase/client';
import { logger } from '@/utils/logger';
import { parseTree } from '@/utils/tree';

class TreeAPI {
  static createTree = async (treeName: string, description: string, userId: string) => {
    const { data, error } = await supabase
      .from('trees')
      .insert([{ name: treeName, description, user_id: userId }])
      .select()
      .single();

    if (error) {
      logger.error('Error creating tree', error, {
        treeName,
        description,
        userId,
      });
      throw error;
    }

    return parseTree(data);
  };

  static getTree = async (treeId: string) => {
    const { data, error } = await supabase.from('trees').select().eq('id', treeId).single();
    if (error) {
      logger.error('Error fetching tree', error, {
        treeId,
      });
      throw error;
    }
    return parseTree(data);
  };

  static deleteTree = async (treeId: string) => {
    const { error } = await supabase.from('trees').delete().eq('id', treeId);
    if (error) {
      logger.error('Error deleting tree', error, {
        treeId,
      });
      throw error;
    }
  };

  static updateTree = async (treeId: string, treeName: string, description: string | null) => {
    const { data, error } = await supabase.from('trees').update({ name: treeName, description }).eq('id', treeId);
    if (error || !data) {
      logger.error('Error updating tree', error || new Error('Tree Not Found'), {
        treeId,
        treeName,
        description,
      });
      throw error;
    }
    return parseTree(data);
  };

  static getAllTrees = async () => {
    const { data, error } = await supabase.from('trees').select();
    if (error) {
      logger.error('Error fetching all trees', error);
      throw error;
    }
    return data.map(parseTree);
  };

  static getTreesByUserId = async (userId: string) => {
    const { data, error } = await supabase.from('trees').select().eq('user_id', userId);
    if (error) {
      logger.error('Error fetching trees by user ID', error, {
        userId,
      });
      throw error;
    }
    return data.map(parseTree);
  };
}

export default TreeAPI;
