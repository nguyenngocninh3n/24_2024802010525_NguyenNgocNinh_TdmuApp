import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native'
import { signInWithGoogle } from './signinMethod'

import { actions, useCustomContext } from '../../store'
import SpaceComponent from '../../components/SpaceComponent'
import { GoogleSigninButton } from '@react-native-google-signin/google-signin'

const LoginScreen = () => {
  const [state, dispatch] = useCustomContext()

  async function handleLogin() {
    //Đăng nhập firebase google -> tạo tài khoản trên server và trả về tài khoản user
    const userLogin = await signInWithGoogle()
    console.log('user login in login screen: ', userLogin)
    if (userLogin === 'cancel') {
      console.log('Cancel')
    } else if (userLogin) {
      ToastAndroid.show('Đăng nhập thành công!', ToastAndroid.LONG)
      dispatch(actions.onLogin(userLogin))
    } else {
      ToastAndroid.show('Tài khoản không có trong dữ liệu của trường!', ToastAndroid.LONG)
    }
  }

  return (
    <View style={styles.container}>
      <SpaceComponent height={64} />
      <Image style={styles.image} source={require('../../assets/images/logo_tdmu.png')} />
      <Text style={{ textAlign: 'center', fontStyle: 'italic' }}>
        Ứng dụng dành riêng cho sinh viên
      </Text>
      <Text style={{ textAlign: 'center', fontStyle: 'italic' }}>trường đại học Thủ Dầu Một</Text>
      <SpaceComponent height={200} />
      <TouchableOpacity onPress={handleLogin} activeOpacity={0.7} style={styles.newbutton}>
        <Text style={styles.buttonText}>Đăng nhập với google</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    // flex: 1
    backgroundColor: '#fff',
    flex: 1
  },
  image: {
    alignSelf: 'center'
  },
  button: {
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: '#aaa2'
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '400',
    color: '#666d'
  },

  newbutton: {
    marginHorizontal: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4285F4',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center'
  }
})
