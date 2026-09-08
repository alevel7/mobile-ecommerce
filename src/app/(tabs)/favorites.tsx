import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/header";
import { useWishlist } from "../../../context/WishListContext";
import { useRouter } from "expo-router";
import { useCart } from "../../../context/CartContext";
import FavoriteItem from "../../../components/FavoriteItem";

export default function Favorites() {

  const { wishlist, toggleWishlist } = useWishlist();
  const { toggleCartlist, isInCartlist } = useCart();

  const router = useRouter();

  return (
    <SafeAreaView className="flex-1" edges={['top']}>
      <Header showBack title="My Favorites" />

      {
        wishlist.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-lg text-gray-500">Your cart is empty.</Text>
            <TouchableOpacity onPress={() => router.push('/shop')} className="mt-4 bg-primary py-2 px-4 rounded-lg">
              <Text className="text-white text-center">Go Shopping</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
            {wishlist.map((item) => (
              <FavoriteItem
                item={item} key={item._id}
                toggleCartlist={(size) => toggleCartlist(item, size)}
                isInCartlist={() => isInCartlist(item._id)} 
                toggleWishlist={() => toggleWishlist(item)}
                />
            ))}
          </ScrollView>
        )
      }
    </SafeAreaView>
  );
}   