import { getPalette, getAnalysisContext, getWeightedAverageStats } from '../lib/getPalette'
import React, { useMemo, useState } from 'react';
import analyzeText from '../lib/textAnalysis';
import type { AnalysisSettings } from '../lib/textAnalysis';
import getWeightedClusters from '../lib/getWeightedClusters'

import RawColorsViz from './RawColorsViz';
import ClusterizedColorsViz from './ClusterizedColorsViz';
import SettingsBar from './SettingsBar';
// import StatsDashboard from './StatsDashboard';

interface PaletteViewProps {
    text: string;
}

const PaletteView: React.FC<PaletteViewProps> = ({ text }) => {
    const [settings, setSettings] = useState<AnalysisSettings>({
        includeWhitespace: false,
        includePunctuation: true,
        includeDigits: true,
        includeSymbols: true,
        includeControls: true,
        caseSensitive: false
    });

    const stats = useMemo(() => analyzeText(text, settings), [text, settings]);

    const context = useMemo(() => {
        if (!stats) return null;
        return getAnalysisContext(stats.mathematical.charMap, settings);
    }, [stats, settings]);

    const avgStats = useMemo(() => getWeightedAverageStats(context), [context]);

    const palette = useMemo(() => getPalette(context), [context]);

    const clusters = useMemo(() => getWeightedClusters(palette), [palette]);

    if (!palette || palette.length === 0) {
        return <p>No data to display. Check your settings!</p>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap-reverse', alignItems: 'flex-start' }}>
                <div style={{ flex: '1 1 600px' }}>
                     <SettingsBar settings={settings} setSettings={setSettings} avgHue={avgStats.avgHue} avgSat={avgStats.avgSat} />
                     <RawColorsViz palette={palette} />
                     <ClusterizedColorsViz clusters={clusters} />
                </div>
                {/* <div style={{ flex: '1 1 300px', position: 'sticky', top: '1rem' }}>
                    <StatsDashboard stats={stats} avgHue={avgStats.avgHue} avgSat={avgStats.avgSat} />
                </div> */}
            </div>
        </div>
    )
}

export default PaletteView;
