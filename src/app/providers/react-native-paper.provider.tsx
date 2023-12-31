import {ReactNode} from 'react';
import {MD3DarkTheme, MD3LightTheme, PaperProvider} from 'react-native-paper';

import {useIsDarkMode} from '../../stores/theme.store';

import {useMaterial3Theme} from '@pchmn/expo-material3-theme';
import {StatusBar} from 'react-native';

interface ReactNativePaperProviderProps {
  children?: ReactNode;
}

export const ReactNativePaperProvider = (
  props: ReactNativePaperProviderProps,
) => {
  const isDarkMode = useIsDarkMode();
  const {theme} = useMaterial3Theme({fallbackSourceColor: '#01454f'});

  return (
    <PaperProvider
      theme={
        isDarkMode
          ? {...MD3DarkTheme, colors: theme.dark}
          : {...MD3LightTheme, colors: theme.light}
      }>
      <StatusBar
        barStyle={isDarkMode ? 'dark-content' : 'light-content'}
        backgroundColor={isDarkMode ? theme.dark.primary : theme.light.primary}
      />
      {props.children}
    </PaperProvider>
  );
};
