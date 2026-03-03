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

    async getAllUsersWithRoles() {
        // Get all profiles
        const { data: profiles, error: profileError } = await supabase
            .from('profiles')
            .select('user_id, full_name, department, position, avatar_url')
            .order('full_name');

        if (profileError) throw profileError;

        // Get all roles
        const { data: allRoles, error: roleError } = await supabase
            .from('user_roles')
            .select('user_id, role');

        if (roleError) throw roleError;

        // Merge roles into profiles
        const roleMap = {};
        (allRoles || []).forEach((r) => {
            if (!roleMap[r.user_id]) roleMap[r.user_id] = [];
            roleMap[r.user_id].push(r.role);
        });

        return (profiles || []).map((p) => ({
            ...p,
            roles: roleMap[p.user_id] || [],
        }));
    }

    async updateRoles(userId, roles) {
        // Delete existing roles
        const { error: deleteError } = await supabase
            .from('user_roles')
            .delete()
            .eq('user_id', userId);

        if (deleteError) throw deleteError;

        // Insert new roles
        if (roles && roles.length > 0) {
            const rows = roles.map((role) => ({ user_id: userId, role }));
            const { error: insertError } = await supabase
                .from('user_roles')
                .insert(rows);

            if (insertError) throw insertError;
        }

        return { success: true };
    }
}

module.exports = new UserService();
