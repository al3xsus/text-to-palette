export interface AnalysisSettings {
    includeWhitespace: boolean;
    includePunctuation: boolean;
    includeDigits: boolean;
    includeSymbols: boolean;
    includeControls: boolean;
    caseSensitive: boolean;
}

export interface AnalysisResult {
    counts: {
        totalRaw: number;
        workingCharacters: number;
        words: number;
    };
    ratios: {
        lexicalDiversity: number;
    };
    distribution: {
        wordLengthAvg: number;
        wordLengthMax: number;
        burstiness: number;
    };
    mathematical: {
        entropy: number;
        charMap: Record<string, number>;
    };
}

const analyzeText = (text: string, settings: AnalysisSettings): AnalysisResult | null => {
    if (!text || text.length === 0) return null;

    // Initial Split
    const rawChars = text.split('');

    const filteredChars = rawChars.filter(char => {

        // any whitespace
        const isSpace = /\p{Separator}/u.test(char);

        // punctuation in any script
        const isPunct = /\p{P}/u.test(char);

        //any numeric digit in any language
        const isDigit = /\p{N}/u.test(char);

        // any letter
        // const isLetter = /\p{L}/u.test(char); // Unused but kept for reference

        // any special symbol
        const isSymbol = /\p{S}/u.test(char);

        // any control symbol
        const isControl = /\p{C}/u.test(char);

        if (!settings.includeWhitespace && isSpace) return false;
        if (!settings.includePunctuation && isPunct) return false;
        if (!settings.includeDigits && isDigit) return false;
        if (!settings.includeSymbols && isSymbol) return false;
        if (!settings.includeControls && isControl) return false;
        return true;
    });

    const workingText = filteredChars.join('');
    const words = workingText.trim().split(/\s+/).filter(w => w.length > 0);

    // Character Frequency Map (from filtered set)
    const charMap: Record<string, number> = {};
    filteredChars.forEach(char => {
        const key = settings.caseSensitive ? char : char.toLowerCase();
        charMap[key] = (charMap[key] || 0) + 1;
    });

    // Mathematical Complexity (Shannon Entropy) on filtered data
    const len = filteredChars.length;
    const entropy = Object.values(charMap).reduce((acc, freq) => {
        const p = freq / len;
        return acc - p * Math.log2(p);
    }, 0);

    // 5. Word Metrics & Burstiness
    const wordLengths = words.map(w => w.length);
    const avgWordLength = wordLengths.length > 0 ? wordLengths.reduce((a, b) => a + b, 0) / words.length : 0;
    const uniqueWords = new Set(words.map(w => w.toLowerCase()));

    const squareDiffs = wordLengths.map(len => Math.pow(len - avgWordLength, 2));
    const burstiness = wordLengths.length > 0 ? Math.sqrt(squareDiffs.reduce((a, b) => a + b, 0) / words.length) : 0;

    return {
        counts: {
            totalRaw: text.length,
            workingCharacters: len,
            words: words.length,
        },
        ratios: {
            lexicalDiversity: uniqueWords.size / (words.length || 1),
        },
        distribution: {
            wordLengthAvg: avgWordLength,
            wordLengthMax: wordLengths.length > 0 ? Math.max(...wordLengths) : 0,
            burstiness: burstiness,
        },
        mathematical: {
            entropy: entropy,
            charMap: charMap
        }
    };
};

export default analyzeText;
