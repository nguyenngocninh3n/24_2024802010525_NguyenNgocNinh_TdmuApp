import { View, Text, StyleSheet, Pressable, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import SpaceComponent from '../components/SpaceComponent'

const SelectionItem = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={{ color: '#000', fontWeight: '400', fontSize: 16 }}>{title}</Text>
    </TouchableOpacity>
  )
}

const BottomModal = ({
  modalVisible,
  onClose,
  content,
  ownerID,
  userID,
  onReply,
  onDelete,
  onEdit,
  onReact
}) => {
  const handleCloseModal = () => onClose()
  const handleEdit = () => {
    onEdit()
    onClose()
  }

  const handleDelete = () => {
    onDelete()
    onClose()
  }

  const handleReact = () => {
    onReact()
    onClose()
  }

  const handleReply = () => {
    onReply()
    onClose()
  }
  const handleCopy = () => {
    console.log(content)
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        handleCloseModal
      }}
    >
      <Pressable style={styles.pressableContainer} onPress={handleCloseModal}>
        <Pressable style={styles.pressableBody} onPress={(e) => e.stopPropagation()}>
          <View style={styles.modalContainer}>
            <View style={{ paddingLeft: 20 }}>
              <SpaceComponent height={8} />
              <SelectionItem title={'Thích'} onPress={handleReact} />
              <SpaceComponent height={12} />
              <SelectionItem title={'Trả lời'} onPress={handleReply} />
              <SpaceComponent height={12} />
              {ownerID === userID && (
                <>
                  <SelectionItem title={'Chỉnh sửa'} onPress={handleEdit} />
                  <SpaceComponent height={12} />
                  <SelectionItem title={'Thu hồi'} onPress={handleDelete} />
                  <SpaceComponent height={12} />
                </>
              )}
              <SelectionItem title={'Sao chép nội dung'} onPress={handleCopy} />
            </View>
            <SpaceComponent height={100} />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

export default BottomModal

const styles = StyleSheet.create({
  pressableContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#0002'
  },

  pressableBody: {
    backgroundColor: '#eee',
    position: 'absolute',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: 0,
    left: 0,
    right: 0
  },

  modalContainer: {
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: '#aaa',
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingLeft: 8
  },
  modalTitle: {
    textAlign: 'center',
    marginTop: 10,
    marginLeft: 10,
    color: '#a2f',
    fontSize: 16,
    fontWeight: '500'
  }
})
