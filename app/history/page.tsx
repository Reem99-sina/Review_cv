"use client";

import { useState } from "react";
import { useGetHistory } from "@/action/resume";
import Link from "next/link";
import { SessionContentReviewFile } from "@/types/resume";

export default function HistoryPage() {
  const { data, isLoading } = useGetHistory();

  const [openId, setOpenId] = useState<string | null>(null);
  const [tab, setTab] = useState<"raw" | "reviews">("raw");

  const resumes = data?.resumes || [];
 
  const effectiveOpenId =
  openId ?? resumes?.[0]?.id ?? null;

  if (isLoading) {
    return (
      <p className="text-center mt-10 text-gray-500">Loading history...</p>
    );
  }

  return (
    <div className="flex-1 p-6 text-text-custom">
      <h1 className="text-3xl font-bold mb-8 pt-15">My Resume History</h1>

      <div className="space-y-6">
        {resumes.map((resume: SessionContentReviewFile) => {
          const isOpen = effectiveOpenId === resume.id;

          return (
            <div
              key={resume.id}
              className="border rounded-2xl bg-gray-300 shadow-sm"
            >
              {/* HEADER */}
              <div
                className="p-5 flex justify-between items-center cursor-pointer"
                onClick={() => setOpenId(isOpen ? null : resume.id)}
              >
                <div>
                  <h2 className="font-semibold text-lg">{resume.title}</h2>

                  <p className="text-xs text-gray-500">
                    {resume.reviews?.length || 0} review(s)
                  </p>
                </div>

                <span className="text-sm text-gray-400">
                  {isOpen ? "▲" : "▼"}
                </span>
              </div>

              {/* BODY */}
              {isOpen && (
                <div className="border-t p-5 space-y-4">
                  {/* TABS */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setTab("raw")}
                      className={`px-3 py-1 rounded-lg text-sm ${
                        tab === "raw" ? "bg-black text-white" : "bg-gray-100"
                      }`}
                    >
                      Raw Text
                    </button>

                    <button
                      onClick={() => setTab("reviews")}
                      className={`px-3 py-1 rounded-lg text-sm ${
                        tab === "reviews"
                          ? "bg-black text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      Reviews
                    </button>
                  </div>

                  {/* RAW TEXT */}
                  {tab === "raw" && (
                    <div className="bg-gray-50 border rounded-xl p-4 max-h-96 overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-sm text-gray-700">
                        {resume.rawText}
                      </pre>
                    </div>
                  )}

                  {/* REVIEWS */}
                  {tab === "reviews" && (
                    <div className="space-y-3">
                      {resume.reviews?.map((review: any) => (
                        <div
                          key={review.id}
                          className="border rounded-xl p-4 bg-gray-50"
                        >
                          <div className="flex justify-between">
                            <div>
                              <p className="text-sm font-medium">ATS Score</p>

                              <p className="text-lg font-bold text-text-custom">
                                {review.ats_score}/10
                              </p>
                            </div>

                            <Link
                              href={`/review/${review.id}`}
                              className="text-sm text-secondary hover:underline"
                            >
                              Open →
                            </Link>
                          </div>

                          <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                            {review.weaknesses?.[0]}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
