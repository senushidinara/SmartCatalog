export function getCognitiveColor(category: string): string {
  const colors = {
    memory: 'hsl(217, 91%, 60%)',
    focus: 'hsl(262, 83%, 58%)', 
    sleep: 'hsl(173, 58%, 39%)',
    energy: 'hsl(25, 95%, 53%)',
    mood: 'hsl(280, 65%, 60%)',
  };
  
  return colors[category as keyof typeof colors] || colors.focus;
}

export function formatPrice(price: string | number): string {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(numPrice);
}

export function calculateDiscount(originalPrice: string | number, salePrice: string | number): number {
  const original = typeof originalPrice === 'string' ? parseFloat(originalPrice) : originalPrice;
  const sale = typeof salePrice === 'string' ? parseFloat(salePrice) : salePrice;
  
  return Math.round(((original - sale) / original) * 100);
}

export function formatTimeRemaining(expiresAt: Date): { hours: number; minutes: number; seconds: number } {
  const now = new Date();
  const diff = expiresAt.getTime() - now.getTime();
  
  if (diff <= 0) {
    return { hours: 0, minutes: 0, seconds: 0 };
  }
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return { hours, minutes, seconds };
}

export function generateNeuralPathway(): string {
  // Generate SVG path for neural connections
  const points = Array.from({ length: 10 }, (_, i) => ({
    x: (i / 9) * 100,
    y: 50 + Math.sin(i * 0.5) * 20,
  }));
  
  return points
    .map((point, i) => `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ');
}

export function getTierColor(tier: string): string {
  const colors = {
    bronze: 'hsl(25, 95%, 53%)',
    silver: 'hsl(240, 5%, 64%)',
    gold: 'hsl(45, 93%, 47%)',
    platinum: 'hsl(262, 83%, 58%)',
  };
  
  return colors[tier as keyof typeof colors] || colors.bronze;
}

export function calculateTierProgress(currentPoints: number, tierLevel: string): number {
  const tierThresholds = {
    bronze: { min: 0, max: 1000 },
    silver: { min: 1000, max: 5000 },
    gold: { min: 5000, max: 15000 },
    platinum: { min: 15000, max: 50000 },
  };
  
  const tier = tierThresholds[tierLevel as keyof typeof tierThresholds] || tierThresholds.bronze;
  const progress = ((currentPoints - tier.min) / (tier.max - tier.min)) * 100;
  
  return Math.min(Math.max(progress, 0), 100);
}
