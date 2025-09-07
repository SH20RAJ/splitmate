// src/lib/email.ts

const RESEND_API_KEY = process.env.RESEND_API || process.env.RESEND_API_KEY || "re_JeB43pja_8cbWQquaCnYmF5qqCdWBBYMY";

export async function sendNotificationEmail({
  to,
  subject = "SplitMate Notification",
  text = "You have a new notification from SplitMate!",
  html,
}: {
  to: string;
  subject?: string;
  text?: string;
  html?: string;
}) {
  const payload = {
    from: "SplitMate <notify@splitmate.ai>",
    to,
    subject,
    text,
    ...(html ? { html } : {}),
  };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to send email: ${error}`);
  }

  return res.json();
}
