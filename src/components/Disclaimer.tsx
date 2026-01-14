import React from 'react';
import './Disclaimer.css';

type DisclaimerProps = {
  onOpenTerms: () => void;
};

const Disclaimer: React.FC<DisclaimerProps> = ({ onOpenTerms }) => {
  return (
    <div className="disclaimer">
      ⚠️ Сервис не является медицинской, психологической или психотерапевтической помощью
      и не заменяет обращение к специалисту.
      <br />
      <span
        className="disclaimer-link"
        onClick={onOpenTerms}
      >
        Пользовательское соглашение
      </span>
    </div>
  );
};

export default Disclaimer;

