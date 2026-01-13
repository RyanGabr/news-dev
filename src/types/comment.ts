import type { Database } from "@/lib/database.types";

export type Comment = Database["public"]["Tables"]["comments"]["Row"];

export type CommentWithAutor = Comment & {
  author: {
    username: string;
  } | null;
};
