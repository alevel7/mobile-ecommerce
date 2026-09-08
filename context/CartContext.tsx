import { createContext, useContext, useEffect, useState } from "react";
import { Product, WishlistContextType } from "../constants/types";
import { dummyCart } from "@/assets/assets";

export type CartItem = {
    id: string;
    productId: string;
    product:{
        _id: string; name: string; price: number; images: string[]; stock: number;
    };
    quantity: number;
    size: string;
    price: number;
}

type CartContextType = {
    cartItems: CartItem[];
    addToCart: (product: Product, size:string) => Promise<void>;
    removeFromCart: (productId: string) => Promise<void>;
    updateCartItemQuantity: (itemId: string, quantity: number) => Promise<void>;
    clearCart: () => Promise<void>;
    toggleCartlist: (item: Product, size:string) => void;
    isInCartlist: (itemId: string) => boolean;
    cartTotal: number;
    itemCount: number;
    isLoading: boolean;
};

const CartContext = createContext<CartContextType | null>(null);


export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [cartTotal, setCartTotal] = useState<number>(0);
    const [itemCount, setItemCount] = useState<number>(0);

    const addToCart = async (product: Product, size:string) => {
        const existingItem = cartItems.find(
            (item) => item.productId === product._id && item.size === size
        );

        if (existingItem) {
            await updateCartItemQuantity(existingItem.id, existingItem.quantity + 1);
        } else {
            const newItem: CartItem = {
                id: `${product._id}-${size}`,
                productId: product._id,
                product: product,
                quantity: 1,
                size: size,
                price: product.price,
            };
            setCartItems((prevItems) => [...prevItems, newItem]);
        }
    }

    const removeFromCart = async (itemId: string) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    }

    const updateCartItemQuantity = async (itemId: string, quantity: number) => {
        if (quantity <= 0) {
            await removeFromCart(itemId);
        } else {
            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === itemId ? { ...item, quantity } : item
                )
            );
        }
    }

    const clearCart = async () => {
        setCartItems([]);
    }

    const fetchCartItems = async () => {
        setIsLoading(true);
        try {
            // Simulate fetching cart items from an API or local storage
            const fetchedCartItems: CartItem[] = dummyCart.items.map((item) => ({
                id: item.product._id,
                productId: item.product._id,
                product: item.product,
                quantity: item.quantity,
                size: item?.size || 'M',
                price: item.price,
            }));
            setCartItems(fetchedCartItems);
            setCartTotal(fetchedCartItems.reduce((total, item) => total + item.price * item.quantity, 0));
        } catch (error) {
            console.error("Failed to fetch cart items:", error);
        } finally {
            setIsLoading(false);
        }
    }
    const isInCartlist = (itemId: string) => {
        return cartItems.some((item) => item.id === itemId);
    }
    const toggleCartlist = (item: Product, size:string) => {
        if (isInCartlist(item._id)) {
            removeFromCart(item._id);
        } else {
            addToCart(item, size);
        }
    }
    useEffect(() => {
        setItemCount(cartItems.reduce((total, item) => total + item.quantity, 0));
        setCartTotal(cartItems.reduce((total, item) => total + item.price * item.quantity, 0));
    }, [cartItems]);
    
    useEffect(() => {
        fetchCartItems();
    }, []);
    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, removeFromCart, updateCartItemQuantity, clearCart, cartTotal, itemCount, isLoading, toggleCartlist, isInCartlist }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}