import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { MainRouter } from './config/create-router';
import { getStore, persistor } from './config/store';
import { theme } from './config/theme';

export default function App() {
  const store = getStore();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <MainRouter />
        </MantineProvider>
      </PersistGate>
    </Provider>
  );
}
