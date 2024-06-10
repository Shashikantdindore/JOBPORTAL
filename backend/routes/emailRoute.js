// application.js

const express = require('express');
const multer = require('multer');
const sendEmail = require('./email'); // Import the sendEmail function

const router = express.Router();
const upload = multer();

router.post('/jobseeker/post', upload.single('resume'), async (req, res) => {
  try {
    const { name, email, phone, address, coverLetter, jobId } = req.body;
    const resume = req.file;

    // Save the application to your database
    // ...

    // Send a notification email
    const emailSubject = `Application Received for Job ID: ${jobId}`;
    const emailText = `Thank you for your application, ${name}. We have received your application for the job.`;
    await sendEmail(email, emailSubject, emailText);

    res.status(200).json({ message: 'Application submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit application' });
  }
});

module.exports = router;
