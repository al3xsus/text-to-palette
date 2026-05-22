import React, { useMemo, useState } from "react";
import CharacterChart from "./CharacterChart"
import TileChart from "./TileChart"
import TopColorsChart from "./TopColorsChart";

import hslToHex from "../lib/hslToHex"
import getVisualChar from "../lib/getVisualChar"
import type { PaletteItem } from "../lib/getPalette";
import CopyButton from "./CopyButton";

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

    const prepareData = () => {
        const info = palette.map(item => {
            return {
                char: getVisualChar(item.char),
                hsl: `${item.h}, ${item.s}%, ${item.l}%`,
                hex: hslToHex(item.h, item.s, item.l),
                count: item.count,
            };
        });

        return JSON.stringify(info, null, 2);
    }

    return (
        <article>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <h3>
                    Raw colors
                </h3>

                <section style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
                    <button onClick={() => setSorting("count")} disabled={sorting === "count"}>Sort by Count</button>
                    <button onClick={() => setSorting("alphabet")} disabled={sorting === "alphabet"}>Sort by Alphabet</button>
                </section>

                <h4>Symbols and their counts</h4>
            </div>

            <CharacterChart data={sortedPalette} />

            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <h4>Symbols and their colors</h4>
            </div>

            <TileChart data={sortedPalette} />

            <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "1rem" }}>
                <CopyButton
                    label="Copy as JSON"
                    copiedLabel="Copied!"
                    title="Copy raw colors"
                    getText={prepareData}
                />
            </div>

            <hr />

            {sortedPalette.length > 5 && <TopColorsChart palette={sortedPalette} number={5} />}

            {sortedPalette.length > 10 && <TopColorsChart palette={sortedPalette} number={10} />}

        </article>
    )
}

export default RawColorsViz;
