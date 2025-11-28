import { useCallback, useState } from "react";
import { useUserLogin } from "../../hooks/use-user-login";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { loginSchema, type LoginFormData } from "../../schemas/login";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
  const [passwordInputType, setPasswordInputType] =
    useState<string>("password");

  const { mutateAsync, isPending, error: apiError } = useUserLogin();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const toggleShowPassword = useCallback(() => {
    setPasswordInputType((state) =>
      state === "password" ? "text" : "password",
    );
  }, []);

  async function handleLogin(data: LoginFormData) {
    await mutateAsync(data);

    reset();
    navigate("/");
  }

  return (
    <main className="w-full h-screen">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="absolute top-1/2 left-1/2 -translate-1/2 w-96 flex flex-col gap-5"
      >
        <div>
          <h2 className="font-semibold text-2xl">Login</h2>
        </div>

        <div className="space-y-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm">Email</label>
            <input
              {...register("email")}
              aria-invalid={!!errors.email}
              type="email"
              placeholder="Digite seu email"
              className="p-2.5 rounded-md border border-black/15 text-sm"
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm">Senha</label>
            <div className="relative w-full">
              <input
                {...register("password")}
                aria-invalid={!!errors.password}
                type={passwordInputType}
                placeholder="Digite sua senha"
                className="p-2.5 rounded-md border border-black/15 text-sm w-full"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                aria-label={
                  passwordInputType === "password"
                    ? "Mostrar senha"
                    : "Ocultar senha"
                }
                className="absolute top-1/2 -translate-y-1/2 right-3 text-sm bg-black/10 p-1 rounded"
              >
                {passwordInputType === "password" ? "Mostrar" : "Ocultar"}
              </button>
            </div>

            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-black rounded-md p-2.5 text-white text-sm disabled:opacity-50"
          >
            {isPending ? "Entrando..." : "Login"}
          </button>
        </div>

        {apiError && (
          <div className="text-center">
            <p className="text-sm text-red-500">
              {apiError.message === "WRONG_CREDENTIALS"
                ? "Email ou senha incorretos. Tente novamente"
                : "Erro ao realizar o login. Tente novamente."}
            </p>
          </div>
        )}

        <div className="w-full flex items-center justify-center gap-1 text-sm">
          <p>Não possui uma conta?</p>
          <Link to="/signup" className="text-blue-500 hover:underline">
            Criar conta
          </Link>
        </div>
      </form>
    </main>
  );
}
