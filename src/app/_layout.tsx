import { Stack } from "expo-router";
import "@/styles/global.css";
import { WishListProvider } from "../../context/WishListContext";
import { CartProvider } from "../../context/CartContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { ClerkProvider } from '@clerk/expo'
import { tokenCache } from '@clerk/expo/token-cache'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <CartProvider>
          <WishListProvider>
            <Stack screenOptions={{ headerShown: false }} />
            <Toast />
          </WishListProvider>
        </CartProvider>
      </GestureHandlerRootView>
    </ClerkProvider>
  )
}
