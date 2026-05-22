import React from 'react';
import type { AnalysisResult } from '../lib/textAnalysis';

interface StatBarProps {
    label: string;
    value: number;
    max: number;
    color: string;
    description: string;
}

const StatBar: React.FC<StatBarProps> = ({ label, value, max, color, description }) => (
    <div style={{ marginBottom: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{label}</span>
            <span style={{ fontFamily: 'monospace' }}>{value.toFixed(2)}</span>
        </div>
        <div style={{ width: '100%', height: '8px', backgroundColor: '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{
                width: `${Math.min((value / max) * 100, 100)}%`,
                height: '100%',
                backgroundColor: color,
                transition: 'width 0.5s ease-out'
            }} />
        </div>
        <small style={{ color: '#666', fontSize: '0.75rem' }}>{description}</small>
    </div>
);

interface StatsDashboardProps {
    stats: AnalysisResult | null;
    avgHue: number;
    avgSat: number;
}

export default function StatsDashboard({ stats, avgHue, avgSat }: StatsDashboardProps) {
    if (!stats) return null;

    const themeColor = `hsl(${avgHue}, ${avgSat}%, 50%)`;

    return (
        <aside style={{
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            minWidth: '250px'
        }}>
            <h3 style={{ marginTop: 0, color: themeColor }}>Text DNA</h3>

            <StatBar
                label="Entropy (Complexity)"
                value={stats.mathematical.entropy}
                max={5}
                color={themeColor}
                description={stats.mathematical.entropy > 4 ? "Highly diverse vocabulary." : "Repetitive or structured patterns."}
            />

            <StatBar
                label="Burstiness (Rhythm)"
                value={stats.distribution.burstiness}
                max={10}
                color={themeColor}
                description="Variation in word lengths. Higher = more rhythmic 'peaks'."
            />

            <StatBar
                label="Visual Intensity (Saturation)"
                value={avgSat}
                max={100}
                color={`hsl(${avgHue}, ${avgSat}%, 50%)`}
                description={avgSat > 50 ? "Dominated by key characters." : "Balanced and muted distribution."}
            />

            <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                    <span>Lexical Diversity:</span>
                    <strong>{(stats.ratios.lexicalDiversity * 100).toFixed(1)}%</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginTop: '5px' }}>
                    <span>Working Chars:</span>
                    <strong>{stats.counts.workingCharacters}</strong>
                </div>
            </div>
        </aside>
    );
}
