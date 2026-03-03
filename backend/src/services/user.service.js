const supabase = require('../config/supabaseClient');

class UserService {
    async getProfiles() {
        const { data, error } = await supabase
            .from('profiles')
            .select('id, user_id, full_name, department, position');

        if (error) throw error;
        return data;
    }

    async getProfile(userId) {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', userId)
            .single();

        if (error) throw error;
        return data;
    }

    async getRoles(userId) {
        const { data, error } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', userId);

        if (error) throw error;
        return data;
    }
}

module.exports = new UserService();
