import React from 'react';
import './LimitScreen.css';

type LimitScreenProps = {
  onContinueAI: () => void;
  onRequestSpecialist: () => void;
};

const LimitScreen: React.FC<LimitScreenProps> = ({
  onContinueAI,
  onRequestSpecialist,
}) => {
  return (
    <div className="limit-screen">
      <h1 className="limit-title">
        Вы достигли лимита бесплатной поддержки
      </h1>

      <p className="limit-text">
        Чтобы продолжить, вы можете <br />
        запросить помощь <br />
        специалиста или выбрать подходящий тариф
      </p>

      <button className="limit-button ai" onClick={onContinueAI}>
        Продолжить с ИИ без ограничений
      </button>

      <button className="limit-button specialist" onClick={onRequestSpecialist}>
        ЗАПРОС СПЕЦИАЛИСТА
      </button>
    </div>
  );
};

export default LimitScreen;