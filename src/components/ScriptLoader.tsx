import { useEffect } from "react";

type ScriptLoaderProps = {
  scripts: string[];
};

/**
 * Safely injects external scripts (from /js) without altering their logic.
 * Loads each only once and ignores failures silently.
 */
export function ScriptLoader({ scripts }: ScriptLoaderProps) {
  useEffect(() => {
    const created: HTMLScriptElement[] = [];
    const loaded = new Set<string>();

    scripts.forEach((src) => {
      if (!src || loaded.has(src)) return;
      const s = document.createElement("script");
      s.src = src;
      s.async = false; // preserve execution order
      s.crossOrigin = "anonymous";
      s.onload = () => loaded.add(src);
      s.onerror = () => {
        // Fail silently to avoid breaking the SPA if a file doesn't exist
        // console.warn(`Script failed to load: ${src}`);
      };
      document.body.appendChild(s);
      created.push(s);
    });

    return () => {
      created.forEach((el) => {
        try {
          document.body.removeChild(el);
        } catch {
          // no-op
        }
      });
    };
  }, [scripts]);

  return null;
}
