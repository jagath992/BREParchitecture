import { Link } from 'react-router-dom';

import instagramIcon from '../assets/social/instagram.png';
import facebookIcon from '../assets/social/facebook.png';
import youtubeIcon from '../assets/social/youtube.png';

import './Footer.css';

const Footer = () => {
  const socialLinks = [
    { href: 'https://instagram.com', icon: instagramIcon, alt: 'Instagram' },
    { href: 'https://facebook.com', icon: facebookIcon, alt: 'Facebook' },
    { href: 'https://youtube.com', icon: youtubeIcon, alt: 'YouTube' },
  ];

  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__top">
          <div className="footer__title">
            <div className="footer__logo">
              <Link to="/">
                <h2>SRI MURUGAN</h2>
              </Link>
            </div>
            <div className="footer__separator"></div>
            <div className="footer__slogan">Gift & Decoration Store</div>
          </div>

          <nav className="footer__nav">
            <ul className="footer__list">
              {['BREP Architecture Studio','email@email.com','phonenumber'].map((item, index) => (
                <li key={index} className="footer__item">
                  <Link to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="footer__bottom">
          <div className="footer__legal">
            <div className="footer__copyright">
              © 2024 SRI MURUGAN. All rights reserved.
            </div>
            <div className="footer__links">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms-of-use">Terms of Use</Link>
              <a
                href={import.meta.env.VITE_ADMIN_URL || 'https://admin.example.com'}
                target="_blank"
                rel="noopener noreferrer"
              >
                Admin Panel
              </a>
            </div>
          </div>

          <div className="footer__socials">
            {socialLinks.map(({ href, icon, alt }, index) => (
              <a
                key={index}
                href={href}
                aria-label={alt}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
              >
                <img src={icon} alt={alt} className="footer__social-icon" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
