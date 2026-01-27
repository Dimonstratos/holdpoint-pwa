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
  const [serverCode, setServerCode] = useState('');
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

      const data = await res.json();

      if (!res.ok) throw new Error();

      // ⚠️ MVP: временно сохраняем код на фронте
      setServerCode(data.code);

      setSent(true);
    } catch {
      setError('Не удалось отправить код');
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
  setLoading(true);
  setError('');

  try {
    const res = await fetch('/api/verify-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    });

    if (!res.ok) throw new Error();

    onContinue();
  } catch {
    setError('Неверный или устаревший код');
  } finally {
    setLoading(false);
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