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
            case '工作':
              iconName = focused ? 'briefcase' : 'briefcase-outline'
              break
            case '对话':
              iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline'
              break
            case '时间表':
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
      <Tab.Screen name="对话" component={ChatStack} />
      <Tab.Screen name="工作" component={PlumberJobStack} />
      <Tab.Screen name="时间表" component={PlumberScheduleStack} />
    </Tab.Navigator>
  );
}