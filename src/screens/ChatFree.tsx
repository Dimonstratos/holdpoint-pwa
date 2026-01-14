import React, { useState, useRef, useEffect } from 'react';
import './ChatFree.css';
import Disclaimer from '../components/Disclaimer';
import { fetchOpenRouterReply } from '../utils/openrouter';

type ChatFreeProps = {
  onLimitReached: () => void;
  onOpenTerms: () => void;
};

type Message = {
  user: string;
  ai: string;
};

type ORMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

const ChatFree: React.FC<ChatFreeProps> = ({ onLimitReached, onOpenTerms }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [counter, setCounter] = useState(30);
  const [loading, setLoading] = useState(false);

  const historyRef = useRef<HTMLDivElement>(null);

  // 🔹 Автопрокрутка вниз
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
  if (!input.trim() || loading) return;

  if (counter <= 0) {
    onLimitReached();
    return;
  }

  const userMessage = input;

  // добавляем сообщение пользователя + заглушку ИИ
  setMessages(prev => [...prev, { user: userMessage, ai: '...' }]);
  setInput('');
  setCounter(prev => prev - 1);
  setLoading(true);

  try {
    // 🔹 История диалога (последние 6 сообщений)
    const historyForAI: ORMessage[] = messages
      .slice(-6)
      .flatMap(m => [
        { role: 'user', content: m.user },
        { role: 'assistant', content: m.ai },
      ]);

    // 🔹 Финальный массив сообщений для ИИ
    const messagesForRequest: ORMessage[] = [
      {
        role: 'system',
        content: `
Ты — поддерживающий и эмпатичный собеседник.
Твоя задача — помочь человеку проговорить чувства,
снизить эмоциональное напряжение и почувствовать,
что его слышат и понимают.

❗ Не давай медицинских, психологических или юридических советов.
❗ Не оценивай и не осуждай.
❗ Не морализируй.

Пиши спокойно, короткими абзацами, человеческим языком.
Если человек в тяжёлом состоянии — поддержи,
но не заменяй специалистов.
        `,
      },
      ...historyForAI,
      {
        role: 'user',
        content: userMessage,
      },
    ];

    const aiReply = await fetchOpenRouterReply(messagesForRequest);

    // заменяем "..." на ответ ИИ
    setMessages(prev => {
      const updated = [...prev];
      updated[updated.length - 1].ai = aiReply;
      return updated;
    });
  } catch (error) {
    console.error('Ошибка OpenRouter:', error);
    setMessages(prev => {
      const updated = [...prev];
      updated[updated.length - 1].ai = 'Ошибка ответа ИИ';
      return updated;
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="chat-screen">
      <h1 className="chat-title">Привет! Расскажи, что случилось?</h1>

      <div className="chat-history" ref={historyRef}>
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            <p className="user-msg">{msg.user}</p>
            <p className="ai-msg">{msg.ai}</p>
          </div>
        ))}
      </div>

      <div className="chat-footer">
        <p className="chat-counter">
          Сообщений осталось: {counter}/30
          {loading && ' • ИИ печатает…'}
        </p>

        <div className="chat-input-container">
          <input
  className="chat-input"
  value={input}
  onChange={e => setInput(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }}
  placeholder="Введите сообщение"
  disabled={loading}
/>

          <button
            className="chat-send"
            onClick={sendMessage}
            disabled={loading || !input.trim()}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 19V5M12 5L5 12M12 5L19 12"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <Disclaimer onOpenTerms={onOpenTerms} />
      </div>
    </div>
  );
};

export default ChatFree;