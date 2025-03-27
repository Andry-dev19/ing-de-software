const express = require('express');
const ProviderController = require('../controllers/providerController');

const router = express.Router();

router.get('/providers', ProviderController.getAll);
router.get('/providers/:id', ProviderController.getById);
router.post('/providers', ProviderController.create);
router.put('/providers/:id', ProviderController.update);
router.delete('/providers/:id', ProviderController.delete);

module.exports = router;