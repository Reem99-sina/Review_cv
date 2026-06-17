"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // ❌ NOT PAID USER
  if (!user?.plan =='PRO') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-white shadow-lg rounded-2xl">
          <h1 className="text-3xl font-bold text-red-600">
            Payment Not Completed ❌
          </h1>

          <p className="mt-2 text-gray-600">
            You don’t have access to this page.
          </p>

          <button
            onClick={() => router.push("/pricing")}
            className="mt-5 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Go to Pricing
          </button>
        </div>
      </div>
    );
  }

  // ✅ PAID USER
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-6 bg-white shadow-lg rounded-2xl">
        <h1 className="text-3xl font-bold text-green-600">
          Payment Successful 🎉
        </h1>

        <p className="mt-2 text-gray-600">
          Thank you! Your payment was completed successfully.
        </p>

        <button
          onClick={() => router.push("/")}
          className="mt-5 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}