import './styles/App.scss';
import Footer from './components/Footer';
import Header from './components/Header';
import Content from './components/Content';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

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
      <Header language={language} />
      <Content language={language} />
      <Footer setLanguage={setLanguage} />
    </div>
  );
}

export default App;
