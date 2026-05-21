const express = require('express');
const router = express.Router();
const internshipController = require('../controllers/internshipController');

// GET /api/internships (combines scraped + custom)
router.get('/', internshipController.getInternships);

// POST /api/internships (admin only)
router.post('/', internshipController.createInternship);

module.exports = router;
