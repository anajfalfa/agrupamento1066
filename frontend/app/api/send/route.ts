import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend('re_hqAfidyH_KmXtQNcDBDWmg18Cm1r3TY7p');

export async function POST(req: Request) {
    try {
        const { name, email, subject, message } = await req.json();

        const data = await resend.emails.send({
            from: 'Site 1066 <onboarding@resend.dev>', // No início usa este, depois podes configurar o teu domínio
            to: ['1066ribamar@gmail.com'], //geral.1066@escutismo.pt
            subject: `[Formulário Site] ${subject}: ${name}`,
            html: `<p><strong>Nome:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Mensagem:</strong> ${message}</p>`,
        });

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}