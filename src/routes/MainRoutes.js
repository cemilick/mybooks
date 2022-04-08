import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
import Detail from '../screens/Detail';

export default function MainRoutes() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
}
