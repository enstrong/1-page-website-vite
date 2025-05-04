import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import '@/css/App.css';
import '@/css/header.css';
import TdFlogo from '/icons/TdF_logo_white.png';
import ShoppingCart from '/icons/shopping-cart-white.png';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 700);
    };

    // Initial check
    checkScreenSize();
    
    // Add event listener
    window.addEventListener('resize', checkScreenSize);
    
    // Clean up
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.classList.toggle("lock", !isOpen);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleClick = () => {
    if (isOpen) toggleMenu();
    scrollToTop();
  };

  return (
    <div className="header">
      <div className="container header-content">
        {isMobile ? (
          <>
            <div className="mobile-header">
              <Link to="/cart" onClick={handleClick} className="mobile-cart-link">
                <img src={ShoppingCart} alt="Cart" className="header__logo header__logo-cart" />
              </Link>
              
              <Link to="/" onClick={handleClick} className="mobile-logo-link">
                <img src={TdFlogo} alt="TdF logo" className="header__logo header__logo-tdf" />
              </Link>
              
              <button className="burger-menu-button" onClick={toggleMenu} aria-label="Menu">
                <div className={`burger-icon ${isOpen ? "open" : ""}`}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </button>
              
              <div className={`mobile-nav ${isOpen ? "open" : ""}`}>
                <div className="mobile-nav-links uppercase">
                  <Link to="/" className={pathname === "/" ? "active" : ""} onClick={handleClick}>Bikes</Link>
                  <Link to="/teams" className={pathname === "/teams" ? "active" : ""} onClick={handleClick}>Teams</Link>
                  <Link to="/gear" className={pathname === "/gear" ? "active" : ""} onClick={handleClick}>Shop</Link>
                  <Link to="/support" className={pathname === "/support" ? "active" : ""} onClick={handleClick}>Support</Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <nav className="main-header-nav uppercase">
            <Link to="/" className={pathname === "/" ? "active" : ""} onClick={handleClick}>Bikes</Link>
            <Link to="/teams" className={pathname === "/teams" ? "active" : ""} onClick={handleClick}>Teams</Link>
            <Link to="/" onClick={handleClick}>
              <img src={TdFlogo} alt="TdF logo" className="header__logo header__logo-tdf" />
            </Link>
            <Link to="/gear" className={pathname === "/gear" ? "active" : ""} onClick={handleClick}>Shop</Link>
            <Link to="/support" className={pathname === "/support" ? "active" : ""} onClick={handleClick}>Support</Link>
            <Link to="/cart" onClick={handleClick}>
              <img src={ShoppingCart} alt="Cart" className="header__logo header__logo-cart" />
            </Link>
          </nav>
        )}
      </div>
    </div>
  );
}