import type { Database } from "@/lib/database.types";

export type Post = Database["public"]["Tables"]["posts"]["Row"];

export type PostWithAuthor = Post & {
  profiles: {
    username: string;
    bio: string | null;
    display_name: string;
    avatar_url: string | null;
  };
};
