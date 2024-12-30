import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import SpaceComponent from '../../../components/SpaceComponent'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ConventionNavigator from '../../../navigation/convention'
import RowComponent from '../../../components/RowComponent'

const SearchComponent = ({ navigation }) => {
  const handleClickSearch = () => {
    // navigation.navigate('SearchConventionScreen')
    
  }

  const handleClickCreateGroup = () => navigation.navigate('CreateGroupScreen')

  return (
    <RowComponent alignItems style={styles.searchContainer}>
      <RowComponent onPress={handleClickSearch} style={styles.searchInput}>
        <TextInput editable={false} style={styles.textInput} placeholder="Tìm kiếm..." />
        <MaterialIcons name="search" size={24} />
      </RowComponent>
      <SpaceComponent width={16} />
      <MaterialIcons onPress={handleClickCreateGroup} name="group-add" size={32} />
    </RowComponent>
  )
}

const ConvenitionScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <SpaceComponent height={16} />
      <View>
        <SearchComponent navigation={navigation} />
        {/* <SpaceComponent height={24} /> */}
        <SpaceComponent height={24} />
      </View>
      <ConventionNavigator />
    </View>
  )
}

export default ConvenitionScreen

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 0
  },

  searchInput: {
    backgroundColor: '#eee',
    height: 32,
    color: '#ffe',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 25,
    padding: 0,
    margin: 0,
    paddingHorizontal:8
  },

  textInput: {
    margin: 0,
    padding: 0
  }
})
