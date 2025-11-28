import { useMutation } from "@tanstack/react-query";
import { createUser } from "../services/user";
import type { SignupFormData } from "../schemas/user";

export function useUserCreate() {
  return useMutation({
    mutationFn: (data: SignupFormData) => createUser(data),
  });
}
