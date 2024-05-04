const express = require('express');
const { addStream } = require('../controllers/streamController');
const router = express.Router();

router.post('/', addStream);
router.post('/delete', deleteStream);

module.exports = streamRouter;
