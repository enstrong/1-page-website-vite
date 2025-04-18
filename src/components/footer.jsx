import '@/css/App.css'
import '@/css/footer.css'
import Telegram from '/icons/telegram.svg'
import Twitter from '/icons/twitter.svg'

export default function Footer() {
  return (
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
          </div>
        </div>
        <p className="made-by">© Made by enstrONGO</p>
      </div>
    </div>
  );
}