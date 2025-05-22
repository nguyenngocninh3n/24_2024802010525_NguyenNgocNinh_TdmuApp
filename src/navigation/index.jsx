import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import auth from '@react-native-firebase/auth'
import { useEffect, useState } from 'react'
// import ChattingScreen from '../screens/convenition/chatting'
import { actions, navigate, navigationRef, useCustomContext } from '../store'
import NewPost from '../screens/Post/NewPost'
import ProfileScreen from '../screens/Profile'
import DetailScreen from '../screens/convenition/Detail'
import FileViewing from '../screens/convenition/FileViewing'
import BackgroundConvention from '../screens/convenition/BackgroundConvention'
import AkaScreen from '../screens/convenition/AkaScreen'
import MemberScreen from '../screens/convenition/Member'
import SearchConventionScreen from '../screens/convenition/SearchConvention'
import ConvenitionScreen from '../screens/convenition/home'
import CreateGroup from '../screens/convenition/CreateGroup'
import ConventionName from '../screens/convenition/ConventionName'
import EditPost from '../screens/Post/EditPost'
// import FriendScreen from '../screens/Friend'
import BioScreen from '../screens/Profile/BioScreen'
import GroupScreen from '../screens/Group'
import NewGroupScreen from '../screens/Group/NewGroup'
import EditGroupScreen from '../screens/Group/EditGroup'
import GroupUserScreen from '../screens/Group/GroupUser'
import GroupIntroduceScreen from '../screens/Group/GroupIntroduce'
import GroupMemberScreen from '../screens/Group/GroupMember'
import GroupPendingScreen from '../screens/Group/GroupPending'
import GroupBlockingScreen from '../screens/Group/GroupBlocking'
import GroupImageScreen from '../screens/Group/GroupImage'
import SearchResultScreen from '../screens/Search/SearchResult'
const Stack = createNativeStackNavigator()

import notifee, { EventType } from '@notifee/react-native'
import { handleStartNotify } from '../notification/notifee'
import { ActivityIndicator, Linking } from 'react-native'
import { API } from '../api'
import { OPEN_SCREEN, TYPE_SCREEN } from '../utils/Constants'
import OwnerProfile from '../screens/Profile/Owner'
import UserProfile from '../screens/Profile/User'
import MeetingProviderScreen from '../screens/Meeting/MeetingProvider'
import AddMemberScreen from '../screens/convenition/AddMember'
import MiddleWareNavigationScreen from '../screens/MiddlewareNavigation'
import SinglePostScreen from '../screens/Post/SinglePost'
import SuggestFriendScreen from '../screens/Friend/Suggest'
import PendingFriendScreen from '../screens/Friend/Pending'
import ChattingSearchScreen from '../screens/convenition/chatting-search'
import CreatePollScreen from '../screens/convenition/Vote'
import ScheduleScreen from '../screens/Schedule'
import AcceptingFriendScreen from '../screens/Friend/Accepting'
import WebViewScreen from '../screens/WebViewScreen'
import ChatGPTScreen from '../screens/ChatGPT'
import DetailContainerScreen from '../screens/convenition/DetailContainer'
import HomeScreen from '../screens/home'
import ProfileImageScreen from '../screens/Profile/ImageScreen'
import ProfileVideoScreen from '../screens/Profile/VideoScreen'
import ListGroupScreen from '../screens/Group/ListGroup'
import SearchScreen from '../screens/Search'
import AsyncStorage from '@react-native-async-storage/async-storage'
import messaging from '@react-native-firebase/messaging'

import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { signOutWithGoogle } from '~/screens/auth/signinMethod'
import AuthNavigator from './AuthNavigator'
import HomeNavigator from './HomeNavigator'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, userAction } from '~/redux/slice/userSlice'
import Loading from './Loading'

async function requestUserPermission() {
  await messaging().requestPermission()
}

messaging().onMessage(async (remoteMessage) => {
  const conventionID = navigationRef.current.getCurrentRoute().params?.conventionID
  const checkA = !conventionID
  const checkB = conventionID !== remoteMessage.data.targetID
  if (checkA || checkB) {
    handleStartNotify(remoteMessage) //***** */
  }
})

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  handleStartNotify(remoteMessage)
})

