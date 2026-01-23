import { useDebounce } from "@/hooks/use-debounce";
import {
  useUpdateProfile,
  useUploadAvatar,
  useUsernameAvailability,
} from "@/hooks/use-profile";
import {
  updateProfileSchema,
  type UpdateProfileFormData,
} from "@/schemas/profile";
import type { Profile } from "@/types/profile";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { CircleCheck, CircleX, LoaderCircle } from "lucide-react";
import { useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";

interface UpdateProfileProps {
  profile: Profile;
}

export function UpdateProfile({ profile }: UpdateProfileProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync, isPending } = useUpdateProfile();
  const { mutateAsync: uploadAvatar, isPending: uploadIsPending } =
    useUploadAvatar();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      username: profile.username,
      bio: profile.bio,
      display_name: profile.display_name,
      avatar_url: profile.avatar_url,
    },
  });

  const formValues = useWatch({ control });
  const usernameValue = useWatch({ control, name: "username" });
  const avatarValue = useWatch({ control, name: "avatar_url" });
  const debouncedUsername = useDebounce(usernameValue.trim(), 500);

  const previewUrl =
    avatarValue instanceof File
      ? URL.createObjectURL(avatarValue)
      : avatarValue;

  const handleTriggerClick = () => fileInputRef.current?.click();

  const { data: isAvailable, isFetching } = useUsernameAvailability({
    currentUserId: profile.id,
    username: debouncedUsername,
  });

  const hasRealChanges =
    formValues.username?.trim() !== profile.username?.trim() ||
    formValues.display_name?.trim() !== (profile.display_name?.trim() || "") ||
    formValues.bio?.trim() !== (profile.bio?.trim() || "") ||
    avatarValue instanceof File;

  const canSave =
    hasRealChanges &&
    isAvailable &&
    !isFetching &&
    !isPending &&
    !uploadIsPending;

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      setValue("avatar_url", file, { shouldDirty: true });
    }
  }

  async function updateProfile(data: UpdateProfileFormData) {
    let finalAvatarUrl = profile.avatar_url;

    if (data.avatar_url instanceof File) {
      finalAvatarUrl = await uploadAvatar({ file: data.avatar_url });
    }

    await mutateAsync(
      {
        ...data,
        avatar_url: finalAvatarUrl,
      },
      {
        onSuccess: () => {
          setDialogIsOpen(false);
        },
      },
    );

    console.log(finalAvatarUrl);
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
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
            />

            <button
              onClick={handleTriggerClick}
              className="cursor-pointer group relative"
              type="button"
            >
              <div className="bg-black/40 w-full h-full absolute rounded-full items-center justify-center hidden group-hover:flex transition">
                <p className="text-xs font-medium">Alterar</p>
              </div>

              <img
                src={previewUrl || "/default-avatar.png"}
                alt="Profile preview"
                className="min-w-24 max-w-24 h-24 rounded-full object-cover"
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
