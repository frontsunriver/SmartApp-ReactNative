import React, {useEffect} from 'react';
import {Platform, StatusBar} from 'react-native';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';
import {NavigationContainer, DefaultTheme, DrawerActions} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createSwitchNavigator, createCompatNavigatorFactory  } from '@react-navigation/compat';

import Menu from './Menu';
import {Articles, Components, Home, Profile, Register, Pro, Dashboard, Login, Switch, Summary} from '../screens';
import {useData, ThemeProvider, TranslationProvider} from '../hooks';

export default () => {
  const {isDark, theme, setTheme} = useData();
  const Stack = createStackNavigator();

  /* set the status bar based on isDark constant */
  useEffect(() => {
    // Platform.OS === 'android' && StatusBar.setTranslucent(true);
    // StatusBar.setBarStyle(isDark ? 'light-content' : 'dark-content');
    // return () => {
    //   StatusBar.setBarStyle('default');
    // };
    StatusBar.setHidden(true);
  }, [isDark]);

  // load custom fonts
  const [fontsLoaded] = useFonts({
    'OpenSans-Light': theme.assets.OpenSansLight,
    'OpenSans-Regular': theme.assets.OpenSansRegular,
    'OpenSans-SemiBold': theme.assets.OpenSansSemiBold,
    'OpenSans-ExtraBold': theme.assets.OpenSansExtraBold,
    'OpenSans-Bold': theme.assets.OpenSansBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const navigationTheme = {
    ...DefaultTheme,
    dark: isDark,
    colors: {
      ...DefaultTheme.colors,
      border: 'rgba(0,0,0,0)',
      text: String(theme.colors.text),
      card: String(theme.colors.card),
      primary: String(theme.colors.primary),
      notification: String(theme.colors.primary),
      background: String(theme.colors.background),
    },
  };

  const AuthNavigator = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Switch" component={Switch} options={{headerShown: false}} />
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Summary"
          component={Summary}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    )
  }

  const SwitchNavigator = createSwitchNavigator({
    Start: AuthNavigator,
    App: Menu,
  }, {
    initialRouteName :'Start'
  });

  return (
    <TranslationProvider>
      <ThemeProvider theme={theme} setTheme={setTheme}>
        <NavigationContainer theme={navigationTheme}>
          <SwitchNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </TranslationProvider>
  );
};