notifee.onForegroundEvent(({ type, detail }) => {
  if (type === EventType.PRESS) {
    const notifyType = detail.notification.data?.type
    const notifyData = detail.notification.data
    if (notifyType === TYPE_SCREEN.PROFILE) {
      navigate('ProfileScreen')
    } else if (notifyType === TYPE_SCREEN.FRIEND) {
      navigate('ProfileScreen', { userID: detail.notification.data?.senderID })
    } else if (notifyType === TYPE_SCREEN.POST) {
      navigate('SinglePostScreen', { ownerID: notifyData.ownerID, postID: notifyData.targetID })
    } else if (notifyType === TYPE_SCREEN.CONVENTION) {
      navigate('ChattingScreen', { conventionID: detail.notification.data.targetID })
    } else if (notifyType === TYPE_SCREEN.CALL) {
      navigate('MeetingScreen', {
        ownerID: detail.notification.data?.ownerID,
        targetID: detail.notification.data?.targetID,
        meetingId: detail.notification.data?.meetingId,
        reply: true
      })
    } else {
      navigate('HomeScreen')
    }
  }
})

notifee.onBackgroundEvent(async ({ type, detail }) => {
  if (type === EventType.PRESS) {
    const receivedData = detail.notification.data
    const notifyType = receivedData?.type
    if (notifyType === TYPE_SCREEN.PROFILE) {
      Linking.openURL(OPEN_SCREEN.profile(receivedData.senderID))
    } else if (notifyType === TYPE_SCREEN.FRIEND) {
      Linking.openURL(OPEN_SCREEN.profile(receivedData.senderID))
    } else if (notifyType === TYPE_SCREEN.CONVENTION) {
      Linking.openURL(OPEN_SCREEN.convention(receivedData.targetID, receivedData.ownerID))
    } else if (notifyType === TYPE_SCREEN.CALL) {
      const targetID = receivedData?.targetID
      const ownerID = receivedData?.ownerID
      const meetingId = receivedData?.meetingId
      const customURL = `customview://call/${ownerID}/${targetID}/${meetingId}/true`
      Linking.openURL(customURL)
    } else {
      Linking.openURL(OPEN_SCREEN.home())
    }
  }
})

const linking = {
  prefixes: ['customview://'], // Tiền tố URL cho ứng dụng của bạn
  config: {
    // Định nghĩa các màn hình và đường dẫn của chúng
    screens: {
      auth: 'auth', // Đường dẫn cho màn hình xác thực
      main: {
        screens: {
          HomeScreen: 'home'
        }
      },

      // PROFILE
      ProfileScreen: 'profile/:userID', // Màn hình Profile với tham số userId

      //POST
      SinglePostScreen: 'post/:postID/:ownerID',

      // GROUP
      GroupScreen: 'group/:groupID',

      // CONVENTION
      MiddleWareNavigationScreen: 'convention/:conventionID/:ownerID/',

      //CALL
      MeetingScreen: 'call/:ownerID/:targetID/:meetingID/:reply'
    }
  }
}

