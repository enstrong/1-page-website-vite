import './App.css'
import Header from './header.jsx'
import Erbolat from '/erbolat.jpg'

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
      
      <div className="footer">
        <div className="container">
          <div className="social-networks">
            <p className="our-social-networks">Контакты:</p>
            <div className="social-networks-img">
              <a href="#" target="_blank">
                <img src={Erbolat} className="link" alt="Twitter" />
              </a>
              <a href="https://t.me/enstrongo" target="_blank">
                <img src={Erbolat} className="link" alt="Telegram" />
              </a>
              <a href="#" target="_blank">
                <img src={Erbolat} className="link" alt="VK" />
              </a>
            </div>
          </div>
          <p className="made-by">© Made by enstrONGO</p>
        </div>
      </div>
    </div>
  );
}