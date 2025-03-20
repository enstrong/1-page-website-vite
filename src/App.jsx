import { useState } from "react";
import './App.css'
import Header from './components/header.jsx'
import Footer from './components/footer.jsx'
import Bikes from './components/tabs/bikes.jsx'
import Teams from './components/tabs/teams.jsx'
import Gear from './components/tabs/gear.jsx'
import Support from './components/tabs/support.jsx'

export default function App() {
    const [activeTab, setActiveTab] = useState("bikes");
 
  return (
    <div className="wrapper">
      <Header activeTab={activeTab} setActiveTab={setActiveTab}/>

      {activeTab === "bikes" && <Bikes />}
      {activeTab === "teams" && <Teams />}
      {activeTab === "gear" && <Gear />}
      {activeTab === "support" && <Support />}
     
      <Footer/>
    </div>
  );
}