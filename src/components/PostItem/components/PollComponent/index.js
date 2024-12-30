import { View, Text } from 'react-native'
import React from 'react'
import PollScreen from '../../../../screens/convenition/Vote/Show'

const PollComponent = ({ pollID, postID }) => {
  return (
    <View style={{ flex: 1, postID }}>
      <PollScreen pollID={pollID} postID={postID} />
    </View>
  )
}

export default PollComponent
