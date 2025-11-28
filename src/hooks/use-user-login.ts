import { useMutation } from "@tanstack/react-query";
import type { LoginFormData } from "../schemas/login";
import { loginUser } from "../services/auth";

export function useUserLogin() {
  return useMutation({
    mutationFn: (data: LoginFormData) => loginUser(data),
  });
}
