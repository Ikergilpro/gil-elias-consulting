import { Resend } from "resend";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_BODY_SIZE = 20_000;

type ContactRequest = {
  type?: unknown;
  name?: unknown;
  email?: unknown;
  organization?: unknown;
  role?: unknown;
  region?: unknown;
  timeline?: unknown;
  message?: unknown;
  companyWebsite?: unknown;
};

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function row(label: string, value: string) {
  if (!value) return "";

  return `<tr>
    <td style="padding:8px 16px 8px 0;color:#5c6370;vertical-align:top">${label}</td>
    <td style="padding:8px 0;color:#1a1f2e">${escapeHtml(value)}</td>
  </tr>`;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_SIZE) {
    return Response.json({ error: "Request too large" }, { status: 413 });
  }

  let body: ContactRequest;
  try {
    body = (await request.json()) as ContactRequest;
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: bots commonly fill fields hidden from human visitors.
  if (text(body.companyWebsite, 200)) {
    return Response.json({ ok: true });
  }

  const submission = {
    type: text(body.type, 100),
    name: text(body.name, 120),
    email: text(body.email, 254).toLowerCase(),
    organization: text(body.organization, 160),
    role: text(body.role, 120),
    region: text(body.region, 120),
    timeline: text(body.timeline, 100),
    message: text(body.message, 5_000),
  };

  if (
    !submission.name ||
    !EMAIL_PATTERN.test(submission.email) ||
    !submission.organization ||
    !submission.message
  ) {
    return Response.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    console.error("Contact email environment variables are not configured.");
    return Response.json({ error: "Email service unavailable" }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: submission.email,
    subject: `Nueva solicitud de consulta — ${submission.organization}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#1a1f2e">
        <h1 style="font-size:24px;margin-bottom:8px">Nueva solicitud de consulta</h1>
        <p style="color:#5c6370;margin-top:0">Recibida desde el sitio web.</p>
        <table style="width:100%;border-collapse:collapse;margin:24px 0">
          ${row("Tipo de organización", submission.type)}
          ${row("Nombre", submission.name)}
          ${row("Correo", submission.email)}
          ${row("Organización", submission.organization)}
          ${row("Cargo", submission.role)}
          ${row("País / región", submission.region)}
          ${row("Horizonte de decisión", submission.timeline)}
        </table>
        <h2 style="font-size:18px">Mandato o reto</h2>
        <p style="white-space:pre-wrap;line-height:1.6">${escapeHtml(submission.message)}</p>
        <p style="margin-top:32px;color:#5c6370;font-size:13px">
          Responde directamente a este correo para contactar a ${escapeHtml(submission.name)}.
        </p>
      </div>
    `,
    text: [
      "Nueva solicitud de consulta",
      "",
      `Tipo de organización: ${submission.type}`,
      `Nombre: ${submission.name}`,
      `Correo: ${submission.email}`,
      `Organización: ${submission.organization}`,
      `Cargo: ${submission.role}`,
      `País / región: ${submission.region}`,
      `Horizonte de decisión: ${submission.timeline}`,
      "",
      "Mandato o reto:",
      submission.message,
    ].join("\n"),
  });

  if (error) {
    console.error("Resend contact email failed:", error);
    return Response.json({ error: "Email could not be sent" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
