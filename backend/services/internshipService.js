const axios = require('axios');
const cheerio = require('cheerio');

// Fallback data in case the scrape fails or blocks us
const MOCK_DATA = [
  {
    id: 1,
    title: "Frontend Developer ReactJS",
    company: "TechNova Solutions",
    location: "Work From Home",
    duration: "3 Months",
    stipend: "₹ 15,000 /month",
    wfh: true,
    posted: "Just now",
    profile: "Frontend Development",
    numericStipend: 15000,
    numericDuration: 3,
  },
  {
    id: 2,
    title: "Data Analyst Intern",
    company: "DataMetrics Inc",
    location: "Bangalore",
    duration: "6 Months",
    stipend: "₹ 20,000 /month",
    wfh: false,
    posted: "2 days ago",
    profile: "Data Science",
    numericStipend: 20000,
    numericDuration: 6,
  },
  {
    id: 3,
    title: "Marketing Strategy Intern",
    company: "BrandBoost",
    location: "Mumbai",
    duration: "2 Months",
    stipend: "₹ 10,000 /month",
    wfh: false,
    posted: "1 week ago",
    profile: "Marketing",
    numericStipend: 10000,
    numericDuration: 2,
  },
  {
    id: 4,
    title: "Backend Engineer (Node.js)",
    company: "CloudSync",
    location: "Work From Home",
    duration: "4 Months",
    stipend: "₹ 25,000 /month",
    wfh: true,
    posted: "3 days ago",
    profile: "Backend Development",
    numericStipend: 25000,
    numericDuration: 4,
  },
  {
    id: 5,
    title: "UI/UX Designer",
    company: "Creative Studio",
    location: "Delhi",
    duration: "3 Months",
    stipend: "Unpaid",
    wfh: false,
    posted: "5 days ago",
    profile: "Design",
    numericStipend: 0,
    numericDuration: 3,
  },
  {
    id: 6,
    title: "Software Testing Intern",
    company: "QualityAssure",
    location: "Pune",
    duration: "6 Months",
    stipend: "₹ 12,000 /month",
    wfh: false,
    posted: "1 day ago",
    profile: "Software Testing",
    numericStipend: 12000,
    numericDuration: 6,
  },
  {
    id: 7,
    title: "HR & Talent Acquisition",
    company: "PeopleFirst",
    location: "Work From Home",
    duration: "3 Months",
    stipend: "₹ 8,000 /month",
    wfh: true,
    posted: "3 days ago",
    profile: "Human Resources",
    numericStipend: 8000,
    numericDuration: 3,
  },
  {
    id: 8,
    title: "Python Developer",
    company: "AI Solutions Ltd",
    location: "Hyderabad",
    duration: "4 Months",
    stipend: "₹ 22,000 /month",
    wfh: false,
    posted: "Just now",
    profile: "Backend Development",
    numericStipend: 22000,
    numericDuration: 4,
  },
  {
    id: 9,
    title: "Content Writing Intern",
    company: "WordCraft",
    location: "Work From Home",
    duration: "2 Months",
    stipend: "₹ 5,000 /month",
    wfh: true,
    posted: "2 weeks ago",
    profile: "Content Writing",
    numericStipend: 5000,
    numericDuration: 2,
  },
  {
    id: 10,
    title: "Digital Marketing Associate",
    company: "GrowthHackers",
    location: "Chennai",
    duration: "6 Months",
    stipend: "₹ 18,000 /month",
    wfh: false,
    posted: "4 days ago",
    profile: "Digital Marketing",
    numericStipend: 18000,
    numericDuration: 6,
  }
];

exports.fetchAndParseInternships = async () => {
  try {
    const url = 'https://internshala.com/hiring/search';
    
    // We send a User-Agent to mimic a browser, preventing simple blocking
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000
    });

    const html = response.data;
    const $ = cheerio.load(html);
    
    const internships = [];
    
    // Scrape logic adapted for typical Internshala DOM structure
    // Since classnames change, if the scrape returns 0 results, we'll return mock data for demonstration
    $('.internship_meta').each((index, element) => {
      const title = $(element).find('.profile a').text().trim();
      const company = $(element).find('.company_name a').text().trim();
      const location = $(element).find('.location_link').text().trim();
      
      // Values are often inside spans next to icons
      const duration = $(element).find('.item_body:contains("Month")').text().trim() || "N/A";
      const stipend = $(element).find('.stipend').text().trim() || "Unpaid";
      
      const posted = $(element).find('.status-success').text().trim() || "Just now";
      
      const wfh = location.toLowerCase().includes('work from home');
      
      let numericStipend = 0;
      let numericDuration = 0;
      
      // Parse numeric stipend
      const stipendMatch = stipend.match(/[\d,]+/);
      if (stipendMatch) {
          numericStipend = parseInt(stipendMatch[0].replace(/,/g, ''), 10);
      }
      
      // Parse numeric duration
      const durationMatch = duration.match(/\d+/);
      if (durationMatch) {
          numericDuration = parseInt(durationMatch[0], 10);
      }

      if (title && company) {
        internships.push({
          id: index + 1,
          title,
          company,
          location: wfh ? 'Work From Home' : location,
          duration,
          stipend,
          wfh,
          posted,
          profile: title, // Simplified profile extraction
          numericStipend,
          numericDuration
        });
      }
    });

    if (internships.length > 0) {
        return internships;
    } else {
        console.warn("Could not parse internships from HTML (maybe the structure changed). Returning mock data.");
        return MOCK_DATA;
    }

  } catch (error) {
    console.error("Error fetching from Internshala:", error.message);
    // If request fails (e.g., bot protection, timeout), fallback to mock data
    console.warn("Returning mock dataset due to fetch error.");
    return MOCK_DATA;
  }
};
