const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Directly set the email user and password
const EMAIL_USER = 'ravaughn.13@gmail.com';
const EMAIL_PASS = 'uqri skdb ilri fdsc'; // Your app-specific password

// Display email configuration for debugging purposes
console.log('EMAIL_USER:', EMAIL_USER);
console.log('EMAIL_PASS:', EMAIL_PASS ? 'Exists' : 'Not Set');

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
});

// Verify transporter configuration
transporter.verify((error, success) => {
    if (error) {
        console.error('Transporter verification failed:', error);
    } else {
        console.log('Server is ready to take our messages');
    }
});

// Endpoint to submit feedback
app.post('/submitFeedback', (req, res) => {
    const { name, email, feedbackType, comments } = req.body;

    try {
        // Send an email to the system admin
        const mailOptions = {
            from: EMAIL_USER, // sender address
            to: 'ravaughn.13@gmail.com', // receiver address
            subject: 'New Feedback Submission',
            text: `Feedback Received:\n\nName: ${name}\nEmail: ${email}\nFeedback Type: ${feedbackType}\nComments: ${comments}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                res.status(500).json({ success: false, message: 'Failed to send notification email.' });
            } else {
                console.log('Email sent:', info.response);
                res.status(200).json({ success: true });
            }
        });

    } catch (error) {
        console.error('Error processing feedback:', error);
        res.status(500).json({ success: false, message: 'An error occurred while processing your feedback.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});