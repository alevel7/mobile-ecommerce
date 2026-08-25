import { Image, Text, TouchableOpacity, View } from "react-native";
import { HeaderProps } from "../constants/types";
import { ArrowLeft, Menu, Search, Handbag } from 'lucide-react-native';
import { COLORS } from "../constants";
import { useRouter } from "expo-router";
import { useCart } from "../context/CartContext";

export default function Header({title, showBack, showSearch, showLogo, showCart, showMenu}:HeaderProps) {
    const router = useRouter();
    const {itemCount} = useCart();

    return (
        <View className="flex-row items-center justify-between px-4 py-2 bg-white">
            <View className="flex-row items-center flex-1 justify-between">
                {
                    showBack && (
                        <TouchableOpacity onPress={() => router.back()} className="mr-3">
                            <ArrowLeft size={24} color={COLORS.primary} />
                        </TouchableOpacity>
                    )
                }

                {
                    showMenu && (
                        <TouchableOpacity className="flex-1">
                            <Menu size={24} color={COLORS.primary} />
                        </TouchableOpacity>
                    )
                }

                {
                    showLogo ? (
                        <TouchableOpacity className="flex-1">
                            <Image  source={require("@/assets/logo.png")} style={{ width: 100, height: 40, resizeMode: 'contain' }}/>
                        </TouchableOpacity>
                    ) : title && <Text className="text-xl font-bold text-primary text-center flex-1 mr-8">{title}</Text>
                }

                {
                    (!title && !showSearch) && <View className="flex-1" />
                }
            </View>

            <View className="flex-row items-center gap-4">
                {
                    showSearch && (
                        <TouchableOpacity>
                            <Search size={24} color={COLORS.primary} />
                        </TouchableOpacity>
                    )
                }
                {
                    showCart && (
                        <TouchableOpacity onPress={() => router.push('/(tabs)/cart')}>
                            <View className="relative">
                                <Handbag size={24} color={COLORS.primary} />
                                <View className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent items-center justify-center">
                                    <Text className="text-white text-xs font-bold">{itemCount}</Text>
                                </View>
                            </View>
                           
                        </TouchableOpacity>
                    )
                }
            </View>
        </View>
    )
}