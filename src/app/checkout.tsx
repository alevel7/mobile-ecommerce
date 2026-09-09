import React, { useEffect, useState } from 'react'
import { useCart } from '../../context/CartContext'
import { useRouter } from 'expo-router'
import { Address } from '../../constants/types'
import { dummyAddress } from '@/assets/assets'
import Toast from 'react-native-toast-message'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Header from '../../components/header'
import { Banknote, CircleCheck } from 'lucide-react-native'
import { COLORS } from '../../constants'

export default function Checkout() {

    const { cartTotal } = useCart()
    const router = useRouter()

    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'cash'>('cash');

    const [shipping, tax] = [2.0, 0.0]; // Shipping cost and tax cost

    const total = cartTotal + shipping + tax;

    const fetchAddress = async () => {

        const addresses = dummyAddress as Address[];

        if (addresses.length > 0) {
            const defaultAddress = addresses.find(address => address.isDefault) || addresses[0];
            if (defaultAddress) {
                setSelectedAddress(defaultAddress);
            }
        }
        setPageLoading(false);
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            Toast.show({
                type: 'error',
                text1: 'No Address Selected',
                text2: 'Please select a shipping address before placing the order.',
            });
            return;
        }

        if (paymentMethod === 'stripe') {
            // Handle Stripe payment logic here
            Toast.show({
                type: 'success',
                text1: 'Order Placed',
                text2: 'Stripe not implemented yet. This is a placeholder for the order confirmation.',
            });
        } else if (paymentMethod === 'cash') {
            // Handle cash on delivery logic here
        }
        // router.replace('/orders');
    }

    useEffect(() => {
        fetchAddress();
    }, []);


    if (pageLoading) {
        return (
            <SafeAreaView className='flex-1  justify-center items-center'>
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        )
    }


    return (
        <SafeAreaView className='flex-1'>
            <Header title='Checkout' showBack/>

            <ScrollView className='flex-1 px-4 mt-4'>
                <Text className="text-lg font-bold text-primary mb-4">Shipping Address</Text>
                {
                    selectedAddress !== null ? (
                        <View className='bg-white p-4 rounded-xl mb-6 shadow-lg'>
                            <View className='flex-row items-center justify-between mb-2'>
                                <Text className='text-base font-bold'>{selectedAddress.type}</Text>
                                <TouchableOpacity onPress={() => router.push('/') }>
                                    <Text className='text-accent text-sm'>Change</Text>
                                </TouchableOpacity>
                            </View>
                            <Text className='text-sm text-gray-600 leading-5 mb-1'>{selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state} {selectedAddress.zipCode}</Text>
                            {'\n'}
                            <Text className='text-sm text-gray-600 leading-3'>{selectedAddress.state} {selectedAddress.zipCode} {selectedAddress.country}</Text>
                        </View>
                    ) : (
                        <TouchableOpacity 
                        onPress={() => router.push('/')}
                        className="p-6 bg-white rounded-lg mb-4 items-center justify-center border-2 border-dashed border-gray-100">
                            <Text className="text-primary font-bold">Add address.</Text>
                        </TouchableOpacity>
                    )
                }

                {/* payment section */}
                <Text className="text-lg font-bold text-primary mb-4">Payment Method</Text>

                <TouchableOpacity 
                className={`bg-white p-4 rounded-xl mb-4 shadow-lg flex-row items-center border-2 ${
                    paymentMethod === 'cash' ? 'border-primary' : 'border-gray-200'
                }`}
                onPress={() => setPaymentMethod('cash')}>
                    <Banknote color={paymentMethod === 'cash' ? '#4F46E5' : '#9CA3AF'} size={24} />
                    <View className='ml-3 flex-1'>
                        <Text className='text-base font-bold text-primary'>Cash on Delivery</Text>
                        <Text className='text-secondary text-sm mt-1'>Pay when you recieve order</Text>
                    </View>
                    {
                        paymentMethod === 'cash' && (<CircleCheck  color='#000' size={24}/>)
                    }
                </TouchableOpacity>


                <TouchableOpacity
                    className={`bg-white p-4 rounded-xl mb-4 shadow-lg flex-row items-center border-2 ${paymentMethod === 'stripe' ? 'border-primary' : 'border-gray-200'
                        }`}
                    onPress={() => setPaymentMethod('stripe')}>
                    <Banknote color={paymentMethod === 'stripe' ? '#4F46E5' : '#9CA3AF'} size={24} />
                    <View className='ml-3 flex-1'>
                        <Text className='text-base font-bold text-primary'>Cash on Delivery</Text>
                        <Text className='text-secondary text-sm mt-1'>Pay when you recieve order</Text>
                    </View>
                    {
                        paymentMethod === 'stripe' && (<CircleCheck color='#000' size={24} />)
                    }
                </TouchableOpacity>
            </ScrollView>

            {/* order summary */}
            <View className="bg-white p-4 shadow-lg border-t border-gray-100">
                <Text className='text-lg font-bold text-primary mb-4'>Order Summary</Text>
                {/* sub total */}
                <View className='flex-row justify-between mb-2'>
                    <Text className='text-secondary'>SubTotal</Text>
                    <Text className='font-bold'>${cartTotal.toFixed(2)}</Text>
                </View>

                {/* shipping charges */}
                <View className='flex-row justify-between mb-2'>
                    <Text className='text-secondary'>Shipping Charges</Text>
                    <Text className='font-bold'>${shipping.toFixed(2)}</Text>
                </View>

                <View className='flex-row justify-between mb-2'>
                    <Text className='text-secondary'>Tax</Text>
                    <Text className='font-bold'>${tax.toFixed(2)}</Text>
                </View>

                <View className='flex-row justify-between mb-2'>
                    <Text className='text-primary text-lg font-bold'>Total</Text>
                    <Text className='text-primary text-lg font-bold'>${total.toFixed(2)}</Text>
                </View>

                {/* place order button */}
                <TouchableOpacity
                    className={`p-4 rounded-lg mt-4 items-center justify-center ${loading ? 'bg-gray-400' : 'bg-primary'}`}
                    onPress={handlePlaceOrder}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="large" color="#fff" />
                    ) : (
                        <Text className='text-white font-bold text-lg'>Place Order</Text>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
