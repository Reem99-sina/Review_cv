import { reviewResume } from "@/types/resume";

export function ReviewAppear({ review }: { review: reviewResume }) {
  return (
    <div className="mt-6 space-y-4 border-t pt-4 text-text-custom">
      <h2 className="text-lg font-bold text-text-custom">ATS Review</h2>

      <p className="text-sm">
        <span className="font-semibold">Score:</span> {review.ats_score}/100
      </p>

      <div>
        <h3 className="font-semibold text-green-600">Strengths</h3>
        <ul className="list-disc ml-5 text-sm">
          {review.strengths?.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-red-600">Weaknesses</h3>
        <ul className="list-disc ml-5 text-sm">
          {review.weaknesses?.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-blue-600">Missing Keywords</h3>
        <ul className="list-disc ml-5 text-sm">
          {review.missing_keywords?.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-text-custom">Improved Summary</h3>
        <p className="text-sm text-gray-700">{review.improved_summary}</p>
      </div>
    </div>
  );
}
