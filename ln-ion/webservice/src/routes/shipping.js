const express = require('express');
const router = express.Router();
const shippingController = require('../controllers/shipping.controller');

router.post('/notice', shippingController.shipNotice);

module.exports = router;