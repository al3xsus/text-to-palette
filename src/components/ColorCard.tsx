import React from 'react';
import getVisualChar from "../lib/getVisualChar";
import getTextColorForHslBackground from '../lib/getTextColorForHslBackground';

interface ColorCardProps {
    char: string;
    color: string;
}

const ColorCard: React.FC<ColorCardProps> = ({ char, color }) => {
    // Extract HSL values from the color string "hsl(H, S%, L%)"
    const match = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    let textColor = '#fff';
    if (match) {
        const h = parseInt(match[1]);
        const s = parseInt(match[2]);
        const l = parseInt(match[3]);
        textColor = getTextColorForHslBackground(h, s, l);
    }

    return (
        <div
            style={{
                backgroundColor: color,
                color: textColor,
                textShadow: textColor === 'hsl(0 0% 100%)' ? '0 1px 2px rgba(0,0,0,0.4)' : 'none',
                height: '60px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 'bold',
                boxShadow: 'inset 0 -15px 15px rgba(0,0,0,0.05)'
            }}
            title={`Character: ${getVisualChar(char)}`}
        >
            {getVisualChar(char)}
        </div>
    );
};

export default ColorCard;
