const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// GET /api/users — all users with their roles
router.get('/', userController.getAllUsersWithRoles);

// GET /api/users/profiles — all profiles
router.get('/profiles', userController.getProfiles);

// GET /api/users/:id/profile — single user profile
router.get('/:id/profile', userController.getProfile);

// GET /api/users/:id/roles — single user roles
router.get('/:id/roles', userController.getRoles);

// PUT /api/users/:id/roles — update user roles
router.put('/:id/roles', userController.updateUserRoles);

module.exports = router;
