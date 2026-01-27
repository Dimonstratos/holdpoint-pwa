import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email required' });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await resend.emails.send({
      from: 'HoldPoint <support@hold-point.ru>',
      to: email,
      subject: 'Ваш код входа в HoldPoint',
      html: `
        <div style="font-family: Inter, Arial; line-height: 1.6">
          <h2>Код входа</h2>
          <p>Ваш код подтверждения:</p>
          <div style="
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 4px;
            margin: 24px 0;
          ">
            ${code}
          </div>
          <p>Код действует 10 минут.</p>
        </div>
      `,
    });

    // MVP — позже сохраним код в Supabase
    console.log('SEND CODE:', email, code);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('SEND CODE ERROR:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}