import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import uuid from 'react-native-uuid';

const API_URL = 'https://api.openweathermap.org/data/2.5/forecast?'
const API_KEY = '' //Place your API Key here
const ICON_URL = 'http://openweathermap.org/img/wn/'

export default function Weather({navigation, route}) {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  

  useEffect(() => {
    const url = API_URL +
    'q=' + route.params.city +
    '&units=metric' +
    '&appid=' + API_KEY
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoading(false)
          setItems(result.list)
        },
        (error) => {
          console.log(error)
          setIsLoading(false)
          setItems([])
        }
      )
      BackHandler.addEventListener('hardwareBackPress', close)
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', close)
      }
  }, [])

  function close() {
    navigation.goBack(null)
    return true
  }



  if (items === undefined) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>You searched for: </Text> 
        <Text style={styles.errorColor}>{route.params.city}</Text>
        <Text style={styles.loading}>Nothing found!</Text>
        <Text style={styles.loading}>Check your spelling and please try again</Text>
      </View>
    )
  }
  else if(isLoading) {
    return <View style={styles.container}>
      <Text style={styles.loading}>Retrieving data...</Text>
      </View>
  } 
  else {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text  style={styles.title}>{route.params.city}</Text>
          {items.map(item => (
            <View style={styles.weather} key={uuid.v4()}>
              <View>
                <Text style={styles.item}>{item.dt_txt}</Text>
                <Text style={styles.label}>Temperature:  </Text>
                <Text style={[styles.item, {color: '#2196F3'}]}>{item.main.temp}</Text>
                <Text style={styles.label}>Description:  </Text>
                <Text style={styles.item}>{item.weather[0].description}</Text>
              </View>
              <View style={styles.right}>
                <Image source={{uri: ICON_URL + item.weather[0].icon + '@2x.png'}} style={{width: 100, height: 100}} />
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    margin: 10
    
  },
  weather: {
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#2196F3',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 10
  },
  loading: {
    textAlign: 'center',
    fontSize: 24,
    paddingTop: 40,
  },
  item: {
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2196F3'
  },
  right: {
    backgroundColor: '#2196F3', //`#f0f8ff`,
    marginLeft: 10,
  },
  errorColor: {
    color: '#2196F3',
    textAlign: 'center',
    fontSize: 24,
  },
});
