import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createSwitchNavigator, createCompatNavigatorFactory  } from '@react-navigation/compat';
import { DrawerActions, NavigationContainer } from '@react-navigation/native';

import {Articles, Components, Home, Profile, Register, Pro, Dashboard, Login, Switch, Summary} from '../screens';
import {useScreenOptions, useTranslation} from '../hooks';
import { Text, View, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import {useNavigation} from '@react-navigation/core';
import Button from '../components/Button';
import Image from '../components/Image';
import useTheme from '../hooks/useTheme';

const Stack = createStackNavigator();

export default () => {
  const {t} = useTranslation();
  const screenOptions = useScreenOptions();
  const {icons, colors, gradients, sizes, assets} = useTheme();
  const navigation = useNavigation();

  return (
    <Stack.Navigator screenOptions={screenOptions.stack}>
            
      <Stack.Screen
        name="Home"
        component={Dashboard}
        options={{header: () => (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: 100,
            }}>
              <ImageBackground source={require("../assets/images/header.jpg")} resizeMode="cover" style={{width: '100%'}}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 40
                  }}
                >
                  <View
                  style={{ paddingLeft: 30 }}
                  >
                    <Image source={icons.bigChat} radius={0} style={{width: 50, height: 50}} />
                  </View>
                  <View 
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Button onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                      <Image source={icons.search} radius={0} color={colors.background} />
                    </Button>
                    <Button onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                      <Image source={icons.menu} radius={0} color={colors.background} />
                    </Button>
                  </View>
                </View>
              </ImageBackground>
            
          </View>
        )}}
      />

      <Stack.Screen
        name="Components"
        component={Components}
        options={screenOptions.components}
      />

      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{title: t('navigation.articles')}}
      />

      <Stack.Screen name="Pro" component={Pro} options={screenOptions.pro} />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />

    </Stack.Navigator>
  );
};
