import { Button } from "@/components/ui/button";
import { useCreateUser } from "@/hooks/use-auth";
import { useDebounce } from "@/hooks/use-debounce";
import { useUsernameAvailability } from "@/hooks/use-profile";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { Mail01Icon, ViewIcon, ViewOffIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { CircleCheck, CircleX, LoaderCircle } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link } from "react-router-dom";
import { signupSchema, type SignupFormData } from "../../schemas/signup";

export function SignUp() {
  const [pageStep, setPageStep] = useState<string>("form");
  const [passwordInputType, setPasswordInputType] =
    useState<string>("password");

  const { mutateAsync, isPending, error: apiError } = useCreateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const usernameValue = useWatch({ control, name: "username" }) ?? "";
  const debouncedUsername = useDebounce(usernameValue, 500);

  const { data: isAvailable, isFetching } = useUsernameAvailability({
    username: debouncedUsername,
  });

  const toggleShowPassword = useCallback(() => {
    setPasswordInputType((state) =>
      state === "password" ? "text" : "password",
    );
  }, []);

  async function handleCreateUser(data: SignupFormData) {
    if (!isAvailable) {
      return;
    }

    if (isFetching) return;

    try {
      await mutateAsync(data);

      setPageStep("confirm-email");
      reset();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Ocorreu um erro desconhecido";

      throw new Error(errorMessage);
    }
  }

  return (
    <main className="w-full h-screen bg-secondary">
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

                <p className="font-semibold text-2xl tracking-tight">
                  Inscrever-se
                </p>
              </div>

              <p className="text-muted-foreground text-sm">
                Uma plataforma de publicação de conteúdo, fique por dentro de
                tudo que está acontecendo.
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
                <label className="text-sm">Nome</label>
                <input
                  {...register("display_name")}
                  type="text"
                  placeholder="Ryan Gabriel"
                  className="py-2.5 text-sm outline-0 border-b focus:border-foreground"
                />
                {errors.display_name && (
                  <span className="text-xs text-red-500">
                    {errors.display_name.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm">Nome de usuário</label>
                <div className="relative">
                  <input
                    {...register("username")}
                    type="text"
                    placeholder="@ryangabr"
                    className="py-2.5 text-sm outline-0 border-b focus:border-foreground w-full"
                  />

                  <div className="absolute right-3 top-2.5">
                    {isFetching && (
                      <LoaderCircle
                        className="animate-spin text-muted-foreground"
                        size={18}
                      />
                    )}

                    {!isFetching &&
                      debouncedUsername.length >= 3 &&
                      (isAvailable ? (
                        <CircleCheck className="text-green-400" size={18} />
                      ) : (
                        <CircleX className="text-red-400" size={18} />
                      ))}
                  </div>
                </div>
                {!isAvailable &&
                  debouncedUsername.length > 3 &&
                  !isFetching && (
                    <p className="text-xs text-red-400">
                      Este nome de usuário já está em uso.
                    </p>
                  )}

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
                  disabled={isPending || !isAvailable}
                  className="w-full py-2.5"
                  rounded="lg"
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
