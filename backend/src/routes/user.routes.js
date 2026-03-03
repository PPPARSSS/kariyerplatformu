const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/profiles', userController.getProfiles);
router.get('/:id/profile', userController.getProfile);
router.get('/:id/roles', userController.getRoles);

module.exports = router;
