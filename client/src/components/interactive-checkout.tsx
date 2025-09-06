import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, Shield, Truck, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { formatPrice, getCognitiveColor } from "@/lib/neural-utils";

interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface BrainRegion {
  name: string;
  color: string;
  improvement: number;
  percentage: number;
}

const mockCartItems: CartItem[] = [
  {
    id: "1",
    name: "NeuroFocus Capsules",
    category: "Focus Enhancement",
    price: 49.99,
    quantity: 2,
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
  },
  {
    id: "2",
    name: "Cogniva Memory Gummies",
    category: "Memory Enhancement",
    price: 29.99,
    quantity: 1,
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
  },
];

const brainRegions: BrainRegion[] = [
  { name: "Prefrontal Cortex", color: "var(--focus)", improvement: 75, percentage: 20 },
  { name: "Hippocampus", color: "var(--memory)", improvement: 60, percentage: 15 },
  { name: "Energy Centers", color: "var(--energy)", improvement: 40, percentage: 12 },
];

export default function InteractiveCheckout() {
  const [cartItems, setCartItems] = useState(mockCartItems);
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = subtotal * 0.15; // 15% Gold tier discount
  const total = subtotal - discount;
  
  const updateQuantity = (id: string, change: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-memory bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            data-testid="checkout-title"
          >
            Interactive Checkout
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Visualize your cognitive enhancement before you buy
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Cart Items */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6">Your Neural Cart</h3>
            
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="holographic-card rounded-xl p-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                data-testid={`cart-item-${item.id}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-focus/20 to-focus/10 rounded-xl flex items-center justify-center">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name}
                      className="rounded-lg w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{item.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, -1)}
                          data-testid={`decrease-quantity-${item.id}`}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center" data-testid={`quantity-${item.id}`}>
                          {item.quantity}
                        </span>
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, 1)}
                          data-testid={`increase-quantity-${item.id}`}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <span className="font-semibold" data-testid={`item-total-${item.id}`}>
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Order Summary */}
            <motion.div
              className="holographic-card rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              data-testid="order-summary"
            >
              <h4 className="font-semibold mb-4">Order Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span data-testid="subtotal">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-energy">
                  <span>Gold Tier Discount (15%)</span>
                  <span data-testid="discount">-{formatPrice(discount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-energy" data-testid="shipping">Free</span>
                </div>
                <div className="border-t border-border pt-2 mt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span data-testid="total">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Brain Impact Visualization */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6">Predicted Brain Impact</h3>
            
            {/* Brain Wellness Score */}
            <motion.div
              className="holographic-card rounded-xl p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              data-testid="brain-wellness-score"
            >
              <h4 className="text-lg font-semibold mb-4">Total Brain Wellness Score</h4>
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle 
                    cx="64" 
                    cy="64" 
                    r="56" 
                    stroke="hsl(240, 4%, 16%)" 
                    strokeWidth="8" 
                    fill="none"
                  />
                  <circle 
                    cx="64" 
                    cy="64" 
                    r="56" 
                    stroke="url(#gradient)" 
                    strokeWidth="8" 
                    fill="none"
                    strokeLinecap="round" 
                    strokeDasharray="352" 
                    strokeDashoffset="70"
                    className="animate-pulse"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="var(--primary)" />
                      <stop offset="100%" stopColor="var(--memory)" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold" data-testid="wellness-score">+28%</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Expected cognitive improvement</p>
            </motion.div>

            {/* Individual Brain Regions */}
            <motion.div
              className="holographic-card rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              data-testid="brain-regions"
            >
              <h4 className="font-semibold mb-4">Brain Region Impact</h4>
              <div className="space-y-4">
                {brainRegions.map((region, index) => (
                  <motion.div
                    key={region.name}
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    data-testid={`brain-region-${index}`}
                  >
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-3"
                        style={{ backgroundColor: region.color }}
                      />
                      <span className="text-sm">{region.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-secondary rounded-full h-2">
                        <motion.div 
                          className="h-2 rounded-full"
                          style={{ 
                            backgroundColor: region.color,
                          }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${region.improvement}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        />
                      </div>
                      <span 
                        className="text-sm font-medium"
                        style={{ color: region.color }}
                      >
                        +{region.percentage}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Checkout Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <Button 
                className="w-full bg-primary hover:bg-primary/90 py-4 text-lg font-semibold"
                data-testid="complete-checkout"
              >
                Complete Neural Enhancement - {formatPrice(total)}
              </Button>
            </motion.div>

            {/* Security & Trust */}
            <motion.div 
              className="text-center text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 text-energy mr-1" />
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center">
                  <Truck className="w-4 h-4 text-energy mr-1" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center">
                  <RotateCcw className="w-4 h-4 text-energy mr-1" />
                  <span>30-Day Returns</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
