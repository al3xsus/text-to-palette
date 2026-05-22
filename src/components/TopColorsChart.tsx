import React from 'react';
import TileChart from "./TileChart"
import hslToHex from '../lib/hslToHex'
import getVisualChar from "../lib/getVisualChar"
import copyToClipboard from "../lib/copyToClipboard"
import type { PaletteItem } from '../lib/getPalette';

interface TopColorsChartProps {
    palette: PaletteItem[];
    number: number;
}

const TopColorsChart: React.FC<TopColorsChartProps> = ({ palette, number }) => {

    const handleClick = () => {
        const info = palette.slice(0, number).map(item => {
            return {
                char: getVisualChar(item.char),
                hsl: `${item.h}, ${item.s}%, ${item.l}%`,
                hex: "#" + hslToHex(item.h, item.s, item.l),
                count: item.count
            }
        })
        copyToClipboard(JSON.stringify(info))
    }

    const generateLink = () => {
        const links = palette.slice(0, number).map(item => hslToHex(item.h, item.s, item.l)).join("-")
        return links
    }

    return (<section>
        <h4>Top-{number} colors</h4>
        <div style={{ display: "flex", flexFlow: "row wrap", justifyContent: "center", alignItems: "center" }}>
            <TileChart data={palette.slice(0, number)} />
        </div>
        <div style={{ display: "flex", flexFlow: "row wrap", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", flexFlow: "column wrap", gap: "1rem", alignItems: "flex-start" }}>
                <a href={`https://coolors.co/${generateLink()}`} target="_blank" rel="noreferrer">See this palette at COOLORS</a>
                <a href={`https://coolors.co/visualizer/${generateLink()}`} target="_blank" rel="noreferrer">Visualize  palette at COOLORS</a>
            </div>
            <button title={`Copy top-${number} colors`} onClick={handleClick}>
                copy as JSON
            </button>
        </div>
        <hr/>

    </section>)
}

export default TopColorsChart
