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
    })
    .eq("id", data.userId)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return profile;
}
