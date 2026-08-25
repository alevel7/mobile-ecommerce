import { createContext, useContext, useEffect, useState } from "react";
import { Product, WishlistContextType } from "../constants/types";
import { dummyWishlist } from "@/assets/assets";


const WishListContext = createContext<WishlistContextType | null>(null);


export function WishListProvider({ children }: { children: React.ReactNode }) {
    const [wishlist, setWishlist] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const isInWishlist = (itemId: string) => {
        return wishlist.some((item) => item._id === itemId);
    }
    const addToWishlist = (item: Product) => {
        setWishlist((prevWishlist) => [...prevWishlist, item]);
    };

    const removeFromWishlist = (itemId: string) => {
        setWishlist((prevWishlist) =>
            prevWishlist.filter((item) => item._id !== itemId)
        );
    };

    const toggleWishlist = (item: Product) => {
        if (isInWishlist(item._id)) {
            removeFromWishlist(item._id);
        } else {
            addToWishlist(item);
        }
    }

    const fetchWishlist = async () => {
        setLoading(true);
        try {
            setWishlist(dummyWishlist);
        } catch (error) {
            console.error("Failed to fetch wishlist:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);
    return (
        <WishListContext.Provider
            value={{ wishlist, loading, toggleWishlist, isInWishlist }}
        >
            {children}
        </WishListContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishListContext);
    if (!context) {
        throw new Error("useWishlist must be used within a WishListProvider");
    }
    return context;
}