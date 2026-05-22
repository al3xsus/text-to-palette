import React from 'react';
import Tile from './Tile';
import type { PaletteItem } from '../lib/getPalette';

import getVisualChar from "../lib/getVisualChar";

interface TileChartProps {
    data: PaletteItem[];
}

const TileChart: React.FC<TileChartProps> = ({ data }) => {
    return (<section style={{ display: "flex", flexFlow: "row wrap", gap: "1rem" }}>
        {data.map((item, index) => (
            <div key={`pal-${index}`} style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "1rem" }} title={item.hsl}>
                <Tile bgColor={item.hsl} char={item.char}/>
                {getVisualChar(item.char)}
            </div>
        ))}
    </section>)
}

export default TileChart;
