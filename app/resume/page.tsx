"use client";

import { useForm } from "react-hook-form";
import { useUploadResume } from "@/action/resume";
import StableButton from "@/components/common/button";
import Input from "@/components/common/input";
import { UploadResumeData } from "@/types/resume";
import { useRouter } from "next/navigation";

export default function UploadResume() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UploadResumeData>();
  const router = useRouter();

  const { mutateAsync, data } = useUploadResume();

  const onSubmit = async (data: UploadResumeData) => {
    const file = data.file?.[0];

    const formData = new FormData();
    formData.append("file", file);

    await mutateAsync(formData)
      .then(() => {})
      
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 h-full">
      <div>
        <div className="w-full max-w-md bg-white border rounded-2xl p-6 shadow-sm">
          <h1 className="text-xl font-bold text-center mb-6 text-secondary">
            Upload Your Resume
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              {...register("file", {
                required: "Resume is required",
              })}
              className="w-full border p-2 rounded-lg"
              error={errors.file?.message}
            />
            <StableButton disabled={isSubmitting} type="submit">
              {isSubmitting ? "Uploading..." : "Upload Resume"}
            </StableButton>
            {data?.review && (
              <StableButton
                disabled={!data?.review}
                onClick={() => {
                  router.push("/review/" + data?.review?.id);
                }}
                className="mx-3"
              >
                View the Result
              </StableButton>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
