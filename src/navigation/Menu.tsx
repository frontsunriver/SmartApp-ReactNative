import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Alert, Animated, Linking, StyleSheet} from 'react-native';

import {
  useIsDrawerOpen,
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import Screens from './Screens';
import {Block, Text, Switch, Button, Image} from '../components';
import {useData, useTheme, useTranslation} from '../hooks';

const Drawer = createDrawerNavigator();

/* drawer menu screens navigation */
const ScreensStack = () => {
  const {colors} = useTheme();
  const isDrawerOpen = useIsDrawerOpen();
  const animation = useRef(new Animated.Value(0)).current;

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.88],
  });

  const borderRadius = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = {
    borderRadius: borderRadius,
    transform: [{scale: scale}],
  };

  useEffect(() => {
    Animated.timing(animation, {
      duration: 200,
      useNativeDriver: true,
      toValue: isDrawerOpen ? 1 : 0,
    }).start();
  }, [isDrawerOpen, animation]);

  return (
    <Animated.View
      style={StyleSheet.flatten([
        animatedStyle,
        {
          flex: 1,
          overflow: 'hidden',
          borderColor: colors.card,
          borderWidth: isDrawerOpen ? 1 : 0,
        },
      ])}>
      {/*  */}
      <Screens />
    </Animated.View>
  );
};

/* custom drawer menu */
const DrawerContent = (
  props: DrawerContentComponentProps<DrawerContentOptions>,
) => {
  const {navigation} = props;
  const {t} = useTranslation();
  const {isDark, handleIsDark} = useData();
  const [active, setActive] = useState('Home');
  const {icons, assets, colors, gradients, sizes} = useTheme();
  const labelColor = colors.text;

  const handleNavigation = useCallback(
    (to) => {
      setActive(to);
      navigation.navigate(to);
    },
    [navigation, setActive],
  );

  const handleWebLink = useCallback((url) => Linking.openURL(url), []);

  // screen list for Drawer menu
  const screens = [
    {name: t('screens.businessProfile'), to: 'Profile', icon: assets.profile},
    {name: t('screens.businessTools'), to: 'Setting', icon: assets.profile},
    {name: t('screens.privacy'), to: 'Business Tools', icon: assets.profile},
    {name: t('screens.charts'), to: 'Chat', icon: assets.chat},
    {name: t('screens.notification'), to: 'Components', icon: assets.notification},
    {name: t('screens.storageAndData'), to: 'Articles', icon: assets.basket},
    {name: t('screens.ewallet'), to: 'Register', icon: assets.profile},
    {name: t('screens.help'), to: 'Profile', icon: assets.profile},
    {name: t('screens.settings'), to: 'Pro', icon: assets.settings},
    {name: t('screens.signout'), to: 'Profile', icon: assets.profile},


    // -------------------------
    // {name: t('screens.home'), to: 'Home', icon: assets.home},
    // {name: t('screens.components'), to: 'Components', icon: assets.components},
    // {name: t('screens.articles'), to: 'Articles', icon: assets.document},
    // {name: t('screens.rental'), to: 'Pro', icon: assets.rental},
    // {name: t('screens.register'), to: 'Register', icon: assets.register},
    // {name: t('screens.extra'), to: 'Pro', icon: assets.extras},
  ];

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled
      removeClippedSubviews
      renderToHardwareTextureAndroid
      contentContainerStyle={{paddingBottom: sizes.padding}}>
      <Block color={colors['white']} radius={0}>
        <Block flex={0} row align="center" justify="center" marginBottom={0} marginTop={sizes.l}>
          <Image
            radius={96}
            width={96}
            height={96}
            source={assets.avatar2}
          />
          
        </Block>
        <Block  row align="center" justify="center" marginBottom={sizes.l} marginTop={sizes.sm}>
            <Text size={12} semibold>
              {"Sizewe Zondi"}
            </Text>
        </Block>
        {screens?.map((screen, index) => {
          const isActive = active === screen.to;
          return (
            <Button
              row
              justify="flex-start"
              // marginBottom={sizes.s}
              key={`menu-screen-${screen.name}-${index}`}
              onPress={() => handleNavigation(screen.to)}
              width={"100%"}
              paddingRight={sizes.padding}
              paddingLeft={sizes.padding}
              color={isActive ? "#0274f4" : ""}
              style={{
                borderBottomWidth: 2,
                borderColor: "#c4c4c4",
                borderStyle: "solid",
                borderRadius: 0
              }}>
              <Block
                flex={0}
                radius={16}
                align="center"
                justify="center"
                width={sizes.m}
                height={sizes.m}
                marginRight={13}
                color={"#0274f4"}
                >
                <Image
                  radius={0}
                  width={sizes.sm}
                  height={sizes.sm}
                  source={screen.icon}
                  // color={colors[isActive ? 'white' : 'black']}
                  color={colors['white']}
                />
              </Block>
              <Text p semibold={true} color={labelColor} size={15}> 
                {screen.name}
              </Text>
              <Image
                  radius={40}
                  width={14}
                  height={14}
                  source={icons.arrow}
                  // color={colors[isActive ? 'white' : 'black']}
                  color={"#0274f4"}
                  style={{
                    position: 'absolute', 
                    right: sizes.padding
                  }}

                />
              {/* <Text p 
                semibold={isActive} 
                color={labelColor}
                align={"right"}
              >
                {screen.name}
              </Text> */}
            </Button>
          );
        })}
      </Block>
    </DrawerContentScrollView>
  );
};

/* drawer menu navigation */
export default () => {
  const {gradients} = useTheme();

  return (
    <Block gradient={gradients.light}>
      <Drawer.Navigator
        drawerType="slide"
        overlayColor="transparent"
        sceneContainerStyle={{backgroundColor: 'transparent'}}
        drawerContent={(props) => <DrawerContent {...props} />}
        drawerStyle={{
          flex: 1,
          width: '60%',
          borderRightWidth: 0,
          backgroundColor: 'transparent',
        }}>
        <Drawer.Screen name="Screens" component={ScreensStack} />
      </Drawer.Navigator>
    </Block>
  );
};
