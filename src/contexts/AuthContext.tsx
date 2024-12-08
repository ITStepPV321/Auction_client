import React, { createContext, useState, useContext, ReactNode } from "react";
import { getToken } from "../helpers/localStorage.helper";
import { AuthService } from "../services/auth.service";
import { AuthContextType, AuthProviderProps } from "../types/auth";

// Створення контексту з початковим значенням
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Провайдер
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(getToken());

    const login = (newToken: string) => {
        setToken(newToken); // Оновлюємо стан
    };

    const logout = () => {
        AuthService.logout();
        setToken(null);
    };

    return <AuthContext.Provider value={{ token, login, logout }}>{children}</AuthContext.Provider>;
};
