import { View, Image, Text, Touchable, TouchableOpacity } from "react-native";
import { CartItemProps } from "../constants/types";
import { CircleX, Minus, Plus } from 'lucide-react-native';
import { COLORS } from "../constants";


export default function CartItem(props: CartItemProps) {

    const image = props.item.product.images[0];

    const { onRemove, onUpdateQuantity } = props;

    return (
        <View className="flex-row items-center justify-between bg-white p-4 rounded-lg shadow mb-4">
            <View className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-3">
                <Image source={{ uri: image }} className="w-full h-full rounded-lg mb-2" resizeMode="cover" />
            </View>

            <View className="flex-row flex-1 justify-between items-start">
                <View className="flex-row justify-between items-start gap-1">
                    <View>
                        <Text className="text-primary font-medium text-sm mb-1">{props.item.product.name}</Text>
                        <View className="mt-2">
                            <Text className="text-sm">{props.item.size}</Text>
                        </View>
                        <View className="flex-row justify-between items-center mt-2">
                            <Text className="text-sm font-semibold">${(props.item.product.price * props.item.quantity).toFixed(2)}</Text>
                            <View className="text-sm text-gray-500 flex-row items-center gap-2">
                                <TouchableOpacity
                                    className="bg-gray-200 px-2 py-1 rounded-lg" onPress={() => onUpdateQuantity && onUpdateQuantity(props.item.quantity - 1)}>
                                    <Minus size={12} color={COLORS.primary} />
                                </TouchableOpacity>

                                <Text className="text-sm text-gray-500 px-2">{props.item.quantity}</Text>

                                <TouchableOpacity
                                    className="bg-gray-200 px-2 py-1 rounded-lg" onPress={() => onUpdateQuantity && onUpdateQuantity(props.item.quantity + 1)}>
                                    <Plus size={12} color={COLORS.primary} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <TouchableOpacity onPress={onRemove} className="bg-gray-200 p-1 rounded-full">
                    <CircleX size={12} color={'#FF0000'} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
