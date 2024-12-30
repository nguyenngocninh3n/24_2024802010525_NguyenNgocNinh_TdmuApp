import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useCustomContext } from '../../../../store'
import AvatarComponent from '../../../../components/AvatarComponent'
import ColumnComponent from '../../../../components/ColumnComponent'
import RowComponent from '../../../../components/RowComponent'
import GlobalStyle from '../../../../assets/css/GlobalStyle'
import { API } from '../../../../api'
import SpaceComponent from '../../../../components/SpaceComponent'
import { OpacityButtton } from '../../../../components/ButtonComponent'
import AvatarProfileModal from '../../../../modals/AvatarProfileModal'
import GoBackComponent from '../../../../components/GoBackComponent'
import SocketClient from '../../../../socket'

const BoxInfor = ({ title, value }) => {
  return (
    <ColumnComponent style={styles.userInfoItem}>
      <Text style={styles.userInfoTitle}>{value}</Text>
      <Text style={styles.userInfoSubTitle}>{title}</Text>
    </ColumnComponent>
  )
}
const Header = ({ navigation, children, user, ownerID }) => {
  const isOwner = user._id === ownerID
  console.log('isOwner: ', isOwner)
  const handleUpdateBio = () => {
    navigation.navigate('BioScreen', { user })
  }

  const [modelVisible, setModalVisible] = useState(false)
  const onCloseModal = () => setModalVisible(false)
  const onShowModal = () => setModalVisible(true)


  return (
    <View>
      {!isOwner && <GoBackComponent marginLeft={4} />}
      <View style={styles.backgroundContainer}>
        {user._id === ownerID && (
          <OpacityButtton style={styles.backgroundText} title={'Thêm ảnh bìa'} />
        )}
      </View>

      {/* AVATAR AND NAME */}
      <View style={styles.container}>
        <AvatarComponent
          onPress={onShowModal}
          source={API.getFileUrl(user.avatar)}
          style={styles.userImg}
        />
        <Text style={styles.userName}>{user.userName}</Text>
      </View>
      {/* BAR */}
      <OpacityButtton
        title={isOwner ? user.bio || 'Thêm tiểu sử...' : user.bio || ''}
        onPress={isOwner ? handleUpdateBio : null}
      />
      {children}
      <AvatarProfileModal
        ownerID={ownerID}
        userID={user._id}
        avatar={user.avatar}
        onClose={onCloseModal}
        modalVisible={modelVisible}
      />
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  backgroundContainer: {
    position: 'relative',
    height: 250,
    backgroundColor: '#eee8'
  },
  backgroundText: {
    position: 'absolute',
    borderWidth:1,
    borderColor:'#00ffff',
    borderRadius:25,
    right: 8,
    top: 8,
    paddingVertical:4,
    paddingHorizontal:8
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    position: 'absolute',
    // flexDirection:'column-reverse',
    top: '10%',
    left: '20%',
    right: '20%'
  },
  userImg: {
    marginTop: 48,
    height: 120,
    width: 120
  },
  userName: {
    fontSize: 22,
    fontWeight: '400',
    color: '#0f5fff',
    marginTop: 10,
    marginBottom: 10
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10
  },

  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10
  },
  userInfoItem: {
    justifyContent: 'center'
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center'
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center'
  }
})
