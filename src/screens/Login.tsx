import React, {useCallback, useEffect, useState} from 'react';
import {Linking, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {useData, useTheme, useTranslation} from '../hooks/';
import * as regex from '../constants/regex';
import {Block, Button, Input, Image, Text, Checkbox} from '../components/';

const isAndroid = Platform.OS === 'android';

interface IRegistration {
  email: string;
  password: string;
  agreed: boolean;
}
interface IRegistrationValidation {
  email: boolean;
  password: boolean;
  agreed: boolean;
}

const Register = () => {
  const {isDark} = useData();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [isValid, setIsValid] = useState<IRegistrationValidation>({
    email: false,
    password: false,
    agreed: false,
  });
  const [registration, setRegistration] = useState<IRegistration>({
    email: '',
    password: '',
    agreed: false,
  });
  const {assets, colors, gradients, sizes} = useTheme();

  const handleChange = useCallback(
    (value) => {
      setRegistration((state) => ({...state, ...value}));
    },
    [setRegistration],
  );

  const handleSignIn = () => {
      navigation.navigate('Register');
    console.log('handleSignUp', registration);
  };

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      email: regex.email.test(registration.email),
      password: true,
      agreed: registration.agreed,
    }));
  }, [registration, setIsValid]);

  return (
    <Block safe>
      <Image 
            background
            resizeMode="stretch"
            padding={sizes.sm}
            source={require("../assets/images/signin_background.png")}
            height={sizes.height}>
        <Block flex={0} style={{zIndex: 0}}>
            <Button
              row
              flex={0}
              justify="flex-start"
              onPress={() => navigation.goBack()}>
              <Image
                radius={0}
                width={10}
                height={18}
                color={colors.gray}
                source={assets.arrow}
                transform={[{rotate: '180deg'}]}
              />
              <Text color={colors.gray} p  marginLeft={sizes.s}>
                {t('common.goBack')}
              </Text>
            </Button>
        </Block>
        {/* register form */}
        <Block
          blur
          intensity={90}
          keyboard
          marginTop={sizes.height * 0.3}
          shadow={true}
          tint={colors.blurTint}
          behavior={!isAndroid ? 'padding' : 'height'}>
          <Block
            flex={0}
            radius={sizes.sm}
            marginHorizontal="8%" // disabled shadow on Android due to blur overlay + elevation issue
          >
            <Block
              flex={0}
              radius={sizes.sm}
              overflow="hidden"
              justify="space-evenly"
              paddingVertical={sizes.sm}>
              <Block paddingHorizontal={sizes.sm}>
                <Input
                  color={colors.text}
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={t('common.email')}
                  keyboardType="email-address"
                  placeholder={t('common.emailPlaceholder')}
                  success={Boolean(registration.email && isValid.email)}
                  danger={Boolean(registration.email && !isValid.email)}
                  onChangeText={(value) => handleChange({email: value})}
                />
                <Input
                  color={colors.text}
                  secureTextEntry
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={t('common.password')}
                  placeholder={t('common.passwordPlaceholder')}
                  onChangeText={(value) => handleChange({password: value})}
                  success={Boolean(registration.password && isValid.password)}
                  danger={Boolean(registration.password && !isValid.password)}
                />
              </Block>
              {/* checkbox terms */}
              <Block row flex={0} align="center" paddingHorizontal={sizes.sm}>
                <Checkbox
                  
                  marginRight={sizes.sm}
                  checked={registration?.agreed}
                  onPress={(value) => handleChange({agreed: value})}
                />
                <Text paddingRight={sizes.s}>
                  <Text
                    semibold
                    onPress={() => {
                      Linking.openURL('https://www.creative-tim.com/terms');
                    }}>
                    {t('common.remember')}
                  </Text>
                </Text>
              </Block>
              <Button
                primary
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                onPress={() => {navigation.navigate('Summary')}}>
                <Text bold white transform="uppercase">
                  {t('common.signin')}
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </Image>
    </Block>
  );
};

export default Register;
