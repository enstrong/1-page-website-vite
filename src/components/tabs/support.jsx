import React, { useState } from 'react';
import '@/css/App.css';
import '@/css/tabs/support.css';

export default function Support() {
  const [showFAQ, setShowFAQ] = useState(false);
  const [expandedQuestions, setExpandedQuestions] = useState({});

  const toggleFAQ = () => {
    setShowFAQ(!showFAQ);
    if (showFAQ) {
      setExpandedQuestions({});
    }
  };

  const toggleQuestion = (questionId) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const faqItems = [
    {
      id: "q1",
      question: "How do I track my order?",
      answer: "All updates about your order are sent to your email, which you provided when purchasing from us."
    },
    {
      id: "q2",
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all unused items in original packaging. Custom orders and sale items may have different return policies."
    },
    {
      id: "q3",
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. Shipping rates and delivery times vary based on location. Please check our shipping page for more details."
    },
    {
      id: "q4",
      question: "How do I determine the right bike size for me?",
      answer: "Are you dumb?"
    }
  ];

  return (
    <>
      <div className="section support d-flex align-center">
        <div className="container d-flex align-center justify-center f-column">
          <h1 className="support-title uppercase">Customer Support</h1>
          <section className="support-info">
            <p className="support-text">Need help? Our support team is here for you</p>
            <div className="support-buttons d-flex align-center justify-space-between">
              <button 
                className="bikes-section__button d-flex" 
                onClick={toggleFAQ}
              >
                FAQ {showFAQ ? '▲' : '▼'}
              </button>
              <a href="tel:87776664433"><button className="bikes-section__button d-flex">Contact us &#8594;</button></a>
            </div>
            
            {showFAQ && (
              <div className="faq-container">
                <h2 className="faq-heading">Frequently Asked Questions</h2>
                <div className="faq-list">
                  {faqItems.map((item) => (
                    <div key={item.id} className="faq-item">
                      <div 
                        className="faq-question" 
                        onClick={() => toggleQuestion(item.id)}
                      >
                        <span>{item.question}</span>
                        <span className="faq-toggle-icon">
                          {expandedQuestions[item.id] ? '−' : '+'}
                        </span>
                      </div>
                      {expandedQuestions[item.id] && (
                        <div className="faq-answer">
                          <p>{item.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}