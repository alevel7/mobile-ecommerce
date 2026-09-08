import { View, Image, Text, Touchable, TouchableOpacity } from "react-native";
import { CartItemProps, Product } from "../constants/types";
import { CircleX, ShoppingCart, Plus } from 'lucide-react-native';
import { COLORS } from "../constants";
import { useState } from "react";

type FavoriteItemProps = {
    item: Product;
    toggleCartlist?: (size: string) => void;
    isInCartlist?: () => boolean;
    toggleWishlist?: () => void;
};

export default function FavoriteItem(props: FavoriteItemProps) {

    const { toggleCartlist, isInCartlist, toggleWishlist, item } = props;
    const image = item.images[0];

    const [selectedSize, setSelectedSize] = useState('');


    return (
        <View className="flex-row items-start justify-between bg-white p-4 rounded-lg shadow mb-4">
            <View className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-3">
                <Image source={{ uri: image }} className="w-full h-full rounded-lg mb-2" resizeMode="cover" />
            </View>

            <View className="flex-1">
                <View>
                    <Text className="text-primary font-medium text-sm mb-1">{item.name}</Text>

                    <View className="flex-row justify-between">
                        {/* Sizes */}
                        <View className="flex-row flex-wrap mt-2">
                            {item.sizes?.map((size) => (
                                <TouchableOpacity key={size} onPress={() => setSelectedSize(size)} className={`border ${selectedSize === size ? 'border-primary' : 'border-gray-300'} rounded-full px-2 py-1 mr-2 mb-2`}>
                                    <Text className={`text-xs ${selectedSize === size ? 'text-primary' : 'text-secondary'}`}>{size}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* toggle wishlist and add to cart */}
                        <View className="flex-row mt-2">
                            <TouchableOpacity onPress={toggleWishlist} className="p-2 bg-white rounded-full shadow">
                                <CircleX size={12} color={'#FF0000'} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => toggleCartlist && toggleCartlist(selectedSize)} className="p-2 bg-white rounded-full shadow">
                                <ShoppingCart size={12} color={isInCartlist && isInCartlist() ? COLORS.accent : COLORS.secondary} />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>

        </View>
    );
}
