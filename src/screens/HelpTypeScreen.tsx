import React, { useState, useEffect } from 'react';
import './HelpTypeScreen.css';

type HelpTypeScreenProps = {
  onSelect: () => void;
};

const HelpTypeScreen: React.FC<HelpTypeScreenProps> = ({ onSelect }) => {
  const [selected, setSelected] = useState<'emotional' | 'legal' | null>(null);
  const [showMessage, setShowMessage] = useState(false);

  const handleSelect = (type: 'emotional' | 'legal') => {
    if (selected) return;

    setSelected(type);
    setShowMessage(true);
  };

  useEffect(() => {
    if (!showMessage) return;

    const timer = setTimeout(() => {
      onSelect(); // возврат на LimitScreen
    }, 2000);

    return () => clearTimeout(timer);
  }, [showMessage, onSelect]);

  return (
    <div className="help-type-screen">
      <h1 className="help-type-title">Выберете тип помощи</h1>

      <div
        className={`help-card ${selected === 'emotional' ? 'selected' : ''}`}
        onClick={() => handleSelect('emotional')}
      >
        <p className="help-card-text">
          💬 Эмоциональная поддержка
          <br />
          Поговорить, разобраться, снизить напряжение
        </p>
      </div>

      <div
        className={`help-card ${selected === 'legal' ? 'selected' : ''}`}
        onClick={() => handleSelect('legal')}
      >
        <p className="help-card-text">
          ⚖️ Юридическая консультация
          <br />
          Развод, алименты, имущество, документы
        </p>
      </div>

      {showMessage && (
        <p className="help-info-message">
          Специалисты будут доступны в ближайшее время
        </p>
      )}
    </div>
  );
};

export default HelpTypeScreen;