function hslToRgb(h: number, s: number, l: number) {
    s /= 100;
    l /= 100;
  
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
  
    const f = (n: number) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  
    return [
      Math.round(255 * f(0)),
      Math.round(255 * f(8)),
      Math.round(255 * f(4)),
    ];
  }
  
  function luminance(r: number, g: number, b: number) {
    const toLinear = (v: number) => {
      v /= 255;
      return v <= 0.03928
        ? v / 12.92
        : Math.pow((v + 0.055) / 1.055, 2.4);
    };
  
    const [R, G, B] = [r, g, b].map(toLinear);
  
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  }
  
  function contrastRatio(l1: number, l2: number) {
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
  
    return (lighter + 0.05) / (darker + 0.05);
  }
  
  export default function getTextColorForHslBackground(h: number, s: number, l: number) {
    const [r, g, b] = hslToRgb(h, s, l);
    const bgLum = luminance(r, g, b);
  
    const whiteLum = luminance(255, 255, 255);
    const blackLum = luminance(0, 0, 0);
  
    const whiteContrast = contrastRatio(bgLum, whiteLum);
    const blackContrast = contrastRatio(bgLum, blackLum);
  
    return whiteContrast > blackContrast ? "hsl(0 0% 100%)" : "hsl(0 0% 0%)";
  }