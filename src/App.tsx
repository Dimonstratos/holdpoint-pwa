import React, { useEffect, useState } from 'react';
import { Splash } from './components/Splash';

import Landing from './screens/Landing';
import EmailScreen from './screens/EmailScreen';
import ChatFree from './screens/ChatFree';
import LimitScreen from './screens/LimitScreen';
import ContinueAIScreen from './screens/ContinueAIScreen';
import TariffScreen from './screens/TariffScreen';
import HelpTypeScreen from './screens/HelpTypeScreen';
import TermsScreen from './screens/TermsScreen';

type Screen =
  | 'landing'
  | 'email'
  | 'chat-free'
  | 'limit'
  | 'continue-ai'
  | 'tariff'
  | 'type'
  | 'terms';

const App: React.FC = () => {
  /** SPLASH */
  const [loading, setLoading] = useState(true);

  /** АВТОРИЗАЦИЯ */
  const isLoggedIn = Boolean(localStorage.getItem('holdpoint_user'));

  const [screen, setScreen] = useState<Screen>(
    isLoggedIn ? 'chat-free' : 'landing'
  );

  const [prevScreen, setPrevScreen] = useState<Screen | null>(null);

  /** SPLASH TIMER */
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  /** ПРОВЕРКА ПОЛЬЗОВАТЕЛЯ */
  useEffect(() => {
    const user = localStorage.getItem('holdpoint_user');
    if (user) {
      setScreen('chat-free');
    }
  }, []);

  const openTerms = () => {
    setPrevScreen(screen);
    setScreen('terms');
  };

  /** ПОКАЗ SPLASH */
  if (loading) {
    return <Splash />;
  }

  return (
    <>
      {screen === 'landing' && (
        <Landing
          onStart={() => setScreen('email')}
          onOpenTerms={openTerms}
        />
      )}

      {screen === 'email' && (
        <EmailScreen
          onContinue={() => setScreen('chat-free')}
          onOpenTerms={openTerms}
        />
      )}

      {screen === 'chat-free' && (
        <ChatFree
          onLimitReached={() => setScreen('limit')}
          onOpenTerms={openTerms}
        />
      )}

      {screen === 'limit' && (
        <LimitScreen
          onContinueAI={() => setScreen('continue-ai')}
          onRequestSpecialist={() => setScreen('type')}
        />
      )}

      {screen === 'type' && (
        <HelpTypeScreen onSelect={() => setScreen('limit')} />
      )}

      {screen === 'continue-ai' && (
        <ContinueAIScreen
          onContinue={() => setScreen('tariff')}
          onBackToChat={() => setScreen('limit')}
        />
      )}

      {screen === 'tariff' && (
        <TariffScreen
          onStartUnlimited={() => setScreen('limit')}
        />
      )}

      {screen === 'terms' && prevScreen && (
        <TermsScreen onAccept={() => setScreen(prevScreen)} />
      )}
    </>
  );
};

export default App;