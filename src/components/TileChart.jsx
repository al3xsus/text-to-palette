import React from 'react';
import Tile from './Tile';

const TileChart = ({ data }) => {
    return (<section style={{ display: "flex", flexFlow: "row wrap", gap: "10px" }}>
        {data.map((item, index) => (
            <div key={`pal-${index}`} style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "1rem" }} title={item.hsl}>
                <Tile bgColor={item.hsl} char={item.char}/>
            </div>
        ))}
    </section>)
}

export default TileChart