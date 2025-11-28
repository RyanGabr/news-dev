import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useUserCreate } from "../../hooks/use-create-user";
import { signupSchema, type SignupFormData } from "../../schemas/signup";

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
    <main className="w-full h-screen">
      {pageStep === "form" ? (
        <form
          onSubmit={handleSubmit(handleCreateUser)}
          className="absolute top-1/2 left-1/2 -translate-1/2 w-96 flex flex-col gap-5"
        >
          <div>
            <h2 className="font-semibold text-2xl">Cadastro</h2>
          </div>

          <div className="space-y-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm">Nome de usuário</label>
              <input
                {...register("username")}
                type="text"
                placeholder="SeuNome"
                className="p-2.5 rounded-md border border-black/15 text-sm"
              />
              {errors.username && (
                <span className="text-sm text-red-500">
                  {errors.username.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm">Email</label>
              <input
                {...register("email")}
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
              Cadastrar
            </button>
          </div>

          {apiError && (
            <div className="text-center">
              <p className="text-sm text-red-500">
                Erro ao criar seu perfil. Tente novamente.
              </p>
            </div>
          )}
        </form>
      ) : (
        <div className="absolute top-1/2 left-1/2 -translate-1/2 w-96 flex flex-col gap-5 text-center">
          <h2 className="font-semibold text-2xl">Confirme seu email</h2>
          <p>
            Verifique seu email, enviamos uma confirmação de email para voce!
          </p>
        </div>
      )}
    </main>
  );
}
