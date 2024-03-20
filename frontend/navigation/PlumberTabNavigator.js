import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import ChatStack from "./ChatStack";
import PlumberJobStack from "./PlumberJobStack";
import PlumberScheduleStack from "./PlumberScheduleStack";

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
            case 'Schedule':
              iconName = focused ? 'time' : 'time-outline'
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
      <Tab.Screen name="Chats" component={ChatStack} />
      <Tab.Screen name="Jobs" component={PlumberJobStack} />
      <Tab.Screen name="Schedule" component={PlumberScheduleStack} />
    </Tab.Navigator>
  );
}