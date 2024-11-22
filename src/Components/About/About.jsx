import React from 'react';
import './about.css';

const About = () => {
  return (
    <div className="background-image" >
      {/* About Section */}
      <section id="about">
        <div className="container">
          <h2 className="fade-in">About Us</h2>
          <div className="about-content slide-in">
            <p>Your Health. Our Priority. At <strong>DiaTestify</strong>, we are dedicated to empowering individuals to understand and manage their diabetes with our advanced classification tools. Our technology is designed to provide accurate insights, helping you stay informed and make the best health decisions.</p>
          </div>

          {/* Company Overview Section */}
          <div className="overview bounce-in">
            <h3>Company Overview</h3>
            <p>Founded in 2023, <strong>DiaTestify</strong> is on a mission to revolutionize the way diabetes is detected and managed. We specialize in providing easy-to-use, high-tech solutions that help individuals classify and monitor their diabetes risks in real-time, ensuring they stay one step ahead in managing their health.</p>
          </div>

          {/* Vision & Mission Section */}
          <div className="vision-mission fade-in">
            <div className="mission-box">
              <h3>Our Vision</h3>
              <p>To empower people around the world to live healthier, diabetes-free lives through innovation, technology, and continuous research.</p>
            </div>
            <div className="mission-box">
              <h3>Our Mission</h3>
              <p>We strive to transform diabetes care by offering real-time, personalized tools that are accessible to everyone, promoting better lifestyle choices and health management.</p>
            </div>
          </div>

          {/* What We Believe Section */}
          <div className="overview bounce-in">
            <h3>What We Believe !!</h3>
            <ul className="li" style={{ color: 'gray', fontSize: '20px', lineHeight: '30px' }}>
              <li>Everyone deserves access to accurate health information.</li>
              <li>Prevention is the key to long-term diabetes management.</li>
              <li>Data science and technology can unlock the path to better health outcomes.</li>
              <li>Empathy and user-centric designs should be at the core of healthcare tools.</li>
            </ul>
          </div>

          {/* Meet Our Team Section */}
          <div className="team fade-in">
            <h3>Meet Our Team</h3>
            <div className="team-grid">
              <div className="team-member">
                <img src="src/assets/abt-img/mem 1.jpg" alt="Team Member" />
                <h4>Shubhangi Takbide</h4>
                <p>Lead Developer</p>
              </div>
              <div className="team-member">
                <img src="src/assets/abt-img/mem 2.jpg" alt="Team Member" />
                <h4>Fardin Shaikh</h4>
                <p>Backend Developer</p>
              </div>
              <div className="team-member">
                <img src="src/assets/abt-img/mem 3.jpg" alt="Team Member" />
                <h4>Tejas Kotlwar</h4>
                <p>UI/UX Designer</p>
              </div>
              <div className="team-member">
                <img src="src/assets/abt-img/mem 4.png" alt="Team Member" />
                <h4>Mayuri Mustare</h4>
                <p>Frontend Developer</p>
              </div>
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="cta zoom-in">
            <h3 style={{ color: 'black' }}>Take Control of Your Health Today</h3>
            <p>Join our platform to explore the power of diabetes classification and stay one step ahead in managing your health.</p>
            <a href="/" className="cta-button">Get Started</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
