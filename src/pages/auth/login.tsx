import { useCallback, useState } from "react";
import { useUserLogin } from "../../hooks/use-user-login";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { loginSchema, type LoginFormData } from "../../schemas/login";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon, ViewOffIcon } from "@hugeicons/core-free-icons";
import { Label } from "@/components/ui/label";

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
    <main className="w-full h-screen bg-secondary-foreground">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="absolute top-1/2 left-1/2 -translate-1/2 w-[calc(100%-2rem)] max-w-2xl flex flex-col lg:flex-row bg-background rounded-2xl divide-y lg:divide-x lg:divide-y-0"
      >
        <div className="p-6 flex flex-col justify-between w-full lg:w-1/2">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img
                src="https://www.notion.com/front-static/favicon.ico"
                alt=""
                className="w-6"
              />

              <h2 className="font-semibold text-2xl tracking-tight">
                Entrar no news.dev
              </h2>
            </div>

            <p className="text-muted-foreground text-sm">
              Uma plataforma de publicação de conteúdo, fique por dentro de tudo
              que está acontecendo.
            </p>
          </div>

          <div>
            <div className="w-full flex items-center gap-1.5 text-sm text-muted-foreground">
              <p>Não possui uma conta?</p>
              <Link
                to="/signup"
                className="text-foreground hover:opacity-90 transition"
              >
                Inscreva-se
              </Link>
            </div>
          </div>
        </div>

        <div className="p-6 w-full lg:w-1/2 space-y-4">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <Label>Email</Label>

              <input
                {...register("email")}
                aria-invalid={!!errors.email}
                type="email"
                placeholder="ryan@mail.com"
                className="py-2.5 text-sm outline-0 border-b focus:border-foreground"
              />
              {errors.email && (
                <span className="text-xs text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Senha</Label>

              <div className="relative w-full">
                <input
                  {...register("password")}
                  aria-invalid={!!errors.password}
                  type={passwordInputType}
                  placeholder="******"
                  className="py-2.5 text-sm outline-0 border-b w-full focus:border-foreground"
                />
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={toggleShowPassword}
                  aria-label={
                    passwordInputType === "password"
                      ? "Mostrar senha"
                      : "Ocultar senha"
                  }
                  className="absolute top-1/2 -translate-y-1/2 right-0 p-1"
                >
                  <HugeiconsIcon
                    icon={
                      passwordInputType === "password" ? ViewIcon : ViewOffIcon
                    }
                    size={18}
                    strokeWidth={2}
                  />
                </Button>
              </div>

              {errors.password && (
                <span className="text-xs text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="w-full">
              <Button
                type="submit"
                size="sm"
                rounded="full"
                disabled={isPending}
                className="w-full py-2.5"
              >
                {isPending ? "Entrando..." : "Continuar"}
              </Button>
            </div>
          </div>

          {apiError && (
            <div className="text-center">
              <p className="text-xs text-red-500">
                {apiError.message === "WRONG_CREDENTIALS"
                  ? "Email ou senha incorretos. Tente novamente"
                  : "Erro ao realizar o login. Tente novamente."}
              </p>
            </div>
          )}
        </div>
      </form>
    </main>
  );
}
