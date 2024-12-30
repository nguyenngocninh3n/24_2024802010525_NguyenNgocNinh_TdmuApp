import { Image, TouchableOpacity } from 'react-native'
import React from 'react'

const AvatarComponent = ({ source, style, onPress, size }) => {
  const localValue = {
    style: { borderColor: '#fff', borderWidth: 1, width: size || 48, height: size || 48, borderRadius: 75 },
    onPress: onPress
  }

  const customStyle = { ...localValue.style, ...style }

  return source ? (
    <TouchableOpacity onPress={onPress || localValue.onPress}>
      <Image source={{ uri: source }} style={customStyle} />
    </TouchableOpacity>
  ) : (
    <></>
  )
}

export default AvatarComponent
