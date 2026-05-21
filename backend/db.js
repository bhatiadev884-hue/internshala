// In-memory simple database

// Pre-configured Users
const users = [
  { id: 1, email: "admin@internshala.com", password: "password", role: "admin", name: "System Admin" },
  { id: 2, email: "student@internshala.com", password: "password", role: "student", name: "John Doe" }
];

// Published custom internships
const customInternships = [];

// Applications track who applied to what
const applications = [];

module.exports = {
  users,
  customInternships,
  applications
};
