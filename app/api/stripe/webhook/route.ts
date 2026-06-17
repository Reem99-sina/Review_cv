import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.text();
  const headerList = await headers();
  const sig = headerList.get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch {
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    try {
      const session = event.data.object;
      const userId = session.metadata?.userId;

      console.log("Metadata:", session.metadata);
      console.log("User ID:", userId);

      if (!userId) {
        return NextResponse.json({ error: "No userId" }, { status: 400 });
      }

      await prisma.user.update({
        where: { id: userId },
        data: {
          plan: "PRO",
        },
      });

      console.log("User upgraded successfully");
    } catch (error) {
      console.error("Webhook error:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
