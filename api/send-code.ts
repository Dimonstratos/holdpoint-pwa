import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY!);

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const { email } = await req.json();

  if (!email) {
    return new Response('Email required', { status: 400 });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 минут

  // удаляем старые коды
  await supabase
    .from('auth_codes')
    .delete()
    .eq('email', email);

  // сохраняем новый код
  await supabase.from('auth_codes').insert({
    email,
    code,
    expires_at: expiresAt.toISOString(),
  });

  await resend.emails.send({
    from: 'HoldPoint <support@hold-point.ru>',
    to: email,
    subject: 'Код входа в HoldPoint',
    html: `<h2>${code}</h2><p>Код действителен 10 минут</p>`,
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}