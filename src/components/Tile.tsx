import React from 'react';
import getVisualChar from "../lib/getVisualChar";
import getTextColorForHslBackground from '../lib/getTextColorForHslBackground';

interface TileProps {
    bgColor: string;
    char: string;
}

const Tile: React.FC<TileProps> = ({ bgColor, char }) => {
    const match = bgColor.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    let textColor = '#fff';
    if (match) {
        const h = parseInt(match[1]);
        const s = parseInt(match[2]);
        const l = parseInt(match[3]);
        textColor = getTextColorForHslBackground(h, s, l);
    }

    return (
        <div style={{
            backgroundColor: bgColor,
            width: "3rem",
            height: "3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "4px",
            color: textColor,
            fontWeight: "bold",
            fontSize: "1.2rem",
            textShadow: textColor === 'hsl(0 0% 100%)' ? "0 1px 2px rgba(0,0,0,0.5)" : "none"
        }} title={getVisualChar(char)}>
            {getVisualChar(char)}
        </div>
    )
}

export default Tile;
