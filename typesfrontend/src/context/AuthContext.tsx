import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { apiService, endpoints } from "../services/apiService";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: { firstName: string; lastName: string; email: string; password: string; phone?: string }) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
}

interface AuthResponse {
  user: User;
  token: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for saved auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const savedUser = localStorage.getItem("supamenu_user");
        const token = localStorage.getItem("supamenu_token");
        
        if (savedUser && token) {
          try {
            // Parse saved user data
            const userData = JSON.parse(savedUser);
            setUser(userData);
            
            // In a real app, we would validate the token with the backend here
            // For example: await apiService.get<User>(endpoints.auth.profile);
          } catch (error) {
            console.error("Failed to parse saved user", error);
            localStorage.removeItem("supamenu_user");
            localStorage.removeItem("supamenu_token");
          }
        }
      } catch (error) {
        console.error("Auth check failed", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call for now
      // In a real app, this would be:
      // const response = await apiService.post<AuthResponse>(endpoints.auth.login, { email, password });
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check credentials (in a real app, this would be verified by the backend)
      if (email === "admin@supamenu.com" && password === "password") {
        const userData: User = {
          id: "1",
          name: "Jacques Kagabo",
          email: "admin@supamenu.com",
          role: "admin",
          avatar: "/lovable-uploads/74a0465e-18d1-451d-9666-a6ab3c6875eb.png"
        };
        
        const mockToken = "mock-jwt-token-would-be-from-backend";
        
        setUser(userData);
        localStorage.setItem("supamenu_user", JSON.stringify(userData));
        localStorage.setItem("supamenu_token", mockToken);
        
        toast.success("Login successful!");
        return true;
      }
      
      toast.error("Invalid email or password");
      return false;
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Login failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: { firstName: string; lastName: string; email: string; password: string; phone?: string }): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call - in a real app, this would be:
      // const response = await apiService.post<AuthResponse>(endpoints.auth.signup, userData);
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const user: User = {
        id: "2",
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        role: "owner"
      };
      
      const mockToken = "mock-jwt-token-would-be-from-backend";
      
      setUser(user);
      localStorage.setItem("supamenu_user", JSON.stringify(user));
      localStorage.setItem("supamenu_token", mockToken);
      
      toast.success("Account created successfully!");
      return true;
    } catch (error) {
      console.error("Signup failed", error);
      toast.error("Signup failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = useCallback(() => {
    // In a real app with a backend, you might want to call an API endpoint to invalidate the token
    // apiService.post(endpoints.auth.logout);
    
    localStorage.removeItem("supamenu_user");
    localStorage.removeItem("supamenu_token");
    setUser(null);
    toast.info("You have been logged out");
  }, []);

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    setIsLoading(true);
    try {
      // In a real app, this would be:
      // const response = await apiService.put<User>(endpoints.auth.profile, userData);
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (user) {
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
        localStorage.setItem("supamenu_user", JSON.stringify(updatedUser));
        toast.success("Profile updated successfully!");
        return true;
      }
      
      toast.error("You must be logged in to update your profile");
      return false;
    } catch (error) {
      console.error("Profile update failed", error);
      toast.error("Failed to update profile. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};