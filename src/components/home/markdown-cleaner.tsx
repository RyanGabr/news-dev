import { useMemo } from "react";
import removeMd from "remove-markdown";

interface PlainTextProps {
  markdown: string;
}

export function MarkdownCleaner({ markdown }: PlainTextProps) {
  const plainText = useMemo(() => {
    return removeMd(markdown, {
      stripListLeaders: true,
      listUnicodeChar: "",
      useImgAltText: false,
    });
  }, [markdown]);

  return (
    <p className="whitespace-pre-wrap text-foreground/50 line-clamp-2 text-ellipsis">
      {plainText}
    </p>
  );
}
