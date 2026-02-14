import type { UpdateProfileFormData } from "@/schemas/profile";
import {
  checkUsernameAvailability,
  getProfileById,
  getProfileByUsername,
  updateProfile,
  uploadAvatar,
  type CheckUsernameAvailabilityParams,
  type GetProfileByIdParams,
  type GetProfileByUsernameParams,
  type UploadAvatarData as UploadAvatarPayload,
} from "@/services/profile";
import { useUser } from "@supabase/auth-helpers-react";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

type UploadAvatarData = Omit<UploadAvatarPayload, "userId">;

export function useGetProfileByUsername(params: GetProfileByUsernameParams) {
  return useSuspenseQuery({
    queryKey: ["profile", params.username],
    queryFn: () =>
      getProfileByUsername({
        username: params.username,
      }),
  });
}

export function useGetCurrentProfile() {
  const user = useUser();

  return useQuery({
    queryKey: ["current-user", user?.id],
    queryFn: () => getProfileById({ id: user!.id }),
    enabled: !!user?.id,
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

export function useUsernameAvailability({
  username,
  currentUserId,
}: CheckUsernameAvailabilityParams) {
  return useQuery({
    queryKey: ["username-available", username, currentUserId],
    queryFn: () => checkUsernameAvailability({ username, currentUserId }),
    enabled: username.trim().length >= 3,
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
        avatar_url: data.avatar_url,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["profile-id"] });
    },
  });
}

export function useUploadAvatar() {
  const user = useUser();

  return useMutation({
    mutationFn: (data: UploadAvatarData) => {
      if (!user?.id) {
        throw new Error("Usuário não autenticado");
      }

      return uploadAvatar({
        file: data.file,
        userId: user?.id,
      });
    },
  });
}
