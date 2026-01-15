import { supabase } from "@/lib/supabase";

export interface GetProfileByUsernameParams {
  username: string;
}

export interface GetProfileByIdParams {
  id: string;
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
