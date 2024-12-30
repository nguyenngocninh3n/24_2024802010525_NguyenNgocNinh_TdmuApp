import { useEffect } from 'react'
import { useCustomContext } from '../../store'
import { API } from '../../api'
import auth from '@react-native-firebase/auth'
import OwnerProfile from './Owner'
import UserProfile from './User'
const ProfileScreen = ({ navigation, route }) => {
  console.log('route params in profile screen: ', route.params?.userID)
  const userID = route?.params?.userID
  const [state, dispatch] = useCustomContext()
  const ownerID = state?._id ?? auth().currentUser.uid
  const isOwnerProfile = !userID || ownerID === userID || userID === 'undefined'

  return isOwnerProfile ? (
    <OwnerProfile navigation={navigation} />
  ) : (
    <UserProfile navigation={navigation} ownerID={ownerID} userID={userID} />
  )
}

export default ProfileScreen
