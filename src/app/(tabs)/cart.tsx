import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useCart } from "../../../context/CartContext";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/header";
import { ScrollView } from "react-native-gesture-handler";
import CartItem from "../../../components/CartItem";

export default function Cart() {

  const { cartItems, removeFromCart, cartTotal, updateCartItemQuantity } = useCart();
  const router = useRouter();


  return (
    <SafeAreaView className="flex-1" edges={['top']}>
      <Header showBack title="My Cart" />

      {
        cartItems.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-lg text-gray-500">Your cart is empty.</Text>
            <TouchableOpacity onPress={() => router.push('/shop')} className="mt-4 bg-primary py-2 px-4 rounded-lg">
              <Text className="text-white text-center">Go Shopping</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
            {cartItems.map((item) => (
              <CartItem 
              item={item} key={item.id} 
              onRemove={() => removeFromCart(item.id)} 
              onUpdateQuantity={(quantity) => updateCartItemQuantity(item.id, quantity)}/>
            ))}
            <View className="mt-4 p-4 bg-white rounded-lg shadow">
              <Text className="text-lg font-semibold">Total: ${cartTotal.toFixed(2)}</Text>
              <TouchableOpacity onPress={() => router.push('/checkout')} className="mt-2 bg-primary py-2 px-4 rounded-lg">
                <Text className="text-white text-center">Proceed to Checkout</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )
      }
    </SafeAreaView>
  );
}   