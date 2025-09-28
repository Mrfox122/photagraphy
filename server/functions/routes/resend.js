// server/functions/routes/resend.js
const express = require('express');
const { Resend } = require('resend');
const axios = require('axios');
const router = express.Router();
require('dotenv').config({ path: '../../../.env' });

const resend = new Resend(process.env.RESEND_API_KEY);
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

router.post('/', async (req, res) => {
  const { name, email, subject, message, token } = req.body;

  try {
    // 1. Verify reCAPTCHA token with Google
    const recaptchaResponse = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`
    );
    const { success, score } = recaptchaResponse.data;

    // Check if reCAPTCHA verification failed or the score is too low
    if (!success || score < 0.5) { // You can adjust the score threshold
      return res.status(400).json({ message: 'reCAPTCHA verification failed. Are you a robot?' });
    }

    // 2. Send email with Resend (only if reCAPTCHA passed)
    const { data, error } = await resend.emails.send({
      from: 'your-verified-domain@your-domain.com', // Must be from a verified domain
      to: 'your-personal-email@example.com',        // The email that receives the messages
      subject: `New Message: ${subject}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error sending email.' });
    }

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;