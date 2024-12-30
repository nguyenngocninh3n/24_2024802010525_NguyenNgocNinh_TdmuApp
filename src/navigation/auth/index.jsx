import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../../screens/auth'

const Stack = createNativeStackNavigator()
const AuthNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  )
}

export default AuthNavigation
