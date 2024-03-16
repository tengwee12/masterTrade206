import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import PlumberChatsPage from "../pages/chat/PlumberChatsPage";
import PlumberJobStack from "./PlumberJobStack";


const Tab = createBottomTabNavigator();

export default function PlumberTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="PlumberPosts"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Jobs':
              iconName = focused ? 'briefcase' : 'briefcase-outline'
              break
            case 'Chats':
              iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline'
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
      <Tab.Screen name="Chats" component={PlumberChatsPage} />
      <Tab.Screen name="Jobs" component={PlumberJobStack} />
    </Tab.Navigator>
  );
}