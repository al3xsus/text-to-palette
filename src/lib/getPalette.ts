import type { AnalysisSettings } from "./textAnalysis";

export interface AnalysisContext {
  data: { char: string; count: number; codepoint: number }[];
  minCodePoint: number;
  maxCodePoint: number;
  maxFreq: number;
  range: number;
}

export interface PaletteItem {
  char: string;
  count: number;
  h: number;
  s: number;
  l: number;
  hsl: string;
}

export interface WeightedAverageStats {
  avgHue: number;
  avgSat: number;
}

export const getAnalysisContext = (charMap: Record<string, number>, settings: AnalysisSettings): AnalysisContext | null => {
  const entries = Object.entries(charMap)

  if (entries.length === 0) return null;

  let minCodePoint = Infinity;
  let maxCodePoint = -Infinity;
  let maxFreq = 0;

  const data = entries.map(([char, count]) => {
    const preparedChar = settings.caseSensitive ? char : char.toLowerCase();
    const codepoint = preparedChar.codePointAt(0) || 0;
    if (codepoint < minCodePoint) minCodePoint = codepoint;
    if (codepoint > maxCodePoint) maxCodePoint = codepoint;
    if (count > maxFreq) maxFreq = count;
    return { char, count, codepoint };
  });

  return { 
    data, 
    minCodePoint, 
    maxCodePoint, 
    maxFreq, 
    range: (maxCodePoint - minCodePoint) || 1 
  };
};

export const getWeightedAverageStats = (context: AnalysisContext | null): WeightedAverageStats => {
  if (!context) return { avgHue: 0, avgSat: 0 };
  
  let xSum = 0; // For Hue (Circular)
  let ySum = 0; // For Hue (Circular)
  let satWeightedSum = 0; // For Saturation (Linear)
  let totalWeight = 0;

  context.data.forEach(({ codepoint, count }) => {
    const hueDegrees = ((codepoint - context.minCodePoint) / context.range) * 360;
    const hueRadians = (hueDegrees * Math.PI) / 180;

    xSum += Math.cos(hueRadians) * count;
    ySum += Math.sin(hueRadians) * count;

    // 3. Saturation Math (Linear Weighted Sum)
    const s = (count / context.maxFreq) * 100;
    satWeightedSum += s * count;

    totalWeight += count;
  });

  if (totalWeight === 0) return { avgHue: 0, avgSat: 0 };
  
  // Calculate final Hue
  let avgHue = (Math.atan2(ySum, xSum) * 180) / Math.PI;
  avgHue = (avgHue + 360) % 360;

  // Calculate final Saturation
  const avgSat = satWeightedSum / totalWeight;

  return { avgHue, avgSat };
};

export const getPalette = (context: AnalysisContext | null): PaletteItem[] => {
  if (!context) return [];

  return context.data.map(({ char, count, codepoint }) => {
    const h = Math.round(((codepoint - context.minCodePoint) / context.range) * 360);
    const s = Math.round((count / context.maxFreq) * 100);
    const l = 50;

    return {
      char,
      count,
      h, s, l,
      hsl: `hsl(${h}, ${s}%, ${l}%)`
    };
  });
};
