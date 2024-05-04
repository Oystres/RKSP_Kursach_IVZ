const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessmentController');

router.post('/', addAssessment);
router.post('/updateAssessment', assessmentController.updateAssessment);

module.exports = asessmentRouter;

