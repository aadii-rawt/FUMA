// src/context/UserContext.tsx
import React, { createContext, useContext, useState } from "react";


const UserContext = createContext(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedPost, setSelectedPost] = useState(null);
    const [isPriceModalOpen,setIsPriceModalOpen] = useState(false)
    return (
        <UserContext.Provider value={{ selectedPost, setSelectedPost,isPriceModalOpen,setIsPriceModalOpen }}>
            {children}
        </UserContext.Provider>
    );
};

const useUser = () => {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error("useUser must be used inside <UserProvider>");
    return ctx;
};

export default useUser