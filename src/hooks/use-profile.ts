import type { UpdateProfileFormData } from "@/schemas/profile";
import {
  getProfileById,
  getProfileByUsername,
  updateProfile,
  type GetProfileByIdParams,
  type GetProfileByUsernameParams,
} from "@/services/profile";
import { useUser } from "@supabase/auth-helpers-react";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

export function useGetProfileByUsername(params: GetProfileByUsernameParams) {
  return useSuspenseQuery({
    queryKey: ["profile", params.username],
    queryFn: () =>
      getProfileByUsername({
        username: params.username,
      }),
  });
}

export function useGetProfileById(params: GetProfileByIdParams) {
  return useSuspenseQuery({
    queryKey: ["profile-id", params.id],
    queryFn: () =>
      getProfileById({
        id: params.id,
      }),
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const user = useUser();

  return useMutation({
    mutationFn: (data: UpdateProfileFormData) => {
      if (!user?.id) {
        throw new Error("Usuário não autenticado");
      }

      return updateProfile({
        userId: user?.id,
        username: data.username,
        bio: data.bio,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["profile-id"] });
    },
  });
}
