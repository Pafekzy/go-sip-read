
import { createContext, useState, useContext, useEffect } from 'react';

// User roles based on the README
export type UserRole = 
  | 'guest' 
  | 'registered' 
  | 'subscribed' 
  | 'groupAdmin' 
  | 'techMentor'
  | 'productivityGuru'
  | 'goSipReadAdmin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  hasPermission: (requiredRole: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, this would check with your backend or localStorage
        const storedUser = localStorage.getItem('gosip-user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Role hierarchy for permission checks
  const roleHierarchy: Record<UserRole, number> = {
    guest: 0,
    registered: 1,
    subscribed: 2,
    groupAdmin: 3,
    techMentor: 4,
    productivityGuru: 5,
    goSipReadAdmin: 6
  };

  // Check if user has sufficient permissions
  const hasPermission = (requiredRole: UserRole): boolean => {
    if (!user) return false;
    return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
  };

  // Mock login function (would connect to backend in real app)
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock user data - in a real app, this would come from your backend
      const mockUser: User = {
        id: '1',
        name: 'Test User',
        email,
        role: 'registered',
      };
      
      setUser(mockUser);
      localStorage.setItem('gosip-user', JSON.stringify(mockUser));
    } catch (error) {
      console.error("Login error:", error);
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Mock register function
  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock user data after registration
      const mockUser: User = {
        id: '1',
        name,
        email,
        role: 'registered',
      };
      
      setUser(mockUser);
      localStorage.setItem('gosip-user', JSON.stringify(mockUser));
    } catch (error) {
      console.error("Registration error:", error);
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('gosip-user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      register, 
      logout,
      hasPermission
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
