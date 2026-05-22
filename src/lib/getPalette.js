export const getAnalysisContext = (charMap, settings) => {
  const entries = Object.entries(charMap)

  if (charMap.length === 0) return null;

  let minCodePoint = Infinity;
  let maxCodePoint = -Infinity;
  let maxFreq = 0;

  const data = entries.map(([char, count]) => {
    const preparedChar = settings.caseSensitive ? char : char.toLowerCase();
    const codepoint = preparedChar.codePointAt(0);
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

export const getWeightedAverageStats = (context) => {
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

export const getPalette = (context) => {
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