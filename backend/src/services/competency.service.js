const supabase = require('../config/supabaseClient');

class CompetencyService {
    async getAllNodes() {
        const { data, error } = await supabase
            .from('competency_nodes')
            .select('*')
            .order('created_at', { ascending: true });

        if (error) throw error;
        return data;
    }

    async createNode(nodeData) {
        const { data, error } = await supabase
            .from('competency_nodes')
            .insert([nodeData])
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    async updateNode(id, updates) {
        const { data, error } = await supabase
            .from('competency_nodes')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    async deleteNode(id) {
        const { error } = await supabase
            .from('competency_nodes')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return { success: true };
    }

    async getUserProgress(userId) {
        const { data, error } = await supabase
            .from('user_competencies')
            .select(`
                *,
                node:competency_nodes(*)
            `)
            .eq('user_id', userId);

        if (error) throw error;
        return data;
    }

    async updateUserProgress(userId, nodeId, updates) {
        // Check if exists
        const { data: existing, error: checkError } = await supabase
            .from('user_competencies')
            .select('id')
            .match({ user_id: userId, node_id: nodeId })
            .maybeSingle();

        if (checkError) throw checkError;

        if (existing) {
            const { data, error } = await supabase
                .from('user_competencies')
                .update(updates)
                .match({ user_id: userId, node_id: nodeId })
                .select()
                .single();
            if (error) throw error;
            return data;
        } else {
            const { data, error } = await supabase
                .from('user_competencies')
                .insert([{ user_id: userId, node_id: nodeId, ...updates }])
                .select()
                .single();
            if (error) throw error;
            return data;
        }
    }
}

module.exports = new CompetencyService();
