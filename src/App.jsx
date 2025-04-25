import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './css/App.css';
import Header from '@/components/header.jsx';
import Footer from '@/components/footer.jsx';
import Bikes from '@/components/tabs/bikes.jsx';
import Teams from '@/components/tabs/teams.jsx';
import Gear from '@/components/tabs/gear.jsx';
import Support from '@/components/tabs/support.jsx';
import ScrollToTop from '@/components/scrollTop.jsx';

export default function App() {
  return (
    <Router>
      <div className="wrapper">
        <Header />
        
        <Routes>
          <Route path="/" element={<Bikes />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/gear" element={<Gear />} />
          <Route path="/support" element={<Support />} />
        </Routes>

        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
}