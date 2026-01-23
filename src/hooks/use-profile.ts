import type { UpdateProfileFormData } from "@/schemas/profile";
import {
  checkUsernameAvailability,
  getProfileById,
  getProfileByUsername,
  updateProfile,
  type CheckUsernameAvailabilityParams,
  type GetProfileByIdParams,
  type GetProfileByUsernameParams,
} from "@/services/profile";
import { useUser } from "@supabase/auth-helpers-react";
import {
  useMutation,
  useQuery,
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

export function useUsernameAvailability(
  params: CheckUsernameAvailabilityParams,
) {
  return useQuery({
    queryKey: ["username-available", params.username],
    queryFn: () => checkUsernameAvailability(params),
    enabled: params.username.length > 0,
    staleTime: 1000 * 60,
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
        display_name: data.display_name,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["profile-id"] });
    },
  });
}
