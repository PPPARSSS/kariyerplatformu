const careerService = require('../services/career.service');

class CareerController {
    async getPaths(req, res) {
        try {
            const paths = await careerService.getPaths();
            res.status(200).json(paths);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createPath(req, res) {
        try {
            const path = await careerService.createPath(req.body);
            res.status(201).json(path);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getNodes(req, res) {
        try {
            const { pathId } = req.query;
            const nodes = await careerService.getNodes(pathId);
            res.status(200).json(nodes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createNode(req, res) {
        try {
            const node = await careerService.createNode(req.body);
            res.status(201).json(node);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateNode(req, res) {
        try {
            const { id } = req.params;
            const node = await careerService.updateNode(id, req.body);
            res.status(200).json(node);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteNode(req, res) {
        try {
            const { id } = req.params;
            await careerService.deleteNode(id);
            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new CareerController();
