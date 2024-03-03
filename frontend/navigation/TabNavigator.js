import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatScreen from "../pages/chat/ChatPage";
import ReviewScreen from "../pages/review/ReviewPage";
import HomePage from "../pages/HomePage";
import { Ionicons } from '@expo/vector-icons';
import PostStack from "./PostStack";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline'
              break
            case 'Chat':
              iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline'
              break
            case 'Post':
              iconName = focused ? 'create' : 'create-outline'
              break
          } 

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#7c15ff",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Review" component={ReviewScreen} />
      <Tab.Screen name="PostStack" component={PostStack} />
    </Tab.Navigator>
  );
}
