import './App.css'
import Header from './header.jsx'
import Telegram from '/telegram.svg'
import Twitter from '/twitter.svg'
import Vk from '/vk-icon.svg'

export default function App() {
  return (
    <div className="wrapper">
      <Header/>
      
      <div className="main-1 d-flex align-center">
        <div className="container d-flex align-center justify-center f-column">
          <h1 className="main-1-title">FOR THE WINNERS</h1>
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
            <button className="main-1-button uppercase d-flex">Buy now &#8594;</button>
          </section>
        </div>
      </div>
      
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