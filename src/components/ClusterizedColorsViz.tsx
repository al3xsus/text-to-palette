import React, { useMemo, useState } from "react";
import PackedGroupCards from "./PackedGroupCards";
import ColorWheelChart from "./ColorWheelChart";

import copyToClipboard from "../lib/copyToClipboard"
import hslToHex from "../lib/hslToHex"
import type { ColorCluster } from "../lib/getWeightedClusters";
import CopyButton from "./CopyButton";

interface ClusterizedColorsVizProps {
    clusters: ColorCluster[];
}

const ClusterizedColorsViz: React.FC<ClusterizedColorsVizProps> = ({ clusters }) => {

    const [sorting, setSorting] = useState<'strength' | 'density'>('strength')

    const sortedClusters = useMemo(() => {
        if (sorting === 'strength') {
            return [...clusters].sort((a, b) => b.strength - a.strength);
        }
        else {
            return [...clusters].sort((a, b) => b.density - a.density);
        }
    }, [clusters, sorting]);

    const prepareData = () => {
        const info = clusters.map(item => {
            return {
                id: item.id,
                strength: item.strength,
                density: item.density,
                hsl: `${item.representativeHue}, ${item.representativeSat}%, 50%`,
                hex: "#" + hslToHex(item.representativeHue, item.representativeSat, 50)
            }
        })
        return JSON.stringify(info, null, 2);
    }

    const generateLink = () => {
        const links = clusters.map(item => hslToHex(item.representativeHue, item.representativeSat, 50)).join("-")
        return links
    }

    return (
        <article>

            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <h3>
                    Weighted clusterized colors
                </h3>

                <section style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
                    <button onClick={() => setSorting("density")} disabled={sorting === "density"}>Sort by Density</button>
                    <button onClick={() => setSorting("strength")} disabled={sorting === "strength"}>Sort by Strength</button>
                </section>
            </div>


            <section style={{ display: "flex", flexFlow: "row wrap", justifyContent: "center", alignItems: "center", gap: "10px" }}>
                {sortedClusters.map((item, index) => (
                    <div key={`pal-${index}`} style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "1rem" }} title={`${item.representativeHue}, ${item.representativeSat}%, 50%`}>
                        <div title={`strength: ${item.strength}, density: ${item.density}`} style={{
                            backgroundColor: `hsl(${item.representativeHue}, ${item.representativeSat}%, 50%)`,
                            width: "3rem",
                            height: "3rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "4px",
                            fontWeight: "bold",
                            fontSize: "1.2rem",
                            transition: 'height 0.5s ease-in-out',
                        }}></div>
                        <span style={{
                            marginTop: '8px',
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }}>
                            Group: {item.id}
                        </span>
                    </div>
                ))}
            </section>

            {clusters.length <= 10 ? <div style={{ display: "flex", flexFlow: "row wrap", justifyContent: "space-between", alignItems: "center", paddingTop: "1rem" }}>
                <div style={{ display: "flex", flexFlow: "column wrap", gap: "1rem", alignItems: "flex-start" }}>
                    <a href={`https://coolors.co/${generateLink()}`} target="_blank" rel="noreferrer">See this palette at COOLORS</a>
                    <a href={`https://coolors.co/visualizer/${generateLink()}`} target="_blank" rel="noreferrer">Visualize  palette at COOLORS</a>
                </div>
                <CopyButton
                    label="Copy as JSON"
                    copiedLabel="Copied!"
                    title="Copy clusterized colors"
                    getText={prepareData}
                />
            </div> : <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <CopyButton
                    label="Copy as JSON"
                    copiedLabel="Copied!"
                    title="Copy clusterized colors"
                    getText={prepareData}
                />
            </div>}

            <hr />

            <PackedGroupCards data={sortedClusters} />

            <ColorWheelChart data={sortedClusters} />
        </article>
    )
}

export default ClusterizedColorsViz;
