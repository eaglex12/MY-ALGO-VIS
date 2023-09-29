import React from 'react';
import './Footer.css'; // Create a CSS file for styling
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';



const Footer = () => {
  const handleSocialLinkClick = (url) => {
    window.open(url, '_blank');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
  
    fetch('https://algoo-vis.onrender.com/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, message })
    })
    .then(response => response.json())
    .then(data => {
      alert(data);
    })
    .catch(error => console.error('Error:', error));
  };
  return (
    <footer className="footer">
      <div className="social-links">
      <FaInstagram className="social-icon" onClick={() => handleSocialLinkClick('https://www.instagram.com/divyansh20132/')} />
        <FaGithub className="social-icon" onClick={() => handleSocialLinkClick('https://github.com/eaglex12')} />
        <FaLinkedin  className="social-icon" onClick={() => handleSocialLinkClick('https://www.linkedin.com/in/divyansh-singh-rathore-4934b8203/')} />

      </div>
      <div className="contact-form">
        <h3>Contact Me</h3>
        <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" />
<input type="email" name="email" placeholder="Your Email" />
<textarea name="message" placeholder="Your Message"></textarea>

          <button type="submit">Send</button>
        </form>
      </div>
      <p>&copy; DIVYANSH SINGH RATHORE</p>
    </footer>
  );
};

export default Footer;
