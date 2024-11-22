import React, { useState } from "react";
import "./Contact.css";
import msg_icon from '../../assets/msg-icon.png';
import mail_icon from '../../assets/mail-icon.png';
import phone_icon from '../../assets/phone-icon.png';
import location_icon from '../../assets/location-icon.png';
import white_arrow from '../../assets/white-arrow.png';

const Contact = () => {
  const [result, setResult] = useState("");
  const [rating, setRating] = useState(0);

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");

    const formData = new FormData(event.target);
    formData.append("access_key", "6ab5bef3-175b-43c4-8c63-46b2b6dfb168");
    formData.append("rating", rating); 

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      setTimeout(function () {
        setResult(null);
      }, 4000);
      event.target.reset();
      setRating(0); 
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  const handleStarClick = (index) => {
    setRating(index + 1); 
  };

  return (
    <div className="contact">
      <div className="contact-col">
        <h3>Send us a message <img src={msg_icon} alt="Message Icon" /></h3>
        <p>
          Feel free to reach out through contact form or find our contact
          information below. Your feedback, questions, and suggestions are
          important to us as we strive to provide exceptional service to our
          prediction community.
        </p>
        <ul>
          <li><img src={mail_icon} alt="Mail Icon" />info.diabetesproject24@gmail.com</li>
          <li><img src={phone_icon} alt="Phone Icon" />+91 8459162696</li>
          <li><img src={location_icon} alt="Location Icon" />Nanded, Maharashtra, <br />India</li>
        </ul>
      </div>

      <div className="contact-col">
        <form className="form" onSubmit={onSubmit}>
          <label>Your name</label>
          <input type="text" name="name" placeholder="Your name" required />

          <label>Phone Number</label>
          <input type="tel" name="phone" placeholder="Your mobile number" />

          <label>Write your messages here</label>
          <textarea name="message" rows="6" placeholder="Your message" required></textarea>

          {/* Customer Rating */}
          <label>Rating</label>
          <div className="star-rating">
            {[...Array(5)].map((star, index) => (
              <div
                key={index}
                className={`star ${rating > index ? 'selected' : ''}`}
                onClick={() => handleStarClick(index)}
              >
                &#9733; {/* Unicode character for star */}
              </div>
            ))}
          </div>

          <button type="submit" className="btn dark-btn">
            Submit Now <img src={white_arrow} alt="White Arrow" />
          </button>
        </form>
        <span>{result}</span>
      </div>
    </div>
  );
};

export default Contact;
