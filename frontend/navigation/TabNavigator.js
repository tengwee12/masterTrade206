import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatScreen from "../pages/chat/ChatPage";
import { Ionicons } from '@expo/vector-icons';
import PostStack from "./PostStack";
import HomeStack from "./HomeStack";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'HomeStack':
              iconName = focused ? 'home' : 'home-outline'
              break
            case 'Chat':
              iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline'
              break
            case 'PostStack':
              iconName = focused ? 'create' : 'create-outline'
              break
          } 

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#7c15ff",
        tabBarInactiveTintColor: "gray",
        headerShown: false
      })}
    >
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="PostStack" component={PostStack} />
    </Tab.Navigator>
  );
}
