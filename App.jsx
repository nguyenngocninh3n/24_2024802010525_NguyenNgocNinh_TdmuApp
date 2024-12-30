import Navigation from './src/navigation'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { actions, useCustomContext,reducer, Provider } from './src/store/'

const App = () => {


  return (
    <GestureHandlerRootView>
     <Provider>
     <Navigation />
     </Provider>
    </GestureHandlerRootView>
  )
}

export default App
