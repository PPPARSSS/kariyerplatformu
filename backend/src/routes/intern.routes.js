const express = require('express');
const router = express.Router();
const internController = require('../controllers/intern.controller');

router.get('/programs', internController.getPrograms);
router.post('/programs', internController.createProgram);

router.get('/lessons', internController.getLessons);
router.post('/lessons', internController.addLesson);

router.get('/evaluations', internController.getEvaluations);
router.post('/evaluations', internController.createEvaluation);

router.get('/evaluation-parameters', internController.getEvaluationParameters);
router.post('/evaluation-parameters', internController.createEvaluationParameter);

router.get('/assignments', internController.getAssignments);

router.delete('/:table/:id', internController.deleteItem);

module.exports = router;
