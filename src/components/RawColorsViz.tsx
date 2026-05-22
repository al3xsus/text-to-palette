import React, { useMemo, useState } from "react";
import CharacterChart from "./CharacterChart"
import TileChart from "./TileChart"
import TopColorsChart from "./TopColorsChart";

import copyToClipboard from "../lib/copyToClipboard"
import hslToHex from "../lib/hslToHex"
import getVisualChar from "../lib/getVisualChar"
import type { PaletteItem } from "../lib/getPalette";

interface RawColorsVizProps {
    palette: PaletteItem[];
}

const RawColorsViz: React.FC<RawColorsVizProps> = ({ palette }) => {

    const [sorting, setSorting] = useState<'alphabet' | 'count'>('alphabet')

    const sortedPalette = useMemo(() => {
        if (sorting === 'alphabet') {
            return [...palette].sort((a, b) => a.char.localeCompare(b.char));
        }
        else {
            return [...palette].sort((a, b) => b.count - a.count)
        }
    }, [palette, sorting]);

    const handleClick = () => {
        const info = palette.map(item => {
            return {
                char: getVisualChar(item.char),
                hsl: `${item.h}, ${item.s}%, ${item.l}%`,
                hex: "#" + hslToHex(item.h, item.s, item.l),
                count: item.count
            }
        })
        copyToClipboard(JSON.stringify(info))
    }

    return (
        <article>
            <h3>
                Raw colors
            </h3>

            <section>
                <button onClick={() => setSorting("count")} disabled={sorting === "count"}>Sort by Count</button>
                <button onClick={() => setSorting("alphabet")} disabled={sorting === "alphabet"}>Sort by Alphabet</button>
            </section>

            <h4>Symbols and their counts</h4>

            <CharacterChart data={sortedPalette} />

            <h4>Symbols and their colors</h4>

            <TileChart data={sortedPalette} />

            <div style={{display: "flex", justifyContent: "flex-end"}}>
                <button title="Copy raw colors" onClick={handleClick}>
                    copy as JSON 
                </button>
            </div>

            <hr/>

            {sortedPalette.length > 5 && <TopColorsChart palette={sortedPalette} number={5}/>}

            {sortedPalette.length > 10 && <TopColorsChart palette={sortedPalette} number={10}/>}

        </article>
    )
}

export default RawColorsViz;
