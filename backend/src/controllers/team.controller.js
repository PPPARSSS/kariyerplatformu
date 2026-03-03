const teamService = require('../services/team.service');

class TeamController {
    async createOrGetTeam(req, res) {
        try {
            const { name, managerId } = req.body;
            if (!name || !managerId) {
                return res.status(400).json({ error: 'Team name and managerId are required.' });
            }
            const team = await teamService.createOrGetTeam(name, managerId);
            res.status(200).json(team);
        } catch (error) {
            console.error('Error in createOrGetTeam:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async getTeamByManager(req, res) {
        try {
            const { managerId } = req.params;
            const team = await teamService.getTeamByManager(managerId);
            if (!team) return res.status(404).json({ error: 'Team not found for this manager.' });
            res.status(200).json(team);
        } catch (error) {
            console.error('Error in getTeamByManager:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async addMember(req, res) {
        try {
            const { teamId } = req.params;
            const { userId } = req.body;
            if (!userId) return res.status(400).json({ error: 'User ID is required' });

            const result = await teamService.addMember(teamId, userId);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error adding member:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async removeMember(req, res) {
        try {
            const { teamId, userId } = req.params;
            const result = await teamService.removeMember(teamId, userId);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error removing member:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async updateMemberProfile(req, res) {
        try {
            const { userId } = req.params;
            const updates = req.body; // e.g. { experience_years, hire_date, seniority_level }
            const result = await teamService.updateMemberProfile(userId, updates);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error updating member profile:', error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new TeamController();
