import { CognitiveProfile, AIRecommendation, BrainImpact } from "@/types";
import { Product } from "@shared/schema";

export class AIRecommendationEngine {
  static calculatePersonalizedScore(product: Product, profile: CognitiveProfile): number {
    let score = product.aiScore || 0;
    
    // Boost score based on user's weakest cognitive areas
    const impact = product.neuralImpact || {};
    
    if (profile.memory < 80 && impact.memory) {
      score += impact.memory * 2;
    }
    if (profile.focus < 80 && impact.focus) {
      score += impact.focus * 2;
    }
    if (profile.sleep < 80 && impact.sleep) {
      score += impact.sleep * 2;
    }
    if (profile.energy < 80 && impact.energy) {
      score += impact.energy * 2;
    }
    if (profile.mood < 80 && impact.mood) {
      score += impact.mood * 2;
    }
    
    return Math.min(score, 100);
  }

  static generateRecommendationBadge(product: Product, profile: CognitiveProfile): string {
    const impact = product.neuralImpact || {};
    const weakestArea = this.getWeakestCognitiveArea(profile);
    
    if (weakestArea === 'memory' && impact.memory) return 'Best for Your Memory';
    if (weakestArea === 'focus' && impact.focus) return 'Focus Booster Recommended';
    if (weakestArea === 'sleep' && impact.sleep) return 'Sleep Enhancer for Tonight';
    if (weakestArea === 'energy' && impact.energy) return 'Energy Booster';
    if (weakestArea === 'mood' && impact.mood) return 'Mood Enhancer';
    
    return 'AI Recommended';
  }

  static getWeakestCognitiveArea(profile: CognitiveProfile): keyof CognitiveProfile {
    const areas: (keyof CognitiveProfile)[] = ['memory', 'focus', 'sleep', 'energy', 'mood'];
    return areas.reduce((weakest, current) => 
      profile[current] < profile[weakest] ? current : weakest
    );
  }

  static calculateBrainImpact(items: Array<{ product: Product; quantity: number }>): BrainImpact {
    const impact: BrainImpact = { memory: 0, focus: 0, sleep: 0, energy: 0, mood: 0 };
    
    items.forEach(({ product, quantity }) => {
      const productImpact = product.neuralImpact || {};
      
      impact.memory += (productImpact.memory || 0) * quantity;
      impact.focus += (productImpact.focus || 0) * quantity;
      impact.sleep += (productImpact.sleep || 0) * quantity;
      impact.energy += (productImpact.energy || 0) * quantity;
      impact.mood += (productImpact.mood || 0) * quantity;
    });
    
    // Cap improvements at reasonable levels
    Object.keys(impact).forEach(key => {
      impact[key as keyof BrainImpact] = Math.min(impact[key as keyof BrainImpact], 50);
    });
    
    return impact;
  }

  static calculateOverallBrainWellnessScore(impact: BrainImpact): number {
    const total = impact.memory + impact.focus + impact.sleep + impact.energy + impact.mood;
    return Math.min(Math.round(total / 5), 100);
  }

  static getRecommendationIntensity(score: number): 'low' | 'medium' | 'high' {
    if (score >= 90) return 'high';
    if (score >= 75) return 'medium';
    return 'low';
  }
}
