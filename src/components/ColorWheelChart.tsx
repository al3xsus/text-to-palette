import React, { useState, useMemo } from 'react';
import getVisualChar from "../lib/getVisualChar";
import type { ColorCluster } from '../lib/getWeightedClusters';

interface ColorWheelChartProps {
  data: ColorCluster[];
}

interface WheelDataItem extends ColorCluster {
  startAngle: number;
  angleWidth: number;
  endAngle: number;
}

const ColorWheelChart: React.FC<ColorWheelChartProps> = ({ data }) => {
  const [activeGroupId, setActiveGroupId] = useState<number | null>(null);

  // 1. Sort by hue so it maps chronologically around the color wheel
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => a.representativeHue - b.representativeHue);
  }, [data]);

  // 2. Calculate totals and geometric angles
  const totalStrength = useMemo(() => {
    return sortedData.reduce((sum, item) => sum + item.strength, 0);
  }, [sortedData]);

  const wheelData = useMemo(() => {
    let accAngle = 0;
    const items: WheelDataItem[] = [];
    for (const root of sortedData) {
      const angleWidth = (root.strength / totalStrength) * 360;
      const startAngle = accAngle;
      const endAngle = accAngle + angleWidth;
      accAngle = endAngle;
      items.push({ ...root, startAngle, angleWidth, endAngle });
    }
    return items;
  }, [sortedData, totalStrength]);

  // 3. Generate the background conic gradient string
  const conicGradientString = useMemo(() => {
    let accPercent = 0;
    const segments: string[] = [];
    for (const root of wheelData) {
      const percentage = (root.strength / totalStrength) * 100;
      const start = accPercent;
      const end = accPercent + percentage;
      accPercent = end;
      const color = `hsl(${root.representativeHue}, ${root.representativeSat}%, 50%)`;
      segments.push(`${color} ${start}% ${end}%`);
    }
    return `conic-gradient(${segments.join(', ')})`;
  }, [wheelData, totalStrength]);

  // Helper function to generate SVG pie-slice paths for hover detection
  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  // Find currently active group data to show in the center hole
  const activeGroup = wheelData.find(g => g.id === activeGroupId);

  return (
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap',
      alignItems: 'center', 
      justifyContent: 'center',
      gap: '40px', 
      padding: '30px', 
      fontFamily: 'system-ui, sans-serif',
      backgroundColor: '#fff',
      borderRadius: '12px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
    }}>
      
      {/* --- THE WHEEL FRAME --- */}
      <div style={{ position: 'relative', width: '320px', height: '320px' }}>
        
        {/* Rendered Visual Gradient Wheel */}
        <div style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: conicGradientString,
          position: 'absolute',
          top: 0,
          left: 0,
          boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: activeGroupId !== null ? 'scale(1.02)' : 'scale(1)'
        }} />

        {/* Interactive SVG Overlay (Detects hovers perfectly) */}
        <svg 
          viewBox="-1 -1 2 2" 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            transform: 'rotate(-90deg)', // Syncs 0% with top center
            pointerEvents: 'none' 
          }}
        >
          {wheelData.map((slice: WheelDataItem) => {
            const startPercent = slice.startAngle / 360;
            const endPercent = slice.endAngle / 360;
            
            const [startX, startY] = getCoordinatesForPercent(startPercent);
            const [endX, endY] = getCoordinatesForPercent(endPercent);
            
            // Flag if the slice takes up more than half the circle
            const largeArcFlag = slice.angleWidth > 180 ? 1 : 0;
            
            const pathData = [
              `M 0 0`,
              `L ${startX} ${startY}`,
              `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
              'Z'
            ].join(' ');

            const isActive = slice.id === activeGroupId;

            return (
              <path
                key={slice.id}
                d={pathData}
                fill={isActive ? 'rgba(255,255,255,0.25)' : 'transparent'}
                stroke={isActive ? '#fff' : 'transparent'}
                strokeWidth="0.02"
                style={{ pointerEvents: 'auto', cursor: 'pointer', transition: 'fill 0.2s' }}
                onMouseEnter={() => setActiveGroupId(slice.id)}
                onMouseLeave={() => setActiveGroupId(null)}
              />
            );
          })}
        </svg>

        {/* Donut Hole Center Display */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '20%',
          width: '60%',
          height: '60%',
          backgroundColor: '#fff',
          borderRadius: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.08)',
          textAlign: 'center',
          padding: '10px',
          boxSizing: 'border-box'
        }}>
          {activeGroup ? (
            <div>
              <div style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Group {activeGroup.id}
              </div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', margin: '2px 0', color: '#222' }}>
                {((activeGroup.strength / totalStrength) * 100).toFixed(1)}%
              </div>
              <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '4px' }}>
                {activeGroup.chars.map((c, i) => (
                  <span key={i} style={{
                    backgroundColor: c.color,
                    color: '#fff',
                    padding: '1px 5px',
                    borderRadius: '3px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    textShadow: '0 1px 1px rgba(0,0,0,0.2)'
                  }}>{getVisualChar(c.char)}</span>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#555' }}>HSL Spec Wheel</div>
              <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>Hover sections</div>
            </div>
          )}
        </div>
      </div>

      {/* --- SIDE LEGEND PANEL --- */}
      <div style={{ 
        flex: '1 1 300px', 
        maxHeight: '340px', 
        overflowY: 'auto', 
        paddingRight: '8px'
      }}>
        <h4>Clusters</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {wheelData.map((root) => {
            const isActive = root.id === activeGroupId;
            const borderCol = `hsl(${root.representativeHue}, ${root.representativeSat}%, 50%)`;
            
            return (
              <div 
                key={root.id}
                onMouseEnter={() => setActiveGroupId(root.id)}
                onMouseLeave={() => setActiveGroupId(null)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '10px 12px',
                  borderRadius: '8px',
                  borderLeft: `6px solid ${borderCol}`,
                  backgroundColor: isActive ? '#f0f4f8' : '#f8f9fa',
                  transform: isActive ? 'translateX(4px)' : 'none',
                  boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: isActive ? 'bold' : '600', color: '#333' }}>
                    Group {root.id} <span style={{ color: '#888', fontWeight: 'normal', fontSize: '11px' }}>({root.representativeHue}°)</span>
                  </div>
                  <div style={{ display: 'flex', gap: '5px', marginTop: '6px' }}>
                    {root.chars.map((c, i) => (
                      <span key={i} style={{
                        backgroundColor: c.color,
                        color: '#fff',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 'bold'
                      }}>{getVisualChar(c.char)}</span>
                    ))}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#444' }}>
                    {root.strength.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '10px', color: '#888' }}>
                    {((root.strength / totalStrength) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default ColorWheelChart;
