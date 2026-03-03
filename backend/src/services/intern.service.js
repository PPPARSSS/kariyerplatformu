const supabase = require('../config/supabaseClient');

class InternService {
    async getPrograms() {
        const { data, error } = await supabase
            .from('intern_programs')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    }

    async createProgram(payload) {
        const { data, error } = await supabase
            .from('intern_programs')
            .insert(payload)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    async getLessons() {
        const { data, error } = await supabase
            .from('intern_lessons')
            .select('*')
            .order('order_index');

        if (error) throw error;
        return data;
    }

    async addLesson(payload) {
        const { data, error } = await supabase
            .from('intern_lessons')
            .insert(payload)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    async getEvaluations() {
        const { data, error } = await supabase
            .from('intern_evaluations')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    }

    async createEvaluation(payload) {
        const { data, error } = await supabase
            .from('intern_evaluations')
            .insert(payload)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    async getEvaluationParameters() {
        const { data, error } = await supabase
            .from('evaluation_parameters')
            .select('*')
            .order('created_at');

        if (error) throw error;
        return data;
    }

    async createEvaluationParameter(payload) {
        const { data, error } = await supabase
            .from('evaluation_parameters')
            .insert(payload)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    async getAssignments() {
        const { data, error } = await supabase
            .from('intern_program_assignments')
            .select('*');

        if (error) throw error;
        return data;
    }

    async deleteItem(table, id) {
        const { error } = await supabase
            .from(table)
            .delete()
            .eq('id', id);

        if (error) throw error;
        return { success: true };
    }
}

module.exports = new InternService();
