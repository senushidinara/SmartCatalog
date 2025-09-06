export interface CognitiveProfile {
  memory: number;
  focus: number;
  sleep: number;
  energy: number;
  mood: number;
}

export interface AIRecommendation {
  productId: string;
  score: number;
  reason: string;
  badge: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface BrainImpact {
  memory: number;
  focus: number;
  sleep: number;
  energy: number;
  mood: number;
}

export interface FlashDeal {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  salePrice: number;
  savings: number;
  expiresAt: Date;
  timeRemaining: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}
