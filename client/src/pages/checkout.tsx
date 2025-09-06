import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import InteractiveCheckout from "@/components/interactive-checkout";
import BrainVisualization from "@/components/brain-visualization";
import NeuralAnimations from "@/components/neural-animations";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Shield, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { formatPrice } from "@/lib/neural-utils";

interface PaymentMethod {
  id: string;
  type: string;
  last4: string;
  brand: string;
}

const paymentMethods: PaymentMethod[] = [
  { id: "1", type: "card", last4: "4242", brand: "Visa" },
  { id: "2", type: "card", last4: "8888", brand: "Mastercard" },
];

export default function Checkout() {
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0].id);
  const [billingInfo, setBillingInfo] = useState({
    email: "alex@example.com",
    firstName: "Alex",
    lastName: "Chen",
    address: "123 Neural St",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
  });

  const orderTotal = 110.47;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NeuralAnimations />
      <Header cartItemCount={3} />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Back to Cart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/">
              <Button variant="ghost" className="mb-8" data-testid="back-to-cart">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Cart
              </Button>
            </Link>
          </motion.div>

          {/* Checkout Header */}
          <div className="text-center mb-12">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-memory bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              data-testid="checkout-page-title"
            >
              Complete Your Neural Enhancement
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Secure checkout with real-time brain impact analysis
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Information */}
              <motion.div
                className="holographic-card rounded-xl p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                data-testid="contact-info-section"
              >
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm mr-3">
                    1
                  </div>
                  Contact Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={billingInfo.email}
                      onChange={(e) => setBillingInfo({...billingInfo, email: e.target.value})}
                      className="mt-2"
                      data-testid="email-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="mt-2"
                      data-testid="phone-input"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Billing Address */}
              <motion.div
                className="holographic-card rounded-xl p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                data-testid="billing-address-section"
              >
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <div className="w-8 h-8 bg-memory rounded-full flex items-center justify-center text-white text-sm mr-3">
                    2
                  </div>
                  Billing Address
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={billingInfo.firstName}
                      onChange={(e) => setBillingInfo({...billingInfo, firstName: e.target.value})}
                      className="mt-2"
                      data-testid="first-name-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={billingInfo.lastName}
                      onChange={(e) => setBillingInfo({...billingInfo, lastName: e.target.value})}
                      className="mt-2"
                      data-testid="last-name-input"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={billingInfo.address}
                      onChange={(e) => setBillingInfo({...billingInfo, address: e.target.value})}
                      className="mt-2"
                      data-testid="address-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={billingInfo.city}
                      onChange={(e) => setBillingInfo({...billingInfo, city: e.target.value})}
                      className="mt-2"
                      data-testid="city-input"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={billingInfo.state}
                        onChange={(e) => setBillingInfo({...billingInfo, state: e.target.value})}
                        className="mt-2"
                        data-testid="state-input"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={billingInfo.zipCode}
                        onChange={(e) => setBillingInfo({...billingInfo, zipCode: e.target.value})}
                        className="mt-2"
                        data-testid="zip-input"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Payment Method */}
              <motion.div
                className="holographic-card rounded-xl p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                data-testid="payment-method-section"
              >
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <div className="w-8 h-8 bg-focus rounded-full flex items-center justify-center text-white text-sm mr-3">
                    3
                  </div>
                  Payment Method
                </h2>
                
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <Card
                      key={method.id}
                      className={`p-4 cursor-pointer transition-all ${
                        selectedPayment === method.id 
                          ? 'ring-2 ring-primary bg-primary/10' 
                          : 'hover:bg-accent'
                      }`}
                      onClick={() => setSelectedPayment(method.id)}
                      data-testid={`payment-method-${method.id}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <CreditCard className="w-5 h-5 mr-3" />
                          <div>
                            <div className="font-medium">
                              {method.brand} ending in {method.last4}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Expires 12/27
                            </div>
                          </div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          selectedPayment === method.id 
                            ? 'bg-primary border-primary' 
                            : 'border-muted-foreground'
                        }`} />
                      </div>
                    </Card>
                  ))}
                  
                  <Button variant="outline" className="w-full" data-testid="add-payment-method">
                    + Add New Payment Method
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Order Summary & Brain Impact */}
            <div className="space-y-8">
              {/* Brain Impact Visualization */}
              <motion.div
                className="holographic-card rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                data-testid="brain-impact-summary"
              >
                <h3 className="text-xl font-semibold mb-4">Cognitive Enhancement Preview</h3>
                <BrainVisualization />
              </motion.div>

              {/* Order Summary */}
              <motion.div
                className="holographic-card rounded-xl p-6 sticky top-24"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                data-testid="order-summary-checkout"
              >
                <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <img 
                      src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60" 
                      alt="NeuroFocus Capsules"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="font-medium">NeuroFocus Capsules</div>
                      <div className="text-sm text-muted-foreground">Qty: 2</div>
                    </div>
                    <div className="font-medium">{formatPrice(99.98)}</div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <img 
                      src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60" 
                      alt="Cogniva Memory Gummies"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="font-medium">Cogniva Memory Gummies</div>
                      <div className="text-sm text-muted-foreground">Qty: 1</div>
                    </div>
                    <div className="font-medium">{formatPrice(29.99)}</div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(129.97)}</span>
                  </div>
                  <div className="flex justify-between text-energy">
                    <span>Gold Tier Discount (15%)</span>
                    <span>-{formatPrice(19.50)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-energy">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>{formatPrice(0)}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between font-semibold text-lg mb-6">
                  <span>Total</span>
                  <span data-testid="checkout-total">{formatPrice(orderTotal)}</span>
                </div>

                <Button 
                  className="w-full bg-primary hover:bg-primary/90 py-4 text-lg font-semibold"
                  data-testid="complete-order-button"
                >
                  Complete Order
                </Button>

                <div className="flex items-center justify-center mt-4 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 mr-2" />
                  <span>Secured by 256-bit SSL encryption</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
