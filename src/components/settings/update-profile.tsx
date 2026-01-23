import type { Profile } from "@/types/profile";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import {
  updateProfileSchema,
  type UpdateProfileFormData,
} from "@/schemas/profile";
import { useUpdateProfile, useUsernameAvailability } from "@/hooks/use-profile";
import { useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { CircleCheck, CircleX, LoaderCircle } from "lucide-react";

interface UpdateProfileProps {
  profile: Profile;
}

export function UpdateProfile({ profile }: UpdateProfileProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      username: profile.username,
      bio: profile.bio,
      display_name: profile.display_name,
    },
  });

  const formValues = useWatch({ control });
  const usernameValue = useWatch({ control, name: "username" });
  const debouncedUsername = useDebounce(usernameValue.trim(), 500);

  const { data: isAvailable, isFetching } = useUsernameAvailability({
    currentUserId: profile.id,
    username: debouncedUsername,
  });

  const { mutateAsync, isPending } = useUpdateProfile();

  const hasRealChanges =
    formValues.username?.trim() !== profile.username?.trim() ||
    formValues.display_name?.trim() !== (profile.display_name?.trim() || "") ||
    formValues.bio?.trim() !== (profile.bio?.trim() || "");

  const canSave = hasRealChanges && isAvailable && !isFetching && !isPending;

  async function updateProfile(data: UpdateProfileFormData) {
    await mutateAsync(data, {
      onSuccess: () => {
        setDialogIsOpen(false);
      },
    });
  }

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <button className="text-sm text-sky-600 dark:text-blue-400 font-medium cursor-pointer">
          Editar perfil
        </button>
      </DialogTrigger>
      <DialogContent className="w-lg">
        <DialogTitle className="text-sm font-medium">Editar perfil</DialogTitle>

        <form id="update-profile-form" onSubmit={handleSubmit(updateProfile)}>
          <div className="flex items-center justify-center py-10">
            <button className="cursor-pointer group relative">
              <div className="bg-black/40 w-full h-full absolute rounded-full items-center justify-center hidden group-hover:flex transition">
                <p className="text-xs font-medium">Alterar</p>
              </div>

              <img
                src="https://pbs.twimg.com/profile_images/1999199376619581440/8W7FN5gc_400x400.jpg"
                alt=""
                className="min-w-24 max-w-24 rounded-full"
              />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nome de usuário</Label>
              <div className="relative">
                <input
                  type="text"
                  {...register("username")}
                  spellCheck={false}
                  className="px-3 py-2 rounded-md border border-border text-sm w-full"
                />

                <div className="absolute right-3 top-2.5">
                  {isFetching && (
                    <LoaderCircle
                      className="animate-spin text-muted-foreground"
                      size={18}
                    />
                  )}
                  {!isFetching &&
                    debouncedUsername.length > 0 &&
                    debouncedUsername !== profile.username &&
                    (isAvailable ? (
                      <CircleCheck className="text-green-400" size={18} />
                    ) : (
                      <CircleX className="text-red-400" size={18} />
                    ))}
                </div>
              </div>

              {!isAvailable && debouncedUsername.length > 0 && !isFetching && (
                <p className="text-xs text-red-400">
                  Este nome de usuário já está em uso.
                </p>
              )}

              {errors.username && (
                <span className="text-xs text-red-400">
                  {errors.username.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label>Nome</Label>
              <input
                type="text"
                {...register("display_name")}
                spellCheck={false}
                className="px-3 py-2 rounded-md border border-border text-sm w-full"
              />
            </div>

            <div className="space-y-2 col-span-2">
              <Label>Bio</Label>
              <textarea
                rows={5}
                {...register("bio")}
                spellCheck={false}
                className="px-3 py-2 rounded-md border border-border text-sm w-full resize-none"
              />
            </div>
          </div>
        </form>

        <DialogFooter>
          <Button
            form="update-profile-form"
            type="submit"
            size="sm"
            disabled={!canSave}
          >
            Salvar alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
