import React from 'react';
import TileChart from "./TileChart"
import hslToHex from '../lib/hslToHex'
import getVisualChar from "../lib/getVisualChar"
import type { PaletteItem } from '../lib/getPalette';
import CopyButton from './CopyButton';

interface TopColorsChartProps {
    palette: PaletteItem[];
    number: number;
}

const TopColorsChart: React.FC<TopColorsChartProps> = ({ palette, number }) => {

    const prepareData = () => {
        const info = palette.slice(0, number).map(item => {
            return {
                char: getVisualChar(item.char),
                hsl: `${item.h}, ${item.s}%, ${item.l}%`,
                hex: "#" + hslToHex(item.h, item.s, item.l),
                count: item.count
            }
        })
        return JSON.stringify(info, null, 2);
    }

    const generateLink = () => {
        const links = palette.slice(0, number).map(item => hslToHex(item.h, item.s, item.l)).join("-")
        return links
    }

    return (<section>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <h4>Top-{number} colors</h4>
            </div>
        
        <div style={{ display: "flex", flexFlow: "row wrap", justifyContent: "center", alignItems: "center" }}>
            <TileChart data={palette.slice(0, number)} />
        </div>
        <div style={{ display: "flex", flexFlow: "row wrap", justifyContent: "space-between", alignItems: "center", paddingTop: "1rem" }}>
            <div style={{ display: "flex", flexFlow: "column wrap", gap: "1rem", alignItems: "flex-start" }}>
                <a href={`https://coolors.co/${generateLink()}`} target="_blank" rel="noreferrer">See this palette at COOLORS</a>
                <a href={`https://coolors.co/visualizer/${generateLink()}`} target="_blank" rel="noreferrer">Visualize  palette at COOLORS</a>
            </div>
            <CopyButton
                                                label="Copy as JSON"
                                                copiedLabel="Copied!"
                                                title={`Copy top-${number} colors`}
                                                getText={prepareData}
                                            />
        </div>
        <hr/>

    </section>)
}

export default TopColorsChart
