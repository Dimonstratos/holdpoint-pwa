import React, { useState } from 'react';
import './EmailScreen.css';
import Disclaimer from '../components/Disclaimer';

type EmailScreenProps = {
  onContinue: () => void;
  onOpenTerms: () => void;
};

const EmailScreen: React.FC<EmailScreenProps> = ({ onContinue, onOpenTerms }) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendCode = async () => {
    if (!email.trim()) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error('Ошибка отправки');

      setSent(true);
    } catch {
      setError('Не удалось отправить код');
    } finally {
      setLoading(false);
    }
  };

  // ⚠️ MVP: принимаем любой код
  const verifyCode = () => {
    if (code.trim().length === 6) {
      onContinue();
    }
  };

  return (
    <div className="email-screen">
      <h1 className="email-title">
        {sent ? 'Введите код' : 'Введите email'}
      </h1>

      {!sent ? (
        <>
          <input
            className="email-input"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <button
            className="email-button"
            onClick={sendCode}
            disabled={loading}
          >
            {loading ? 'Отправка...' : 'Получить код'}
          </button>
        </>
      ) : (
        <>
          <input
            className="email-input"
            placeholder="Код из письма"
            value={code}
            onChange={e => setCode(e.target.value)}
          />

          <button
            className="email-button"
            onClick={verifyCode}
          >
            Продолжить
          </button>
        </>
      )}

      {error && <p style={{ color: '#ef4444' }}>{error}</p>}

      <Disclaimer onOpenTerms={onOpenTerms} />
    </div>
  );
};

export default EmailScreen;