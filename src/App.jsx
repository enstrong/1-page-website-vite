import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './css/App.css';
import Header from '@/components/header.jsx';
import Footer from '@/components/footer.jsx';
import Bikes from '@/components/tabs/bikes.jsx';
import Teams from '@/components/tabs/teams.jsx';
import Gear from '@/components/tabs/gear.jsx';
import Support from '@/components/tabs/support.jsx';
import Cart from '@/components/tabs/cart.jsx';
import Checkout from '@/components/tabs/checkout.jsx';
import Admin from '@/components/tabs/admin.jsx';
import ScrollToTop from '@/components/scrollTop.jsx';

export default function App() {
  useEffect(() => {
    if (!localStorage.getItem('session_id')) {
      localStorage.setItem('session_id', crypto.randomUUID());
    }
  }, []);
  
  return (
    <Router>
      <div className="wrapper">
        <Header />
        
        <Routes>
          <Route path="/" element={<Bikes />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/gear" element={<Gear />} />
          <Route path="/support" element={<Support />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/checkout" element={<Checkout />} />
        </Routes>

        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
}