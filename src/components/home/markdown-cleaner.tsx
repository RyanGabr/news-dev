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
        "whitespace-pre-wrap text-sm lg:text-base text-muted-foreground line-clamp-3",
        className,
      )}
    >
      {plainText}
    </p>
  );
}
