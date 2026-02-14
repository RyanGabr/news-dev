import { supabase } from "../lib/supabase";
import type { LoginFormData } from "../schemas/login";
import type { SignupFormData } from "../schemas/signup";

export async function createUser(data: SignupFormData) {
  const { email, password, username, display_name } = data;

  // 1) Criar usuário no Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    throw new Error(authError.message);
  }

  const user = authData.user;

  if (!user) {
    throw new Error("Erro ao criar usuário.");
  }

  // 2) Criar o perfil utilizando exatamente o mesmo ID do Auth
  const { error: profileError } = await supabase.from("profiles").insert({
    id: user.id,
    username,
    display_name,
  });

  if (profileError) {
    throw new Error(profileError.message);
  }

  // 3) Retorna o usuário
  return user;
}

export async function loginUser(data: LoginFormData) {
  const { email, password } = data;

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    const message = error.message.toLowerCase();

    if (message.includes("invalid") || message.includes("credentials")) {
      throw new Error("WRONG_CREDENTIALS");
    }

    throw new Error("GENERIC_AUTH_ERROR");
  }

  return authData.user;
}

export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
