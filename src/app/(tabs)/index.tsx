import { View, Text, ScrollView, Image, Dimensions, Touchable, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/header";
import { BANNERS, dummyProducts } from "@/assets/assets";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { CATEGORIES } from "../../../constants";
import CategoryItem from "../../../components/CategoryItem";
import { ICategory, Product } from "../../../constants/types";
import ProductCard from "../../../components/ProductCard";

const { width } = Dimensions.get("window");

export default function Index() {
  const router = useRouter();
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const categories: ICategory[] = [
    { id: 0, name: "All", icon: "grid" }, ...CATEGORIES];


  const loadProducts = async () => {
    setLoading(true);
    try {
      setProducts(dummyProducts);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadProducts();
    }, 3000);
    // clear timeout when component unmounts
    return () => clearTimeout(timeout);
  }, []);

  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right", "bottom"]}>
      <View style={{ height: 72, backgroundColor: "#fff", justifyContent: "center" }}>
        {Header ? <Header showMenu showLogo showCart /> : <Text>Header component missing</Text>}
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>

        <View className="mb-6">
          {/* Banner view */}
          <ScrollView
            scrollEventThrottle={16} horizontal pagingEnabled showsHorizontalScrollIndicator={false}
            className="w-full h-48 rounded-xl my-4"
            onScroll={(event) => {
              const index = Math.ceil(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
              setActiveBannerIndex(index);
              if (index !== activeBannerIndex) {
                setActiveBannerIndex(index);
              }
            }}
          >
            {
              BANNERS.map((banner, index) => (
                <View key={`banner-${index}`} className="w-full h-48 mr-4 rounded-xl overflow-hidden relative" style={{ width: width - 32 }}>
                  <Image source={{ uri: banner.image }} className="w-full h-full" resizeMode="cover" />

                  <View className="absolute inset-0 w-full h-full bg-black opacity-40" />
                  <View className="">
                    <Text className="absolute bottom-6 left-4 text-white text-lg font-bold">{banner.title}</Text>
                    <Text className="absolute bottom-2 left-4 text-white text-sm">{banner.subtitle}</Text>
                    <TouchableOpacity className="absolute bottom-4 right-4 bg-accent px-4 py-2 rounded-full">
                      <Text className="text-white font-bold">Get Now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            }
          </ScrollView>
          {/* Pagination */}
          <View className="flex-row justify-center items-center mt-2">
            {
              BANNERS.map((_, index) => (
                <View key={`banner-pagination-${index}`} className={`w-2 h-2 rounded-full mx-1 ${index === activeBannerIndex ? 'bg-accent w-6' : 'bg-gray-300'}`} />
              ))
            }
          </View>
        </View>

        {/* Categories */}

        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-primary">Categories</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-4">
            {
              categories.map((category) => (
                <CategoryItem
                  key={`category-${category.id}`}
                  item={category}
                  isSelected={false}
                  onPress={() => router.push({
                    pathname: '/',
                    params: { category: category.id === 0 ? '' : category.id }
                  })} />
              ))
            }
          </ScrollView>
        </View>

        {/* Products */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-primary">Products</Text>
            <TouchableOpacity onPress={() => router.push('/')}>
              <Text className="text-sm text-secondary">See all</Text>
            </TouchableOpacity>
          </View>

          {
            loading ?
              ActivityIndicator ? <ActivityIndicator size="large" color="#FF4C3B" /> : <Text>Loading...</Text> :
              products.length === 0 ?
                <Text className="text-secondary">No products available.</Text> :
                <View className="flex-row flex-wrap justify-between">
                  {
                    products.slice(0, 5).map((product) => (
                      <ProductCard key={`product-${product._id}`} product={product} />
                    ))
                  }
                </View>
          }

        </View>


        {/* Newsletter */}
        <View className="mb-6 bg-accent p-4 rounded-xl">
          <Text className="text-lg font-bold text-white mb-2">Subscribe to our Newsletter</Text>
          <Text className="text-sm text-white mb-4">Get the latest updates and offers.</Text>
          <TouchableOpacity className="bg-white px-4 py-2 rounded-full">
            <Text className="text-accent font-bold">Click to Subscribe</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}   