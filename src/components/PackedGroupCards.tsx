import React from 'react';
import ColorCard from './ColorCard';
import type { ColorCluster } from '../lib/getWeightedClusters';

interface PackedGroupCardsProps {
  data: ColorCluster[];
}

const PackedGroupCards: React.FC<PackedGroupCardsProps> = ({ data }) => {
  return (
    <div>

      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <h3>Clusters as group of cards</h3>
      </div>


      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px',
      }}>
        {data.map((root) => {
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
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666' }}>
                  <strong>Group ID: {root.id}</strong>
                  <div title={`hsl(${root.representativeHue}, ${root.representativeSat}%, 50%)`} style={{
                    backgroundColor: `hsl(${root.representativeHue}, ${root.representativeSat}%, 50%)`,
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "4px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}></div>
                  <span>Str: {root.strength.toLocaleString()}</span>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${Math.min(root.density, 5)}, 1fr)`,
                gap: '8px',
              }}>
                {root.chars.map((child, idx) => (
                  <ColorCard key={idx} char={child.char} color={child.color} />
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
