import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';

const userId = randomUUID();
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ error: 'Email and code required' });
  }

  const { data } = await supabase
    .from('email_codes')
    .select('*')
    .eq('email', email)
    .eq('code', code)
    .single();

  if (!data) {
    return res.status(401).json({ error: 'Invalid code' });
  }

  // удаляем код после успеха
  await supabase
    .from('email_codes')
    .delete()
    .eq('email', email);

  return res.status(200).json({ ok: true,
    userId,
    email
   });
}