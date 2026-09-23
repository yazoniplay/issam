import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

serve(async (req) => {
  const { email, name, orderId, total } = await req.json();

  const resendKey = Deno.env.get("RESEND_API_KEY");

  if (!resendKey) {
    return new Response("Missing RESEND_API_KEY", { status: 500 });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resendKey}`,
    },
    body: JSON.stringify({
      from: "IssamExprec <orders@yourdomain.com>",
      to: [email],
      subject: "Your IssamExprec order confirmation",
      html: `
        <h1>Thanks for your order, ${name}!</h1>
        <p>Your order <b>#${orderId}</b> has been received.</p>
        <p>Total: ${total} SEK</p>
        <p>We will update you when your order ships.</p>
      `,
    }),
  });

  return new Response(await response.text(), {
    status: response.status,
    headers: { "Content-Type": "application/json" },
  });
});
