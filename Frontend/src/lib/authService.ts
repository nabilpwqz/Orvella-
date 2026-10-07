import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  firebaseSignOut,
  type FirebaseUser,
} from "./firebase";

export interface OrvellaUser {
  id: string;
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  image?: string;
  avatar?: string;
}

const LOCAL_STORAGE_KEY = "orvella_session_user";

// Helper to convert Firebase User or Demo Data to OrvellaUser
export const formatOrvellaUser = (fbUser: FirebaseUser | null, customRole?: "admin" | "user"): OrvellaUser | null => {
  if (!fbUser) return null;

  const email = fbUser.email || "";
  const isAdmin = customRole === "admin" || email.toLowerCase().includes("admin") || email.toLowerCase().includes("director");
  const role: "admin" | "user" = isAdmin ? "admin" : "user";

  const defaultAvatar = isAdmin
    ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop"
    : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop";

  return {
    id: fbUser.uid,
    _id: fbUser.uid,
    name: fbUser.displayName || (isAdmin ? "Maison Sommelier" : "Distinguished Patron"),
    email: email,
    role: role,
    image: fbUser.photoURL || defaultAvatar,
    avatar: fbUser.photoURL || defaultAvatar,
  };
};

export const getStoredLocalUser = (): OrvellaUser | null => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setStoredLocalUser = (user: OrvellaUser | null) => {
  try {
    if (user) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  } catch {
    // Ignore storage errors
  }
};

// Sign up new user
export const registerWithFirebase = async (name: string, email: string, pass: string): Promise<OrvellaUser> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
  await updateProfile(userCredential.user, { displayName: name });
  const orvellaUser = formatOrvellaUser(userCredential.user);
  if (orvellaUser) {
    setStoredLocalUser(orvellaUser);
    return orvellaUser;
  }
  throw new Error("Failed to format authenticated user");
};

// Sign in existing user
export const loginWithFirebase = async (email: string, pass: string): Promise<OrvellaUser> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, pass);
  const orvellaUser = formatOrvellaUser(userCredential.user);
  if (orvellaUser) {
    setStoredLocalUser(orvellaUser);
    return orvellaUser;
  }
  throw new Error("User credentials invalid");
};

// Instant Demo Authentication
export const loginDemoAccount = async (role: "user" | "admin"): Promise<OrvellaUser> => {
  const isDemoAdmin = role === "admin";
  const demoEmail = isDemoAdmin ? "director@orvella.com" : "patron@orvella.com";
  const demoPass = "Orvella2026!";
  const demoName = isDemoAdmin ? "Orvella Atelier Director" : "Distinguished Patron";

  // Try Firebase first
  try {
    const cred = await signInWithEmailAndPassword(auth, demoEmail, demoPass);
    const user = formatOrvellaUser(cred.user, role);
    if (user) {
      setStoredLocalUser(user);
      return user;
    }
  } catch (err: any) {
    // If user does not exist in Firebase project yet, create it
    if (err?.code === "auth/user-not-found" || err?.code === "auth/invalid-credential") {
      try {
        const cred = await createUserWithEmailAndPassword(auth, demoEmail, demoPass);
        await updateProfile(cred.user, { displayName: demoName });
        const user = formatOrvellaUser(cred.user, role);
        if (user) {
          setStoredLocalUser(user);
          return user;
        }
      } catch {
        // Fall back to instant authenticated local session below
      }
    }
  }

  // Guaranteed instant fallback session
  const fallbackUser: OrvellaUser = {
    id: isDemoAdmin ? "orvella-director-demo-id" : "orvella-patron-demo-id",
    _id: isDemoAdmin ? "orvella-director-demo-id" : "orvella-patron-demo-id",
    name: demoName,
    email: demoEmail,
    role: role,
    image: isDemoAdmin
      ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop"
      : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    avatar: isDemoAdmin
      ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop"
      : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  };

  setStoredLocalUser(fallbackUser);
  return fallbackUser;
};

// Sign in with Google Popup
export const signInWithGoogle = async (): Promise<OrvellaUser> => {
  const result = await signInWithPopup(auth, googleProvider);
  const orvellaUser = formatOrvellaUser(result.user);
  if (orvellaUser) {
    setStoredLocalUser(orvellaUser);
    return orvellaUser;
  }
  throw new Error("Unable to format Google user profile.");
};

// Sign out
export const logoutFromOrvella = async () => {
  setStoredLocalUser(null);
  try {
    await firebaseSignOut(auth);
  } catch {
    // Ignore error if already signed out
  }
};
