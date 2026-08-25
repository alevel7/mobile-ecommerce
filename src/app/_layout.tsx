import { Stack } from "expo-router";
import "@/styles/global.css";
import { WishListProvider } from "../../context/WishListContext";
import { CartProvider } from "../../context/CartContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CartProvider>
        <WishListProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </WishListProvider>
      </CartProvider>
    </GestureHandlerRootView>
  )
}
