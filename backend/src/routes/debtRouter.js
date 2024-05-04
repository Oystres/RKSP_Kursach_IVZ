const express = require('express');
const { addDebt } = require('../controllers/debtController');
const router = express.Router();

router.post('/', addDebt);

module.exports = debtRouter;

