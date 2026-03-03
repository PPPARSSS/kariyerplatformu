const supabase = require('../config/supabaseClient');

class ProcedureService {
    async getProcedures() {
        const { data, error } = await supabase
            .from('procedures')
            .select('*')
            .order('category');

        if (error) throw error;
        return data;
    }

    async addProcedure(payload) {
        const { data, error } = await supabase
            .from('procedures')
            .insert(payload)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    async deleteProcedure(id) {
        const { error } = await supabase
            .from('procedures')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return { success: true };
    }
}

module.exports = new ProcedureService();
