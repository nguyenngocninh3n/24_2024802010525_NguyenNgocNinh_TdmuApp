import { Pressable, TouchableHighlight, TouchableOpacity, View } from 'react-native'

const ColumnComponent = ({ children, style, bgColor,padding, margin, onPress, onLongPress }) => {

  const defaultValue = {
    onPress: () => {},
    styles: {
      flexDirection: 'column',
      justifyContent:'space-between',
      backgroundColor: bgColor,
      padding: padding,
      margin: margin,
    }
  }


  const customStyles = [defaultValue.styles, style]

  return onPress || onLongPress ? (
    <TouchableHighlight underlayColor={'#eee'} onPress={onPress} onLongPress={onLongPress} style={customStyles}>
      {children}
    </TouchableHighlight>
  ) : (
    <View style={customStyles}>{children}</View>
  )
}

export default ColumnComponent
