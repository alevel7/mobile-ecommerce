import { Tabs } from "expo-router";
import { House } from 'lucide-react-native';
import { ShoppingCart } from 'lucide-react-native';
import { Heart, CircleEllipsis } from 'lucide-react-native';
import { User } from 'lucide-react-native';
import { COLORS } from "../../../constants";
import { View } from "react-native";
import { useCart } from "../../../context/CartContext";

export default function TabLayout() {

    const { cartItems } = useCart();
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: COLORS.primary,
            tabBarShowLabel: false,
            tabBarInactiveTintColor: '#CDCDE0',
            tabBarStyle: {
                backgroundColor: '#fff',
                borderTopWidth: 1,
                // height:56, 
                paddingBottom: 5,
                paddingTop: 8,
                borderTopColor: '#e5e5e5'
            }
        }}>
            <Tabs.Screen name="index" options={{
                tabBarIcon: ({ color, focused }) => {
                    return <House color={focused ? color : "gray"} size={26} />
                }
            }} />
            <Tabs.Screen name="favorites" options={{
                tabBarIcon: ({ color, focused }) => {
                    return <Heart color={focused ? color : "gray"} size={26} />
                }
            }} />
            <Tabs.Screen name="cart" options={{
                tabBarIcon: ({ color, focused }) => (
                    <View className="relative">
                        <ShoppingCart color={focused ? color : "gray"} size={26} />
                        {
                            cartItems.length > 0 && (
                                <View className="absolute -top-2 -right-2 size-3 rounded-full items-center justify-cente">
                                    <CircleEllipsis color={"black"} size={8} className="absolute -top-1 -right-1 z-10" />
                                </View>
                            )
                        }
                    </View>
                )
            }} />
            <Tabs.Screen name="profile" options={{
                tabBarIcon: ({ color, focused }) => {
                    return <User color={focused ? color : "gray"} size={26} />
                }
            }} />
        </Tabs>
    );
}

