import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

import {Provider} from 'react-redux';
import {store, persistor} from './src/store';

import {PersistGate} from 'redux-persist/integration/react';
import Root from './src/routes/Root';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  );
}
