import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import RowComponent from '../../components/RowComponent'
import SpaceComponent from '../../components/SpaceComponent'
import { WEBSITE } from '../../utils/Constants'
import { OpacityButtton } from '../../components/ButtonComponent'
import { navigate, useCustomContext } from '../../store'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Octicons from 'react-native-vector-icons/Octicons'
import Entypo from 'react-native-vector-icons/Entypo'
import { signOutWithGoogle } from '../auth/signinMethod'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, userAsyncAction } from '~/redux/slice/userSlice'

const ExtensionScreen = ({ navigation }) => {
  const state = useSelector(selectCurrentUser)

  const handleToDkmh = () =>
    navigate('WebViewScreen', { uri: WEBSITE.DKMH, title: 'Trang Đăng ký môn học' })
  const handleToElearning = () =>
    navigate('WebViewScreen', { uri: WEBSITE.ELEARNING, title: 'Trang ELEARNING' })
  const handleToCtss = () =>
    navigate('WebViewScreen', { uri: WEBSITE.CTSS, title: 'Trang kỹ năng' })
  const handleToFlc = () =>
    navigate('WebViewScreen', { uri: WEBSITE.CTSS, title: 'Trang ngoại ngữ' })
  const handleToProfile = () => navigate('ProfileScreen', { userID: state._id, ownerID: state._id })
  const handleToNewPost = () => navigate('NewPostScreen')
  const handleToChatGPT = () => navigate('ChatGPTScreen')
  const handleToListFriend = () => navigate('ListFriendScreen')
  const handleToListGroup = () => navigate('ListGroupScreen', { userID: state._id })
  const dispatch = useDispatch()
  const handleSignOut = () => {
    dispatch(userAsyncAction.logout())
  }
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <SpaceComponent height={24} />
        <RowComponent style={styles.rowContainer}>
          <CustomBottom title={'Đăng ký môn học'} onPress={handleToDkmh} />
          <CustomBottom title={'Elearning'} onPress={handleToElearning} />

          <CustomBottom title={'Trung tâm ngoại ngữ'} onPress={handleToFlc} />
        </RowComponent>
        <SpaceComponent height={16} />
        <RowComponent style={styles.rowContainer}>
          <CustomBottom title={'Bạn bè'} onPress={handleToListFriend}>
            <Ionicons name="people-outline" size={24} />
          </CustomBottom>

          <CustomBottom title={'Nhóm'} onPress={handleToListGroup}>
            <MaterialCommunityIcons name="account-group-outline" size={24} />
          </CustomBottom>

          <CustomBottom title={'Kỹ năng'} onPress={handleToCtss} />
        </RowComponent>
        <SpaceComponent height={16} />
        <RowComponent style={styles.rowContainer}>
          <CustomBottom title={'Chat bot'} onPress={handleToChatGPT}>
            <Octicons name="dependabot" size={28} />
          </CustomBottom>

          <CustomBottom title={'Trang cá nhân'} onPress={handleToProfile}>
            <Ionicons name="person-circle-outline" size={28} />
          </CustomBottom>

          <CustomBottom title={'Đăng bài'} onPress={handleToNewPost}>
            <Entypo name="new-message" size={24} />
          </CustomBottom>
        </RowComponent>
      </View>
      <OpacityButtton
        textSize={18}
        textColor={'#fff'}
        style={styles.signOutBtn}
        onPress={handleSignOut}
        title={'Đăng xuất'}
      />
    </View>
  )
}

const CustomBottom = ({ title, onPress, children }) => {
  return (
    <OpacityButtton onPress={onPress}>
      <View style={styles.itemContainer}>
        <Text style={{ textAlign: 'center', color: '#333', fontSize: 16 }}>{title}</Text>
        <SpaceComponent height={4} />
        {children}
      </View>
    </OpacityButtton>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  rowContainer: {
    // flex: 1
    justifyContent: 'space-around'
  },
  itemContainer: {
    width: 100,
    height: 100,
    padding: 2,
    backgroundColor: '#eed9',
    borderWidth: 1,
    borderColor: '#ccc',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signOutBtn: {
    padding: 8,
    backgroundColor: '#23e'
  }
})

export default ExtensionScreen
