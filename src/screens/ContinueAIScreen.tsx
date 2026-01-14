import React from 'react';

type Props = {
  onContinue: () => void;
  onBackToChat: () => void;
};

const ContinueAIScreen: React.FC<Props> = ({ onContinue, onBackToChat }) => {
  return (
    <div
      style={{
        backgroundColor: '#0b1220',
        color: '#e5e7eb',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Inter, sans-serif',
        padding: '5vh 10px', // гибкий верхний/нижний отступ
        boxSizing: 'border-box',
        overflowY: 'auto',   // прокрутка если контент слишком большой
      }}
    >
      <h1 style={{ fontSize: '2rem', textAlign: 'center' }}>
        Продолжить разговор с ИИ
      </h1>

      <p
        style={{
          fontSize: '1.125rem',
          color: '#9ca3af',
          textAlign: 'center',
          marginTop: '2vh',
          lineHeight: 1.5,
        }}
      >
        Вы можете продолжить общение с ИИ без ограничений по количеству сообщений
      </p>

      <p
        style={{
          fontSize: '1.125rem',
          color: '#e5e7eb',
          textAlign: 'center',
          marginTop: '2vh',
        }}
      >
        Он будет рядом, когда вам это нужно
      </p>

      <ul
        style={{
          fontSize: '1.125rem',
          color: '#e5e7eb',
          marginTop: '2vh',
          listStyle: 'none',
          padding: 0,
          textAlign: 'center',
          lineHeight: 1.6,
        }}
      >
        <li>● Без ограничений по сообщениям</li>
        <li>● Ответы в любое время</li>
        <li>● Конфиденциально и анонимно</li>
        <li>● Без осуждения и морализаторства</li>
      </ul>

      <button
        onClick={onContinue}
        style={{
          marginTop: '5vh',
          width: '90%',
          maxWidth: 320,
          height: 48,
          backgroundColor: '#3b82f6',
          color: '#e5e7eb',
          fontSize: 18,
          borderRadius: 12,
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Продолжить с ИИ
      </button>

      <button
        onClick={onBackToChat}
        style={{
          marginTop: '2vh',
          width: '90%',
          maxWidth: 320,
          height: 48,
          backgroundColor: '#b1b2b5',
          color: '#e5e7eb',
          fontSize: 18,
          borderRadius: 12,
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Вернуться в чат
      </button>
    </div>
  );
};

export default ContinueAIScreen;