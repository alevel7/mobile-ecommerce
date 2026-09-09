import { Tabs, useRouter } from "expo-router";
import { useEffect } from "react";
import { View, ActivityIndicator, TouchableOpacity, Text } from "react-native";
import { dummyUser } from "@/assets/assets";
import { COLORS } from "../../../constants";
import { Box, Grid3x3, LogOut, ReceiptText } from "lucide-react-native";

export default function AdminLayout() {
    const { user } = { user: dummyUser }
    const isLoaded = true;
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && (!user || user.publicMetadata?.role !== "admin")) {
            router.replace("/(tabs)");
        }
    }, [isLoaded, user]);

    if (!isLoaded) {
        return (
            <View className="flex-1 justify-center items-center bg-surface">
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    if (!user || user.publicMetadata?.role !== "admin") return null;

    return (
        <Tabs
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#fff",
                },
                headerTintColor: COLORS.primary,
                headerTitleStyle: {
                    fontWeight: "bold",
                },
                headerShadowVisible: false,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: "gray",
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => router.replace("/(tabs)")}
                        className="mr-4 flex-row items-center"
                    >
                        <LogOut size={24} color={COLORS.primary} />
                        <Text className="ml-1 text-primary font-medium">Exit</Text>
                    </TouchableOpacity>
                ),
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Dashboard",
                    tabBarIcon: ({ color, size }) => (
                        <Grid3x3 size={size} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="products"
                options={{
                    title: "Products",
                    tabBarIcon: ({ color, size }) => (
                        <Box size={size} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="orders"
                options={{
                    title: "Orders",
                    tabBarIcon: ({ color, size }) => (
                       <ReceiptText size={size} color={color} />
                    )
                }}
            />
        </Tabs>
    );
}
