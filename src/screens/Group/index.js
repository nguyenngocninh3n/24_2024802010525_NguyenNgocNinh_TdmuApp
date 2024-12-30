import { ScrollView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API } from '../../api'
import { RESPONSE_STATUS } from '../../utils/Constants'

import DrawerModal from '../../modals/DrawerModal'
import BodyGroup from './components/BodyGroup'
import HeaderGroup from './components/HeaderGroup'
import FlatListPostGroup from '../../components/FlatListPostGroup'
import { useCustomContext } from '../../store'
import GoBackComponent from '../../components/GoBackComponent'
import SearchComponent from '../../components/SearchComponent'

const GroupScreen = ({ navigation, route }) => {
  const [group, setGroup] = useState({})
  const [modalVisible, setModalVisibal] = useState(false)
  const [state, dispatch] = useCustomContext()
  const { groupID } = route.params
  console.log('Group re -render')

  useEffect(() => {
    API.getGroupByIDAPI(groupID).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        console.log('response get group by id: ', response)
        setGroup(response.data)
      }
    })
  }, [])

  const handleOpenDrawerModal = () => setModalVisibal(true)
  const handleCloseDrawerModal = () => setModalVisibal(false)

  return (
    <FlatListPostGroup groupID={groupID} ownerID={state._id}>
      <View style={{ backgroundColor: '#fff' }}>
        <GoBackComponent  />
        <HeaderGroup group={group} onShowModal={handleOpenDrawerModal} />
        <BodyGroup group={group} groupID={groupID} />
        <DrawerModal
          modalVisible={modalVisible}
          onClose={handleCloseDrawerModal}
          group={group}
          groupID={groupID}
          navigation={navigation}
        />
      </View>
    </FlatListPostGroup>
  )
}

export default GroupScreen
