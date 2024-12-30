import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import MixedViewing from '../../../components/MixedViewing'
import { API } from '../../../api'
import { MESSAGE_TYPE, POST_ATTACHMENT } from '../../../utils/Constants'

const GroupImageScreen = ({ navigation, route }) => {
  const [files, setFiles] = useState([])
  const groupID = route.params.groupID

  useEffect(() => {
    API.getGroupFilesByID(groupID, MESSAGE_TYPE.IMAGE).then((data) => {
      setFiles(data.map(item => ({uri: API.getFileUrl(item), type: POST_ATTACHMENT.IMAGE.toLowerCase()})))
    })
  }, [groupID])

  return (
    <View>
      <MixedViewing attachments={files} />
    </View>
  )
}

export default GroupImageScreen
