const userService = require('../services/user.service');

class UserController {
    async getProfiles(req, res) {
        try {
            const profiles = await userService.getProfiles();
            res.status(200).json(profiles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getProfile(req, res) {
        try {
            const { id } = req.params;
            const profile = await userService.getProfile(id);
            res.status(200).json(profile);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getRoles(req, res) {
        try {
            const { id } = req.params;
            const roles = await userService.getRoles(id);
            res.status(200).json(roles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new UserController();
