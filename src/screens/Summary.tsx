import React, {useCallback, useEffect, useState} from 'react';
import {Linking, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Button, Input, Image, Text, Checkbox} from '../components/';
import {TouchableOpacity} from 'react-native'

const isAndroid = Platform.OS === 'android';

const Summary = () => {
  const {isDark} = useData();
  const {t} = useTranslation();
  const navigation = useNavigation();
  
  const {assets, colors, gradients, sizes} = useTheme();

  return (
    <Block safe>
      <Image
            background
            resizeMode="stretch"
            padding={sizes.sm}
            source={require("../assets/images/signin_background.png")}
            height={sizes.height}>
            {/* <Text h4 center white marginBottom={sizes.md}>
              {t('register.title')}
            </Text> */}
        <Block
          behavior={!isAndroid ? 'padding' : 'height'}
          marginTop={sizes.height * 0.3}
        >
          <Block
            flex={0}
            radius={sizes.sm}
            paddingHorizontal="20%"
            shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
          >
            <Block
              flex={0}
              radius={sizes.sm}
              overflow="hidden"
              tint={colors.blurTint}
              top={30}
              paddingVertical={sizes.sm}>
              <TouchableOpacity onPress={() => navigation.navigate('App')}>
                <Text p center>
                    {t('common.welcome1')}
                </Text>
                <Text p center>
                    {t('common.welcome2')}
                </Text>
              </TouchableOpacity>
            </Block>
          </Block>
        </Block>
      </Image>
    </Block>
  );
};

export default Summary;
