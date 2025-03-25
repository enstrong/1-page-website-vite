import '@/css/App.css'
import '@/css/scrollTop.css'
import ArrowUp from '/icons/arrow-up.svg'
import React, { useState, useEffect } from 'react'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > window.innerHeight);
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button 
          onClick={scrollToTop}
          className="scroll-to-top"
        >
          <img src={ArrowUp} alt="Scroll to top" />
        </button>
      )}
    </>
  );
}