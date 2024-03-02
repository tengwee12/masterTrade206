import { createStackNavigator } from '@react-navigation/stack';
import StartingPage from '../pages/auth/StartingPage';
import AuthScreen from '../pages/auth/AuthScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="StartingPage" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StartingPage" component={StartingPage} />
      <Stack.Screen name="AuthScreen" component={AuthScreen} />
    </Stack.Navigator>
  );
}