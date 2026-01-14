import React, { useState } from 'react';
import './EmailScreen.css';
import Disclaimer from '../components/Disclaimer';

type EmailScreenProps = {
  onContinue: () => void;
  onOpenTerms: () => void;
}

const EmailScreen: React.FC<EmailScreenProps> = ({ onContinue, onOpenTerms }) => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const sendMagicLink = () => {
    if (!email.trim()) return;
    // Здесь в реальном проекте можно вызвать API для отправки magic link
    setSent(true);
  }

  return (
    <div className="email-screen">
      <h1 className="email-title">Введите email</h1>
      <p className="email-text">
        Мы используем его только для входа<br/>
        и защиты от спама
      </p>

      {!sent ? (
        <>
          <input
            type="email"
            className="email-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="email-button" onClick={sendMagicLink}>
            ПОЛУЧИТЬ ССЫЛКУ
          </button>
        </>
      ) : (
        <button className="email-button" onClick={onContinue}>
          Продолжить
        </button>
      )}
      <Disclaimer onOpenTerms={onOpenTerms}/>
    </div>
  )
}

export default EmailScreen;