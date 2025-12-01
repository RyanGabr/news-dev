import type { Database } from "@/lib/database.types";

export type Post = Database["public"]["Tables"]["posts"]["Row"];

export type PostWithAuthor = Post & {
  profiles: {
    username: string;
  };
};
