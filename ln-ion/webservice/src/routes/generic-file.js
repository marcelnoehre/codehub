const express = require('express');
const router = express.Router();
const genericFileController = require('../controllers/generic-file.controller');

router.get('/get-file-list', genericFileController.getFileList);

router.post('/get-file', genericFileController.getFile);
router.post('/store', genericFileController.storeFile);
router.post('/clear-storage', genericFileController.clearStorage);

module.exports = router;