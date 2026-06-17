"use client";

import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/api";



export default function PricingPage() {
  const { user } = useAuth();
  const handleSubscribe = async () => {
    const res = await apiRequest("/api/checkout", {
      method: "POST",
      body: {
        userId: user?.id,
        email: user?.email,
      },
    });
    console.log(res, "res");

    if (res.url) {
      window.location.href = res.url; // redirect to Stripe Checkout
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10 text-text-custom">
      <h1 className="text-4xl font-bold mb-10">Pricing Plans</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* FREE PLAN */}
        <div className="border rounded-2xl p-6 w-80">
          <h2 className="text-xl font-bold">Free</h2>
          <p className="text-3xl font-bold mt-3">$0</p>

          <ul className="mt-4 text-sm space-y-2">
            <li>✔ 1 Resume</li>
            <li>✔ Basic features</li>
          </ul>

          <button className="mt-6 w-full bg-gray-200 py-2 rounded-xl" disabled>
            Current Plan
          </button>
        </div>

        {/* PRO PLAN */}
        <div className="border-2 border-black rounded-2xl p-6 w-80 scale-105">
          <h2 className="text-xl font-bold">Pro</h2>
          <p className="text-3xl font-bold mt-3">$9</p>

          <ul className="mt-4 text-sm space-y-2">
            <li>✔ Unlimited resumes</li>
            <li>✔ AI reviews</li>
            <li>✔ Priority support</li>
          </ul>

          <button
            onClick={handleSubscribe}
            className="mt-6 w-full bg-black text-white py-2 rounded-xl hover:opacity-80"
          >
            Subscribe with Stripe
          </button>
        </div>
      </div>
    </div>
  );
}
