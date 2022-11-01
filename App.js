import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Menu from "./screens/Menu";
import Weather from './screens/Weather';
import Changer from './screens/Changer';

export default function App() {
  const Stack = createNativeStackNavigator();


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Menu'>
        <Stack.Screen 
          name='Menu'
          component={Menu}
          options={{
            title: 'Menu',
            headerTitle: 'Immu-weather',
          }}
        />
        <Stack.Screen 
          name='Weather'
          component={Weather}
          options={{
            title: 'Weather',
            headerTitle: '5 day / 3 hour forecast ',
          }}
        />
        <Stack.Screen 
          name='Changer'
          component={Changer}
          options={{
            title: 'Changer',
            headerTitle: 'Change to preferred cities ',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

