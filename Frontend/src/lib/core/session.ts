import { useState, useEffect } from "react";
import { auth, onAuthStateChanged } from "../firebase";
import {
  getStoredLocalUser,
  setStoredLocalUser,
  formatOrvellaUser,
  type OrvellaUser,
} from "../authService";

export interface SessionResult {
  user: OrvellaUser | null;
  session: { user: OrvellaUser } | null;
  loading: boolean;
  error: any;
}

export const getUserSession = (): SessionResult => {
  const [user, setUser] = useState<OrvellaUser | null>(() => getStoredLocalUser());
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    // Check initial local storage
    const localUser = getStoredLocalUser();
    if (localUser) {
      setUser(localUser);
    }

    // Subscribe to Firebase auth state
    const unsubscribe = onAuthStateChanged(
      auth,
      (fbUser) => {
        if (fbUser) {
          const currentStored = getStoredLocalUser();
          const mapped = formatOrvellaUser(fbUser, currentStored?.role);
          if (mapped) {
            setUser(mapped);
            setStoredLocalUser(mapped);
          }
        } else {
          // If no firebase user, retain local demo user if active, else null
          const currentStored = getStoredLocalUser();
          if (currentStored && (currentStored.id.includes("demo") || currentStored.email.includes("director") || currentStored.email.includes("patron"))) {
            setUser(currentStored);
          } else {
            setUser(null);
          }
        }
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return {
    user,
    session: user ? { user } : null,
    loading,
    error,
  };
};
