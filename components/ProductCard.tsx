import { Link, router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { ProductCardProps } from "../constants/types";
import { Image, Text } from "react-native";
import { useState } from "react";
import { Heart, Star, StarHalf } from 'lucide-react-native';
import { useWishlist } from "../context/WishListContext";


export default function ProductCard(props: ProductCardProps) {
    const { product } = props;

    const {toggleWishlist, isInWishlist} = useWishlist();

    const isLiked = isInWishlist(product._id);

    return (
        <Link href={`/product/${product._id}`} asChild>
            <TouchableOpacity key={`product-${product._id}`} onPress={() => router.push('/')}>
                <View className="relative w-40 h-56 bg-white rounded-xl shadow-md overflow-hidden mb-4">
                    <Image source={{ uri: product.images?.[0] ?? '' }} className="w-full h-32" resizeMode="cover" />
                    <View className="p-2">
                        <View className="flex-row items-center mb-1">
                            {
                                Array.from({ length: 5 }, (_, index) => {
                                    const ratingValue = index + 1;
                                    if (product.ratings.average >= ratingValue) {
                                        return <Star key={index} size={12} fill="#FFB800" stroke="#FFB800" />;
                                    } else if (product.ratings.average >= ratingValue - 0.5) {
                                        return <StarHalf key={index} size={12} fill="#FFB800" stroke="#FFB800" />;
                                    } else {
                                        return <Star key={index} size={12} color="#C4C4C4" />;
                                    }
                                })
                            }
                            <Text className="text-xs text-secondary ml-1">{product.ratings.average}</Text>
                        </View>
                        <Text className="text-sm font-bold text-primary" numberOfLines={1}>{product.name}</Text>
                        <Text className="text-sm text-secondary">${product.price.toFixed(2)}</Text>
                    </View>
                    <TouchableOpacity className="absolute top-2 right-2 z-10 p-1 bg-white rounded-full shadow-sm" onPress={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product);
                    }}>
                        {
                            isLiked ? (
                                <Heart size={14} fill='#FF4C3B' stroke='#FF4C3B'/>
                            ) : (
                                <Heart size={14} color="#000" />
                            )
                        }
                    </TouchableOpacity>
                    {
                        product.isFeatured && (
                            <View className="absolute top-2 left-2 bg-accent px-2 py-1 rounded-full">
                                <Text className="text-xs text-white font-bold">Featured</Text>
                            </View>
                        )
                    }
                </View>
            </TouchableOpacity>
        </Link>
    )
}