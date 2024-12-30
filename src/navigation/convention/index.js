import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FlatListConvention from '../../screens/convenition/FlatListConvention'
import FlatListFriend from '../../screens/convenition/FlatListFriend'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Tab = createBottomTabNavigator()
const ConventionNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerTitle: null, headerShown: false, tabBarShowLabel: false }}
    >
      <Tab.Screen
        options={{
          tabBarActiveTintColor: '#005AFF',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="chatbubbles" color={color ?? '#fff'} size={size ?? 24} />
          )
        }}
        name="FlatListConventionScreen"
        component={FlatListConvention}
      />
      <Tab.Screen
        options={{
          tabBarActiveTintColor: '#005AFF',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="people-sharp" color={color ?? '#fff'} size={size ?? 24} />
          )
        }}
        name="FlatListFriendScreen"
        component={FlatListFriend}
      />
    </Tab.Navigator>
  )
}

export default ConventionNavigator
