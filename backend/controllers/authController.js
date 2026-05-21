const jwt = require('jsonwebtoken');
const { users } = require('../db');

const SECRET_KEY = 'supersecretkey_dev_only';

exports.login = (req, res) => {
  const { email, password, role } = req.body;
  
  // Find user
  const user = users.find(u => u.email === email && u.password === password && u.role === role);
  
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials or role" });
  }

  // Generate token
  const token = jwt.sign(
    { id: user.id, role: user.role, name: user.name, email: user.email },
    SECRET_KEY,
    { expiresIn: '2h' }
  );

  res.json({ token, user: { id: user.id, role: user.role, name: user.name, email: user.email } });
};

exports.signup = (req, res) => {
  const { name, email, password, role } = req.body;

  // Basic validation
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if user already exists
  const existingUser = users.find(u => u.email === email && u.role === role);
  if (existingUser) {
    return res.status(400).json({ message: "User with this email and role already exists" });
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
    role
  };

  users.push(newUser);

  // Generate token
  const token = jwt.sign(
    { id: newUser.id, role: newUser.role, name: newUser.name, email: newUser.email },
    SECRET_KEY,
    { expiresIn: '2h' }
  );

  res.status(201).json({ token, user: { id: newUser.id, role: newUser.role, name: newUser.name, email: newUser.email } });
};
