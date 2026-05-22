import { useMemo, useState } from "react";
import PackedGroupCards from "./PackedGroupCards";
import ColorWheelChart from "./ColorWheelChart";

import copyToClipboard from "../lib/copyToClipboard"
import hslToHex from "../lib/hslToHex"
import cluster from "cluster";

const ClusterizedColorsViz = ({ clusters }) => {

    const [sorting, setSorting] = useState('strength')

    const sortedClusters = useMemo(() => {
        if (sorting === 'strength') {
            return [...clusters].sort((a, b) => b.strength - a.strength);
        }
        else {
            return [...clusters].sort((a, b) => b.density - a.density);
        }
    }, [clusters, sorting]);

    const handleClick = () => {
        const info = clusters.map(item => {
            return {
                id: item.id,
                strength: item.strength,
                density: item.density,
                hsl: `${item.representativeHue}, ${item.representativeSat}%, 50%`,
                hex: "#" + hslToHex(item.representativeHue, item.representativeSat, 50)
            }
        })
        copyToClipboard(JSON.stringify(info))
    }

    const generateLink = () => {
        let links = clusters.map(item => hslToHex(item.representativeHue, item.representativeSat, 50)).join("-")
        return links
    }

    return (
        <article>
            <h3>
                Weighted clusterized colors
            </h3>

            <section>
                <button onClick={() => setSorting("density")} disabled={sorting === "density"}>Sort by Density</button>
                <button onClick={() => setSorting("strength")} disabled={sorting === "strength"}>Sort by Strength</button>
            </section>

            <section style={{ display: "flex", flexFlow: "row wrap", justifyContent: "center", alignItems: "center", gap: "10px" }}>
                {sortedClusters.map((item, index) => (
                    <div key={`pal-${index}`} style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "1rem" }} title={item.hsl}>
                        <div title={`strength: ${item.strength}, density: ${item.density}`} style={{
                            backgroundColor: `hsl(${item.representativeHue}, ${item.representativeSat}%, 50%)`,
                            width: "2rem",
                            height: "2rem",
                            borderRadius: "4px",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
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

            {clusters.length <= 10 ? <div style={{ display: "flex", flexFlow: "row wrap", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", flexFlow: "column wrap", gap: "1rem", alignItems: "flex-start" }}>
                    <a href={`https://coolors.co/${generateLink()}`} target="_blank">See this palette at COOLORS</a>
                    <a href={`https://coolors.co/visualizer/${generateLink()}`} target="_blank">Visualize  palette at COOLORS</a>
                </div>
                <button title="Copy clusterized colors" onClick={handleClick}>
                    copy as JSON
                </button>
            </div> : <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button title="Copy clusterized colors" onClick={handleClick}>
                    copy as JSON
                </button>
            </div>}

            <hr/>

            <PackedGroupCards data={sortedClusters} />

            <ColorWheelChart data={sortedClusters} />
        </article>
    )
}

export default ClusterizedColorsViz;