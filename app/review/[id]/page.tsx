"use client";

import { useGetReview } from "@/action/resume";
import { ReviewAppear } from "@/components/review";
import { useParams } from "next/navigation";

type paramsProps = {
  id: string;
};
export default function ReviewIb() {
  const params = useParams() as paramsProps;

  const { data } = useGetReview(params?.id);

  return (
    <div className=" flex flex-col justify-center items-center px-5 flex-1 text-secondary h-full">
      {data?.review ? (
        <ReviewAppear review={data?.review} />
      ) : (
        <div>There no review </div>
      )}
    </div>
  );
}
