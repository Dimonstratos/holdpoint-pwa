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

  // 🔹 ШАГ 1. Отправка кода
  const sendCode = async () => {
    if (!email.trim()) {
      setError('Введите email');
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
        throw new Error();
      }

      setSent(true);
    } catch {
      setError('Не удалось отправить код. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  // 🔹 ШАГ 2. Проверка кода + автологин
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
        throw new Error();
      }

      const data = await res.json();

      // 🔐 СОХРАНЯЕМ АВТО-ЛОГИН
      localStorage.setItem(
        'holdpoint_user',
        JSON.stringify({
          userId: data.userId,
          email: data.email,
        })
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
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={loading}
          />

          <button
            className="email-button"
            onClick={sendCode}
            disabled={loading}
          >
            {loading ? 'Отправка…' : 'Получить код'}
          </button>
        </>
      ) : (
        <>
          <input
            className="email-input"
            placeholder="Код из письма"
            value={code}
            onChange={e => setCode(e.target.value)}
            disabled={loading}
          />

          <button
            className="email-button"
            onClick={verifyCode}
            disabled={loading}
          >
            {loading ? 'Проверка…' : 'Продолжить'}
          </button>
        </>
      )}

      {error && <p style={{ color: '#ef4444', marginTop: 16 }}>{error}</p>}

      <Disclaimer onOpenTerms={onOpenTerms} />
    </div>
  );
};

export default EmailScreen;