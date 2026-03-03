const internService = require('../services/intern.service');

class InternController {
    async getPrograms(req, res) {
        try {
            const programs = await internService.getPrograms();
            res.status(200).json(programs);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createProgram(req, res) {
        try {
            const program = await internService.createProgram(req.body);
            res.status(201).json(program);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getLessons(req, res) {
        try {
            const lessons = await internService.getLessons();
            res.status(200).json(lessons);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async addLesson(req, res) {
        try {
            const lesson = await internService.addLesson(req.body);
            res.status(201).json(lesson);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getEvaluations(req, res) {
        try {
            const evaluations = await internService.getEvaluations();
            res.status(200).json(evaluations);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createEvaluation(req, res) {
        try {
            const evaluation = await internService.createEvaluation(req.body);
            res.status(201).json(evaluation);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getEvaluationParameters(req, res) {
        try {
            const parameters = await internService.getEvaluationParameters();
            res.status(200).json(parameters);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createEvaluationParameter(req, res) {
        try {
            const parameter = await internService.createEvaluationParameter(req.body);
            res.status(201).json(parameter);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAssignments(req, res) {
        try {
            const assignments = await internService.getAssignments();
            res.status(200).json(assignments);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteItem(req, res) {
        try {
            const { table, id } = req.params;
            await internService.deleteItem(table, id);
            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new InternController();
