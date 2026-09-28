import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_SUBMIT_MS = 2000;
const MAX_BODY_BYTES = 20_000;
const sentMessage = "Your message has been sent. We'll reply within 24 hours.";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const asString = (value: unknown) => (typeof value === "string" ? value.trim() : "");

/** Same response as a real success, so bots learn nothing. No email is sent. */
const fakeSuccess = () => NextResponse.json({ ok: true, message: sentMessage }, { status: 200 });

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    const originHost = new URL(origin).host;
    const host = (request.headers.get("x-forwarded-host") ?? new URL(request.url).host).toLowerCase();
    const siteHost = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.traveldev.in").host.toLowerCase();
    return originHost === host || originHost === siteHost || originHost === "localhost:3000";
  } catch {
    return false;
  }
}

function validate(body: Record<string, unknown>) {
  const errors: Record<string, string> = {};

  const name = asString(body.name);
  const email = asString(body.email);
  const phone = asString(body.phone);
  const message = asString(body.message);

  if (name.length < 2) errors.name = "Please tell us your name.";
  else if (name.length > 100) errors.name = "Name is too long.";

  if (!EMAIL_REGEX.test(email)) errors.email = "Enter a valid email.";
  else if (email.length > 254) errors.email = "Email is too long.";

  if (phone.replace(/\D/g, "").length < 8) errors.phone = "Enter a contact number.";
  else if (phone.length > 30) errors.phone = "Phone number is too long.";

  if (!message) errors.message = "Tell us a little about the trip.";
  else if (message.length > 5000) errors.message = "Message is too long (max 5000 characters).";

  const destination = asString(body.destination);
  const date = asString(body.date);
  const travellers = asString(body.travellers);

  if (destination.length > 100) errors.destination = "Destination is too long.";
  if (date.length > 40) errors.date = "Invalid date.";
  if (travellers.length > 20) errors.travellers = "Invalid traveller count.";

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    data: { name, email, phone, message, destination, date, travellers },
  };
}

const row = (label: string, value: string) =>
  `<tr>
    <td style="padding:10px 14px;border-bottom:1px solid #e8eef5;font:600 12px/1.4 Arial,sans-serif;color:#7b8794;text-transform:uppercase;letter-spacing:.08em;width:150px;vertical-align:top;">${label}</td>
    <td style="padding:10px 14px;border-bottom:1px solid #e8eef5;font:14px/1.6 Arial,sans-serif;color:#101828;">${value}</td>
  </tr>`;

export async function POST(request: Request) {
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;

  if (!EMAIL_USER || !EMAIL_PASS) {
    return NextResponse.json(
      { ok: false, error: "Email is not configured on the server. Set EMAIL_USER and EMAIL_PASS." },
      { status: 500 }
    );
  }

  if (request.headers.get("x-contact-form") !== "1") {
    return NextResponse.json({ ok: false, error: "Request blocked." }, { status: 403 });
  }

  if (!sameOrigin(request)) {
    return NextResponse.json({ ok: false, error: "Cross-origin request blocked." }, { status: 403 });
  }

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length && length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Payload too large." }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  if (asString(body.website)) {
    console.warn("[contact] honeypot triggered from", clientIp(request));
    return fakeSuccess();
  }

  const startedAt = typeof body.startedAt === "number" ? body.startedAt : 0;
  if (!startedAt || Date.now() - startedAt < MIN_SUBMIT_MS) {
    return NextResponse.json(
      { ok: false, error: "That was quick! Please take a moment and try again." },
      { status: 400 }
    );
  }

  const { ok, errors, data } = validate(body);
  if (!ok) {
    return NextResponse.json({ ok: false, error: "Please fix the highlighted fields.", errors }, { status: 400 });
  }

  const ip = clientIp(request);
  const byIp = rateLimit(`ip:${ip}`);
  const byEmail = rateLimit(`email:${data.email}`);
  if (!byIp.ok || !byEmail.ok) {
    const retryAfter = Math.max(byIp.retryAfterSeconds, byEmail.retryAfterSeconds);
    return NextResponse.json(
      { ok: false, error: `Too many attempts. Please try again in ${Math.ceil(retryAfter / 60)} minute(s).` },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  const submittedAt = new Date();
  const formattedDate = submittedAt.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "short",
  });

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
    });

    await transporter.sendMail({
      from: `"TRAVEL DEV Website" <${EMAIL_USER}>`,
      to: EMAIL_USER,
      replyTo: { name: data.name, address: data.email },
      subject: `New enquiry from ${data.name} — TRAVEL DEV`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        `Destination: ${data.destination || "Not decided yet"}`,
        `Travel date: ${data.date || "Not specified"}`,
        `Travellers: ${data.travellers || "Not specified"}`,
        `Message: ${data.message}`,
        `Submitted: ${formattedDate}`,
        `IP: ${ip}`,
      ].join("\n"),
      html: `
        <div style="margin:0;padding:24px;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">
          <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e8eef5;border-radius:14px;overflow:hidden;">
            <div style="background:#0b1b33;padding:22px 26px;">
              <h1 style="margin:0;font-size:18px;letter-spacing:.12em;text-transform:uppercase;color:#ffffff;">New Contact Enquiry</h1>
              <p style="margin:6px 0 0;font-size:13px;color:#9fb3cd;">TRAVEL DEV — contact form submission</p>
            </div>
            <table style="width:100%;border-collapse:collapse;">
              ${row("Name", escapeHtml(data.name))}
              ${row("Email", `<a href="mailto:${escapeHtml(data.email)}" style="color:#1a63ff;">${escapeHtml(data.email)}</a>`)}
              ${row("Phone", escapeHtml(data.phone || "—"))}
              ${row("Destination", escapeHtml(data.destination || "Not decided yet"))}
              ${row("Travel date", escapeHtml(data.date || "Not specified"))}
              ${row("Travellers", escapeHtml(data.travellers || "Not specified"))}
              ${row("Message", escapeHtml(data.message).replace(/\n/g, "<br>"))}
              ${row("Submitted", escapeHtml(formattedDate))}
            </table>
            <div style="padding:16px 26px;background:#f9fbfd;border-top:1px solid #e8eef5;font:12px/1.6 Arial,sans-serif;color:#7b8794;">
              Reply directly to this email to respond to ${escapeHtml(data.name)}.
            </div>
          </div>
        </div>`,
    });

    return NextResponse.json({ ok: true, message: sentMessage });
  } catch (error) {
    console.error("[contact] email send failed:", error);
    return NextResponse.json(
      { ok: false, error: "We couldn't send your message right now. Please try again in a moment." },
      { status: 500 }
    );
  }
}
