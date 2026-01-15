import {
  getProfileById,
  getProfileByUsername,
  type GetProfileByIdParams,
  type GetProfileByUsernameParams,
} from "@/services/profile";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useGetProfileByUsername(params: GetProfileByUsernameParams) {
  return useSuspenseQuery({
    queryKey: ["profile", params.username],
    queryFn: ({ queryKey }) => {
      const [, username] = queryKey;
      return getProfileByUsername({
        username,
      });
    },
  });
}

export function useGetProfileById(params: GetProfileByIdParams) {
  return useSuspenseQuery({
    queryKey: ["profile-id", params.id],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;
      return getProfileById({
        id,
      });
    },
  });
}
