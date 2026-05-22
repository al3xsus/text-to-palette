export default function getVisualChar(char: string): string {
    if (char === ' ') return '␣';
    if (char === '\n') return '↵';
    if (char === '\t') return '⇥';
    if (char === '\r') return '␍';
    return char;
}
