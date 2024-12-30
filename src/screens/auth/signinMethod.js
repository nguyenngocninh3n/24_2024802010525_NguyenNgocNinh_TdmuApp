import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { API } from '../../api'
import SocketClient from '../../socket'

import messaging from '@react-native-firebase/messaging'

async function getFCMToken() {
  const token = await messaging().getToken()
  console.log('FCM Token:', token)
  // Lưu token lên server của bạn nếu cần
  return token
}

const configGoogleMethod = async () => {
  GoogleSignin.configure({
    webClientId: '77194624099-c6bfhn2iencledrpov9b8169nfl2f157.apps.googleusercontent.com'
  })
}

const signOutWithGoogle = async () => {
  SocketClient.socket.emit('disconnection')
  await configGoogleMethod()
  GoogleSignin.signOut()
    .then((result) => {
      auth().signOut()
      messaging().deleteToken()

    })
    .catch((error) => console.log('error when sign out', error))
}

async function signInWithGoogle() {
  //config google signin method
  await configGoogleMethod()

  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })

  // Get the users ID token
  let idToken = ''
  let loginStatus = true
  await GoogleSignin.signIn().then((data) => {
    if (data.type === 'success') {
      idToken = data.data.idToken
      loginStatus = true
    } else {
      loginStatus = false
    }
  })

  if (loginStatus) {
    // console.log('idtoken: ', idToken)
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    console.log('login status: ', loginStatus)
    // console.log('google creadential: ', googleCredential)
    // Sign-in the user with the credential
    return await auth()
      .signInWithCredential(googleCredential)
      .then(async (user) => {
        const messagingToken = await messaging().getToken()
        const userData = {
          ...user.additionalUserInfo.profile,
          _id: user.user.uid,
          messagingToken
        }
        const newUser = await API.loginAPI({ data: userData })
        return newUser
      })
      .catch((error) => console.log('error when sigin with credential: ', error))
  } else {
    return 'cancel'
  }
}

export { signInWithGoogle, signOutWithGoogle }