const Navigation = () => {
  requestUserPermission()
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)
  const [isLoading, setIsLoading] = useState(true)

  const handleAuth = async () => {
    // await signOutWithGoogle().then(() => {
    //   AsyncStorage.removeItem('user')
    // })
    const storageUser = await AsyncStorage.getItem('user')
    const userInfo = JSON.parse(storageUser)
    if (userInfo) {
      const fcmToken = await messaging().getToken()
   console.log('userId; ', userInfo._id)
      const data = await API.loginAPI({ data: { _id: userInfo._id, fcmToken } })
      console.log('into data: ', data)
      dispatch(userAction.loginCurrentUser(data))
    }
    // await AsyncStorage.setItem('user', '123')
    // const value = await AsyncStorage.getItem('user')
    setIsLoading(false)
  }
  useEffect(() => {
    handleAuth()
  }, [])

  return (
    <NavigationContainer linking={linking} ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoading ? (
          <Stack.Screen name="loading" component={Loading} />
        ) : !user ? (
          <Stack.Screen name="auth" component={AuthNavigator} />
        ) : (
          <>
            <Stack.Screen name="home" component={HomeNavigator} />
            {/* PROFILE */}
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="OwnerProfileScreen" component={OwnerProfile} />
            <Stack.Screen name="UserProfileScreen" component={UserProfile} />
            {/* <Stack.Screen name="FriendScreen" component={FriendScreen} /> */}
            <Stack.Screen name="BioScreen" component={BioScreen} />
            <Stack.Screen name="ProfileImageScreen" component={ProfileImageScreen} />
            <Stack.Screen name="ProfileVideoScreen" component={ProfileVideoScreen} />
            {/* FRIEND */}
            <Stack.Screen name="SuggestFriendScreen" component={SuggestFriendScreen} />
            <Stack.Screen name="PendingFriendScreen" component={PendingFriendScreen} />
            <Stack.Screen name="AcceptingFriendScreen" component={AcceptingFriendScreen} />

            {/* SEARCH */}
            {/* <Stack.Screen name="SearchScreen" component={SearchResultScreen} /> */}

            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen name="SearchResultScreen" component={SearchResultScreen} />

            {/* GROUP */}
            <Stack.Screen name="GroupScreen" component={GroupScreen} />
            <Stack.Screen name="ListGroupScreen" component={ListGroupScreen} />
            <Stack.Screen name="NewGroupScreen" component={NewGroupScreen} />
            <Stack.Screen name="EditGroupScreen" component={EditGroupScreen} />
            <Stack.Screen name="GroupIntroduceScreen" component={GroupIntroduceScreen} />
            <Stack.Screen name="GroupUserScreen" component={GroupUserScreen} />
            <Stack.Screen name="GroupMemberScreen" component={GroupMemberScreen} />
            <Stack.Screen name="GroupPendingScreen" component={GroupPendingScreen} />
            <Stack.Screen name="GroupBlockingScreen" component={GroupBlockingScreen} />
            <Stack.Screen name="GroupImageScreen" component={GroupImageScreen} />
            {/* <Stack.Screen name="GroupVideoScreen" component={} /> */}

            {/* POST */}
            <Stack.Screen name="EditPostScreen" component={EditPost} />
            <Stack.Screen name="NewPostScreen" component={NewPost} />
            <Stack.Screen name="SinglePostScreen" component={SinglePostScreen} />

            {/* POLL */}
            <Stack.Screen name="CreatePollScreen" component={CreatePollScreen} />

            {/* SCHEDULE */}
            <Stack.Screen name="ScheduleScreen" component={ScheduleScreen} />

            {/* WEBVIEW */}
            <Stack.Screen name="WebViewScreen" component={WebViewScreen} />

            {/* ChatGPT Screen */}
            <Stack.Screen name="ChatGPTScreen" component={ChatGPTScreen} />

            {/* CONVENTION */}
            <Stack.Screen name="ConventionScreen" component={ConvenitionScreen} />
            <Stack.Screen name="ChattingScreen" component={ChattingSearchScreen} />
            {/* <Stack.Screen name="DetailScreen" component={DetailScreen} /> */}
            <Stack.Screen name="DetailContainerScreen" component={DetailContainerScreen} />
            <Stack.Screen name="FileViewingScreen" component={FileViewing} />
            <Stack.Screen name="MemberScreen" component={MemberScreen} />
            <Stack.Screen name="AkaScreen" component={AkaScreen} />
            <Stack.Screen name="ConventionNameScreen" component={ConventionName} />
            <Stack.Screen name="SearchConventionScreen" component={SearchConventionScreen} />
            <Stack.Screen name="BackgroundConventionScreen" component={BackgroundConvention} />
            <Stack.Screen name="CreateGroupScreen" component={CreateGroup} />
            <Stack.Screen name="MeetingScreen" component={MeetingProviderScreen} />
            <Stack.Screen name="AddMemberScreen" component={AddMemberScreen} />
            <Stack.Screen
              name="MiddleWareNavigationScreen"
              component={MiddleWareNavigationScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
