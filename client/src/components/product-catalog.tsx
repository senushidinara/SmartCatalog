import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Grid3X3, List } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@shared/schema";
import { formatPrice, getCognitiveColor } from "@/lib/neural-utils";

const categories = [
  { value: "all", label: "All Categories" },
  { value: "memory", label: "Memory & Focus" },
  { value: "mood", label: "Stress & Mood" },
  { value: "sleep", label: "Sleep & Recovery" },
  { value: "energy", label: "Energy & Motivation" },
  { value: "gadgets", label: "Brain Gadgets" },
];

const aiFilters = [
  { value: "all", label: "AI Recommendation" },
  { value: "95", label: "95%+ Match" },
  { value: "80", label: "80%+ Match" },
  { value: "60", label: "60%+ Match" },
];

export default function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAIFilter, setSelectedAIFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", selectedCategory !== "all" ? `?category=${selectedCategory}` : ""],
  });

  const filteredProducts = products.filter(product => {
    if (selectedAIFilter === "all") return true;
    const threshold = parseInt(selectedAIFilter);
    return (product.aiScore || 0) >= threshold;
  });

  const getCategoryBadge = (category: string) => {
    const badges = {
      memory: "Memory Enhancer",
      focus: "Focus Booster", 
      sleep: "Sleep Enhancer",
      energy: "Energy Booster",
      mood: "Mood Enhancer",
      gadgets: "Brain Tech",
    };
    return badges[category as keyof typeof badges] || "Cognitive Enhancer";
  };

  if (isLoading) {
    return (
      <section className="py-16 px-6 bg-secondary/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="holographic-card rounded-xl h-96 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-6 bg-secondary/30">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
          <div>
            <motion.h2 
              className="text-4xl font-bold mb-4 bg-gradient-to-r from-focus to-energy bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              data-testid="catalog-title"
            >
              Smart Catalog
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              AI-curated products with real-time cognitive benefits
            </motion.p>
          </div>

          {/* Filters */}
          <motion.div 
            className="flex flex-wrap gap-4 mt-6 lg:mt-0"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48" data-testid="category-filter">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedAIFilter} onValueChange={setSelectedAIFilter}>
              <SelectTrigger className="w-48" data-testid="ai-filter">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {aiFilters.map(filter => (
                  <SelectItem key={filter.value} value={filter.value}>
                    {filter.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              data-testid="view-toggle"
            >
              {viewMode === "grid" ? <List className="mr-2 h-4 w-4" /> : <Grid3X3 className="mr-2 h-4 w-4" />}
              {viewMode === "grid" ? "List View" : "Grid View"}
            </Button>
          </motion.div>
        </div>

        {/* Product Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="holographic-card rounded-xl overflow-hidden product-card relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              data-testid={`product-card-${product.id}`}
            >
              <div className="neural-pathway top-0" />
              <div className="relative">
                <img 
                  src={product.imageUrl || "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="ai-badge text-xs">
                    {getCategoryBadge(product.category)}
                  </Badge>
                </div>
                <div 
                  className="absolute top-3 right-3 text-lg font-bold"
                  style={{ color: getCognitiveColor(product.category) }}
                >
                  {product.aiScore}%
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                
                {/* Neural Impact Visualization */}
                {product.neuralImpact && (
                  <Card className="bg-secondary p-3 mb-4">
                    <div className="text-xs text-muted-foreground mb-2">Neural Impact</div>
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full brain-region"
                        style={{ backgroundColor: getCognitiveColor(product.category) }}
                      />
                      <span className="text-xs">
                        {product.category.charAt(0).toUpperCase() + product.category.slice(1)} +
                        {Object.values(product.neuralImpact)[0] || 0}%
                      </span>
                    </div>
                  </Card>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  <Button 
                    className="text-sm"
                    style={{ 
                      backgroundColor: getCognitiveColor(product.category),
                      color: 'white'
                    }}
                    data-testid={`add-to-cart-${product.id}`}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="px-8 py-3"
            data-testid="load-more-products"
          >
            Load More Products
          </Button>
        </div>
      </div>
    </section>
  );
}
