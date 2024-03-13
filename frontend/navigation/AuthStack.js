import { createStackNavigator } from '@react-navigation/stack';
import StartingPage from '../pages/auth/StartingPage';
import UserLoginPage from '../pages/auth/UserLoginPage';
import UserRegisterPage from '../pages/auth/UserRegisterPage';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="StartingPage" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StartingPage" component={StartingPage} />
      <Stack.Screen name="UserLoginPage" component={UserLoginPage} />
      <Stack.Screen name="UserRegisterPage" component={UserRegisterPage} />
    </Stack.Navigator>
  );
}