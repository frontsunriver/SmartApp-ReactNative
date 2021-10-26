import React, {useCallback, useEffect, useState} from 'react';
import {Linking, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {useData, useTheme, useTranslation} from '../hooks/';
import * as regex from '../constants/regex';
import {Block, Button, Input, Image, Text, Checkbox} from '../components/';

const isAndroid = Platform.OS === 'android';

interface IRegistration {
  name: string;
  email: string;
  password: string;
  agreed: boolean;
}
interface IRegistrationValidation {
  name: boolean;
  email: boolean;
  password: boolean;
  agreed: boolean;
}

const Switch = () => {
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
            source={assets.background}
            height={sizes.height}>
          <Block>
            <Block
              behavior={!isAndroid ? 'padding' : 'height'}
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
                  marginTop={sizes.height * 0.4}
                  paddingVertical={sizes.sm}>
                  <Button
                        primary
                        marginTop={90}
                        marginVertical={sizes.sm}
                        marginHorizontal={sizes.sm}
                        onPress={() => navigation.navigate('Register')}>
                        <Text bold white transform="uppercase">
                        {t('common.signup')}
                        </Text>
                    </Button>
                    <Button
                        primary
                        marginVertical={sizes.s}
                        marginHorizontal={sizes.sm}
                        onPress={() => navigation.navigate('Login')}>
                        <Text bold white transform="uppercase">
                        {t('common.signin')}
                        </Text>
                    </Button>
                </Block>
              </Block>
            </Block>
          </Block>
        </Image>
      </Block>
  );
};

export default Switch;
