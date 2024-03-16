import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatStack from "./ChatStack";
import { Ionicons } from '@expo/vector-icons';
import PostStack from "./PostStack";
import HomeStack from "./HomeStack";

const Tab = createBottomTabNavigator();

export default function UserTabNavigator() {
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
            case 'ChatStack':
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
      <Tab.Screen name="ChatStack" component={ChatStack} />
      <Tab.Screen name="PostStack" component={PostStack} />
    </Tab.Navigator>
  );
}
