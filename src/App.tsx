import React, { useState } from 'react';

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
  const [screen, setScreen] = useState<Screen>('landing');
  const [prevScreen, setPrevScreen] = useState<Screen | null>(null);

  const openTerms = () => {
    setPrevScreen(screen);
    setScreen('terms');
  };

  return (
    <>
      {screen === 'landing' && (
        <Landing onStart={() => setScreen('email')}
        onOpenTerms={openTerms} />
      )}

      {screen === 'email' && (
        <EmailScreen onContinue={() => setScreen('chat-free')}
        onOpenTerms={openTerms} />
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
        <TariffScreen onStartUnlimited={() => console.log('Начать безлимит')} />
      )}

      {screen === 'terms' && prevScreen && (
        <TermsScreen onAccept={() => setScreen(prevScreen)} />
      )}

      {screen === 'tariff' && (
  <TariffScreen onStartUnlimited={() => setScreen('limit')} />
)}
    </>
  );
};

export default App;