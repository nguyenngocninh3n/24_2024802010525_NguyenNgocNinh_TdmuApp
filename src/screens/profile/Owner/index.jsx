/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, ScrollView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Colors from '../../../utils/Colors'
import OwnerBar from '../Components/OwnerBar'

import ProfileBody from '../Components/ProfileBody'
import { useCustomContext } from '../../../store'
import FlatListPost from '../../../components/FlatListPost'
import { API } from '../../../api'
import SocketClient from '../../../socket'

const OwnerProfile = ({ navigation, route }) => {
  const [state, dispatch] = useCustomContext()
  const [user, setUser] = useState()
  useEffect(() => {
    if (state?.avatar) {
      console.log('avatar: ', state.avatar)
    }
    API.getUserByIdAPI({ uid: state._id }).then((response) => {
      setUser(response)
    })
  }, [])



  useEffect(() => {
    SocketClient.socket.on('emitBioProfileChange', (data) => {
      console.log('emitBio: ', data)
      setUser((pre) => {
        const customUser = { ...pre, bio: data.bio }
        return customUser
      })
    })

    SocketClient.socket.on('emitAvatarProfileChange', (data) => {
      console.log('emit avatar changed: ')
      setUser((pre) => {
        const customUser = { ...pre }
        customUser.avatar = data.avatar
        return customUser
      })
    })

    SocketClient.socket.on('emitBackgroundProfileChange', (data) => {
      console.log('emit background changed: ')
      setUser((pre) => {
        const customUser = { ...pre, background: data.background }
        return customUser
      })
    })
  }, [])

  return (
    <View>
      {user && (
        <FlatListPost ownerID={user._id} userID={user._id}>
          <View>
            <Header user={user} ownerID={user._id} navigation={navigation}>
              {/* <OwnerBar /> */}
            </Header>
            <ProfileBody navigation={navigation} ownerID={user._id} userID={user._id} avatar={user.avatar} />
          </View>
        </FlatListPost>
      )}
    </View>
  )
}

export default OwnerProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },

  postContainer: {
    backgroundColor: Colors.white,
    height: 500
  },
  postImg: {
    width: '100%',
    height: 200,
    paddingLeft: 200,
    paddingRight: 200
  }
})
