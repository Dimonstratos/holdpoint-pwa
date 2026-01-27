import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const { email, code } = await req.json();

  if (!email || !code) {
    return new Response('Invalid data', { status: 400 });
  }

  const { data, error } = await supabase
    .from('auth_codes')
    .select('*')
    .eq('email', email)
    .eq('code', code)
    .gt('expires_at', new Date().toISOString())
    .single();

  if (error || !data) {
    return new Response(JSON.stringify({ success: false }), { status: 401 });
  }

  // можно удалить код после использования
  await supabase
    .from('auth_codes')
    .delete()
    .eq('id', data.id);

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}