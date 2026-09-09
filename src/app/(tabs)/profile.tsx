import { dummyUser } from "@/assets/assets";
import { useRouter } from "expo-router";
import Header from "../../../components/header";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, } from "react-native-gesture-handler";
import { UserRound } from 'lucide-react-native';
import { PROFILE_MENU } from "../../../constants";
import { ScrollText, MapPin, Star, Settings, ChevronRight } from 'lucide-react-native';

export default function Profile() {

  const router = useRouter();

  const { user } = { user: dummyUser }; // Replace with actual user data from context or props


  const handleLogout = async() => {
    // Implement logout logic here
    console.log("User logged out");
    router.replace('/');
  }
  return (
    <SafeAreaView className="flex-1 bg-gray-100" edges={['top']}>
      <Header title="Profile" />
      <ScrollView className="flex-1 px-4" contentContainerStyle={
        !user ? { flex: 1, justifyContent: 'center', alignItems: 'center' } : { paddingTop: 20 }
      }>
        {
          !user ?
            (
              <View className="items-center w-full">
                <View className="w-24 h-24 bg-gray-200 rounded-full items-center justify-center mb-4">
                  <UserRound size={40} color={'#9CA3AF'} className="w-full h-full" />
                </View>
                <Text>Guest User</Text>
                <Text>log in to view your profile, orders and addresses</Text>
                <TouchableOpacity onPress={() => router.push('/')} className="mt-4 bg-primary py-2 px-4 rounded-lg shadow-lg">
                  <Text className="text-white">Login /Sign up</Text>
                </TouchableOpacity>
              </View>
            )
            :
            (
              <>
                <View className="items-center mb-8">

                  <View className="mb-3">
                    <Image source={{ uri: user.imageUrl }} className="w-24 h-24 border-2 border-white shadow-sm rounded-full" />
                  </View>

                  <Text className="text-lg font-semibold">{user.name}</Text>
                  <Text className="text-sm">{user.email}</Text>

                  {/* Admin panel button if user is admin */}

                  {user.publicMetadata.role === 'admin' && (
                    <TouchableOpacity onPress={() => router.push('/admin')} className="mt-4 bg-primary py-2 px-4 rounded-full shadow-lg">
                      <Text className="text-white">Admin Panel</Text>
                    </TouchableOpacity>
                  )}

                </View>

                <View className="bg-white rounded-xl border border-gray-100/75 p-2 mb-4">
                  {
                    PROFILE_MENU.map((item, index) => (
                      <TouchableOpacity key={index} onPress={() => router.push(item.route as any)}
                        className={`flex-row items-center justify-between p-4 ${index !== PROFILE_MENU.length - 1 ? 'border-b border-gray-100' : ''}`} >
                        <View className="flex-row items-center justify-center mr-4 gap-2">
                          {generateIcon(item.icon, 24)}
                          <Text className="">{item.title}</Text>
                        </View>

                        {generateIcon('chevron-right', 24)}
                      </TouchableOpacity>
                    ))
                  }
                </View>


                <TouchableOpacity onPress={handleLogout} className="flex-row items-center justify-center p-4">
                  <Text className="text-red-500 font-bold ml-2">Log Out</Text>
                </TouchableOpacity>
              </>
            )}
      </ScrollView>
    </SafeAreaView>
  );
}


const generateIcon = (iconName: string, size: number) => {
  switch (iconName) {
    case 'orders':
      return <ScrollText size={size} />;
    case 'location':
      return <MapPin size={size} />;
    case 'review':
      return <Star size={size} />;
    case 'settings':
      return <Settings size={size} />;
    case 'chevron-right':
      return <ChevronRight size={size} />;
    default:
      return null;
  }
}