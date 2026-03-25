import { createContext, useState, useEffect, ReactNode } from "react";
import { api } from "../lib/axios";

interface User {
    id: string;
    name: string;
    email: string;
    subscriptionStatus?: string;
    role: "ADMIN" | "CLIENT";
}

interface AuthContextData {
    user: User | null;
    isAuthenticated: boolean;
    signIn: (credentials: object) => Promise<void>;
    signOut: () => void;
    refreshUser: () => Promise<void>;
    loading: boolean;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!user;

    async function refreshUser() {
        try {
            const response = await api.get("/me");
            setUser(response.data);
        } catch {
            signOut();
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("@SaaSControl:token");

        if (token) {
            refreshUser().finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    async function signIn(credentials: object) {
        const response = await api.post("/sessions", credentials);
        const { token, user: userData } = response.data;

        localStorage.setItem("@SaaSControl:token", token);
        setUser(userData);
    }

    function signOut() {
        localStorage.removeItem("@SaaSControl:token");
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated, signIn, signOut, refreshUser, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
}
