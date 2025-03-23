import UAE from '/team-logos/UAE_team_logo.png';
import Visma from '/team-logos/Team_Visma_logo.png';
import Sky from '/team-logos/Team_Sky_logo.jpg';
import Astana from '/team-logos/Astana_Team_Logo.jpg';

export default function Teams() {
  return (
    <>
      <div className="teams-section bikes-section d-flex align-center">
        <div className="container d-flex align-center justify-space-between teams-section__group-logos">
          <a href=""><img src={UAE} alt="" className="teams-section__logo"/></a>
          <a href=""><img src={Visma} alt="" className="teams-section__logo"/></a>
          <a href=""><img src={Sky} alt="" className="teams-section__logo"/></a>
          <a href=""><img src={Astana} alt="" className="teams-section__logo"/></a>
        </div>
      </div>

      <div className="uaeteam bikes-section d-flex align-center">
        <div className="container d-flex align-center justify-center f-column">
          <h1 className="uaeteam-title uppercase">UAE Team Emirates</h1>
          <section className="team-info">
            <p className="uaeteam-text">Led by Tadej Pogacar, UAE Team Emirates has dominated the Tour de France in recent years</p>
            <button className="bikes-section__button uaeteam-button d-flex">Team details &#8594;</button>
          </section>
        </div>
      </div>
  
      <div className="main-4 bikes-section d-flex align-center">
        <div className="container d-flex align-center justify-center f-column">
          <h1 className="main-4-title">Team Visma | Lease a Bike</h1>
          <section className="team-info">
            <p className="uaeteam-text main-4-text">With Jonas Vingegaard as team leader, Visma | Lease a Bike continues to be a major force in professional cycling</p>
            <button className="bikes-section__button uaeteam-button d-flex">Team details &#8594;</button>
          </section>
        </div>
      </div>
    </>
  );
}