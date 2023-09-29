const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'divyanshsrathore13@gmail.com', // Replace with your Gmail email address
    pass: 'qqsh mgsi swmk iucw' // Use an app password for security
  }
});

app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const mailToYou = {
    from: 'divyanshsrathore13@gmail.com',
    to: 'divyanshsrathore13@gmail.com', // Replace with your email address
    subject: 'Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  const mailToSender = {
    from: 'divyanshsrathore13@gmail.com',
    to: email,
    subject: 'Thank You for Contacting Me',
    text: `Dear ${name},\n\nThank you for your message. I will get back to you as soon as possible.\n\nBest regards,\nDivyansh Singh Rathore`
  };

  transporter.sendMail(mailToYou, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }

    // Send a "Thank You" email to the sender
    transporter.sendMail(mailToSender, (error, info) => {
      if (error) {
        return res.status(500).send(error.toString());
      }
      res.send('Emails sent successfully');
    });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
