import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('SEND CODE START');

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email required' });
    }

    const resend = new Resend(process.env.RESEND_API_KEY!);

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!
    );

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await supabase.from('auth_codes').delete().eq('email', email);

    const { error } = await supabase.from('auth_codes').insert({
      email,
      code,
      expires_at: expiresAt.toISOString(),
    });

    if (error) {
      console.error('SUPABASE ERROR', error);
      return res.status(500).json({ error: 'Database error' });
    }

    await resend.emails.send({
      from: 'HoldPoint <support@hold-point.ru>',
      to: email,
      subject: 'Код входа в HoldPoint',
      html: `
        <h2>${code}</h2>
        <p>Код действителен 10 минут.</p>
      `,
    });

    console.log('EMAIL SENT');

    return res.status(200).json({ success: true });
  } catch (e) {
    console.error('SEND CODE ERROR', e);
    return res.status(500).json({ error: 'Internal server error' });
  }
}