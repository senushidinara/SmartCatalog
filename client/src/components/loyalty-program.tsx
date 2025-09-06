import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Crown, Plus, Star, Calendar, Check } from "lucide-react";
import { motion } from "framer-motion";
import { UserReward } from "@shared/schema";
import { getTierColor, calculateTierProgress } from "@/lib/neural-utils";

const MOCK_USER_ID = "user1";

interface TierBenefit {
  description: string;
  icon: typeof Check;
}

interface RewardOption {
  name: string;
  cost: number;
  available: boolean;
}

const tierBenefits: TierBenefit[] = [
  { description: "15% discount on all products", icon: Check },
  { description: "Early access to new products", icon: Check },
  { description: "Free shipping on orders $50+", icon: Check },
  { description: "Monthly exclusive bundles", icon: Check },
];

const rewardOptions: RewardOption[] = [
  { name: "$10 Store Credit", cost: 1000, available: true },
  { name: "Free Memory Assessment", cost: 500, available: true },
  { name: "Exclusive Bundle Access", cost: 2500, available: false },
];

export default function LoyaltyProgram() {
  const { data: userPoints = { points: 0 } } = useQuery({
    queryKey: ["/api/users", MOCK_USER_ID, "points"],
  });

  const { data: recentRewards = [] } = useQuery<UserReward[]>({
    queryKey: ["/api/users", MOCK_USER_ID, "rewards"],
  });

  const currentTier = "gold";
  const totalPoints = 18750;
  const availablePoints = 2450;
  const pointsToNext = 1250;
  const tierProgress = calculateTierProgress(totalPoints, currentTier);

  return (
    <section className="py-16 px-6 bg-secondary/20">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-energy bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            data-testid="loyalty-title"
          >
            Neural Rewards Program
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Earn points for every purchase and cognitive achievement
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Current Status */}
          <motion.div
            className="holographic-card rounded-xl p-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            data-testid="user-status-card"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold">Your Neural Status</h3>
              <div className="w-12 h-12 bg-gradient-to-r from-focus to-memory rounded-full flex items-center justify-center">
                <Crown className="text-white" />
              </div>
            </div>

            {/* Current Tier */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-medium text-yellow-500">Gold Brain Tier</span>
                <span className="text-sm text-muted-foreground">
                  {pointsToNext} points to Platinum
                </span>
              </div>
              <Progress 
                value={tierProgress} 
                className="h-3"
                data-testid="tier-progress"
              />
            </div>

            {/* Point Balance */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2" data-testid="total-points">
                  {totalPoints.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Total Points</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-energy mb-2" data-testid="available-points">
                  {availablePoints.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Available Points</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h4 className="text-lg font-medium mb-4">Recent Neural Activity</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Plus className="w-4 h-4 text-energy mr-2" />
                    <span>Purchased Focus Bundle</span>
                  </div>
                  <span className="text-energy font-medium">+150 pts</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-memory mr-2" />
                    <span>Completed Memory Challenge</span>
                  </div>
                  <span className="text-memory font-medium">+50 pts</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-focus mr-2" />
                    <span>7-day streak bonus</span>
                  </div>
                  <span className="text-focus font-medium">+100 pts</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tier Benefits & Rewards */}
          <div className="space-y-6">
            {/* Tier Benefits */}
            <motion.div
              className="holographic-card rounded-xl p-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              data-testid="tier-benefits-card"
            >
              <h3 className="text-xl font-semibold mb-4">Gold Tier Benefits</h3>
              <div className="space-y-3">
                {tierBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-energy mr-3" />
                    <span className="text-sm">{benefit.description}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Available Rewards */}
            <motion.div
              className="holographic-card rounded-xl p-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              data-testid="rewards-card"
            >
              <h3 className="text-xl font-semibold mb-4">Redeem Neural Points</h3>
              <div className="space-y-4">
                {rewardOptions.map((reward, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{reward.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {reward.cost.toLocaleString()} points
                      </div>
                    </div>
                    <Button 
                      disabled={!reward.available}
                      className={
                        reward.available 
                          ? "bg-primary hover:bg-primary/90" 
                          : "opacity-50 cursor-not-allowed"
                      }
                      data-testid={`redeem-${index}`}
                    >
                      Redeem
                    </Button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
