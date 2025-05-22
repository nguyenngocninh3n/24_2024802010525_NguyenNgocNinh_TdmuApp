import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import SpaceComponent from '../../../components/SpaceComponent'
import RowComponent from '../../../components/RowComponent'
import { OpacityButtton } from '../../../components/ButtonComponent'
import { SCOPE } from '../../../utils/Constants'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import { navigationRef } from '../../../store'
import { API } from '../../../api'

const groupScope = {
  [SCOPE.PUBLIC]: 'Nhóm công khai',
  [SCOPE.PRIVATE]: 'Nhóm riêng tư'
}

const HeaderGroup = ({ group, onShowModal }) => {
  return (
    <View>
      <ImageBackground
        style={{ width: '100%', height: 250, position: 'relative' }}
        source={{ uri: API.getFileUrl(group.avatar) }}
      />
      <View style={{ marginHorizontal: 12 }}>
        <SpaceComponent height={8} />
        <Text style={{ fontSize: 24 }}>{group.name}</Text>
        <SpaceComponent height={16} />
        <Text>{group.bio}</Text>
        <SpaceComponent height={16} />
        <RowComponent>
          {group.scope === SCOPE.PUBLIC ? (
            <Ionicons name="earth" size={22} />
          ) : (
            <Entypo name="lock" size={22} />
          )}
          <SpaceComponent width={8} />
          <Text style={{ fontSize: 15 }}>{groupScope[group.scope]}</Text>
          <SpaceComponent width={32} />
          <Text>{group.memberLength} thành viên</Text>
          <OpacityButtton left style={{ flex: 1 }} onPress={onShowModal}>
            <Ionicons name="settings-outline" style={{ textAlign: 'right' }} size={22} />
          </OpacityButtton>
          <SpaceComponent width={8} />
        </RowComponent>
      </View>
    </View>
  )
}

export default HeaderGroup
