import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../services/auth";

export function useUserLogout() {
  return useMutation({
    mutationFn: logoutUser,
  });
}
