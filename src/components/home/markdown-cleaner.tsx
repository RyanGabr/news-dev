import { cn } from "@/lib/utils";
import { useMemo } from "react";
import removeMd from "remove-markdown";

interface PlainTextProps {
  markdown: string;
  className?: string;
}

export function MarkdownCleaner({ markdown, className }: PlainTextProps) {
  const plainText = useMemo(() => {
    return removeMd(markdown, {
      stripListLeaders: true,
      listUnicodeChar: "",
      useImgAltText: false,
    });
  }, [markdown]);

  return (
    <p
      className={cn(
        "whitespace-pre-wrap text-foreground/50 line-clamp-1 text-ellipsis text-sm",
        className,
      )}
    >
      {plainText}
    </p>
  );
}
