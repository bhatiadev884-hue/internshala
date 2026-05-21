const internshipService = require('../services/internshipService');

const { customInternships } = require('../db');

exports.getInternships = async (req, res) => {
  try {
    const scrapedInternships = await internshipService.fetchAndParseInternships();
    
    // Combine mock/scraped data with custom created internships
    const combined = [...customInternships, ...scrapedInternships];
    
    res.json(combined);
  } catch (error) {
    console.error("Error in getInternships controller:", error);
    res.status(500).json({ error: "Failed to fetch internships from Internshala" });
  }
};

exports.createInternship = (req, res) => {
  const { title, company, location, duration, stipend, wfh, profile } = req.body;
  
  // Extract numeric stipend and duration for sorting
  let numericStipend = parseInt(stipend.replace(/[^0-9]/g, '')) || 0;
  let numericDuration = parseInt(duration.replace(/[^0-9]/g, '')) || 0;

  const newInternship = {
    id: Date.now(), // Generate a unique ID
    title,
    company,
    location: wfh ? 'Work From Home' : location,
    duration,
    stipend,
    wfh,
    posted: 'Just now',
    profile,
    numericStipend,
    numericDuration,
    isCustom: true
  };

  customInternships.unshift(newInternship); // Add to top of the array
  res.status(201).json(newInternship);
};
