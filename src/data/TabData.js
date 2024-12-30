import AntDesign from 'react-native-vector-icons/AntDesign'
import HomeScreen from '../screens/home'
import NotificationScreen from '../screens/Notificaton'
import OwnerProfile from '../screens/Profile/Owner'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import ListGroupScreen from '../screens/Group/ListGroup'
import ScheduleScreen from '../screens/Schedule'
import AcceptingFriendScreen from '../screens/Friend'
import ListFriendScreen from '../screens/Friend'
import ExtensionScreen from '../screens/Extension'
const TabData = [
  {
    name: 'HomeScreen',
    component: HomeScreen,
    icon: ({ focused, color, size }) => <AntDesign name="home" focused={focused} color={color ?? '#ccc'} size={24} />
  },
 

  {
    name: 'ListFriendScreen',
    component: ListFriendScreen,
    icon: ({ focused, color, size }) => <Ionicons name="people-outline" focused={focused} color={color ?? '#ccc'} size={24} />
  },
  {
    name: 'ExtensionScreen',
    component: ExtensionScreen,
    icon: ({ focused, color, size }) => <Feather name="grid" focused={focused} color={color ?? '#ccc'} size={24} />
  },
  {
    name: 'NotificationScreen',
    component: NotificationScreen,
    icon: ({ focused, color, size }) => <AntDesign name="tablet1" focused={focused} color={color ?? '#ccc'} size={24} />
  },
  {
    name: 'OwnerProfile',
    component: OwnerProfile,
    icon: ({ focused, color, size }) => <AntDesign name="user" focused={focused} color={color ?? '#ccc'} size={24} />
  }
]

export default TabData
