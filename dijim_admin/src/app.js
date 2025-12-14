const express = require("express");
const cors = require("cors");
const transporter = require("./config/mail.js");

const app = express();

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

app.use("/api", require("./routes/contact.js"));
app.use("/api", require("./routes/newsletter.js"));
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
