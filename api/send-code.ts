import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ error: 'Email or code missing' });
  }

  try {
    await resend.emails.send({
      from: 'HoldPoint <onboarding@resend.dev>',
      to: email,
      subject: 'Код подтверждения HoldPoint',
      html: `
        <h2>Ваш код подтверждения</h2>
        <p style="font-size: 20px;"><strong>${code}</strong></p>
        <p>Если это были не вы — просто проигнорируйте письмо.</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Email send failed' });
  }
}