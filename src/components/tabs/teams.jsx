import '@/css/App.css'
import '@/css/tabs/teams.css'
import UAE from '/team-logos/UAE_team_logo.png'
import Visma from '/team-logos/Team_Visma_logo.png'
import Sky from '/team-logos/Team_Sky_logo.jpg'
import Astana from '/team-logos/Astana_Team_Logo.jpg'

export default function Teams() {
  function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <>
      <div className="section teams-section d-flex align-center">
        <div className="container d-flex align-center justify-space-between teams-section__group-logos">
          <div onClick={() => scrollToElement('uae')}>
            <img src={UAE} alt="uae team logo" className="teams-section__logo teams-section__logo-uae"/>
          </div>
          <div onClick={() => scrollToElement('visma')}>
            <img src={Visma} alt="team visma logo" className="teams-section__logo teams-section__logo-visma"/>
          </div>
          <div onClick={() => scrollToElement('sky')}>
            <img src={Sky} alt="team sky logo" className="teams-section__logo teams-section__logo-sky"/>
          </div>
          <div onClick={() => scrollToElement('astana')}>
            <img src={Astana} alt="astana team logo" className="teams-section__logo teams-section__logo-astana"/>
          </div>
        </div>
      </div>

      <div id='uae' className="section uaeteam d-flex align-center">
        <div className="container d-flex align-center justify-center f-column">
          <h1 className="uaeteam-title uppercase">UAE Team Emirates</h1>
          <section className="team-info">
            <p className="uaeteam-text">Led by Tadej Pogacar, UAE Team Emirates has dominated the Tour de France in recent years</p>
            <button className="bikes-section__button uaeteam-button d-flex">Team details &#8594;</button>
          </section>
        </div>
      </div>
  
      <div id='visma' className="section teamvisma section d-flex align-center">
        <div className="container d-flex align-center justify-center f-column">
          <h1 className="teamvisma-title">Team Visma | Lease a Bike</h1>
          <section className="team-info">
            <p className="uaeteam-text teamvisma-text">With Jonas Vingegaard as team leader, Visma | Lease a Bike continues to be a major force in professional cycling</p>
            <button className="bikes-section__button uaeteam-button d-flex">Team details &#8594;</button>
          </section>
        </div>
      </div>
    </>
  );
}