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
    if (!email.trim()) {
      setError('Введите email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Введите корректный email');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error('Ошибка отправки');
      }

      setSent(true);
    } catch (e) {
      setError('Не удалось отправить код');
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    if (code.trim().length !== 6) {
      setError('Введите 6-значный код');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      if (!res.ok) {
        throw new Error('Неверный код');
      }

      // автологин
      localStorage.setItem(
        'holdpoint_user',
        JSON.stringify({ email })
      );

      onContinue();
    } catch {
      setError('Неверный код');
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
            disabled={loading}
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