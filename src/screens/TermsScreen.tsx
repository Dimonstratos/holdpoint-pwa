import React, { useState } from 'react';
import './TermsScreen.css';

type TermsScreenProps = {
  onAccept: () => void;
};

const TermsScreen: React.FC<TermsScreenProps> = ({ onAccept }) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="terms-screen">
      <h1 className="terms-title">Пользовательское соглашение</h1>

      <p className="terms-text">
        Настоящий сервис предназначен для анонимного общения и получения
        поддерживающих ответов с использованием искусственного интеллекта.
      </p>

      <p className="terms-text">
        Сервис <strong>не является медицинской, психологической,
        психотерапевтической или юридической помощью</strong> и не заменяет
        обращение к квалифицированным специалистам.
      </p>

      <p className="terms-text">
        Ответы, предоставляемые сервисом, носят информационный и поддерживающий
        характер. Пользователь принимает решения самостоятельно и несёт за них
        полную ответственность.
      </p>

      <p className="terms-text">
        В случае угрозы жизни или здоровью, суицидальных мыслей или острого
        психоэмоционального состояния необходимо незамедлительно обратиться в
        службы экстренной помощи.
      </p>

      <p className="terms-text">
        Используя сервис, пользователь подтверждает, что ознакомился с данным
        соглашением и принимает его условия.
      </p>

      <label className="terms-checkbox">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <span>Я принимаю условия пользовательского соглашения</span>
      </label>

      <button
        className="terms-accept"
        disabled={!checked}
        onClick={onAccept}
      >
        Принимаю
      </button>
    </div>
  );
};

export default TermsScreen;