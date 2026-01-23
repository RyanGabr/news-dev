import { supabase } from "@/lib/supabase";
import type { UpdateProfileFormData } from "@/schemas/profile";

export interface GetProfileByUsernameParams {
  username: string;
}

export interface GetProfileByIdParams {
  id: string;
}

export interface CheckUsernameAvailabilityParams {
  username: string;
  currentUserId: string;
}

export type UpdateProfileData = UpdateProfileFormData & {
  userId: string;
};

export interface UploadAvatarData {
  userId: string;
  file: File;
}

export async function getProfileByUsername(params: GetProfileByUsernameParams) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", params.username)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getProfileById(params: GetProfileByIdParams) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function checkUsernameAvailability(
  params: CheckUsernameAvailabilityParams,
) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", params.username)
    .not("id", "eq", params.currentUserId)
    .maybeSingle();

  if (error) return false;
  return !data;
}

export async function updateProfile(data: UpdateProfileData) {
  const { data: profile, error } = await supabase
    .from("profiles")
    .update({
      username: data.username,
      bio: data.bio,
      display_name: data.display_name,
      avatar_url: data.avatar_url as string,
    })
    .eq("id", data.userId)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return profile;
}

export async function uploadAvatar(data: UploadAvatarData) {
  const fileExt = data.file.name.split(".").pop();
  const filePath = `${data.userId}/${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, data.file, {
      upsert: true,
    });

  if (uploadError) throw new Error(uploadError.message);

  const { data: avatar } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath);

  return avatar.publicUrl;
}
