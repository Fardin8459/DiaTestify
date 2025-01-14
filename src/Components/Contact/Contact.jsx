import React, { useState } from "react";
import msg_icon from "../../assets/msg-icon.png";
import mail_icon from "../../assets/mail-icon.png";
import phone_icon from "../../assets/phone-icon.png";
import location_icon from "../../assets/location-icon.png";
import white_arrow from "../../assets/white-arrow.png";

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
      setTimeout(() => setResult(null), 4000);
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
    <div className="container mx-auto my-20 p-4 flex flex-wrap gap-8 justify-between bg-gradient-to-r">
      {/* Contact Info */}
      <div className="flex-1 bg-gradient-to-r from-green-200 via-blue-300 to-purple-400 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <h3 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
          Send us a message <img src={msg_icon} alt="Message Icon" className="ml-2 w-6 animate-bounce" />
        </h3>
        <p className="text-gray-700 mb-4">
          Feel free to reach out through the contact form or find our contact information below.
          Your feedback, questions, and suggestions are important to us as we strive to provide
          exceptional service to our prediction community.
        </p>
        <ul className="space-y-4">
          <li className="flex items-center text-gray-700">
            <img src={mail_icon} alt="Mail Icon" className="w-5 mr-3" />
            info.diabetesproject24@gmail.com
          </li>
          <li className="flex items-center text-gray-700">
            <img src={phone_icon} alt="Phone Icon" className="w-5 mr-3" />
            +91 8459162696
          </li>
          <li className="flex items-center text-gray-700">
            <img src={location_icon} alt="Location Icon" className="w-5 mr-3" />
            Nanded, Maharashtra, India
          </li>
        </ul>
      </div>

      {/* Contact Form */}
      <div className="flex-1 bg-gradient-to-r from-green-200 via-blue-300 to-purple-400 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label className="block text-gray-800 font-medium mb-2">Your Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-800 font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your mobile number"
            />
          </div>
          <div>
            <label className="block text-gray-800 font-medium mb-2">Write your message</label>
            <textarea
              name="message"
              rows="6"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your message"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-800 font-medium mb-2">Rating</label>
            <div className="flex space-x-2">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className={`text-5xl cursor-pointer transition ${
                    rating > index ? "text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => handleStarClick(index)}
                >
                  &#9733;
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-full font-medium flex justify-center items-center hover:bg-indigo-700 transition"
          >
            Submit Now <img src={white_arrow} alt="Arrow Icon" className="ml-2 w-4" />
          </button>
        </form>
        {result && <span className="block mt-4 text-green-600 font-semibold">{result}</span>}
      </div>
    </div>
  );
};

export default Contact;
