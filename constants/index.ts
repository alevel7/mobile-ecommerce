import { ICategory } from './types';

export const COLORS = {
    primary: "#111111",
    secondary: "#666666",
    background: "#FFFFFF",
    surface: "#F7F7F7",
    accent: "#FF4C3B",
    border: "#EEEEEE",
    error: "#FF4444",
};
export const CATEGORIES: ICategory[] = [
    { id: 1, name: "Men", icon: 'Mars' },
    { id: 2, name: "Women", icon: 'Venus' },
    { id: 3, name: "Kids", icon: 'Baby' },
    { id: 4, name: "Shoes", icon: 'SportShoe' },
    { id: 5, name: "Bags", icon: 'BriefcaseBusiness' },
    { id: 6, name: "Other", icon: "other" },
];

export const PROFILE_MENU = [
    { id: 1, title: "My Orders", icon: "orders", route: "/orders" },
    { id: 2, title: "Shipping Addresses", icon: "location", route: "/addresses" },
    { id: 4, title: "My Reviews", icon: "review", route: "/" },
    { id: 5, title: "Settings", icon: "settings", route: "/" },
];

export const getStatusColor = (status: string) => {
    switch (status) {
        case "placed":
            return "bg-yellow-50 text-yellow-900";
        case "processing":
            return "bg-indigo-50 text-indigo-900";
        case "shipped":
            return "bg-purple-50 text-purple-900";
        case "delivered":
            return "bg-green-50 text-green-900";
        case "cancelled":
            return "bg-red-50 text-red-900";
        default:
            return "bg-gray-50 text-gray-900";
    }
};
