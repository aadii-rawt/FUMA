import React, { createContext, useContext, useEffect, useState } from "react";
import Axios from "../utils/axios";

const UserContext = createContext(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedPost, setSelectedPost] = useState({
        name: "New Automation",
        status: "LIVE",
        postMediaId: "",
        postThumbnail: "",
        anyKeyword: false,
        keywords: [],
        dmText: "",
        msgTitle: "",
        dmLinks: [],
        dmImageUrl: "",
        openingMsg: false,
        commentReply : false,
        commentReplyData : [
        ]
    });
    const [isPriceModalOpen, setIsPriceModalOpen] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const [previewURL, setPreviewURL] = useState<string | null>(null);
    const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)

    useEffect(() => {
        const fetchMe = async () => {
            setLoading(true)
            try {
                const res = await Axios.get("/auth/me", { withCredentials: true });
                setUser(res.data?.data);
            } catch {
                setUser(null);
            } finally {
                setLoading(false)
            }
        };
        fetchMe();
    }, []);

    useEffect(() => {
        if (!user) return;

        if (user.plan === "FREE") return

        const expireDate = new Date(user.expireAt);
        const now = new Date();

        const planExpire = async () => {
            try {
                const res = await Axios.put("/subscriptions/expire")
                setUser(res.data.data)
            } catch (error) {
                console.log(error);
            }
        }
        if (expireDate && now >= expireDate) {
            planExpire()
        }


    }, [user]);

    useEffect(() => {
        if (!user) return;

        const maybeShowModal = async () => {
            try {
                // if (user.plan !== "FREE") return;

                const alreadyShown = sessionStorage.getItem("subsModalShown") === "1";
                if (alreadyShown) return;

                const res = await Axios.get("/automation/count");
                const count = Number(res?.data?.data ?? 0);

                if (count >= 3) {
                    setShowSubscriptionModal(true);
                    sessionStorage.setItem("subsModalShown", "1");
                }
            } catch (e) {
                // ignore silently
            }
        };

        maybeShowModal();
    }, [user]);
    return (
        <UserContext.Provider value={{
            selectedPost, user, setUser, setSelectedPost, loading, setLoading, isPriceModalOpen, setIsPriceModalOpen,
            previewURL, setPreviewURL,
            showSubscriptionModal, setShowSubscriptionModal
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