import type { ReactNode } from "react";

export type Language = "sh" | "tsx" | "markdoc";

/**
 * Tiny tokenizer for the three snippets on this page. It colours strings, keywords, tags and Markdoc
 * delimiters, and leaves everything else as plain text. It is not a general highlighter.
 */
const PATTERNS: Record<Language, RegExp> = {
  sh: /(?<keyword>^npm)|(?<string>@[\w-]+\/[\w-]+)/g,
  tsx: /(?<string>"(?:[^"\\]|\\.)*")|(?<keyword>\b(?:import|from|function|return)\b)|(?<tag><\/?[A-Za-z][\w]*)|(?<punct>\/?>)/g,
  markdoc: /(?<heading>^## .*$)|(?<tag>\{%\s*\/?\w+\s*%\})/gm,
};

export function highlight(code: string, language: Language): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const match of code.matchAll(PATTERNS[language])) {
    const kind = Object.entries(match.groups ?? {}).find(([, value]) => value !== undefined)?.[0];
    if (match.index > last) out.push(code.slice(last, match.index));
    out.push(
      <span key={match.index} className={`tok-${kind}`}>
        {match[0]}
      </span>,
    );
    last = match.index + match[0].length;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}
