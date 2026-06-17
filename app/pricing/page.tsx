"use client";

import StableButton from "@/components/common/button";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";

export default function PricingPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const handleSubscribe = async () => {
    const res = await apiRequest("/api/checkout", {
      method: "POST",
      body: {
        userId: user?.id,
        email: user?.email,
      },
    });

    if (res.url) {
      window.location.href = res.url; // redirect to Stripe Checkout
      queryClient.invalidateQueries({ queryKey: ["me"] });
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
          <p className="text-3xl font-bold mt-3">$2</p>

          <ul className="mt-4 text-sm space-y-2">
            <li>✔ Unlimited resumes</li>
            <li>✔ AI reviews</li>
            <li>✔ Priority support</li>
          </ul>

          <StableButton
            onClick={handleSubscribe}
            disabled={user?.plan == "PRO" || !user}
            className="mt-6 w-full bg-black text-white py-2 rounded-xl hover:opacity-80"
          >
            Subscribe with Stripe
          </StableButton>
        </div>
      </div>
    </div>
  );
}
