export default function assignRoles(clusters) {
    const roles = {
      primary: clusters[0], // Strongest cluster
      secondary: null,
      neutral: null,
      accent: null
    };
  
    // 1. Find the Neutral (Lowest Saturation)
    roles.neutral = clusters.reduce((prev, curr) => 
      (curr.representativeSat < prev.representativeSat) ? curr : prev
    );
  
    // 2. Find an Accent (Significant strength, different hue)
    roles.accent = clusters.find(c => 
      c !== roles.primary && 
      c !== roles.neutral && 
      Math.abs(c.representativeHue - roles.primary.representativeHue) > 45
    );
  
    return roles;
  }