import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Snowflake, Sun, Leaf, Rocket, Shield, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { Offer } from "@shared/schema";
import { formatPrice, formatTimeRemaining, calculateDiscount } from "@/lib/neural-utils";

interface CountdownProps {
  expiresAt: Date;
}

function CountdownTimer({ expiresAt }: CountdownProps) {
  const [timeRemaining, setTimeRemaining] = useState(formatTimeRemaining(expiresAt));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(formatTimeRemaining(expiresAt));
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <Card className="bg-secondary p-4 text-center">
        <div className="text-2xl font-bold text-energy">{timeRemaining.hours.toString().padStart(2, '0')}</div>
        <div className="text-xs text-muted-foreground">Hours</div>
      </Card>
      <Card className="bg-secondary p-4 text-center">
        <div className="text-2xl font-bold text-energy">{timeRemaining.minutes.toString().padStart(2, '0')}</div>
        <div className="text-xs text-muted-foreground">Minutes</div>
      </Card>
      <Card className="bg-secondary p-4 text-center">
        <div className="text-2xl font-bold text-energy">{timeRemaining.seconds.toString().padStart(2, '0')}</div>
        <div className="text-xs text-muted-foreground">Seconds</div>
      </Card>
      <Card className="bg-secondary p-4 text-center">
        <div className="text-2xl font-bold text-energy">750</div>
        <div className="text-xs text-muted-foreground">MS</div>
      </Card>
    </div>
  );
}

