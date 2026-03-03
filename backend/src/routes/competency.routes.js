const express = require('express');
const router = express.Router();
const competencyController = require('../controllers/competency.controller');

// Yetkinlik ağacı (Genel listeleme)
router.get('/', competencyController.getNodes);

// Yönetici: Node oluştur
router.post('/', competencyController.createNode);

// Yönetici: Node sil veya güncelle
router.put('/:id', competencyController.updateNode);
router.delete('/:id', competencyController.deleteNode);

// Kullanıcının ilerlemesini (user_competencies) getir
router.get('/user/:userId', competencyController.getUserProgress);

// Kullanıcı node durumu güncelle ('in_progress', 'completed')
router.post('/user/progress', competencyController.updateProgress);

module.exports = router;
