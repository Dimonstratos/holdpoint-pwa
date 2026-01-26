import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).send('Email required');
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await resend.emails.send({
      from: 'HoldPoint <onboarding@resend.dev>',
      to: email,
      subject: 'Код подтверждения HoldPoint',
      html: `<h2>Ваш код: ${code}</h2>`,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('SEND CODE ERROR:', err);
    return res.status(500).send('Server error');
  }
}