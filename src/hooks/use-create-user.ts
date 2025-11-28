import { useMutation } from "@tanstack/react-query";
import { createUser } from "../services/auth";
import type { SignupFormData } from "../schemas/signup";

export function useUserCreate() {
  return useMutation({
    mutationFn: (data: SignupFormData) => createUser(data),
  });
}
