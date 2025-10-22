// src/context/UserContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import Axios from "../utils/axios";
import type { User } from "../types/types";


const UserContext = createContext(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedPost, setSelectedPost] = useState<User>({
        name     :      "New Automation",
        status      :  "LIVE",
        postMediaId  :  "",       
        postThumbnail : "", 
        anyKeyword  : false,
        keywords : [],
        dmText :   "",
        msgTitle : "",
        dmLinks : []
    });
    const [isPriceModalOpen,setIsPriceModalOpen] = useState(false)
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)


      const [anyKeyword, setAnyKeyword] = useState<boolean>(false);
      const [keywords, setKeywords] = useState<string[]>([]);
      const [imageUrl, setImageUrl] = useState<string | null>(null);
     const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
        const [message, setMessage] = useState("");
      const [links, setLinks] = useState([]);

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
        <UserContext.Provider value={{ selectedPost,user,setUser, setSelectedPost,loading,setLoading, isPriceModalOpen,setIsPriceModalOpen ,
            keywords,setKeywords,
            anyKeyword,setAnyKeyword,
            imageUrl,setImageUrl,
            message,setMessage,
            links, setLinks,
            imageDataUrl, setImageDataUrl
            
        }}>
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