import '@/css/App.css'
import '@/css/tabs/support.css';

export default function Support() {
  return (
    <>
      <div className="section support d-flex align-center">
        <div className="container d-flex align-center justify-center f-column">
          <h1 className="support-title uppercase">Customer Support</h1>
          <section className="support-info">
            <p className="support-text">Need help? Our support team is here for you</p>
            <div className="support-buttons d-flex align-center justify-space-between">
              <button className="bikes-section__button d-flex">FAQ</button>
              <button className="bikes-section__button d-flex">Contact us &#8594;</button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}