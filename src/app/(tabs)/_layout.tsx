import { Tabs } from "expo-router";
import { House } from 'lucide-react-native';
import { ShoppingCart } from 'lucide-react-native';
import { Heart } from 'lucide-react-native';
import { User } from 'lucide-react-native';
import { COLORS } from "../../../constants";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
        headerShown:false, 
        tabBarActiveTintColor: COLORS.primary, 
        tabBarShowLabel:false,
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarStyle:{
            backgroundColor:'#fff', 
            borderTopWidth:1, 
            // height:56, 
            paddingBottom:5, 
            paddingTop:8,
            borderTopColor:'#e5e5e5'
        }
    }}>
        <Tabs.Screen name="index" options={{
            tabBarIcon: ({color, focused}) => {
                return <House color={focused ? color : "gray"} size={26}/>
            }
        }}/>
          <Tabs.Screen name="favorites" options={{
              tabBarIcon: ({ color, focused }) => {
                  return <Heart color={focused ? color : "gray"} size={26} />
              }
          }} />
          <Tabs.Screen name="cart" options={{
              tabBarIcon: ({ color, focused }) => {
                  return <ShoppingCart color={focused ? color : "gray"} size={26} />
              }
          }} />
          <Tabs.Screen name="profile" options={{
              tabBarIcon: ({ color, focused }) => {
                  return <User color={focused ? color : "gray"} size={26} />
              }
          }} />
    </Tabs>
  );
}   