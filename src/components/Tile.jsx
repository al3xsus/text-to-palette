import React from 'react';
import getVisualChar from "../lib/getVisualChar"

const Tile = ({bgColor, char}) => {
    return (<>
        <div style={{
            backgroundColor: bgColor,
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
            {getVisualChar(char)}
        </span></>)
}

export default Tile