import './App.scss';
import React, { useState, useEffect, Suspense, lazy } from 'react';
import Cookies from 'js-cookie';

const Footer = lazy(() => import('./components/Footer'));
const Header = lazy(() => import('./components/Header'));
const Content = lazy(() => import('./components/Content'));

function App() {
  const [language, setLanguage] = useState(() => {
    const settings = JSON.parse(Cookies.get('dc_scrum_poker_settings') || '{}');
    return settings.language || 'en';
  });

  useEffect(() => {
    const settings = JSON.parse(Cookies.get('dc_scrum_poker_settings') || '{}');
    settings.language = language;
    Cookies.set('dc_scrum_poker_settings', JSON.stringify(settings), { expires: 365 });
  }, [language]);

  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Header language={language} />
        <Content language={language} />
        <Footer setLanguage={setLanguage} />
      </Suspense>
    </div>
  );
}

export default App;
