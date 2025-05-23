import { ImageBackground, Text, View } from 'react-native'
import { useMeeting,  } from '@videosdk.live/react-native-sdk'
import ParticipantList from '../ParticipanList'
import ControlsContainer from '../ControlContainer'
import { API } from '../../../api'
import { useEffect, useState } from 'react'
import SocketClient from '../../../socket'
import AvatarComponent from '../../../components/AvatarComponent'
import SpaceComponent from '../../../components/SpaceComponent'
import LinearGradient from 'react-native-linear-gradient'

export default function MeetingView({ ownerID, targetID, ownerInfo, targetInfo, reply }) {
  // Get `participants` from useMeeting Hook
  const {
    join,
    leave,
    getWebcams,
    changeWebcam,
    muteMic,
    toggleWebcam,
    toggleMic,
    
    participants,
    meetingId
  } = useMeeting({})
  const participantsArrId = [...participants.keys()]
  const arrParticipants = Array.from(participants.entries()).map((item) => ({
    id: item.at(1).id,
    name: item.at(1).displayName
  }))
  console.log('arr par: ', arrParticipants)
  useEffect(() => {
    if (meetingId && !reply) {
      SocketClient.socket.emit('call', {
        targetID,
        senderID: ownerID,
        senderName: ownerInfo.userName,
        senderAvatar: ownerInfo.avatar,
        meetingId,
        members: targetInfo.members
      })
    }
  }, [meetingId])

  const [startTime, setStartTime] = useState(0)
  useEffect(() => {
    if (participants > 1 && startTime === 0) {
      setInterval(() => setStartTime((pre) => pre + 1), 1000)
    }
  }, [participants])
  return (
    <LinearGradient colors={['#ec2f4bcc', '#009fff66']} style={{ flex: 1, backgroundColor: '#eee' }}>
      <SpaceComponent height={64} />
      <AvatarComponent
        size={100}
        style={{ alignSelf: 'center' }}
        source={API.getFileUrl(targetInfo.avatar)}
      />
      <Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 20 }}>
        {targetInfo.name}
      </Text>
      <ParticipantList participants={participantsArrId} arr={arrParticipants} />
      <ControlsContainer
        join={join}
        leave={leave}
        toggleWebcam={toggleWebcam}
        toggleMic={toggleMic}
      />
    </LinearGradient>
  )
}
