const express = require('express');
const router = express.Router();
const { applications } = require('../db');

// POST /api/applications (Student applies)
router.post('/', (req, res) => {
  const { studentId, studentName, internshipId, internshipTitle, company } = req.body;
  
  // Check if already applied
  const existing = applications.find(a => a.studentId === studentId && a.internshipId === internshipId);
  if (existing) {
    return res.status(400).json({ message: "You have already applied for this internship." });
  }

  const application = {
    id: Date.now(),
    studentId,
    studentName,
    internshipId,
    internshipTitle,
    company,
    status: "Under Review",
    appliedAt: new Date().toISOString()
  };

  applications.push(application);
  res.status(201).json(application);
});

// GET /api/applications (Fetch based on role)
router.get('/', (req, res) => {
  const { role, userId } = req.query;
  
  if (role === 'student') {
    const studentApps = applications.filter(a => a.studentId === parseInt(userId));
    return res.json(studentApps);
  } 
  
  if (role === 'admin') {
    // Admin sees all applications for now
    return res.json(applications);
  }

  res.status(400).json({ message: "Role is required" });
});

module.exports = router;
