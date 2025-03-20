import { useState } from "react";
import './App.css'
import TdFlogo from '/TdF_logo_white.png';
import ShoppingCart from '/shopping-cart-white.png';
import Telegram from '/telegram.svg'
import Twitter from '/twitter.svg'
import Vk from '/vk-icon.svg'

export default function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("bikes");
 
    const toggleMenu = () => {
      setIsOpen(!isOpen);
      document.body.classList.toggle("lock", isOpen);
    };

    const handleTabClick = (tab) => {
      setActiveTab(tab);
      if (isOpen) {
        toggleMenu();
      }
    };
 
  return (
    <div className="wrapper">
      <div className="header">
        <div className="container d-flex align-center justify-center header-content">
          <nav className={`main-header-nav uppercase ${isOpen ? "open" : ""}`}>
            <a href="#" className={activeTab === "bikes" ? "active" : ""} onClick={(e) => { e.preventDefault(); handleTabClick("bikes"); }}>Bikes</a>
            <a href="#" className={activeTab === "teams" ? "active" : ""} onClick={(e) => { e.preventDefault(); handleTabClick("teams"); }}>Teams</a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleTabClick("bikes"); }}><img src={TdFlogo} alt="TdF logo" className="header__logo header__logo-tdf"/></a>
            <a href="#" className={activeTab === "gear" ? "active" : ""} onClick={(e) => { e.preventDefault(); handleTabClick("gear"); }}>Gear</a>
            <a href="#" className={activeTab === "support" ? "active" : ""} onClick={(e) => { e.preventDefault(); handleTabClick("support"); }}>Support</a>
            <a href="#"><img src={ShoppingCart} alt="Cart" className="header__logo header__logo-cart"/></a>
          </nav>
        </div>
      </div>
     
      {/* BIKES Tab Content */}
      {activeTab === "bikes" && (
        <>
          <div className="main-1 d-flex align-center">
            <div className="container d-flex align-center justify-center f-column">
              <h1 className="main-1-title uppercase">For the winners</h1>
              <section className="buy-now">
                <p className="main-1-text">Tadej Pogacar, 3-time Tour de France Champion rides <i>Colnago V4Rs</i></p>
                <button className="main-1-button d-flex">Buy now &#8594;</button>
              </section>
            </div>
          </div>
     
          <div className="main-2 d-flex align-center">
            <div className="container d-flex align-center justify-center f-column">
              <h1 className="main-2-title">Cervelo R5</h1>
              <section className="buy-now">
                <p className="main-1-text main-2-text">Jonas Vingegaard, twice Tour de France Champion rides <i>Cervelo R5</i></p>
                <q>The Cervelo R5 is designed for all the glory and fanfare that comes with a summit and a finish on the descent below. A climbing bike that is light, aerodynamic and stiff, it shows that smooth handling, poise, and unmatched speed can come in one stealthy package.</q>
                <button className="main-1-button d-flex">Buy now &#8594;</button>
              </section>
            </div>
          </div>
        </>
      )}

      {/* TEAMS Tab Content */}
      {activeTab === "teams" && (
        <>
          <div className="main-3 d-flex align-center">
            <div className="container d-flex align-center justify-center f-column">
              <h1 className="main-3-title uppercase">UAE Team Emirates</h1>
              <section className="team-info">
                <p className="main-3-text">Led by Tadej Pogacar, UAE Team Emirates has dominated the Tour de France in recent years</p>
                <button className="main-3-button d-flex">Team details &#8594;</button>
              </section>
            </div>
          </div>
     
          <div className="main-4 d-flex align-center">
            <div className="container d-flex align-center justify-center f-column">
              <h1 className="main-4-title">Team Visma | Lease a Bike</h1>
              <section className="team-info">
                <p className="main-3-text main-4-text">With Jonas Vingegaard as team leader, Visma | Lease a Bike continues to be a major force in professional cycling</p>
                <button className="main-3-button d-flex">Team details &#8594;</button>
              </section>
            </div>
          </div>
        </>
      )}

      {/* GEAR Tab Content */}
      {activeTab === "gear" && (
        <div className="main-gear d-flex align-center">
          <div className="container d-flex align-center justify-center f-column">
            <h1 className="gear-title uppercase">Cycling Gear</h1>
            <section className="gear-info">
              <p className="gear-text">Professional cycling apparel and accessories</p>
              <button className="gear-button d-flex">Shop gear &#8594;</button>
            </section>
          </div>
        </div>
      )}

      {/* SUPPORT Tab Content */}
      {activeTab === "support" && (
        <div className="main-support d-flex align-center">
          <div className="container d-flex align-center justify-center f-column">
            <h1 className="support-title uppercase">Customer Support</h1>
            <section className="support-info">
              <p className="support-text">Need help? Our support team is here for you</p>
              <button className="support-button d-flex">Contact us &#8594;</button>
            </section>
          </div>
        </div>
      )}
     
      <div className="footer">
        <div className="container">
          <div className="social-networks">
            <p className="our-social-networks uppercase">Our contacts:</p>
            <div className="social-networks-img">
              <a href="#" target="_blank">
                <img src={Twitter} className="link" alt="Twitter" />
              </a>
              <a href="#" target="_blank">
                <img src={Telegram} className="link" alt="Telegram" />
              </a>
              <a href="#" target="_blank">
                <img src={Vk} className="link" alt="VK" />
              </a>
            </div>
          </div>
          <p className="made-by">© Made by enstrONGO</p>
        </div>
      </div>
    </div>
  );
}