export default function DynamicOffers() {
  const { data: flashDeals = [] } = useQuery<Offer[]>({
    queryKey: ["/api/offers/flash-deals"],
  });

  const { data: offers = [] } = useQuery<Offer[]>({
    queryKey: ["/api/offers"],
  });

  const seasonalOffers = offers.filter(offer => !offer.isFlashDeal);
  const mainFlashDeal = flashDeals[0];

  const getOfferIcon = (title: string) => {
    if (title.toLowerCase().includes('winter')) return Snowflake;
    if (title.toLowerCase().includes('energy')) return Sun;
    if (title.toLowerCase().includes('student')) return Leaf;
    if (title.toLowerCase().includes('executive')) return Rocket;
    if (title.toLowerCase().includes('stress')) return Shield;
    if (title.toLowerCase().includes('premium')) return Crown;
    return Sun;
  };

  return (
    <section className="py-16 px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-energy/10 via-transparent to-focus/10" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-energy to-focus bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            data-testid="offers-title"
          >
            Limited Time Offers
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            AI-powered deals tailored to your cognitive goals
          </motion.p>
        </div>

        {/* Flash Deals */}
        {mainFlashDeal && (
          <motion.div
            className="holographic-card rounded-2xl p-8 mb-12 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            data-testid="flash-deal-card"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-energy via-focus to-memory" />
            
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="lg:w-2/3 mb-6 lg:mb-0">
                <div className="flex items-center mb-4">
                  <Badge className="bg-energy text-white mr-3">Flash Deal</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>Ends in 2h 34m</span>
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-3">{mainFlashDeal.title}</h3>
                <p className="text-lg text-muted-foreground mb-4">{mainFlashDeal.description}</p>
                <div className="flex items-center space-x-4">
                  <span className="text-2xl line-through text-muted-foreground">
                    {formatPrice(104.97)}
                  </span>
                  <span className="text-4xl font-bold text-energy">
                    {formatPrice(69.98)}
                  </span>
                  <Badge className="bg-energy/20 text-energy">
                    Save {calculateDiscount(104.97, 69.98)}%
                  </Badge>
                </div>
              </div>
              
              <div className="lg:w-1/3 text-center">
                {mainFlashDeal.expiresAt && (
                  <CountdownTimer expiresAt={new Date(mainFlashDeal.expiresAt)} />
                )}
                
                <Button 
                  className="bg-energy hover:bg-energy/90 text-white px-8 py-4 w-full"
                  data-testid="claim-flash-deal"
                >
                  Claim Deal Now
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Seasonal Bundles */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {/* Winter Wellness Pack */}
          <motion.div
            className="holographic-card rounded-xl p-6 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            data-testid="seasonal-offer-winter"
          >
            <div className="neural-pathway top-0" />
            <div className="absolute top-4 right-4">
              <Badge className="bg-focus/20 text-focus text-xs">Limited Edition</Badge>
            </div>
            
            <h4 className="text-xl font-semibold mb-3">Winter Wellness Pack</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Seasonal bundle optimized for mood and energy during colder months.
            </p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm">
                <Snowflake className="w-4 h-4 text-sleep mr-2" />
                NeuroSleep Capsules
              </div>
              <div className="flex items-center text-sm">
                <Sun className="w-4 h-4 text-energy mr-2" />
                Vitamin D Boost
              </div>
              <div className="flex items-center text-sm">
                <Leaf className="w-4 h-4 text-focus mr-2" />
                Mood Support Blend
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg line-through text-muted-foreground">
                  {formatPrice(89.97)}
                </span>
                <span className="text-xl font-bold text-primary ml-2">
                  {formatPrice(67.99)}
                </span>
              </div>
              <Button 
                className="bg-primary hover:bg-primary/90"
                data-testid="add-winter-bundle"
              >
                Add Bundle
              </Button>
            </div>
          </motion.div>

          {/* Study Performance Stack */}
          <motion.div
            className="holographic-card rounded-xl p-6 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            data-testid="seasonal-offer-student"
          >
            <div className="neural-pathway top-0" />
            <div className="absolute top-4 right-4">
              <Badge className="bg-memory/20 text-memory text-xs">Student Special</Badge>
            </div>
            
            <h4 className="text-xl font-semibold mb-3">Study Performance Stack</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Perfect for students and professionals seeking cognitive enhancement.
            </p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm">
                <Leaf className="w-4 h-4 text-memory mr-2" />
                Memory Gummies
              </div>
              <div className="flex items-center text-sm">
                <Shield className="w-4 h-4 text-focus mr-2" />
                Focus Capsules
              </div>
              <div className="flex items-center text-sm">
                <Crown className="w-4 h-4 text-primary mr-2" />
                Study Guide App
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg line-through text-muted-foreground">
                  {formatPrice(119.97)}
                </span>
                <span className="text-xl font-bold text-primary ml-2">
                  {formatPrice(79.99)}
                </span>
              </div>
              <Button 
                className="bg-memory hover:bg-memory/90 text-white"
                data-testid="add-student-stack"
              >
                Add Stack
              </Button>
            </div>
          </motion.div>

          {/* Peak Performance Bundle */}
          <motion.div
            className="holographic-card rounded-xl p-6 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            data-testid="seasonal-offer-executive"
          >
            <div className="neural-pathway top-0" />
            <div className="absolute top-4 right-4">
              <Badge className="bg-energy/20 text-energy text-xs">Executive Bundle</Badge>
            </div>
            
            <h4 className="text-xl font-semibold mb-3">Peak Performance Bundle</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Premium selection for high-performance professionals.
            </p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm">
                <Rocket className="w-4 h-4 text-energy mr-2" />
                Executive Energy Blend
              </div>
              <div className="flex items-center text-sm">
                <Shield className="w-4 h-4 text-focus mr-2" />
                Stress Shield Capsules
              </div>
              <div className="flex items-center text-sm">
                <Crown className="w-4 h-4 text-primary mr-2" />
                Premium Nootropic Stack
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg line-through text-muted-foreground">
                  {formatPrice(199.97)}
                </span>
                <span className="text-xl font-bold text-primary ml-2">
                  {formatPrice(149.99)}
                </span>
              </div>
              <Button 
                className="bg-energy hover:bg-energy/90 text-white"
                data-testid="add-executive-bundle"
              >
                Add Bundle
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
