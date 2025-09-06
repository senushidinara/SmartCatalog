import { Search, ShoppingCart, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";

interface HeaderProps {
  cartItemCount?: number;
}

export default function Header({ cartItemCount = 0 }: HeaderProps) {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer" data-testid="logo-link">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-memory rounded-lg flex items-center justify-center">
              <Brain className="text-white text-sm" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-memory bg-clip-text text-transparent">
              NeuroBoutique
            </span>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/catalog">
            <a className="text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-catalog">
              Catalog
            </a>
          </Link>
          <Link href="/bundles">
            <a className="text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-bundles">
              Bundles
            </a>
          </Link>
          <Link href="/profile">
            <a className="text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-profile">
              Brain Profile
            </a>
          </Link>
          <Link href="/rewards">
            <a className="text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-rewards">
              Rewards
            </a>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search cognitive enhancers..."
              className="bg-secondary border-border pl-4 pr-10 w-64"
              data-testid="search-input"
            />
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          
          <Button variant="ghost" size="icon" className="relative" data-testid="cart-button">
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-energy text-black text-xs rounded-full w-5 h-5 flex items-center justify-center" data-testid="cart-count">
                {cartItemCount}
              </span>
            )}
          </Button>
          
          <div className="w-8 h-8 bg-gradient-to-r from-focus to-energy rounded-full" data-testid="user-avatar" />
        </div>
      </nav>
    </header>
  );
}
