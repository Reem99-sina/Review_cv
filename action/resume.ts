import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function useUploadResume() {
  const router = useRouter();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      return apiRequest("/api/resume/upload", {
        method: "POST",
        body: formData,
      });
    },

    onSuccess: (data) => {
      toast.success(data?.message || "Uploaded successfully");
    },

    onError: (error: any) => {
      console.log(error?.message, "message");
      if (error?.message == "Upgrade required") {
        router.push("/pricing");
      }
      toast.error(error?.message || "Upload failed");
    },
  });
}

export function useGetReview(id: string) {
  return useQuery({
    queryKey: ["review", id],
    queryFn: () => apiRequest(`/api/review/${id}`),
    enabled: !!id,
  });
}

export function useGetHistory() {
  return useQuery({
    queryKey: ["resume-history"],
    queryFn: () => apiRequest("/api/resume"),
  });
}
