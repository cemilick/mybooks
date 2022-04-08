import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainRoutes from './MainRoutes';

import NoConnection from '../components/NoConnection';
import Loading from '../components/Loading';
export default function Root() {
  return (
    <NavigationContainer>
      <NoConnection />
      <Loading />
      <MainRoutes />
    </NavigationContainer>
  );
}
