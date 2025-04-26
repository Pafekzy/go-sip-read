
import { useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ThemeProvider, useTheme } from "@/components/ThemeProvider";
import { Home, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { SupportedBy } from "@/components/SupportedBy";

function MainLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="py-4 px-4 border-b flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Logo />
          {!isHomePage && (
            <Link to="/">
              <Button variant="outline" className="gap-2 hover:scale-105 transition-transform">
                <Home size={16} />
                Home
              </Button>
            </Link>
          )}
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme}
          className="rounded-full w-10 h-10 hover:scale-110 transition-transform"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </Button>
      </header>
      
      <main className="flex-1 container mx-auto py-6 px-4">
        {children}
      </main>
      
      <footer className="py-4 px-4 border-t">
        <SupportedBy />
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} GoSipRead. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MainLayout>{children}</MainLayout>
    </ThemeProvider>
  );
}
