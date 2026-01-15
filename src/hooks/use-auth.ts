import { useMutation } from "@tanstack/react-query";
import { createUser, loginUser, logoutUser } from "../services/auth";
import type { SignupFormData } from "../schemas/signup";
import type { LoginFormData } from "@/schemas/login";

export function useCreateUser() {
  return useMutation({
    mutationFn: (data: SignupFormData) => createUser(data),
  });
}

export function useUserLogin() {
  return useMutation({
    mutationFn: (data: LoginFormData) => loginUser(data),
  });
}

export function useUserLogout() {
  return useMutation({
    mutationFn: logoutUser,
  });
}
