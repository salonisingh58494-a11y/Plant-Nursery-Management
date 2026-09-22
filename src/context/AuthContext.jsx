import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // App load hote hi sync check karein
  useEffect(() => {
    const initAuth = () => {
      try {
        const storedUser = localStorage.getItem('userInfo');
        const token = localStorage.getItem('token');
        
        if (storedUser && token) {
          setUser(JSON.parse(storedUser));
        } else {
          // Agar dono mein se ek bhi missing hai toh clear karein (safety)
          localStorage.removeItem('userInfo');
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login function: Humesha token aur user info ko sath mein handle karta hai
  const login = (userData, token) => {
    if (!token || !userData) return;
    
    localStorage.setItem('token', token);
    localStorage.setItem('userInfo', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook export (Named Export)
export const useAuth = () => {
  const context = useContext(AuthContext);
  // undefined check ki jagah !context check zyada safe hai
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};