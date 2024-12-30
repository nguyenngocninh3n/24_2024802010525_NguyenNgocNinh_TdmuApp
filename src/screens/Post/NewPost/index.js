import { ToastAndroid } from 'react-native'
import React from 'react'
import { API } from '../../../api'
import PostHandler from '../components/PostHandler'
import { POST_TYPE, RESPONSE_STATUS } from '../../../utils/Constants'
import { useCustomContext } from '../../../store'

const NewPost = ({ navigation, route }) => {
  console.log('newpost re-render: ', route.params)
  const [state, dispatch] = useCustomContext()
  const handleSubmit = (ownerID, customAttachments, value, scope, pollID) => {
    console.log('scope: ', scope)
    const newPostData = {
      groupID: route.params.groupID ?? null,
      userID: ownerID,
      userName: state.userName,
      avatar: state.avatar,
      attachments: customAttachments,
      content: value,
      scope: scope,
      type: route.params.groupID ? POST_TYPE.GROUP : POST_TYPE.PERSONAL
    }
    if (pollID) {
      newPostData.pollID = pollID
    }
    API.storePostAPI(newPostData).then((result) => {
      if (result === RESPONSE_STATUS.SUCCESS) {
        ToastAndroid.show('Thêm bài viết thành công', ToastAndroid.LONG)
        navigation.goBack()
      } else {
        ToastAndroid.show('Lỗi khi thêm bài viết', ToastAndroid.LONG)
      }
    })
  }

  return <PostHandler onSubmit={handleSubmit} postData={{}} groupID={route.params.groupID}/>
}

export default NewPost
