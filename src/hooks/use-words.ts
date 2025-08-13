import { useGamePackStore } from '../stores/game-pack.store';

export function useWords() {
  const { pack, packLanguage } = useGamePackStore();

  if (!pack) return [];

  const words = pack.words[packLanguage as keyof typeof pack.words] || [];

  // Ensure regexes are real RegExp instances even after persistence (JSON) and include self-regex
  return words.map((w) => {
    const main = w.main;
    const parsed = Array.isArray(w.regexes) ? w.regexes : [];
    const regexes: RegExp[] = parsed
      .map((r: unknown) => {
        if (r instanceof RegExp) return r;
        if (r && typeof r === 'object') {
          const maybe = r as { source?: string; flags?: string };
          if (typeof maybe.source === 'string') {
            try {
              return new RegExp(maybe.source, maybe.flags ?? 'i');
            } catch {
              return null;
            }
          }
        }
        if (typeof r === 'string') {
          try {
            return new RegExp(r, 'i');
          } catch {
            return null;
          }
        }
        return null;
      })
      .filter((x): x is RegExp => x instanceof RegExp);

    // Add self regex if missing
    const self = new RegExp(escapeRegExp(main), 'i');
    if (!regexes.some((rr) => rr.source === self.source && rr.flags === self.flags)) {
      regexes.push(self);
    }

    return { main, regexes };
  });
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
