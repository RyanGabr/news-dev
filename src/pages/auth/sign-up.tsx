import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useUserCreate } from "../../hooks/use-create-user";
import { signupSchema, type SignupFormData } from "../../schemas/signup";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mail01Icon, ViewIcon, ViewOffIcon } from "@hugeicons/core-free-icons";

export function SignUp() {
  const [pageStep, setPageStep] = useState<string>("form");
  const [passwordInputType, setPasswordInputType] =
    useState<string>("password");

  const { mutateAsync, isPending, error: apiError } = useUserCreate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const toggleShowPassword = useCallback(() => {
    setPasswordInputType((state) =>
      state === "password" ? "text" : "password",
    );
  }, []);

  async function handleCreateUser(data: SignupFormData) {
    await mutateAsync(data);

    setPageStep("confirm-email");
    reset();
  }

  return (
    <main className="w-full h-screen bg-secondary-foreground">
      {pageStep === "form" ? (
        <form
          onSubmit={handleSubmit(handleCreateUser)}
          className="absolute top-1/2 left-1/2 -translate-1/2 w-[calc(100%-2rem)] max-w-2xl flex flex-col lg:flex-row bg-background rounded-2xl divide-y lg:divide-x lg:divide-y-0"
        >
          {/*Left side*/}
          <div className="p-6 flex flex-col justify-between w-full lg:w-1/2">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <img
                  src="https://www.notion.com/front-static/favicon.ico"
                  alt=""
                  className="w-6"
                />

                <h2 className="font-semibold text-2xl tracking-tight">
                  Inscrever-se
                </h2>
              </div>

              <p className="text-muted-foreground text-sm">
                Preencha com seus dados para criar sua conta no news.dev
              </p>
            </div>

            <div>
              <div className="w-full flex items-center gap-1.5 text-sm text-muted-foreground">
                <p>Já possui uma conta?</p>
                <Link
                  to="/login"
                  className="text-foreground hover:opacity-90 transition"
                >
                  Fazer login
                </Link>
              </div>
            </div>
          </div>

          {/*Right side*/}
          <div className="p-6 w-full lg:w-1/2 space-y-4">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm">Nome de usuário</label>
                <input
                  {...register("username")}
                  type="text"
                  placeholder="ryangabr"
                  className="py-2.5 text-sm outline-0 border-b focus:border-foreground"
                />
                {errors.username && (
                  <span className="text-xs text-red-500">
                    {errors.username.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm">Email</label>
                <input
                  {...register("email")}
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
                <label className="text-sm">Senha</label>

                <div className="relative w-full">
                  <input
                    {...register("password")}
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
                        passwordInputType === "password"
                          ? ViewIcon
                          : ViewOffIcon
                      }
                      size={18}
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
                  {isPending ? "Cadastrando..." : "Cadastrar"}
                </Button>
              </div>
            </div>

            {apiError && (
              <div className="text-center">
                <p className="text-xs text-red-500">
                  Erro ao criar seu perfil. Tente novamente.
                </p>
              </div>
            )}
          </div>
        </form>
      ) : (
        <div className="absolute top-1/2 left-1/2 -translate-1/2 w-96 flex flex-col gap-5 text-center">
          <div className="p-6 bg-background rounded-2xl flex flex-col items-center gap-1">
            <div className="flex items-center gap-2 mb-2">
              <div>
                <img
                  src="https://www.notion.com/front-static/favicon.ico"
                  alt=""
                  className="w-8"
                />
              </div>
              <hr className="w-3 bg-secondary-foreground" />
              <div className="bg-foreground/10 p-1.5 rounded-md">
                <HugeiconsIcon icon={Mail01Icon} strokeWidth={2} />
              </div>
            </div>

            <h2 className="font-medium text-lg">Confirme sua caixa de email</h2>
            <p className="text-muted-foreground text-sm">
              Verifique seu email, enviamos uma confirmação de email para voce!
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
