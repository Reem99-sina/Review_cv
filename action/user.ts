import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { saveToken } from "../lib/storage";
import type {
  userSigninData,
  userSignUpData,
  verifyEmailData,
} from "../types/user";
import { apiRequest } from "@/lib/api";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ email, password }: userSigninData) => {
      return apiRequest("/api/auth/login", {
        method: "POST",
        body: { email, password },
      });
    },

    onSuccess: async (data) => {
      await saveToken(data?.token);
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: async ({ email, password, name }: userSignUpData) => {
      return apiRequest("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password, name }),
      });
    },
    onSuccess: async (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
}

export function useMe() {
  return useQuery({
    queryKey: ["me"],

    queryFn: () => apiRequest("/api/auth/me"),
    retry: false,
  });
}

export function useVerifyEmail() {
  return useMutation({
    mutationFn: async ({ email, code }: verifyEmailData) => {
      console.log(email, "email");
      return apiRequest("/api/auth/verify-email", {
        method: "POST",
        body: { email, code },
      });
    },

    onSuccess: (data) => {
      toast.success(data?.message);
    },

    onError: (error: any) => {
      toast.error(error?.message);
    },
  });
}
