const db = require('../config/db');

// simple email validator
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// SUBSCRIBE
exports.subscribe = async (req, res) => {
  const email = (req.body.email || '').trim().toLowerCase();

  if (!email)
    return res.status(400).json({ message: 'Email is required' });

  if (!isValidEmail(email))
    return res.status(400).json({ message: 'Invalid email format' });

  try {
    // prevent duplicates manually (extra safety)
    const [rows] = await db.execute(
      'SELECT id FROM newsletter WHERE email = ? LIMIT 1',
      [email]
    );

    if (rows.length)
      return res.status(409).json({ message: 'Email already subscribed' });

    await db.execute(
      'INSERT INTO newsletter (email) VALUES (?)',
      [email]
    );

    res.json({ success: true, message: 'Subscribed successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET ALL NEWSLETTER EMAILS (ADMIN USE)
exports.getAll = async (_req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT id, email, created_at FROM newsletter ORDER BY created_at DESC'
    );

    res.json({ success: true, data: rows });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
