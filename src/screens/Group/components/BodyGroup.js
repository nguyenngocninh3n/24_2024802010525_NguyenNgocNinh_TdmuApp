import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BarComponent from './BarComponent'
import NavBarComponent from './NavBarComponent'
import { MEMBER_STATUS, RESPONSE_STATUS, SCOPE } from '../../../utils/Constants'
import { useCustomContext } from '../../../store'
import { API } from '../../../api'
import NewPostBox from '../../../components/NewPostBox'
import SpaceComponent from '../../../components/SpaceComponent'
import FlatListPost from '../../../components/FlatListPost'
import FlatListPostGroup from '../../../components/FlatListPostGroup'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/slice/userSlice'

const BodyGroup = ({ group, groupID }) => {
  const [viewState, setViewState] = useState(false)
  const [groupUser, setGroupUser] = useState()
  const state = useSelector(selectCurrentUser)


  useEffect(() => {
    if (groupID) {
      API.getGroupMemberByUserIDAPI(groupID, state._id).then((response) => {
        if (response.status === RESPONSE_STATUS.SUCCESS) {
          if (group._id === SCOPE.PUBLIC) {
            if (response.data?.status !== MEMBER_STATUS.BLOCK) {
              setGroupUser(response.data)
              setViewState(true)
              return
            }
          } else if (response.data?.status === MEMBER_STATUS.ACCEPT) {
            setGroupUser(response.data)
            setViewState(true)
            return
          }
        }
      })
    }
  }, [])

  return (
    <View>
      <BarComponent group={group} state={state} groupUser={groupUser} />
      {viewState && (
        <>
          <NavBarComponent groupID={group._id} groupName={group.name} userID={state._id} />
          <SpaceComponent height={8} />
          <NewPostBox groupID={group._id} />
          <SpaceComponent height={16} />
        </>
      )}
    </View>
  )
}

export default BodyGroup
