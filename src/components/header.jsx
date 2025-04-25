import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import '@/css/App.css';
import '@/css/header.css';
import TdFlogo from '/icons/TdF_logo_white.png';
import ShoppingCart from '/icons/shopping-cart-white.png';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.classList.toggle("lock", isOpen);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleClick = () => {
    if (isOpen) toggleMenu();
    scrollToTop();
  };

  return (
    <div className="header">
      <div className="container d-flex align-center justify-center header-content">
        <nav className={`main-header-nav uppercase ${isOpen ? "open" : ""}`}>
          <Link to="/" className={pathname === "/" ? "active" : ""} onClick={handleClick}>Bikes</Link>
          <Link to="/teams" className={pathname === "/teams" ? "active" : ""} onClick={handleClick}>Teams</Link>
          <Link to="/" onClick={handleClick}><img src={TdFlogo} alt="TdF logo" className="header__logo header__logo-tdf" /></Link>
          <Link to="/gear" className={pathname === "/gear" ? "active" : ""} onClick={handleClick}>Gear</Link>
          <Link to="/support" className={pathname === "/support" ? "active" : ""} onClick={handleClick}>Support</Link>
          <a href="#"><img src={ShoppingCart} alt="Cart" className="header__logo header__logo-cart" /></a>
        </nav>
      </div>
    </div>
  );
}