import { getPalette, getAnalysisContext, getWeightedAverageStats } from '../lib/getPalette'
import React, { useMemo, useState } from 'react';
import analyzeText from '../lib/textAnalysis';
import getWeightedClusters from '../lib/getWeightedClusters'
import assignRoles from "../lib/assignRoles"

import RawColorsViz from './RawColorsViz';
import ClusterizedColorsViz from './ClusterizedColorsViz';
import WeighedAverageColorViz from './WeighedAverageColorsViz';

export default function PaletteView({ text }) {
    // Settings State
    const [settings, setSettings] = useState({
        includeWhitespace: false,
        includePunctuation: true,
        includeDigits: true,
        includeSymbols: true,
        includeControls: true,
        caseSensitive: false
    });

    const [sorting, setSorting] = useState('alphabet')

    const stats = useMemo(() => analyzeText(text, settings), [text, settings]);

    const context = useMemo(() => {
        if (!stats) return null;
        // We pass the already-filtered charMap and settings
        return getAnalysisContext(stats.mathematical.charMap, settings);
    }, [stats, settings]);

    // 3. Optional: Use avgHue to theme your header/footer!
    const avgStats = useMemo(() => getWeightedAverageStats(context), [context]);

    // Memoize the palette generation so it doesn't recalculate on every render
    const palette = useMemo(() => getPalette(context), [context]);

    if (!palette || palette.length === 0) {
        return <p>No data to display. Check your settings!</p>;
    }

    const clusters = getWeightedClusters(palette)

    console.log(clusters)

    const roles = assignRoles(clusters)

    console.log(stats)

    return (
        <>
            <div className="settings-bar" style={{ border: `1px solid hsl(${avgStats.avgHue}, ${avgStats.avgSat}, 50%)` }}>
                <h2>
                    Modificators
                </h2>
                <label>
                    <input type="checkbox" checked={settings.includeWhitespace}
                        onChange={e => setSettings({ ...settings, includeWhitespace: e.target.checked })} />
                    Include Whitespace
                </label>
                <label>
                    <input type="checkbox" checked={settings.includeDigits}
                        onChange={e => setSettings({ ...settings, includeDigits: e.target.checked })} />
                    Include Digits (0-9)
                </label>
                <label>
                    <input type="checkbox" checked={settings.includeSymbols}
                        onChange={e => setSettings({ ...settings, includeSymbols: e.target.checked })} />
                    Include Symbols (Math, Currency, Pictograms)
                </label>
                <label>
                    <input type="checkbox" checked={settings.includePunctuation}
                        onChange={e => setSettings({ ...settings, includePunctuation: e.target.checked })} />
                    Include Punctuation (Commas, Periods, Brackets)
                </label>
                <label>
                    <input type="checkbox" checked={settings.includeControls}
                        onChange={e => setSettings({ ...settings, includeControls: e.target.checked })} />
                    Include Control Characters (↵)
                </label>
                <label>
                    <input type="checkbox" checked={settings.caseSensitive}
                        onChange={e => setSettings({ ...settings, caseSensitive: e.target.checked })} />
                    Case Sensitive
                </label>
            </div>

            <RawColorsViz palette={palette} />

            <ClusterizedColorsViz clusters={clusters} />

        </>
    )
}