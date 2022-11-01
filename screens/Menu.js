import { View, Text, StyleSheet, Button, TextInput, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY1 = '@city_Key1'
const STORAGE_KEY2 = '@city_Key2'
const STORAGE_KEY3 = '@city_Key3'

export default function Menu({navigation, route}) {
  const [city, setCity] = useState('')
  const [prefCity1, setPrefCity1] = useState('Oulu')
  const [prefCity2, setPrefCity2] = useState('Helsinki')
  const [prefCity3, setPrefCity3] = useState('Rovaniemi')


  useEffect(() => {
    getData()
  }, [])
  


  useEffect(() => {
    if(route.params?.cCity1) {
      setPrefCity1(route.params.cCity1)
    }
  }, [route.params?.cCity1])

  useEffect(() => {
    if(route.params?.cCity2) {
      setPrefCity2(route.params.cCity2)
    }
  }, [route.params?.cCity2])

  useEffect(() => {
    if(route.params?.cCity3) {
      setPrefCity3(route.params.cCity3)
    }
  }, [route.params?.cCity3])
  

  const select = (cityName) => () => {
    setCity('')
    if(cityName.length > 1){
      navigation.navigate('Weather', {city: cityName} )
    }
    else {
      console.log("empty string")
    }
  }

  //Retrieves data from Async storage
  const getData = async () => {
    let values
    try {
      values = await AsyncStorage.multiGet([STORAGE_KEY1, STORAGE_KEY2, STORAGE_KEY3])
    } catch(e) {
      console.log(e)
    }
    setPrefCity1(values[0][1])
    setPrefCity2(values[1][1])
    setPrefCity3(values[2][1])
    console.log('Done.')
  }

  
  return (
    <ScrollView style={styles.container2}>
      <View style={styles.container}>
        <Text style={styles.title}>Choose location to view weather</Text>
        <Pressable  onPress={select(prefCity1)}>
          <Text style={styles.pressable}>{prefCity1}</Text>
        </Pressable>
        <Pressable onPress={select(prefCity2)}>
          <Text style={styles.pressable}>{prefCity2}</Text>
        </Pressable>
        <Pressable onPress={select(prefCity3)}>
          <Text style={styles.pressable}>{prefCity3}</Text>
        </Pressable>
        
        <Button title='Change ' onPress={() => navigation.navigate('Changer', {city1: prefCity1, city2: prefCity2, city3: prefCity3})}/>
        <Text>Press to change preferred shortcut cities</Text>
        <Text style={styles.label}>Or search weather info by entering city name below</Text>
        <TextInput style={styles.input}
          placeholder='Enter city here'
          value={city}
          onChangeText={text => setCity(text)}
        />
        <Button title='Search ' onPress={select(city)}/>
      </View>
    </ScrollView>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    margin: 10,
  },
  container2: {
    backgroundColor: '#fff',
    margin: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,  
  },
  label: {
    marginTop: 20,
    marginBottom:10,
    fontSize: 20,
  },
  input: {
    marginBottom: 20,
    marginTop: 10,
    fontSize: 20,
  },
  pressable: {
    fontSize: 20,
    marginBottom: 20,
    color: '#2196F3',
  },
});
