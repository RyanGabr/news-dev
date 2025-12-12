import {
  MarkdownContext,
  type MarkdownContextType,
} from "@/context/markdown-context";
import { useContext } from "react";

export function useMarkdown(): MarkdownContextType {
  const context = useContext(MarkdownContext);
  if (!context) {
    throw new Error(
      "useMarkdown só pode ser usado dentro de um MarkdownProvider",
    );
  }
  return context;
}
