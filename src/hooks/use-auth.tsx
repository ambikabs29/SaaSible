"use client";

import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import type { ReactNode } from "react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, firebaseInitializationError } from "@/lib/firebase/config";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton for loading state
import { FirebaseInitError } from "@/components/firebase-init-error"; // Import the error component

interface AuthContextType {
  user: User | null;
  loading: boolean;
  initializationError: string | null; // Add error state
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only attempt to set up auth listener if Firebase initialized correctly
    if (!firebaseInitializationError && auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
      });
      // Cleanup subscription on unmount
      return () => unsubscribe();
    } else {
      // If Firebase didn't initialize, stop loading and indicate no user
      setUser(null);
      setLoading(false);
    }
  }, []); // Run only once on mount


  // Display error component if initialization failed
  if (firebaseInitializationError) {
     return <FirebaseInitError errorMessage={firebaseInitializationError} />;
  }


  // Show a loading state while checking authentication status (if no init error)
  if (loading) {
     return (
       <div className="flex items-center justify-center min-h-screen">
          {/* You can replace this with a more sophisticated loading spinner */}
         <p>Loading user session...</p>
          {/* Or keep the skeleton */}
          {/* <Skeleton className="h-12 w-1/4 rounded-md" /> */}
       </div>
     );
  }

  return (
    <AuthContext.Provider value={{ user, loading, initializationError: firebaseInitializationError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
