import React from 'react';
import type { AnalysisSettings } from '../lib/textAnalysis';

interface SettingsBarProps {
    settings: AnalysisSettings;
    setSettings: (settings: AnalysisSettings) => void;
    avgHue: number;
    avgSat: number;
}

const SettingsBar: React.FC<SettingsBarProps> = ({ settings, setSettings, avgHue, avgSat }) => {
    const handleCheckboxChange = (name: keyof AnalysisSettings) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setSettings({ ...settings, [name]: e.target.checked });
    };

    return (
        <div className="settings-bar" style={{ border: `1px solid hsl(${avgHue}, ${avgSat}%, 50%)`, padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
            <h2 style={{ marginTop: 0 }}>Modificators</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={settings.includeWhitespace}
                        onChange={handleCheckboxChange('includeWhitespace')} />
                    Include Whitespace
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={settings.includeDigits}
                        onChange={handleCheckboxChange('includeDigits')} />
                    Include Digits (0-9)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={settings.includeSymbols}
                        onChange={handleCheckboxChange('includeSymbols')} />
                    Include Symbols
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={settings.includePunctuation}
                        onChange={handleCheckboxChange('includePunctuation')} />
                    Include Punctuation
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={settings.includeControls}
                        onChange={handleCheckboxChange('includeControls')} />
                    Include Controls
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={settings.caseSensitive}
                        onChange={handleCheckboxChange('caseSensitive')} />
                    Case Sensitive
                </label>
            </div>
        </div>
    );
};

export default SettingsBar;
