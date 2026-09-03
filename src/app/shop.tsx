import { Activity, useEffect, useState } from "react";
import { Product } from "../../constants/types";
import Page from '../../assets/auth/sign-in';
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/header";
import { Search, TableOfContents } from "lucide-react-native";
import { COLORS } from "../../constants";
import ProductCard from "../../components/ProductCard";
import { dummyProducts } from "@/assets/assets";

interface ShopProps {
    
}

export default function Shop(props: ShopProps) {
    
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchProducts = async (pageNumber = 1) => {
        if (pageNumber === 1) {
            setLoading(true);
        } else {
            setLoadingMore(true);
        }
        try {
            const start = (pageNumber - 1) * 10;
            const end = start + 10;
            const paginatedProducts = dummyProducts.slice(start, end);
            const a = setProducts(prevProducts => [...prevProducts, ...paginatedProducts]);
            setHasMore(end < dummyProducts.length);
            setPage(pageNumber);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const handleLoadMore = () => {
        if (hasMore && !loadingMore && !loading) {
            fetchProducts(page + 1);
        }
    };

    useEffect(() => {
        fetchProducts(1);
    }, []);

    return (
        <SafeAreaView className="flex-1" edges={["top", "left", "right", "bottom"]}>
            <Header showBack showCart title="Shop"/>
            <View className="flex-row mb-3 gap-2 mx-4 my-2">
                <View className="flex-row flex-1 items-center bg-white rounded-xl border border-gray-100 px-2">
                    <Search size={20} color={COLORS.primary} className="ml-4"/>
                    <TextInput className="flex-1 ml-1 text-primary px-4 py-3" placeholder="Search products..." returnKeyType="search"/>
                    <TouchableOpacity className="bg-gray-800 size-12 rounded-xl items-center justify-center">
                        <TableOfContents color={'#fff'}/>
                    </TouchableOpacity>
                </View>
            </View>
            {
                loading ? (
                    <View className="flex-1 justify-center items-center">
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    </View>
                ) : (
                        <FlatList 
                        data={products} 
                            keyExtractor={(item) => `shop-product-${item._id}`} 
                        numColumns={2}
                        contentContainerStyle={{ paddingBottom: 100, padding:16 }}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        renderItem={({ item }) => (
                            <ProductCard product={item}  key={item._id}/>
                        )} 
                        onEndReached={handleLoadMore} 
                        onEndReachedThreshold={0.5} 
                        ListFooterComponent={loadingMore ? (
                            <View className="py-4">
                                <ActivityIndicator size="small" color={COLORS.primary} />
                            </View>
                        ) : null} 
                        ListEmptyComponent={
                            !loading && (
                                <View className="flex-1 justify-center items-center mt-10">
                                    <Text className="text-center text-gray-500 mt-4">No products found.</Text>
                                </View>
                            )
                        }/>
                )
            }
        </SafeAreaView>
    );
}
