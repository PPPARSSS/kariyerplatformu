const procedureService = require('../services/procedure.service');

class ProcedureController {
    async getProcedures(req, res) {
        try {
            const procedures = await procedureService.getProcedures();
            res.status(200).json(procedures);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async addProcedure(req, res) {
        try {
            const procedure = await procedureService.addProcedure(req.body);
            res.status(201).json(procedure);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteProcedure(req, res) {
        try {
            const { id } = req.params;
            await procedureService.deleteProcedure(id);
            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ProcedureController();
