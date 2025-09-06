import { 
  type User, 
  type InsertUser, 
  type Product, 
  type InsertProduct,
  type Bundle,
  type InsertBundle,
  type Order,
  type InsertOrder,
  type Offer,
  type InsertOffer,
  type UserReward,
  type InsertUserReward
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserProfile(id: string, profile: Partial<User>): Promise<User | undefined>;

  // Products
  getAllProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  getRecommendedProducts(userId: string): Promise<Product[]>;

  // Bundles
  getAllBundles(): Promise<Bundle[]>;
  getBundle(id: string): Promise<Bundle | undefined>;
  createBundle(bundle: InsertBundle): Promise<Bundle>;
  getPersonalizedBundles(userId: string): Promise<Bundle[]>;

  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getUserOrders(userId: string): Promise<Order[]>;
  updateOrderStatus(id: string, status: string): Promise<Order | undefined>;

  // Offers
  getActiveOffers(): Promise<Offer[]>;
  getFlashDeals(): Promise<Offer[]>;
  createOffer(offer: InsertOffer): Promise<Offer>;

  // User Rewards
  getUserRewards(userId: string): Promise<UserReward[]>;
  addUserReward(reward: InsertUserReward): Promise<UserReward>;
  getUserPoints(userId: string): Promise<number>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private bundles: Map<string, Bundle>;
  private orders: Map<string, Order>;
  private offers: Map<string, Offer>;
  private userRewards: Map<string, UserReward>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.bundles = new Map();
    this.orders = new Map();
    this.offers = new Map();
    this.userRewards = new Map();
    this.initializeData();
  }

  private initializeData() {
    // Initialize sample products
    const sampleProducts: Product[] = [
      {
        id: "1",
        name: "NeuroFocus Capsules",
        description: "Advanced nootropic blend for sustained attention and cognitive clarity through bacopa and lion's mane.",
        price: "49.99",
        category: "focus",
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3",
        neuralImpact: { focus: 20, memory: 5 },
        ingredients: ["Bacopa Monnieri", "Lion's Mane", "Rhodiola Rosea"],
        inStock: true,
        aiScore: 94,
        createdAt: new Date(),
      },
      {
        id: "2",
        name: "Cogniva Memory Gummies",
        description: "Delicious gummies that enhance memory consolidation and recall with scientifically proven ingredients.",
        price: "29.99",
        category: "memory",
        imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3",
        neuralImpact: { memory: 15, focus: 8 },
        ingredients: ["Ginkgo Biloba", "Phosphatidylserine", "Omega-3"],
        inStock: true,
        aiScore: 91,
        createdAt: new Date(),
      },
      {
        id: "3",
        name: "NeuroCharge Drink Mix",
        description: "Natural energy boost with cognitive enhancement properties for sustained mental performance.",
        price: "34.99",
        category: "energy",
        imageUrl: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?ixlib=rb-4.0.3",
        neuralImpact: { energy: 18, focus: 12 },
        ingredients: ["Green Tea Extract", "B-Complex", "Guarana"],
        inStock: true,
        aiScore: 88,
        createdAt: new Date(),
      },
      {
        id: "4",
        name: "SleepSync Smart Mask",
        description: "AI-powered sleep optimization with light therapy and neural monitoring for deep rest.",
        price: "129.99",
        category: "sleep",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3",
        neuralImpact: { sleep: 25, mood: 10 },
        ingredients: ["LED Light Therapy", "Sleep Sensors", "Comfort Foam"],
        inStock: true,
        aiScore: 87,
        createdAt: new Date(),
      },
      {
        id: "5",
        name: "MindEase Stress Relief",
        description: "Advanced adaptogenic blend for stress reduction and mood stabilization.",
        price: "39.99",
        category: "mood",
        imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3",
        neuralImpact: { mood: 20, sleep: 8 },
        ingredients: ["Ashwagandha", "L-Theanine", "Magnesium"],
        inStock: true,
        aiScore: 85,
        createdAt: new Date(),
      },
    ];

    // Initialize sample bundles
    const sampleBundles: Bundle[] = [
      {
        id: "bundle1",
        name: "Focus + Memory Stack",
        description: "Perfect combination for peak cognitive performance based on AI analysis.",
        originalPrice: "129.97",
        bundlePrice: "97.99",
        productIds: ["1", "2"],
        predictedImpact: { focus: 22, memory: 18, sleep: 0, energy: 5, mood: 3 },
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: "bundle2",
        name: "Complete Wellness Stack",
        description: "Comprehensive cognitive enhancement covering all aspects of brain health.",
        originalPrice: "244.95",
        bundlePrice: "189.99",
        productIds: ["1", "2", "3", "5"],
        predictedImpact: { focus: 25, memory: 20, sleep: 12, energy: 18, mood: 25 },
        isActive: true,
        createdAt: new Date(),
      },
    ];

    // Initialize sample offers
    const sampleOffers: Offer[] = [
      {
        id: "flash1",
        title: "NeuroCharge Triple Pack",
        description: "Buy 2 Get 1 Free - Perfect for sustained energy and cognitive enhancement",
        discountType: "bundle",
        discountValue: "33.00",
        productIds: ["3"],
        isFlashDeal: true,
        expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: "seasonal1",
        title: "Winter Wellness Pack",
        description: "Seasonal bundle optimized for mood and energy during colder months",
        discountType: "percentage",
        discountValue: "25.00",
        productIds: ["4", "5"],
        isFlashDeal: false,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        isActive: true,
        createdAt: new Date(),
      },
    ];

    sampleProducts.forEach(product => this.products.set(product.id, product));
    sampleBundles.forEach(bundle => this.bundles.set(bundle.id, bundle));
    sampleOffers.forEach(offer => this.offers.set(offer.id, offer));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      cognitiveProfile: { memory: 75, focus: 70, sleep: 85, energy: 65, mood: 80 },
      neuralPoints: 0,
      tierLevel: "bronze",
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserProfile(id: string, profile: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...profile };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.category === category);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const newProduct: Product = {
      ...product,
      id,
      createdAt: new Date(),
      imageUrl: (product as any).imageUrl ?? null,
      neuralImpact: (product as any).neuralImpact ?? null,
      ingredients: (product as any).ingredients ?? [],
      inStock: (product as any).inStock ?? true,
      aiScore: (product as any).aiScore ?? 0,
    };
    this.products.set(id, newProduct);
    return newProduct;
  }

  async getRecommendedProducts(userId: string): Promise<Product[]> {
    const user = await this.getUser(userId);
    if (!user?.cognitiveProfile) {
      return Array.from(this.products.values()).slice(0, 4);
    }

    // AI recommendation logic based on cognitive profile
    const products = Array.from(this.products.values());
    return products
      .map(product => {
        let score = 0;
        const profile = user.cognitiveProfile!;
        
        // Calculate match score based on user's weakest areas
        if (product.neuralImpact?.memory && profile.memory < 80) score += product.neuralImpact.memory * 2;
        if (product.neuralImpact?.focus && profile.focus < 80) score += product.neuralImpact.focus * 2;
        if (product.neuralImpact?.sleep && profile.sleep < 80) score += product.neuralImpact.sleep * 2;
        if (product.neuralImpact?.energy && profile.energy < 80) score += product.neuralImpact.energy * 2;
        if (product.neuralImpact?.mood && profile.mood < 80) score += product.neuralImpact.mood * 2;

        return { ...product, aiScore: Math.min(score + product.aiScore!, 100) };
      })
      .sort((a, b) => b.aiScore! - a.aiScore!)
      .slice(0, 4);
  }

  async getAllBundles(): Promise<Bundle[]> {
    return Array.from(this.bundles.values());
  }

  async getBundle(id: string): Promise<Bundle | undefined> {
    return this.bundles.get(id);
  }

  async createBundle(bundle: InsertBundle): Promise<Bundle> {
    const id = randomUUID();
    const newBundle: Bundle = {
      ...bundle,
      id,
      createdAt: new Date(),
      predictedImpact: (bundle as any).predictedImpact ?? null,
      productIds: (bundle as any).productIds ?? [],
      isActive: (bundle as any).isActive ?? true,
    };
    this.bundles.set(id, newBundle);
    return newBundle;
  }

  async getPersonalizedBundles(userId: string): Promise<Bundle[]> {
    return Array.from(this.bundles.values()).filter(bundle => bundle.isActive);
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const newOrder: Order = {
      ...order,
      id,
      createdAt: new Date(),
      status: (order as any).status ?? "pending",
      userId: (order as any).userId ?? null,
      items: (order as any).items ?? [],
      predictedBrainImpact: (order as any).predictedBrainImpact ?? null,
    };
    this.orders.set(id, newOrder);
    return newOrder;
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(order => order.userId === userId);
  }

  async updateOrderStatus(id: string, status: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;
    
    const updatedOrder = { ...order, status };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  async getActiveOffers(): Promise<Offer[]> {
    const now = new Date();
    return Array.from(this.offers.values()).filter(offer => 
      offer.isActive && (!offer.expiresAt || offer.expiresAt > now)
    );
  }

  async getFlashDeals(): Promise<Offer[]> {
    const activeOffers = await this.getActiveOffers();
    return activeOffers.filter(offer => offer.isFlashDeal);
  }

  async createOffer(offer: InsertOffer): Promise<Offer> {
    const id = randomUUID();
    const newOffer: Offer = {
      ...offer,
      id,
      createdAt: new Date(),
      productIds: (offer as any).productIds ?? null,
      isActive: (offer as any).isActive ?? true,
      isFlashDeal: (offer as any).isFlashDeal ?? false,
      expiresAt: (offer as any).expiresAt ?? null,
    };
    this.offers.set(id, newOffer);
    return newOffer;
  }

  async getUserRewards(userId: string): Promise<UserReward[]> {
    return Array.from(this.userRewards.values()).filter(reward => reward.userId === userId);
  }

  async addUserReward(reward: InsertUserReward): Promise<UserReward> {
    const id = randomUUID();
    const newReward: UserReward = {
      ...reward,
      id,
      createdAt: new Date(),
      userId: (reward as any).userId ?? null,
    };
    this.userRewards.set(id, newReward);

    // Update user points
    const user = await this.getUser(reward.userId!);
    if (user) {
      await this.updateUserProfile(user.id, {
        neuralPoints: (user.neuralPoints || 0) + reward.pointsEarned
      });
    }

    return newReward;
  }

  async getUserPoints(userId: string): Promise<number> {
    const user = await this.getUser(userId);
    return user?.neuralPoints || 0;
  }
}

export const storage = new MemStorage();
