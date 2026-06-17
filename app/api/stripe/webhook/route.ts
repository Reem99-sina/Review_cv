import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = (headers()as any).get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch  {
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }

  // ✅ SUCCESS EVENT
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const userId = session.metadata?.userId;

    if (!userId) {
      return NextResponse.json({ error: "No userId" }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        plan: "PRO",
      },
    });
  }

  return NextResponse.json({ received: true });
}