import React from 'react'
import { OpacityButtton } from '../../ButtonComponent'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { navigationRef } from '../../../store'

const GoBackIcon = ({ size, color, onNavigate }) => {
  const handleGoBack = () => {
    navigationRef.goBack()
  }

  return (
    <OpacityButtton onPress={ onNavigate ?? handleGoBack}>
      <Ionicons name="arrow-undo-outline" size={size ?? 32} color={color} />
    </OpacityButtton>
  )
}

export default GoBackIcon
