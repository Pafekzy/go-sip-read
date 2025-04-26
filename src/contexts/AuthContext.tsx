
import { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// User roles based on the README
export type UserRole = 
  | 'guest' 
  | 'registered' 
  | 'subscribed' 
  | 'groupAdmin' 
  | 'techMentor'
  | 'productivityGuru'
  | 'goSipReadAdmin';

// Role-specific permissions definition
export interface RolePermissions {
  canCreateGroups: boolean;
  canDeleteGroups: boolean;
  canMuteGroups: boolean;
  canAddGroupAdmins: boolean;
  canRemoveGroupAdmins: boolean;
  canSuspendUsers: boolean;
  canSetCodeWarChallenge: boolean;
  canDistributeCoupons: boolean;
  canSetGlobalCodeWar: boolean;
  canDisplayAds: boolean;
  canAccessAdminPanel: boolean;
}

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
  hasSpecificPermission: (permission: keyof RolePermissions) => boolean;
  getPermissionsForRole: (role: UserRole) => RolePermissions;
  promoteToRole: (userId: string, newRole: UserRole) => Promise<void>;
  demoteFromRole: (userId: string, newRole: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Role hierarchy and permissions mapping
const rolePermissionsMap: Record<UserRole, RolePermissions> = {
  guest: {
    canCreateGroups: false,
    canDeleteGroups: false,
    canMuteGroups: false,
    canAddGroupAdmins: false,
    canRemoveGroupAdmins: false,
    canSuspendUsers: false,
    canSetCodeWarChallenge: false,
    canDistributeCoupons: false,
    canSetGlobalCodeWar: false,
    canDisplayAds: false,
    canAccessAdminPanel: false,
  },
  registered: {
    canCreateGroups: false,
    canDeleteGroups: false,
    canMuteGroups: false,
    canAddGroupAdmins: false,
    canRemoveGroupAdmins: false,
    canSuspendUsers: false,
    canSetCodeWarChallenge: false,
    canDistributeCoupons: false,
    canSetGlobalCodeWar: false,
    canDisplayAds: false,
    canAccessAdminPanel: false,
  },
  subscribed: {
    canCreateGroups: false,
    canDeleteGroups: false,
    canMuteGroups: false,
    canAddGroupAdmins: false,
    canRemoveGroupAdmins: false,
    canSuspendUsers: false,
    canSetCodeWarChallenge: false,
    canDistributeCoupons: false,
    canSetGlobalCodeWar: false,
    canDisplayAds: false,
    canAccessAdminPanel: false,
  },
  groupAdmin: {
    canCreateGroups: true,
    canDeleteGroups: true,
    canMuteGroups: true,
    canAddGroupAdmins: true,
    canRemoveGroupAdmins: true,
    canSuspendUsers: true,
    canSetCodeWarChallenge: false,
    canDistributeCoupons: false,
    canSetGlobalCodeWar: false,
    canDisplayAds: false,
    canAccessAdminPanel: true,
  },
  techMentor: {
    canCreateGroups: true,
    canDeleteGroups: true,
    canMuteGroups: true,
    canAddGroupAdmins: true,
    canRemoveGroupAdmins: true,
    canSuspendUsers: true,
    canSetCodeWarChallenge: true,
    canDistributeCoupons: true,
    canSetGlobalCodeWar: false,
    canDisplayAds: false,
    canAccessAdminPanel: true,
  },
  productivityGuru: {
    canCreateGroups: true,
    canDeleteGroups: true,
    canMuteGroups: true,
    canAddGroupAdmins: true,
    canRemoveGroupAdmins: true,
    canSuspendUsers: true,
    canSetCodeWarChallenge: true,
    canDistributeCoupons: true,
    canSetGlobalCodeWar: true,
    canDisplayAds: true,
    canAccessAdminPanel: true,
  },
  goSipReadAdmin: {
    canCreateGroups: true,
    canDeleteGroups: true,
    canMuteGroups: true,
    canAddGroupAdmins: true,
    canRemoveGroupAdmins: true,
    canSuspendUsers: true,
    canSetCodeWarChallenge: true,
    canDistributeCoupons: true,
    canSetGlobalCodeWar: true,
    canDisplayAds: true,
    canAccessAdminPanel: true,
  }
};

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

  // Check if user has sufficient permissions based on role hierarchy
  const hasPermission = (requiredRole: UserRole): boolean => {
    if (!user) return false;
    return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
  };

  // Get permissions for a specific role
  const getPermissionsForRole = (role: UserRole): RolePermissions => {
    return rolePermissionsMap[role];
  };

  // Check if user has a specific permission
  const hasSpecificPermission = (permission: keyof RolePermissions): boolean => {
    if (!user) return false;
    return rolePermissionsMap[user.role][permission];
  };

  // Promote a user to a higher role
  const promoteToRole = async (userId: string, newRole: UserRole): Promise<void> => {
    if (!user) throw new Error('No authenticated user');
    if (!hasPermission('goSipReadAdmin')) throw new Error('Insufficient permissions');
    
    // In a real app, this would be a backend API call
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock update - in a real app, this would update the user in your database
      if (user.id === userId) {
        const updatedUser = { ...user, role: newRole };
        setUser(updatedUser);
        localStorage.setItem('gosip-user', JSON.stringify(updatedUser));
      }
      
      // Success notification would go here
    } catch (error) {
      console.error("Role promotion error:", error);
      throw new Error('Failed to promote user');
    } finally {
      setIsLoading(false);
    }
  };

  // Demote a user to a lower role
  const demoteFromRole = async (userId: string, newRole: UserRole): Promise<void> => {
    if (!user) throw new Error('No authenticated user');
    if (!hasPermission('goSipReadAdmin')) throw new Error('Insufficient permissions');
    
    // In a real app, this would be a backend API call
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock update - in a real app, this would update the user in your database
      if (user.id === userId) {
        const updatedUser = { ...user, role: newRole };
        setUser(updatedUser);
        localStorage.setItem('gosip-user', JSON.stringify(updatedUser));
      }
      
      // Success notification would go here
    } catch (error) {
      console.error("Role demotion error:", error);
      throw new Error('Failed to demote user');
    } finally {
      setIsLoading(false);
    }
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
      hasPermission,
      hasSpecificPermission,
      getPermissionsForRole,
      promoteToRole,
      demoteFromRole
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
