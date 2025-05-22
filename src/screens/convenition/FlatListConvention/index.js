import { FlatList, ToastAndroid, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ShortChatingComponent from './ShortChatComponent'
import { useCustomContext } from '../../../store'
import { API } from '../../../api'
import SpaceComponent from '../../../components/SpaceComponent'
import { useFocusEffect } from '@react-navigation/native'
import FlatlistConventionModal from '../../../modals/FlatlistConventionModal'
import PauseNotifyModal from '../../../modals/PauseNotifyModal/index.js'
import { NOTIFY_CONVENTION_STATUS, RESPONSE_STATUS } from '../../../utils/Constants.js'
import { helper } from '../../../utils/helpers/index.js'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/slice/userSlice'

const FlatListConvention = ({ navigation }) => {
  const state = useSelector(selectCurrentUser)

  const [conventions, setConventions] = useState([])

  useFocusEffect(
    useCallback(() => {
      API.getOwnerConventions(state._id).then((data) => {
        data.length && setConventions(data ?? [])
      })
    }, [])
  )

  useEffect(() => {
    API.getOwnerConventions(state._id).then((data) => {
      data.length && setConventions(data ?? [])
    })
  }, [])

  const [modalVisible, setModalVisible] = useState(false)
  const handleCloseModal = () => setModalVisible(false)
  const handleOpenModal = () => setModalVisible(true)
  const [selectConvention, setSelectConvention] = useState()
  const handleSelectItem = (value) => {
    setSelectConvention(value)
    handleOpenModal()
  }

  const [pauseNotifyVisible, setPauseNotifyVisible] = useState(false)
  const openPauseNotifyModal = () => {
    setPauseNotifyVisible(true)
    handleCloseModal()
  }
  const closePauseNotifyModal = () => {
    setPauseNotifyVisible(false)
  }

  const handleSubmitPauseNotify = (data) => {
    API.updateNotifyConventionStatus(selectConvention._id, state._id, data.status, data.upto).then(response => {
      if(response.status === RESPONSE_STATUS.SUCCESS) {
        const newDate = new Date(data.upto)
        const customTime =  newDate.getHours() + ' : ' + newDate.getMinutes()
        const customMessage =  data.status === NOTIFY_CONVENTION_STATUS.CUSTOM ? customTime : ' khi bạn bật lại'
        ToastAndroid.show('Thông báo sẽ được tắt cho đến: ' + customMessage, ToastAndroid.SHORT )
        closePauseNotifyModal()
      } else {
        ToastAndroid.show('Lỗi xảy ra: ', ToastAndroid.SHORT)
        closePauseNotifyModal()
      }
    })
  }

  const handleExitGroup = async (conventionID, ownerID) => {
    await API.logoutGroupAPI(conventionID, ownerID).then(data => {
      handleCloseModal()
      setConventions(pre => {
        const custom = pre.filter(item => item._id !== conventionID)
        return custom
      })
    })
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 16, backgroundColor: '#fff' }}>
      <FlatList
        style={{ flexDirection: 'column', flex: 1 }}
        data={conventions}
        ItemSeparatorComponent={<SpaceComponent height={16} />}
        renderItem={({ item, index }) => (
          <ShortChatingComponent
            onLongPress={handleSelectItem}
            convention={item}
            navigation={navigation}
            ownerID={state._id}
          />
        )}
      />
      <FlatlistConventionModal
        convention={selectConvention}
        modalVisible={modalVisible}
        ownerID={state._id}
        onClose={handleCloseModal}
        onPause={openPauseNotifyModal}
        onExitGroup={handleExitGroup}
      />

      <PauseNotifyModal onSubmit={handleSubmitPauseNotify} onClose={closePauseNotifyModal} modalVisible={pauseNotifyVisible} />
    </View>
  )
}

export default FlatListConvention
