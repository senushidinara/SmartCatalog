import { Brain, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import { motion } from "framer-motion";

const footerSections = [
  {
    title: "Shop",
    links: [
      { label: "Memory & Focus", href: "/catalog?category=memory" },
      { label: "Stress & Mood", href: "/catalog?category=mood" },
      { label: "Sleep & Recovery", href: "/catalog?category=sleep" },
      { label: "Energy & Motivation", href: "/catalog?category=energy" },
      { label: "Brain Gadgets", href: "/catalog?category=gadgets" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "Returns", href: "/returns" },
      { label: "Contact Us", href: "/contact" },
      { label: "AI Consultation", href: "/consultation" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Research", href: "/research" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Careers", href: "/careers" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="py-12 px-6 bg-card border-t border-border relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-memory/5" />
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/">
              <div className="flex items-center space-x-2 mb-4 cursor-pointer" data-testid="footer-logo">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-memory rounded-lg flex items-center justify-center">
                  <Brain className="text-white text-sm" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-memory bg-clip-text text-transparent">
                  NeuroBoutique
                </span>
              </div>
            </Link>
            
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              Where science meets luxury in cognitive enhancement. Discover products backed by neuroscience and curated by AI for your optimal brain performance.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="social-twitter"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="social-instagram"
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="social-linkedin"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="social-email"
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          {/* Navigation Sections */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div 
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
            >
              <h4 className="font-semibold mb-4 text-foreground">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li 
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (sectionIndex * 0.1) + (linkIndex * 0.05) }}
                  >
                    <Link href={link.href}>
                      <a 
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {link.label}
                      </a>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="holographic-card rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <h4 className="font-semibold mb-2 text-primary">Neural Insights Newsletter</h4>
                <p className="text-sm text-muted-foreground">
                  Get personalized cognitive tips, product updates, and exclusive offers delivered to your inbox.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 bg-background border-border"
                    data-testid="newsletter-email-input"
                  />
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    data-testid="newsletter-subscribe-button"
                  >
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <Separator className="mb-8" />

        {/* Bottom Section */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="mb-4 md:mb-0">
            <p>&copy; 2024 NeuroBoutique. All rights reserved.</p>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link href="/privacy">
              <a className="hover:text-foreground transition-colors" data-testid="footer-privacy">
                Privacy Policy
              </a>
            </Link>
            <Link href="/terms">
              <a className="hover:text-foreground transition-colors" data-testid="footer-terms">
                Terms of Service
              </a>
            </Link>
            <Link href="/cookies">
              <a className="hover:text-foreground transition-colors" data-testid="footer-cookies">
                Cookie Policy
              </a>
            </Link>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          className="mt-8 pt-8 border-t border-border"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex flex-wrap justify-center items-center gap-8 text-xs text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span>FDA Compliant Facility</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">🔒</span>
              </div>
              <span>256-bit SSL Encryption</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">🧬</span>
              </div>
              <span>Third-Party Lab Tested</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">📦</span>
              </div>
              <span>Carbon Neutral Shipping</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
