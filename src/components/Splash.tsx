import React, { useEffect, useState } from "react";

export function Splash({ onFinish }: { onFinish?: () => void }) {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Начать fade через 1.5 секунды
    const timer = setTimeout(() => {
      setFade(true);
      // Уведомляем родителя через 0.7 сек (когда завершится анимация)
      const endTimer = setTimeout(() => {
        onFinish?.();
      }, 700);
      return () => clearTimeout(endTimer);
    }, 1500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#111",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        opacity: fade ? 0 : 1,
        transition: "opacity 0.7s ease",
      }}
    >
      {/* Пульсирующая точка */}
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "#fff",
          marginBottom: 24,
          opacity: 0.8,
          animation: "pulse 1.2s infinite ease-in-out",
        }}
      />

      <p style={{ fontSize: 16, opacity: 0.7 }}>Можно просто написать</p>

      {/* Анимация pulse */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.4); opacity: 0.5; }
            100% { transform: scale(1); opacity: 0.8; }
          }
        `}
      </style>
    </div>
  );
}