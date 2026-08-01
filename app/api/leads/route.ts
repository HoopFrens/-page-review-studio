type LeadKind = "contact" | "sample-edit";

type LeadPayload = {
  kind?: LeadKind;
  name?: string;
  email?: string;
  project?: string;
  status?: string;
  wordCount?: string;
  timeline?: string;
  budget?: string;
  message?: string;
  projectLink?: string;
};

const labels: Record<keyof LeadPayload, string> = {
  kind: "Request type",
  name: "Name",
  email: "Email",
  project: "Project type",
  status: "Manuscript status",
  wordCount: "Estimated word count",
  timeline: "Desired timeline",
  budget: "Budget range",
  message: "Message",
  projectLink: "Manuscript or project link",
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function textBlock(payload: Required<Pick<LeadPayload, "kind" | "name" | "email">> & LeadPayload) {
  return (Object.keys(labels) as Array<keyof LeadPayload>)
    .map((key) => {
      const value = payload[key];
      return value ? `${labels[key]}: ${value}` : "";
    })
    .filter(Boolean)
    .join("\n");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function htmlBlock(text: string) {
  return text
    .split("\n")
    .map((line) => {
      const [label, ...rest] = line.split(": ");
      return `<p style="margin:0 0 12px"><strong>${escapeHtml(label)}</strong><br>${escapeHtml(rest.join(": "))}</p>`;
    })
    .join("");
}

async function sendEmail({
  to,
  subject,
  text,
  replyTo,
}: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    throw new Error("Email is not configured.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
      html: `<div style="font-family:Arial,sans-serif;font-size:16px;line-height:1.6;color:#231814">${htmlBlock(text)}</div>`,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || "Email could not be sent.");
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadPayload;
    const kind: LeadKind = body.kind === "sample-edit" ? body.kind : "contact";
    const name = clean(body.name);
    const email = clean(body.email);

    if (!name || !email) {
      return Response.json({ error: "Name and email are required." }, { status: 400 });
    }

    const payload: Required<Pick<LeadPayload, "kind" | "name" | "email">> & LeadPayload = {
      kind,
      name,
      email,
      project: clean(body.project),
      status: clean(body.status),
      wordCount: clean(body.wordCount),
      timeline: clean(body.timeline),
      budget: clean(body.budget),
      message: clean(body.message),
      projectLink: clean(body.projectLink),
    };

    const leadInbox = process.env.LEADS_TO_EMAIL;
    if (!leadInbox) {
      throw new Error("Lead inbox is not configured.");
    }

    const requestLabel = kind === "sample-edit" ? "Sample edit request" : "Project inquiry";
    const leadText = textBlock(payload);

    await sendEmail({
      to: leadInbox,
      subject: `${requestLabel}: ${name}`,
      text: leadText,
      replyTo: email,
    });

    const sampleEditUrl = clean(process.env.SAMPLE_EDIT_URL);
    const sampleEditLine = sampleEditUrl
      ? `\n\nYou can review the sample edit here: ${sampleEditUrl}`
      : "\n\nKrystal will respond within two business days with next steps.";
    const confirmationText =
      kind === "sample-edit"
        ? `Hi ${name},\n\nThank you for requesting a sample edit from Page Review Studio. Krystal received your request.${sampleEditLine}\n\nPage Review Studio`
        : `Hi ${name},\n\nThank you for reaching out to Page Review Studio. Krystal received your inquiry and will respond within two business days.\n\nPage Review Studio`;

    await sendEmail({
      to: email,
      subject: kind === "sample-edit" ? "Your sample edit request was received" : "Your Page Review Studio inquiry was received",
      text: confirmationText,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "We could not send your request. Please email Page Review Studio directly." }, { status: 500 });
  }
}
