import React from 'react';
import getVisualChar from "../lib/getVisualChar"

const PackedGroupCards = ({ data }) => {
  // Find max strength to scale layout if needed
  const maxStrength = Math.max(...data.map(d => d.strength));

  return (
    <div style={{ paddingTop: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h3>Clusters as group of cards</h3>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px',
      }}>
        {data.map((root) => {
          // Create a subtle background tint using the root's representative color
          const rootBg = `hsl(${root.representativeHue}, ${root.representativeSat}%, 97%)`;
          const rootBorder = `hsl(${root.representativeHue}, ${root.representativeSat}%, 40%)`;

          return (
            <div 
              key={root.id} 
              style={{
                backgroundColor: rootBg,
                borderTop: `4px solid ${rootBorder}`,
                borderRadius: '6px',
                padding: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              {/* Root Header Info */}
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666' }}>
                  <strong>Group ID: {root.id}</strong>
                  <div title={`hsl(${root.representativeHue}, ${root.representativeSat}%, 50%)`} style={{
                    backgroundColor: `hsl(${root.representativeHue}, ${root.representativeSat}%, 50%)`,
                    width: "2rem",
                    height: "2rem",
                    borderRadius: "4px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    transition: 'height 0.5s ease-in-out',
                }}></div>
                  <span>Str: {root.strength.toLocaleString()}</span>
                </div>
              </div>

              {/* Children Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${root.density}, 1fr)`,
                gap: '8px',
              }}>
                {root.chars.map((child, idx) => (
                  <div 
                    key={idx}
                    style={{
                      backgroundColor: child.color,
                      color: '#fff',
                      textShadow: '0 1px 2px rgba(0,0,0,0.4)',
                      height: '60px',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      boxShadow: 'inset 0 -15px 15px rgba(0,0,0,0.05)'
                    }}
                    title={`Character: ${getVisualChar(child.char)}`}
                  >
                    {getVisualChar(child.char)}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PackedGroupCards;