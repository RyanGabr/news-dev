import { supabase } from "../lib/supabase";
import type { SignupFormData } from "../schemas/signup";

export async function createUser(data: SignupFormData) {
  const { email, password, username } = data;

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
  });

  if (profileError) {
    throw new Error(profileError.message);
  }

  // 3) Retorna o usuário
  return user;
}
