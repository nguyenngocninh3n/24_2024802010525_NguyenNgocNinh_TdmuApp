import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import SpaceComponent from '../../../components/SpaceComponent'
import { OpacityButtton } from '../../../components/ButtonComponent'
import { API } from '../../../api'
import Video from 'react-native-video'
import EnhancedImageViewing from 'react-native-image-viewing'
import ImagePressable from '../../../components/ImagePressable'
import VideoComponent from '../../../components/VideoComponent'
import GoBackComponent from '../../../components/GoBackComponent'
import { MESSAGE_TYPE, RESPONSE_STATUS } from '../../../utils/Constants'

const FlatlistImage = ({ data }) => {
  const [imageIndex, setImageIndex] = useState(0)
  const [imageViewState, setImageViewState] = useState(false)

  const handleClickImage = (id) => {
    setImageIndex(id)
    setImageViewState(true)
  }

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {data.map((item, index) => (
        <ImagePressable
          key={'item-' + index}
          onPress={() => handleClickImage(index)}
          containerStyle={{
            borderWidth: 1,
            borderColor: '#ddd',
            marginHorizontal: 4,
            marginVertical: 4
          }}
          source={API.getFileUrl(item)}
          width={'30%'}
          height={100}
        />
      ))}
      <EnhancedImageViewing
        images={data.map((item) => {
          return { uri: API.getFileUrl(item) }
        })}
        imageIndex={imageIndex}
        onImageIndexChange={(id) => setImageIndex(id)}
        visible={imageViewState}
        swipeToCloseEnabled
        onRequestClose={() => setImageViewState(false)}
      />
    </View>
  )
}

const ProfileImageScreen = ({ navigation, route }) => {
  const { userID, ownerID } = route.params
  const [images, setImages] = useState([])

  useEffect(() => {
    API.getUserPostsAPI(userID, ownerID).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        setImages((pre) => {
          const postData = response.data
          const fileImage = postData.map((post) => {
            const attachments = post.attachments
            const filters = attachments.filter((item) => item.type === MESSAGE_TYPE.IMAGE)
            const urls = filters.map((item) => item.source)
            return urls
          })
          const final = fileImage.filter(item => item?.length > 0)
          return final
        })
      }
    })
  }, [])

  return (
    <View>
      <GoBackComponent marginLeft={16} title={'Ảnh'} hasBorder />
      <SpaceComponent height={16} />

      <SpaceComponent height={32} />
      <FlatlistImage data={images} />
    </View>
  )
}

export default ProfileImageScreen

const styles = StyleSheet.create({
  active: {
    backgroundColor: 'blue',
    fontWeight: '600',
    width: '40%',
    height: 32,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inactive: {
    backgroundColor: '#ccc',
    fontWeight: '600',
    width: '40%',
    height: 32,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInactive: {
    fontSize: 16,
    fontWeight: '500'
  },
  textActive: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff'
  }
})
