import { useCallback, useState } from "react";
import { useUserLogin } from "../../hooks/use-user-login";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { loginSchema, type LoginFormData } from "../../schemas/login";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon, ViewOffIcon } from "@hugeicons/core-free-icons";

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
        className="absolute top-1/2 left-1/2 -translate-1/2 w-96 flex flex-col gap-5 items-center justify-center"
      >
        <div>
          <h2 className="font-bold text-2xl">Entrar</h2>
        </div>

        <div className="space-y-5 w-full">
          <div className="flex flex-col gap-1.5">
            <input
              {...register("email")}
              aria-invalid={!!errors.email}
              type="email"
              placeholder="Insira seu endereço de email"
              className="bg-foreground/5 py-3 px-4 rounded-md text-[15px] outline-0"
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="relative w-full">
              <input
                {...register("password")}
                aria-invalid={!!errors.password}
                type={passwordInputType}
                placeholder="Senha"
                className="bg-foreground/5 py-3 px-4 rounded-md text-[15px] outline-0 w-full"
              />
              <Button
                type="button"
                onClick={toggleShowPassword}
                aria-label={
                  passwordInputType === "password"
                    ? "Mostrar senha"
                    : "Ocultar senha"
                }
                className="absolute top-1/2 -translate-y-1/2 right-3 p-1 bg-transparent text-foreground"
              >
                <HugeiconsIcon
                  icon={
                    passwordInputType === "password" ? ViewIcon : ViewOffIcon
                  }
                  size={22}
                  strokeWidth={2}
                />
              </Button>
            </div>

            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>
        </div>

        <div className="w-full">
          <Button type="submit" disabled={isPending} className="w-full py-3">
            {isPending ? "Entrando..." : "Avançar"}
          </Button>
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

        <div className="w-full flex items-center justify-center gap-1">
          <p>Não possui uma conta?</p>
          <Link to="/signup" className="text-blue-500 hover:underline">
            Inscreva-se
          </Link>
        </div>
      </form>
    </main>
  );
}
