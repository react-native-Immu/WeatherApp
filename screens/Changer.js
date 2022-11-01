import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY1 = '@city_Key1'
const STORAGE_KEY2 = '@city_Key2'
const STORAGE_KEY3 = '@city_Key3'

export default function Changer({route, navigation}) {
  const [changedCity1, setChangedCity1] = useState(route.params.city1)
  const [changedCity2, setChangedCity2] = useState(route.params.city2)
  const [changedCity3, setChangedCity3] = useState(route.params.city3)


  //Stores data to async storage
  const storeData = async (value1, value2, value3) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY1, value1)
      await AsyncStorage.setItem(STORAGE_KEY2, value2)
      await AsyncStorage.setItem(STORAGE_KEY3, value3)
      console.log('data stored '+ value1, value2, value3)
    } catch(error) {
      console.log(error);
    }
  }

  //Button onPress event executes both functions and makes it easier to read
  const onPressHelper = () => {
    storeData(changedCity1, changedCity2, changedCity3)
    navigation.navigate('Menu', ({cCity1:changedCity1, cCity2:changedCity2, cCity3:changedCity3}))
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.tinput}
        placeholder={route.params.city1}
        onChangeText={text => setChangedCity1(text)}
      />
      <TextInput style={styles.tinput}
        placeholder={route.params.city2}
        onChangeText={text => setChangedCity2(text)}
      />
      <TextInput style={styles.tinput}
        placeholder={route.params.city3}
        onChangeText={text => setChangedCity3(text)}
      />
      <Text style={styles.buttonspacer}></Text>
      <Button title="Save" onPress={() => onPressHelper()}/> 
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    margin: 10,
  },
  tinput: {
    borderBottomWidth: 1,
    borderBottomColor: '#2196F3',
    padding: 20,
  },
  buttonspacer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18
  }
});