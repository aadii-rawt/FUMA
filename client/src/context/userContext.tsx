// src/context/UserContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import Axios from "../utils/axios";


const UserContext = createContext(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedPost, setSelectedPost] = useState(null);
    const [isPriceModalOpen,setIsPriceModalOpen] = useState(false)
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)


    useEffect(() => {
        const fetchMe = async () => {
            setLoading(true)
            try {
            const res = await Axios.get("/auth/me", { withCredentials: true });
            setUser(res.data?.data);
            } catch {
            setUser(null);
            }finally{
                setLoading(false)
            }
        };
        fetchMe();
}, []);

    return (
        <UserContext.Provider value={{ selectedPost,user,setUser, setSelectedPost,loading,setLoading, isPriceModalOpen,setIsPriceModalOpen }}>
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