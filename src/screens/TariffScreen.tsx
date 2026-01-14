import { useState, useEffect } from 'react';
import './TariffScreen.css';

type TariffScreenProps = {
  onStartUnlimited: () => void;
};

const TariffScreen = ({ onStartUnlimited }: TariffScreenProps) => {
  const [stub, setStub] = useState(false);

  useEffect(() => {
    if (stub) {
      const timer = setTimeout(() => {
        onStartUnlimited();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [stub, onStartUnlimited]);

  if (stub) {
    return (
      <div className="tariff-screen">
        <div className="tariff-container tariff-center">
          <h2 className="tariff-stub-title">
            Оплата появится в ближайшее время
            Продолжить бесплатное общение вы сможете
            через 24 часа.
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="tariff-screen">
      <div className="tariff-container">
        <h1 className="tariff-title">Продолжить без ограничений</h1>

        <p className="tariff-text">
          Получите неограниченное общение с ИИ когда вам это нужно.
          Поддержка анонимна и конфиденциальна
        </p>

        <ul className="tariff-features">
          <li>● Ответы в любое время</li>
          <li>● Неограниченное количество сообщений</li>
          <li>● Без осуждения и морализаторства</li>
        </ul>

        <div className="tariff-card">₽499 / месяц</div>

        <button
          className="tariff-button"
          onClick={() => setStub(true)}
        >
          Начать безлимит
        </button>
      </div>
    </div>
  );
};

export default TariffScreen;