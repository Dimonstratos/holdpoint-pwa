import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY!);

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email required' });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  // удаляем старые коды
  await supabase
    .from('email_codes')
    .delete()
    .eq('email', email);

  // сохраняем новый
  await supabase
    .from('email_codes')
    .insert({ email, code });

  await resend.emails.send({
    from: 'HoldPoint <support@hold-point.ru>',
    to: email,
    subject: 'Код подтверждения HoldPoint',
    html: `
      <p>Ваш код входа:</p>
      <h2>${code}</h2>
      <p>Код действует несколько минут.</p>
    `,
  });

  return res.status(200).json({ ok: true });
}