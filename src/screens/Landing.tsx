import './Landing.css';
import Disclaimer from '../components/Disclaimer';

type LandingProps = {
  onStart: () => void;
  onOpenTerms: () => void;
};

const Landing: React.FC<LandingProps> = ({ onStart, onOpenTerms }) => {
  return (
    <div className="landing-screen">
      <h1 className="landing-title">HOLD•POINT</h1>

      <p className="landing-subtitle">
        Поддержка, когда всё рушится
      </p>

      <p className="landing-text">
        Если вас бросили, предали или вы оказались<br />
        в сложной жизненной точке — вы можете<br />
        спокойно поговорить здесь.
      </p>

      <ul className="landing-features">
        <li>Анонимно</li>
        <li>Без осуждения</li>
        <li>Без морализаторства</li>
      </ul>

      <button className="landing-button" onClick={onStart}>
        НАЧАТЬ РАЗГОВОР
      </button>

      {/* 👇 Дисклеймер с ссылкой на Terms */}
      <Disclaimer onOpenTerms={onOpenTerms} />
    </div>
  );
};

export default Landing;