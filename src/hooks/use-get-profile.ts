import { getProfileById, getProfileByUsername } from "@/services/profile";
import { useSuspenseQuery } from "@tanstack/react-query";

interface useGetProfileByUsernameProps {
  username: string;
}

export function useGetProfileByUsername({
  username,
}: useGetProfileByUsernameProps) {
  return useSuspenseQuery({
    queryKey: ["profile", username],
    queryFn: ({ queryKey }) => {
      const [, usernameKey] = queryKey;
      return getProfileByUsername(usernameKey);
    },
  });
}

interface useGetProfileByIdProps {
  id: string;
}

export function useGetProfileById({ id }: useGetProfileByIdProps) {
  return useSuspenseQuery({
    queryKey: ["profile-id", id],
    queryFn: ({ queryKey }) => {
      const [, userId] = queryKey;
      return getProfileById(userId);
    },
  });
}
