import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProductCatalog from "@/components/product-catalog";
import NeuralAnimations from "@/components/neural-animations";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
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

export default function Catalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", selectedCategory !== "all" ? `?category=${selectedCategory}` : ""],
  });

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseFloat(a.price) - parseFloat(b.price);
      case "price-high":
        return parseFloat(b.price) - parseFloat(a.price);
      case "ai-score":
        return (b.aiScore || 0) - (a.aiScore || 0);
      default:
        return (b.aiScore || 0) - (a.aiScore || 0);
    }
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NeuralAnimations />
      <Header cartItemCount={3} />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-memory/10" />
          
          <div className="container mx-auto relative z-10">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-memory to-focus bg-clip-text text-transparent">
                Cognitive Enhancement Catalog
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover scientifically-backed products curated by AI for optimal brain performance
              </p>
            </motion.div>

            {/* Search and Filters */}
            <motion.div 
              className="holographic-card rounded-2xl p-8 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-2 relative">
                  <Input
                    type="search"
                    placeholder="Search products, ingredients, or benefits..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-secondary border-border pl-4 pr-12"
                    data-testid="catalog-search"
                  />
                  <Search className="absolute right-4 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger data-testid="catalog-category-filter">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger data-testid="catalog-sort">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">AI Recommended</SelectItem>
                    <SelectItem value="ai-score">Highest AI Score</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  Showing {sortedProducts.length} products
                  {searchQuery && ` for "${searchQuery}"`}
                  {selectedCategory !== "all" && ` in ${categories.find(c => c.value === selectedCategory)?.label}`}
                </div>
                <Badge className="ai-badge">
                  <Filter className="w-3 h-3 mr-1" />
                  AI-Enhanced Results
                </Badge>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="py-16 px-6 bg-secondary/30">
          <div className="container mx-auto">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="holographic-card rounded-xl h-96 animate-pulse" />
                ))}
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold mb-4">No products found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search criteria or browse all categories
                </p>
                <Button onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {sortedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    className="holographic-card rounded-xl overflow-hidden product-card relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    data-testid={`catalog-product-${product.id}`}
                  >
                    <div className="neural-pathway top-0" />
                    <div className="relative">
                      <img 
                        src={product.imageUrl || "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"} 
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge 
                          className="text-xs text-white"
                          style={{ backgroundColor: getCognitiveColor(product.category) }}
                        >
                          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
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
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      
                      {/* Ingredients */}
                      {product.ingredients && product.ingredients.length > 0 && (
                        <div className="mb-4">
                          <div className="text-xs text-muted-foreground mb-1">Key Ingredients</div>
                          <div className="flex flex-wrap gap-1">
                            {product.ingredients.slice(0, 3).map((ingredient, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {ingredient}
                              </Badge>
                            ))}
                            {product.ingredients.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{product.ingredients.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
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
                          data-testid={`add-to-cart-catalog-${product.id}`}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
