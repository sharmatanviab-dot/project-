// Linguistic Stemmer, Morphological Normalizer & Ge'ez Transliterator

export class Stemmer {
  /**
   * Stems English words to their base lexical lemma
   */
  public static stem(word: string): string[] {
    const clean = word.toLowerCase().replace(/[^a-z0-9]/gi, '');
    if (clean.length <= 3) return [clean];

    const candidates = [clean];

    // Suffix rules
    if (clean.endsWith('ing')) {
      candidates.push(clean.slice(0, -3)); // clearing -> clear
      candidates.push(clean.slice(0, -3) + 'e'); // shining -> shine
    } else if (clean.endsWith('ed')) {
      candidates.push(clean.slice(0, -2)); // walked -> walk
      candidates.push(clean.slice(0, -1)); // lived -> live
    } else if (clean.endsWith('es')) {
      candidates.push(clean.slice(0, -2));
      candidates.push(clean.slice(0, -1));
    } else if (clean.endsWith('s') && !clean.endsWith('ss')) {
      candidates.push(clean.slice(0, -1)); // trees -> tree
    } else if (clean.endsWith('ly')) {
      candidates.push(clean.slice(0, -2)); // quickly -> quick
    } else if (clean.endsWith('al')) {
      candidates.push(clean.slice(0, -2)); // magical -> magic
    }

    return candidates;
  }

  /**
   * Transliterates Latin proper nouns / unfamiliar words into Amharic Ge'ez syllables
   */
  public static toGeez(word: string): string {
    const table: Record<string, string> = {
      b: 'ብ', c: 'ክ', d: 'ድ', f: 'ፍ', g: 'ግ', h: 'ህ', j: 'ጅ', k: 'ክ',
      l: 'ል', m: 'ም', n: 'ን', p: 'ፕ', q: 'ቅ', r: 'ር', s: 'ስ', t: 'ት',
      v: 'ቭ', w: 'ው', y: 'ይ', z: 'ዝ', a: 'አ', e: 'ኤ', i: 'ኢ', o: 'ኦ', u: 'ኡ'
    };

    let result = '';
    const lower = word.toLowerCase();
    for (let i = 0; i < lower.length; i++) {
      const ch = lower[i];
      result += table[ch] || ch;
    }
    return result;
  }
}
