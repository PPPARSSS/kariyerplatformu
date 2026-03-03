const supabase = require('../config/supabaseClient');

class TeamService {
    async createOrGetTeam(name, managerId) {
        // Find existing team for manager
        let { data: existingTeam, error: findError } = await supabase
            .from('teams')
            .select('*')
            .eq('manager_id', managerId)
            .single();

        if (existingTeam) return existingTeam;

        // Error on find might just mean no rows returned, ignore if code is PGRST116 (0 rows)
        // Let's create a new team
        const { data: newTeam, error: createError } = await supabase
            .from('teams')
            .insert([{ name, manager_id: managerId }])
            .select()
            .single();

        if (createError) throw createError;
        return newTeam;
    }

    async getTeamByManager(managerId) {
        // Get team
        const { data: team, error: teamError } = await supabase
            .from('teams')
            .select('*')
            .eq('manager_id', managerId)
            .single();

        if (teamError) {
            if (teamError.code === 'PGRST116') return null; // not found
            throw teamError;
        }

        // Get members with profiles
        const { data: members, error: membersError } = await supabase
            .from('team_members')
            .select(`
                user_id,
                joined_at,
                profiles:user_id ( full_name, avatar_url, department, position, experience_years, hire_date, seniority_level )
            `)
            .eq('team_id', team.id);

        if (membersError) throw membersError;

        return {
            ...team,
            members: members || []
        };
    }

    async addMember(teamId, userId) {
        const { data, error } = await supabase
            .from('team_members')
            .insert([{ team_id: teamId, user_id: userId }])
            .select();

        // Also assign role if needed, but lets assume they are 'personel' by default
        if (error) throw error;
        return data[0];
    }

    async removeMember(teamId, userId) {
        const { error } = await supabase
            .from('team_members')
            .delete()
            .match({ team_id: teamId, user_id: userId });

        if (error) throw error;
        return { success: true };
    }

    async updateMemberProfile(userId, updates) {
        const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('user_id', userId)
            .select()
            .single();

        if (error) throw error;
        return data;
    }
}

module.exports = new TeamService();
