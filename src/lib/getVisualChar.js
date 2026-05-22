export default function getVisualChar(char) {
    // Mapping of unprintable characters to their visual symbols
    const charMap = {
        ' ': { symbol: '·', name: 'space' },
        '\t': { symbol: '→', name: 'tab' },
        '\n': { symbol: '↵', name: 'newline' },
        '\r': { symbol: '␍', name: 'cr' },
        '\u00A0': { symbol: '⍽', name: 'nbsp' }, // Non-breaking space
        '\u200B': { symbol: '󠁟', name: 'zwsp' }  // Zero-width space (using a blank box)
    };

    const match = charMap[char];

    if (match) {
        // Return the symbol wrapped in a span for styling
        return match.symbol;
    }

    return char;
}