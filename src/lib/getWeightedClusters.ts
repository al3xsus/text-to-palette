import type { PaletteItem } from "./getPalette";

export interface ColorCluster {
    id: number;
    representativeHue: number;
    representativeSat: number;
    strength: number;
    density: number;
    chars: { char: string; color: string }[];
}

interface Bucket {
    totalWeight: number;
    sumX: number;
    sumY: number;
    count: number;
    originalColors: { h: number; s: number; l: number; weight: number; char: string }[];
}

export default function getWeightedClusters(palette: PaletteItem[]): ColorCluster[] {
    const buckets: Bucket[] = Array.from({ length: 12 }, () => ({
      totalWeight: 0,
      sumX: 0,
      sumY: 0,
      count: 0,
      originalColors: []
    }));
  
    palette.forEach(item => {
      // 1. Parse HSL
      const {h, s, l, char} = item;
      
      // 2. Calculate Weight (Favor high saturation)
      const weight = Math.pow(s, 2) + 1; // +1 to give very desaturated colors a tiny vote
      
      // 3. Determine Bucket (0-11)
      // We shift by 15 degrees so the primary colors are in the center of buckets
      const bucketIndex = Math.floor(((h + 15) % 360) / 30);
      
      // 4. Convert Hue to Vector (Radians)
      const rad = (h * Math.PI) / 180;
      const x = Math.cos(rad) * weight;
      const y = Math.sin(rad) * weight;
  
      // 5. Accumulate
      const b = buckets[bucketIndex];
      b.totalWeight += weight;
      b.sumX += x;
      b.sumY += y;
      b.count++;
      b.originalColors.push({ h, s, l, weight, char });
    });
  
    // 6. Finalize Clusters
    return buckets
      .map((b, index) => {
        if (b.count === 0) return null;
  
        // Convert vector average back to Hue
        let avgHue = (Math.atan2(b.sumY, b.sumX) * 180) / Math.PI;
        if (avgHue < 0) avgHue += 360;
  
        // Weighted average Saturation
        const avgSat = b.originalColors.reduce((acc, c) => acc + (c.s * c.weight), 0) / b.totalWeight;

        const bucketChars = b.originalColors.map(item => {return {char: item.char, color: `hsl(${item.h}, ${item.s}%, 50%)`}});
  
        return {
          id: index,
          representativeHue: Math.round(avgHue),
          representativeSat: Math.round(avgSat),
          strength: b.totalWeight,
          density: b.count,
          chars: bucketChars
        } as ColorCluster;
      })
      .filter((c): c is ColorCluster => c !== null);
  }
