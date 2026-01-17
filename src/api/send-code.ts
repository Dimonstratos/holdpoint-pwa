import type { VercelRequest, VercelResponse } from 'vercel';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// простое хранилище кодов (MVP, потом заменим на Supabase)
const codes = new Map<string, string>();

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email required' });
  }

  // 🔢 генерируем 6-значный код
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  // сохраняем код (в памяти сервера)
  codes.set(email, code);

  try {
    await resend.emails.send({
      from: 'HOLD•POINT <onboarding@resend.dev>',
      to: email,
      subject: 'Ваш код входа в HOLD•POINT',
      html: `
        <div style="font-family: Inter, sans-serif;">
          <h2>Код подтверждения</h2>
          <p style="font-size: 28px; letter-spacing: 6px;">
            <strong>${code}</strong>
          </p>
          <p style="color:#6b7280">
            Если вы не запрашивали код — просто проигнорируйте письмо.
          </p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: 'Email failed' });
  }
}

// экспортируем codes для проверки (MVP)
export { codes };