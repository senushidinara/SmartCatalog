import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Product, Bundle } from "@shared/schema";
import { formatPrice } from "@/lib/neural-utils";

const MOCK_USER_ID = "user1"; // In real app, get from auth context

export default function AIRecommendations() {
  const { data: recommendations = [] } = useQuery<Product[]>({
    queryKey: ["/api/users", MOCK_USER_ID, "recommendations"],
  });

  const { data: bundles = [] } = useQuery<Bundle[]>({
    queryKey: ["/api/users", MOCK_USER_ID, "bundles"],
  });

  return (
    <section className="py-16 px-6 relative">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-memory bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            data-testid="ai-recommendations-title"
          >
            AI-Curated for You
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Products that glow brighter based on your cognitive needs
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Priority Recommendations */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-focus mb-6 flex items-center">
              <Star className="mr-2" />
              Priority Recommendations
            </h3>
            
            {recommendations.slice(0, 2).map((product, index) => (
              <motion.div
                key={product.id}
                className="holographic-card rounded-xl p-6 product-card relative overflow-hidden"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                data-testid={`priority-product-${product.id}`}
              >
                <div className="neural-pathway top-0" />
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-focus/20 to-focus/10 rounded-xl flex items-center justify-center">
                    <img 
                      src={product.imageUrl || "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"} 
                      alt={product.name}
                      className="rounded-lg w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Badge className="ai-badge text-xs mr-2">
                        Best for Your {product.category === 'focus' ? 'Focus' : 'Performance'}
                      </Badge>
                      <span className="text-sm text-focus">{product.aiScore}% Match</span>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">{product.name}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">
                        {formatPrice(product.price)}
                      </span>
                      <Button 
                        className="bg-focus hover:bg-focus/90 text-white"
                        data-testid={`add-to-cart-${product.id}`}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Smart Bundles */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-memory mb-6 flex items-center">
              <div className="w-6 h-6 bg-memory rounded mr-2" />
              Smart Bundles
            </h3>
            
            {bundles.slice(0, 1).map((bundle, index) => (
              <motion.div
                key={bundle.id}
                className="holographic-card rounded-xl p-6 relative overflow-hidden"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                data-testid={`smart-bundle-${bundle.id}`}
              >
                <div className="neural-pathway top-0" />
                <Badge className="ai-badge text-xs mb-4">AI-Optimized Stack</Badge>
                <h4 className="text-xl font-semibold mb-3">{bundle.name}</h4>
                <p className="text-sm text-muted-foreground mb-4">{bundle.description}</p>
                
                {/* Bundle Items */}
                <div className="space-y-2 mb-4">
                  {recommendations.slice(0, 3).map((product) => (
                    <div key={product.id} className="flex items-center text-sm">
                      <Check className="w-4 h-4 text-memory mr-2" />
                      {product.name}
                    </div>
                  ))}
                </div>

                {/* Predicted Impact */}
                {bundle.predictedImpact && (
                  <Card className="bg-secondary p-4 mb-4">
                    <h5 className="text-sm font-medium mb-2">Predicted Cognitive Impact</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Focus Improvement</span>
                        <span className="text-focus">+{bundle.predictedImpact.focus}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Memory Enhancement</span>
                        <span className="text-memory">+{bundle.predictedImpact.memory}%</span>
                      </div>
                    </div>
                  </Card>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg line-through text-muted-foreground">
                      {formatPrice(bundle.originalPrice)}
                    </span>
                    <span className="text-2xl font-bold text-primary ml-2">
                      {formatPrice(bundle.bundlePrice)}
                    </span>
                  </div>
                  <Button 
                    className="bg-memory hover:bg-memory/90 text-white px-6 py-3"
                    data-testid={`add-bundle-${bundle.id}`}
                  >
                    Add Bundle
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
