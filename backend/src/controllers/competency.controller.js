const competencyService = require('../services/competency.service');

class CompetencyController {
    async getNodes(req, res) {
        try {
            const nodes = await competencyService.getAllNodes();
            res.status(200).json(nodes);
        } catch (error) {
            console.error('Error getting competency nodes:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async createNode(req, res) {
        try {
            const nodeData = req.body;
            const node = await competencyService.createNode(nodeData);
            res.status(201).json(node);
        } catch (error) {
            console.error('Error creating competency node:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async updateNode(req, res) {
        try {
            const { id } = req.params;
            const updates = req.body;
            const node = await competencyService.updateNode(id, updates);
            res.status(200).json(node);
        } catch (error) {
            console.error('Error updating competency node:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async deleteNode(req, res) {
        try {
            const { id } = req.params;
            const result = await competencyService.deleteNode(id);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error deleting competency node:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async getUserProgress(req, res) {
        try {
            const { userId } = req.params;
            const progress = await competencyService.getUserProgress(userId);
            res.status(200).json(progress);
        } catch (error) {
            console.error('Error getting user progress:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async updateProgress(req, res) {
        try {
            const { userId, nodeId, status, progress_percentage, completed_hours } = req.body;
            const progress = await competencyService.updateUserProgress(userId, nodeId, {
                status, progress_percentage, completed_hours
            });
            res.status(200).json(progress);
        } catch (error) {
            console.error('Error updating user progress:', error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new CompetencyController();
