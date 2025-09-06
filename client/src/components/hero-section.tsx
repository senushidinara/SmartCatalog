import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bot } from "lucide-react";
import { motion } from "framer-motion";

interface CognitiveScore {
  label: string;
  value: number;
  color: string;
  category: string;
}

const cognitiveScores: CognitiveScore[] = [
  { label: "Memory", value: 85, color: "var(--memory)", category: "memory" },
  { label: "Focus", value: 72, color: "var(--focus)", category: "focus" },
  { label: "Sleep", value: 91, color: "var(--sleep)", category: "sleep" },
  { label: "Energy", value: 68, color: "var(--energy)", category: "energy" },
];

export default function HeroSection() {
  const [userName] = useState("Alex");
  
  return (
    <section className="relative pt-24 pb-16 px-6 min-h-screen flex items-center justify-center overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-memory/10" />
      <motion.div 
        className="absolute top-20 left-10 w-32 h-32 bg-focus/20 rounded-full blur-3xl"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-40 h-40 bg-energy/20 rounded-full blur-3xl"
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
      />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* AI Concierge Greeting */}
          <motion.div 
            className="holographic-card rounded-2xl p-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            data-testid="ai-concierge-greeting"
          >
            <div className="flex items-center justify-center mb-4">
              <motion.div 
                className="w-16 h-16 bg-gradient-to-r from-primary to-memory rounded-full flex items-center justify-center ai-badge"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Bot className="text-white text-2xl" />
              </motion.div>
            </div>
            <h2 className="text-xl font-medium mb-2 text-primary">AI Concierge</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Welcome back, <span className="text-foreground font-semibold" data-testid="user-name">{userName}</span>. 
              Your Focus Score is <span className="text-focus font-bold" data-testid="focus-score">72</span> today.
            </p>
            <p className="text-sm text-muted-foreground">
              Here are products tailored for your mind's peak performance.
            </p>
          </motion.div>

          {/* Hero Content */}
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-memory to-focus bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            data-testid="hero-title"
          >
            Where Science Meets Luxury
          </motion.h1>
          
          <motion.p 
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            data-testid="hero-description"
          >
            Step into the world's first AI-curated brain and health boutique. Every product is scientifically validated and personalized to elevate your cognitive performance.
          </motion.p>

          {/* Cognitive Wellness Score */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {cognitiveScores.map((score, index) => (
              <motion.div
                key={score.category}
                className="holographic-card rounded-xl p-6 text-center brain-region cursor-pointer"
                whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                data-testid={`cognitive-score-${score.category}`}
              >
                <div className="text-3xl mb-2 font-bold" style={{ color: score.color }}>
                  {score.value}
                </div>
                <div className="text-sm text-muted-foreground">{score.label}</div>
                <div className="neural-connection mt-4" />
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4"
              data-testid="button-start-shopping"
            >
              Start Shopping
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-border text-foreground hover:bg-accent px-8 py-4"
              data-testid="button-cognitive-assessment"
            >
              Take Cognitive Assessment
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
