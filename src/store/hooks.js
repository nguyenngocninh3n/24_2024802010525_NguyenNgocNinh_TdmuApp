import { useContext } from 'react'
import { Context } from './Context'
import { createNavigationContainerRef } from '@react-navigation/native'

const useCustomContext = () => {
  const [state, dispatch] = useContext(Context)
  return [state, dispatch]
}

const navigationRef = createNavigationContainerRef()

const navigate = (name, params) => {
  navigationRef.navigate(name, { ...params })
}
export {
  useCustomContext, navigationRef, navigate
}
