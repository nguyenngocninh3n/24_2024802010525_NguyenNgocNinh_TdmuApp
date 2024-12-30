import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useCustomContext } from '../../store'
import { API } from '../../api'
import { RESPONSE_STATUS } from '../../utils/Constants'
import RowComponent from '../../components/RowComponent'
import AvatarComponent from '../../components/AvatarComponent'
import SpaceComponent from '../../components/SpaceComponent'

const NotificationItem = ({item}) => {
  console.log('item receive: ', item)
  return (
    <RowComponent style={{padding:8,backgroundColor:'#00f3'}}>
      <AvatarComponent size={48} source={API.getFileUrl(item.senderAvatar)} />
      <SpaceComponent width={4} />
      <Text style={{fontSize:17 }}>{item.message}</Text>
    </RowComponent>
  )
}

const NotificationScreen = () => {
  const [state, dispatch] = useCustomContext()
  const [notificationData, setNotificationData] = useState([])

  useEffect(() => {
    API.getNotification(state._id).then((response) => {
      console.log('notification data: ', response)
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        setNotificationData(response.data)
      }
    })
  }, [])

  return (
    <View style={{ flex: 1}}>
      <Text style={{textAlign:'center', fontWeight:'bold', fontSize:20}}>Thông báo</Text>
      <SpaceComponent height={16} />
      {notificationData.length === 0 && (
        <Text
          style={{
            fontWeight: '900',
            fontSize: 20,
            textTransform: 'capitalize',
            textAlign: 'center',
            marginTop: '50%',
            color: '#3336'
          }}
        >
          Bạn chưa có thông báo nào
        </Text>
      )}
      <FlatList
        style={{ flex: 1 }}
        data={notificationData}
        key={(item) => item._id}
        ItemSeparatorComponent={<SpaceComponent height={4} />}
        renderItem={({item}) => <NotificationItem item={item} />}
      />
    </View>
  )
}

export default NotificationScreen
