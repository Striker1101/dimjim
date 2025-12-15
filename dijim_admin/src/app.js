const express = require('express');
const transporter = require('./config/mail');

const app = express();

/**
 * ==============================
 * MANUAL CORS (REQUIRED)
 * ==============================
 */
app.use((req, res, next) => {
  const allowedOrigins = [
    'https://dijimgroup.com',
    'https://admin.dijimgroup.com',
  ];

  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type'
  );

  // Preflight request
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

/**
 * ==============================
 * MIDDLEWARES
 * ==============================
 */
app.use(express.json());

/**
 * ==============================
 * ROUTES
 * ==============================
 */
app.use('/api/contact', require('./routes/contact'));
app.use('/api/newsletter', require('./routes/newsletter'));

/**
 * ==============================
 * SMTP TEST
 * ==============================
 */
app.get('/test-mail', async (_, res) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: 'Test Email from Namecheap',
      text: 'If you see this, SMTP is working!',
    });

    res.send('Email sent successfully ✅');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

module.exports = app;
