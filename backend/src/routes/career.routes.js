const express = require('express');
const router = express.Router();
const careerController = require('../controllers/career.controller');

router.get('/paths', careerController.getPaths);
router.post('/paths', careerController.createPath);

router.get('/nodes', careerController.getNodes);
router.post('/nodes', careerController.createNode);
router.put('/nodes/:id', careerController.updateNode);
router.delete('/nodes/:id', careerController.deleteNode);

module.exports = router;
