import { Resend } from "resend";
import { NextResponse } from "next/server";

type Locale = "ar" | "tr" | "en";

const subjects: Record<Locale, string> = {
  ar: "استلمنا رسالتك! — KodLab",
  tr: "Mesajınızı aldık! — KodLab",
  en: "We received your message! — KodLab",
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, project_type, message, locale } = body;
    const lang = (["ar", "tr", "en"].includes(locale) ? locale : "en") as Locale;

    // 1. Send to Web3Forms (notification to hello@kodlab.ai)
    const web3Res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
        subject: "New message from KodLab website",
        name,
        email,
        project_type,
        message,
      }),
    });

    const web3Data = await web3Res.json();
    if (!web3Data.success) {
      return NextResponse.json({ success: false, error: "Failed to send message" }, { status: 500 });
    }

    // 2. Send auto-reply to the sender
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "KodLab <noreply@kodlab.ai>",
      to: email,
      subject: subjects[lang],
      html: getAutoReplyHTML(name, lang),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

const templates: Record<Locale, {
  dir: "rtl" | "ltr";
  greeting: (name: string) => string;
  body1: string;
  body2: string;
  cta: string;
  closing: string;
  signature: string;
  rights: string;
}> = {
  ar: {
    dir: "rtl",
    greeting: (name) => `أهلاً ${name}! 👋`,
    body1: "شكراً لتواصلك معنا! استلمنا رسالتك وفريقنا يعمل عليها الآن.",
    body2: 'نرد عادةً خلال <strong style="color:#06b6d4;">24 ساعة</strong>. في هذه الأثناء، تفضل بزيارة موقعنا لاستكشاف خدماتنا.',
    cta: "زيارة موقعنا ←",
    closing: "نتطلع للعمل معك!",
    signature: "فريق KodLab",
    rights: "© 2025 KodLab. جميع الحقوق محفوظة.",
  },
  tr: {
    dir: "ltr",
    greeting: (name) => `Merhaba ${name}! 👋`,
    body1: "Bizimle iletişime geçtiğiniz için teşekkür ederiz! Mesajınızı aldık ve ekibimiz üzerinde çalışıyor.",
    body2: 'Genellikle <strong style="color:#06b6d4;">24 saat</strong> içinde yanıt veriyoruz. Bu sürede web sitemizi ziyaret edebilirsiniz.',
    cta: "Web Sitemizi Ziyaret Edin →",
    closing: "Sizinle çalışmayı dört gözle bekliyoruz!",
    signature: "KodLab Ekibi",
    rights: "© 2025 KodLab. Tüm hakları saklıdır.",
  },
  en: {
    dir: "ltr",
    greeting: (name) => `Hey ${name}! 👋`,
    body1: "Thank you for reaching out to us! We've received your message and our team is already on it.",
    body2: 'We typically respond within <strong style="color:#06b6d4;">24 hours</strong>. In the meantime, feel free to explore what we do.',
    cta: "Visit Our Website →",
    closing: "We look forward to working with you!",
    signature: "The KodLab Team",
    rights: "© 2025 KodLab. All rights reserved.",
  },
};

function getAutoReplyHTML(name: string, locale: Locale): string {
  const t = templates[locale];

  return `
<!DOCTYPE html>
<html dir="${t.dir}" lang="${locale}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#0a0e1a;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">

    <!-- Header -->
    <div style="text-align:center;padding:30px 40px;background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);border-radius:16px 16px 0 0;border:1px solid #1e3a5f;border-bottom:none;">
      <h1 style="margin:0;font-size:28px;font-weight:700;letter-spacing:-0.5px;">
        <span style="color:#06b6d4;">Kod</span><span style="color:#ffffff;">Lab</span>
      </h1>
      <p style="margin:8px 0 0;color:#64748b;font-size:13px;letter-spacing:1px;text-transform:uppercase;">Digital Innovation Studio</p>
    </div>

    <!-- Body -->
    <div style="padding:40px;background:#111827;border:1px solid #1e3a5f;border-top:none;border-bottom:none;">

      <div style="width:50px;height:3px;background:linear-gradient(90deg,#06b6d4,#3b82f6);border-radius:2px;margin-bottom:24px;"></div>

      <h2 style="margin:0 0 16px;color:#ffffff;font-size:22px;font-weight:600;">
        ${t.greeting(name)}
      </h2>

      <p style="margin:0 0 20px;color:#94a3b8;font-size:15px;line-height:1.7;">
        ${t.body1}
      </p>

      <p style="margin:0 0 20px;color:#94a3b8;font-size:15px;line-height:1.7;">
        ${t.body2}
      </p>

      <!-- CTA Button -->
      <div style="text-align:center;margin:32px 0;">
        <a href="https://www.kodlab.ai" style="display:inline-block;padding:14px 36px;background:linear-gradient(135deg,#06b6d4,#3b82f6);color:#ffffff;text-decoration:none;border-radius:12px;font-weight:600;font-size:14px;letter-spacing:0.3px;">
          ${t.cta}
        </a>
      </div>

      <p style="margin:0;color:#94a3b8;font-size:15px;line-height:1.7;">
        ${t.closing}
      </p>

      <p style="margin:20px 0 0;color:#ffffff;font-size:15px;">
        ${locale === "ar" ? "مع أطيب التحيات،" : locale === "tr" ? "Saygılarımızla," : "Warm regards,"}<br/>
        <strong style="color:#06b6d4;">${t.signature}</strong>
      </p>
    </div>

    <!-- Footer -->
    <div style="padding:24px 40px;background:#0c1220;border-radius:0 0 16px 16px;border:1px solid #1e3a5f;border-top:none;text-align:center;">
      <p style="margin:0 0 8px;color:#475569;font-size:12px;">
        ${t.rights}
      </p>
      <p style="margin:0;color:#475569;font-size:12px;">
        Istanbul, Turkey ·
        <a href="mailto:hello@kodlab.ai" style="color:#06b6d4;text-decoration:none;">hello@kodlab.ai</a>
      </p>
    </div>

  </div>
</body>
</html>`;
}
