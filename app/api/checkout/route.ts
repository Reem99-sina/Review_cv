import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, email } = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    customer_email: email,

    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Pro Plan",
          },
          unit_amount: 9 * 100, // $9
          recurring: {
            interval: "month",
          },
        },
        quantity: 1,
      },
    ],

    success_url: `${process.env.NEXT_PUBLIC_URL}/success/${email}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,

    metadata: {
      userId,
    },
  });

  return NextResponse.json({ url: session.url });
}