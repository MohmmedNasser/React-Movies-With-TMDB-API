import { createContext } from "react";
import type { User, UserCredential } from "firebase/auth";

export type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    signInWithGoogle: () => Promise<UserCredential>;
    logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
