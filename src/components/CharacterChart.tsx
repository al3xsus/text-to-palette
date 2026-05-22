import React from 'react';
import getVisualChar from "../lib/getVisualChar";
import type { PaletteItem } from '../lib/getPalette';

interface CharacterChartProps {
  data: PaletteItem[];
}

const CharacterChart: React.FC<CharacterChartProps> = ({ data }) => {
  // Find the maximum count to calculate proportional heights
  const maxCount = Math.max(...data.map(d => d.count), 1);

  return (
    <article>
      {/* Chart Container */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: '300px',
        borderBottom: '2px solid #ccc',
        paddingBottom: '10px',
        gap: '4px',
      }}>
        {data.map((item, index) => {
          // Calculate height as a percentage of the max value
          const barHeight = (item.count / maxCount) * 100;
          
          return (
            <div key={index} style={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              height: '100%',
              justifyContent: "flex-end" 
            }}>
              {/* The Bar */}
              <div 
                title={`${item.count}`}
                style={{
                  width: '100%',
                  height: `${barHeight}%`,
                  backgroundColor: item.hsl,
                  borderRadius: '4px 4px 0 0',
                  transition: 'height 0.5s ease-in-out',
                  cursor: 'pointer'
                }}
              />
              {/* X-Axis Label */}
              <span style={{ 
                marginTop: '8px', 
                fontSize: '12px', 
                fontWeight: 'bold' 
              }}>
                {getVisualChar(item.char)}
              </span>
            </div>
          );
        })}
      </div>
      
      {/* Legend / Y-Axis context */}
      <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
        Max Count: {maxCount}
      </div>
    </article>
  );
};

export default CharacterChart;
