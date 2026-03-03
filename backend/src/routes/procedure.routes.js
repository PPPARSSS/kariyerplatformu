const express = require('express');
const router = express.Router();
const procedureController = require('../controllers/procedure.controller');

router.get('/', procedureController.getProcedures);
router.post('/', procedureController.addProcedure);
router.delete('/:id', procedureController.deleteProcedure);

module.exports = router;
