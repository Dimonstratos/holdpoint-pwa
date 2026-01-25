import React, { useState } from 'react';
import './EmailScreen.css';
import Disclaimer from '../components/Disclaimer';

type EmailScreenProps = {
  onContinue: () => void;
  onOpenTerms: () => void;
};

const EmailScreen: React.FC<EmailScreenProps> = ({
  onContinue,
  onOpenTerms,
}) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 📩 Отправка кода на email
  const sendCode = async () => {
    if (!email.trim()) {
      setError('Введите email');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/send-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Ошибка отправки письма');
      }

      setSent(true);
    } catch (err) {
      console.error(err);
      setError('Не удалось отправить код. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  // 🔐 MVP-проверка кода (пока принимаем любой 6-значный)
  const verifyCode = () => {
    if (code.trim().length !== 6) {
      setError('Введите 6-значный код');
      return;
    }

    onContinue();
  };

  return (
    <div className="email-screen">
      <h1 className="email-title">
        {sent ? 'Введите код' : 'Введите email'}
      </h1>

      {!sent ? (
        <>
          <input
            type="email"
            className="email-input"
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
            maxLength={6}
          />

          <button
  type="button"
  className="email-button"
  onClick={sendCode}
  disabled={loading}
>
            Продолжить
          </button>
        </>
      )}

      {error && (
        <p style={{ color: '#ef4444', marginTop: '16px' }}>
          {error}
        </p>
      )}

      <Disclaimer onOpenTerms={onOpenTerms} />
    </div>
  );
};

export default EmailScreen;