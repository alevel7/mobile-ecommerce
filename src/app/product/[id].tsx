import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image, Dimensions, TouchableOpacity } from "react-native";
import { Product } from "../../../constants/types";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishListContext";
import { dummyProducts } from "@/assets/assets";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../../constants";
import { ScrollView } from "react-native-gesture-handler";
import { ArrowLeft, Star, StarHalf, Handbag, ShoppingCart } from 'lucide-react-native';
import Toast from "react-native-toast-message";



const width = Dimensions.get("window").width;

export default function ProductDetails() {

    const router = useRouter();
    const { id: productId } = useLocalSearchParams();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

    const { addToCart, cartItems, itemCount } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const isLiked = product ? isInWishlist(product._id) : false;


    const fetchProductDetails = async () => {
        const product = dummyProducts.find((product) => product._id === productId);
        setProduct(product || null);
        setLoading(false);
    }
    const handleAddToCart = async () => {
        if (!selectedSize) {
            Toast.show({
                type: 'info',
                text1: 'No size selected',
                text2: 'Please select a size before adding to cart.',
            });
            return;
        }
        if (!product) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Product not found.',
            });
            return;
        }
        addToCart(product, selectedSize)
        Toast.show({
            type: 'success',
            text1: 'Added to Cart',
            text2: `${product.name} has been added to your cart.`,
        });
    }

    useEffect(() => {
        fetchProductDetails();
    }, []);

    if (loading) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color={COLORS.primary} />
            </SafeAreaView>
        );
    }

    if (!product) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center">
                <Text>Product not found</Text>
            </SafeAreaView>
        );
    }
    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 bg-white">
                <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

                    {/* image carousel */}
                    <View className="relative h-[450px] mb-6 bg-gray-100">
                        <ScrollView horizontal
                            pagingEnabled showsHorizontalScrollIndicator={false}
                            scrollEventThrottle={16}
                            onScroll={(event) => {
                                const index = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
                                setActiveImageIndex(index);
                            }}>
                            {product.images.map((image, index) => (
                                <Image key={index} source={{ uri: image }} style={{ width, height: 450 }} resizeMode="cover" />
                            ))}
                        </ScrollView>
                        {/* header action */}
                        <View className="absolute top-4 left-4 right-4 flex-row justify-between items-center">
                            <TouchableOpacity onPress={() => router.back()} className="p-2 bg-white rounded-full shadow">
                                <ArrowLeft size={24} color={COLORS.primary} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => toggleWishlist(product)} className="p-2 bg-white rounded-full shadow">
                                <Text>{isLiked ? '❤️' : '🤍'}</Text>
                            </TouchableOpacity>
                        </View>

                        {/* pagination dots */}
                        <View className="absolute bottom-4 left-0 right-0 flex-row justify-center items-center">
                            {product.images?.map((_, index) => (
                                <View key={index} className={`w-2 h-2 rounded-full mx-1 ${index === activeImageIndex ? 'bg-primary w-6' : 'bg-gray-300'}`} />
                            ))}
                        </View>

                    </View>

                </ScrollView>


                {/* Product Details */}
                <View className="px-4">
                    <View className="flex-row justify-between items-start mb-2">  
                        <Text className="text-2xl font-bold text-primary mb-2">{product.name}</Text>
                        <View className="flex-row items-center">
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
                        </View>
                    </View>
                    <Text className="text-lg text-secondary mb-4">${product.price.toFixed(2)}</Text>
                    <Text className="text-base text-secondary mb-4">{product.description}</Text>

                    {/* Sizes */}
                    <View className="mb-4">
                        <Text className="text-lg font-bold text-primary mb-2">Select Size</Text>
                        <View className="flex-row flex-wrap">
                            {product.sizes?.map((size) => (
                                <TouchableOpacity key={size} onPress={() => setSelectedSize(size)} className={`border ${selectedSize === size ? 'border-primary' : 'border-gray-300'} rounded-full px-4 py-2 mr-2 mb-2`}>
                                    <Text className={`text-base ${selectedSize === size ? 'text-primary' : 'text-secondary'}`}>{size}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Add to Cart Button */}
                    <View className="flex-row justify-center">
                        <TouchableOpacity onPress={() => handleAddToCart()} className="bg-primary py-3 rounded-full items-center flex-row justify-center w-4/5">
                            <Handbag size={22} color="#fff" className="mb-1" />
                            <Text className="text-white text-lg font-bold ml-2">Add to Cart</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => router.push('/cart')} className="py-3 rounded-full items-center flex-row justify-center w-1/5 ml-2 relative">
                            <ShoppingCart size={22} className="mb-1" />
                            <Text className="text-white text-xs rounded-full font-bold ml-2 bg-primary absolute top-2 right-4 w-4 h-4 text-center"> {itemCount}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

        </SafeAreaView>
    );
}
