import { View, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalStyle from '../../../assets/css/GlobalStyle'
import Header from '../Components/Header'
import UserBar from '../Components/UserBar'
import Colors from '../../../utils/Colors'
import { API } from '../../../api'
import FlatListPost from '../../../components/FlatListPost'
import ProfileBody from '../Components/ProfileBody'
const UserProfile = ({ navigation, ownerID, userID }) => {
  const [user, setUser] = useState({})
  const getUser = async () => {
    const data = await API.getUserByIdAPI({ uid: userID })
    if (data) {
      setUser(data)
    }
  }
  useEffect(() => {
    getUser()
  }, [userID])

  return (
    <View>
      <FlatListPost ownerID={ownerID} userID={userID}>
        <View>
          <Header user={user} ownerID={ownerID} navigation={navigation}>
            <UserBar navigation={navigation} ownerID={ownerID} userID={userID} />
          </Header>
          <ProfileBody navigation={navigation} ownerID={ownerID} userID={userID} />
        </View>
      </FlatListPost>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },

  postContainer: {
    backgroundColor: Colors.white
  },
  postImg: {
    width: '100%',
    height: 200,
    paddingLeft: 200,
    paddingRight: 200
  }
})

export default UserProfile