const db = require("../config/db");
const mailer = require("../config/mail");

exports.sendContact = async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    if (!email || !message)
      return res.status(400).json({ message: "Missing required fields" });

    // Save message to database
    await db.execute(
      `INSERT INTO contact_messages (name, email, phone, service, message)
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, phone, service, message]
    );

    // Prepare mail
    const mailBody = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}

Message:
${message}
    `;

    // Send email
    await mailer.sendMail({
      from: process.env.EMAIL_USER, // must be your verified domain email
      to: process.env.EMAIL_TO,
      replyTo: email, // visitor's email
      subject: `New Contact Request from ${name}`,
      text: mailBody,
    });

    res.json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    console.error("Contact form error:", err.message);

    // Return generic error to frontend
    res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
    });
  }
};
