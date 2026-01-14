type ORMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export async function fetchOpenRouterReply(messages: ORMessage[]) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://holdpoint.app', // можно любой домен
      'X-Title': 'HoldPoint MVP',
    },
    body: JSON.stringify({
      model: 'mistralai/devstral-2512:free',
      messages: [
        {
          role: 'system',
          content: `
Ты — эмпатичный, поддерживающий собеседник.
Ты НЕ врач, НЕ психолог и НЕ юрист.
Твоя задача — помочь человеку пережить сложное состояние.
Отвечай спокойно, мягко, без осуждения.
`,
        },
        ...messages,
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('OpenRouter error:', errorText);
    throw new Error('OpenRouter request failed');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}