import '@/css/App.css'
import '@/css/tabs/bikes.css';

export default function Bikes() {
  return (
    <>
    <div className="section colnago-bg d-flex align-center">
      <div className="container d-flex align-center justify-center f-column">
        <h1 className="bikes-section__title uppercase">For the winners</h1>
        <section className="buy-now">
          <p className="bikes-section__text">Tadej Pogacar, 3-time Tour de France Champion rides <i>Colnago V4Rs</i></p>
          <button className="bikes-section__button d-flex">Buy now &#8594;</button>
        </section>
      </div>
    </div>

    <div className="section cervelo-bg d-flex align-center">
      <div className="container d-flex align-center justify-center f-column">
        <h1 className="bikes-section__title uppercase">The Elegant</h1>
        <section className="buy-now">
          <p className="bikes-section__text cervelo-text">Jonas Vingegaard, twice Tour de France Champion rides <i>Cervélo R5</i></p>
          <q>The Cervélo R5 is designed for all the glory and fanfare that comes with a summit and a finish on the descent below. A climbing bike that is light, aerodynamic and stiff, it shows that smooth handling, poise, and unmatched speed can come in one stealthy package.</q>
          <button className="bikes-section__button d-flex">Buy now &#8594;</button>
        </section>
      </div>
    </div>

    <div className="section pinarello-bg d-flex align-end">
      <div className="container d-flex f-column">
        <h1 className="bikes-section__title uppercase">Falling in love</h1>
        <section className="buy-now">
          <p className="bikes-section__text"><i>Pinarello</i> bikes won 7 Tour de France titles in the span of 8 years.</p>
          <button className="bikes-section__button pinarello__button d-flex">Buy now &#8594;</button>
        </section>
      </div>
    </div>

    <div className="section sworks-bg d-flex align-center">
      <div className="container d-flex f-column">
        <h1 className="bikes-section__title uppercase">S-Works</h1>
        <section className="buy-now">
          <p className="bikes-section__text"><i>Specialized S-Works</i>, the choice of champions, powered Astana to Tour de France glory in 2014.</p>
          <button className="bikes-section__button sworks__button d-flex">Buy now &#8594;</button>
        </section>
      </div>
    </div>
  </>
  );
}