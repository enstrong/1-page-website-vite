import '@/css/App.css'
import '@/css/tabs/gear.css'

export default function Gear() {
  return (
    <>
      <div className="gear section d-flex align-center">
        <div className="container d-flex align-center justify-center f-column">
          <h1 className="gear-title uppercase">Cycling Gear</h1>
          <section className="gear-info">
            <p className="gear-text">Professional cycling apparel and accessories</p>
            <button className="gear-button d-flex">Shop gear &#8594;</button>
          </section>
        </div>
      </div>


    </>
  );
}