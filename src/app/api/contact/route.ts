import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

export async function POST(req: NextRequest) {
  try {
    const { name, email, service, message } = await req.json();

    if (!name || !email || !service || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['pietronascimben187@gmail.com'],
      subject: `New contact request — ${service}`,
      html: `
        <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 40px; background: #f9f9f9; border: 1px solid #e5e5e5;">
          <h2 style="font-size: 14px; letter-spacing: 0.2em; text-transform: uppercase; color: #000; margin: 0 0 32px 0; border-bottom: 1px solid #e5e5e5; padding-bottom: 16px;">
            New Contact Request · Pietro Nascimben Portfolio
          </h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #999; width: 120px;">Name</td>
              <td style="padding: 12px 0; font-size: 13px; color: #000;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #999;">Email</td>
              <td style="padding: 12px 0; font-size: 13px; color: #000;"><a href="mailto:${email}" style="color: #000;">${email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #999;">Service</td>
              <td style="padding: 12px 0; font-size: 13px; color: #000;">${service}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #999; vertical-align: top;">Message</td>
              <td style="padding: 12px 0; font-size: 13px; color: #000; line-height: 1.6; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>

          <p style="margin: 32px 0 0 0; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #ccc;">
            Sent via pietronascimben.com · ${new Date().toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Server error:', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
