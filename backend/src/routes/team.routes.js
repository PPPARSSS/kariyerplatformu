const express = require('express');
const router = express.Router();
const teamController = require('../controllers/team.controller');

// 1. Ekip Bul veya Oluştur
router.post('/', teamController.createOrGetTeam);

// 2. Bir yöneticinin takımını getir
router.get('/manager/:managerId', teamController.getTeamByManager);

// 3. Takıma üye ekle/çıkar
router.post('/:teamId/members', teamController.addMember);
router.delete('/:teamId/members/:userId', teamController.removeMember);

// 4. Personel Profili Güncelleme (kıdem, experience, vb)
router.put('/member/:userId/profile', teamController.updateMemberProfile);

module.exports = router;
