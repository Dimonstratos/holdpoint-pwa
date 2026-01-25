import { Resend } from 'resend';

const sendCode = async () => {
  alert('SEND CODE CLICK');
}
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: Request) {
  try {
    if (req.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    const body = await req.json();
    const email = body?.email;

    if (!email || typeof email !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400 }
      );
    }

    // генерируем код
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // отправляем письмо
    await resend.emails.send({
      from: 'HoldPoint <onboarding@resend.dev>', // тестовый домен
      to: email,
      subject: 'Код подтверждения HoldPoint',
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Ваш код подтверждения</h2>
          <p style="font-size: 24px; letter-spacing: 2px;">
            <b>${code}</b>
          </p>
          <p>Если вы не запрашивали код — просто проигнорируйте письмо.</p>
        </div>
      `,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );
  } catch (err) {
    console.error('SEND CODE ERROR:', err);

    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}