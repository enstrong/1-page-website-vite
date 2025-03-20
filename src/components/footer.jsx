import Telegram from '/telegram.svg'
import Twitter from '/twitter.svg'
import Vk from '/vk-icon.svg'

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
              <a href="#" target="_blank">
                <img src={Vk} className="link" alt="VK" />
              </a>
            </div>
          </div>
          <p className="made-by">© Made by enstrONGO</p>
        </div>
      </div>
  );
}