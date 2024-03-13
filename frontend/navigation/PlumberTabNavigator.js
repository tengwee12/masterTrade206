import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import PlumberChats from "../pages/chat/PlumberChats";

const Tab = createBottomTabNavigator();

export default function PlumberTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="PlumberChats"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
          } 

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#7c15ff",
        tabBarInactiveTintColor: "gray",
        headerShown: false
      })}
    >
      <Tab.Screen name="PlumberChats" component={PlumberChats} />
    </Tab.Navigator>
  );
}