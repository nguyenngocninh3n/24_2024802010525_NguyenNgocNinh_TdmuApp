import { Text } from 'react-native'

const TextComponent = ({ text, style, size, fontWeight, color }) => {
  const customStyle = {
    color: color ?? '#333',
    fontSize: size ?? 18,
    fontWeight: fontWeight ?? '400',
    ...style
  }
  return <Text style={customStyle}>{text}</Text>
}

export default TextComponent
