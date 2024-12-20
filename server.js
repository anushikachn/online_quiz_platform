const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const otpStore = {};

const PORT = 5000;

if (!process.env.MONGO_URI || !process.env.EMAIL || !process.env.PASSWORD) {
    console.error('Missing required environment variables.');
    process.exit(1);
}

const app = express();
app.use(express.json()); 

app.use(cors({
  origin: 'http://localhost:3000' // Replace with your frontend URL
}));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

   // Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, // Your email
      pass: process.env.PASSWORD, // Your email password
    },
  });
  
  // Send OTP
  app.post("/send-otp", (req, res) => {
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
  
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
    otpStore[email] = otp;
  
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP for Signup",
      text: `Your OTP is: ${otp}`,
    };
  
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return res.status(500).json({ message: "Error sending OTP" });
      }
      res.status(200).json({ message: "OTP sent successfully" });
    });
  });
  
  // Verify OTP
  app.post("/verify-otp", (req, res) => {
    const { email, otp } = req.body;
  
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }
  
    if (otpStore[email] && otpStore[email] === parseInt(otp)) {
      delete otpStore[email];
      return res.status(200).json({ success: true });
    }
  
    res.status(400).json({ message: "Invalid OTP" });
  });
  
  // Signup
  app.post("/signup", (req, res) => {
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
  
    if (users[email]) {
      return res.status(400).json({ message: "Email is already registered" });
    }
  
    users[email] = { email };
    res.status(201).json({ message: "Signup successful" });
  });
  
const sendScoreEmail = async (email, score) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        await transporter.verify();
        console.log('SMTP server is ready');

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Your Quiz Score',
            text: `Your quiz score is: ${score}`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (err) {
        console.error('Error sending email:', err);
    }
};

app.get('/quiz', (req, res) => {
    res.json([
        { question: 'What is 2+2?', options: ['3', '4', '5'], answer: '4' },
        { question: 'What is 5x6?', options: ['30', '25', '35'], answer: '30' },
        { question: 'What gas do plants breathe in?',options:['Oxygen','Carbon Dioxide','Nitrogen'],answer:'Carbon Dioxide'},
        { question: 'What is the name of Barbies boyfriend?',options:[' Ken',' John','Steve'],answer:'Ken'},
        { question: 'Which ancient civilization built the pyramids?',options:['Romans',' Egyptians','Mayans'],answer:'Egyptians'},
        { question: 'How many players are on a basketball team?',options:['5','6','10'],answer:'5'},
        { question: 'What ocean is the deepest?',options:['Atlantic','Pacific','Indian'],answer:'Pacific'},

    ]);
});

app.post('/send-score',async (req, res) => {
    const { email, score } = req.body;
     
    try {
        await sendScoreEmail(email, score);  // Await the email sending process
        res.json({ message: 'Score email sent successfully' }); // Success message
    } catch (err) {
        console.error('Error in sending score email:', err);
        res.status(500).json({ message: 'Failed to send score email' }); // Error message
    }
});

app.post('/submit-score', async (req, res) => {
    const { email, score } = req.body;
    try {
        const user = await User.findOneAndUpdate(
            { email },
            { score },
            { new: true, upsert: true }
        );
        res.json({ message: 'Score saved!', user });
    } catch (err) {
        res.status(500).json({ message: 'Error saving score', error: err });
    }
});
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
