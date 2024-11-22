import { FaWhatsapp, FaPhoneAlt, FaSms } from 'react-icons/fa';
import './FloatingIcon.css';

const FloatingIcons = () => {
  return (
    <div className="floating-icons">
      <a href="https://wa.me/+918459162696" className="floatingicon whatsapp" target="_blank" rel="noopener noreferrer">
        <FaWhatsapp size={25} />
        <span className="tooltip"> +918459162696</span>
      </a>
      <a href="tel:+918459162696" className="floatingicon call">
        <FaPhoneAlt size={25} />
        <span className="tooltip">+918459162696</span>
      </a>
      <a href="sms:+918459162696" className="floatingicon sms">
        <FaSms size={25} />
        <span className="tooltip">+918459162696</span>
      </a>
    </div>
  );
};

export default FloatingIcons;