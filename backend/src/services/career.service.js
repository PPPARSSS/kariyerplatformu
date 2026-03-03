const supabase = require('../config/supabaseClient');

class CareerService {
    async getPaths() {
        const { data, error } = await supabase
            .from('career_paths')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    }

    async createPath(payload) {
        const { data, error } = await supabase
            .from('career_paths')
            .insert(payload)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    async getNodes(pathId) {
        let query = supabase.from('career_nodes').select('*').order('priority');
        if (pathId) {
            query = query.eq('career_path_id', pathId);
        }

        const { data, error } = await query;
        if (error) throw error;
        return data;
    }

    async createNode(payload) {
        const { data, error } = await supabase
            .from('career_nodes')
            .insert(payload)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    async updateNode(id, payload) {
        const { data, error } = await supabase
            .from('career_nodes')
            .update(payload)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    async deleteNode(id) {
        const { error } = await supabase
            .from('career_nodes')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return { success: true };
    }
}

module.exports = new CareerService();
