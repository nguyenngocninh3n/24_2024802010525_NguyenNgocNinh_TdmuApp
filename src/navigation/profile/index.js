import React from 'react'
import IntroduceScreen from '../../screens/Profile/IntroduceScreen'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import FriendScreen from '../../screens/Friend'

const Tab = createMaterialTopTabNavigator()

function ProfileTopTabNavigator({ userID, children }) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="IntroduceScreen" component={IntroduceScreen} />
      <Tab.Screen name="FriendScreen" component={FriendScreen} initialParams={{ userID }} />
    </Tab.Navigator>
  )
}

export default ProfileTopTabNavigator
