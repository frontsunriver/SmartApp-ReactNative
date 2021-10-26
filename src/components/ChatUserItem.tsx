import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';

import Block from './Block';
import Image from './Image';
import Text from './Text';
import {IProduct, IChatItem} from '../constants/types';
import {useTheme, useTranslation} from '../hooks/';

const ChatUserItem = ({image, title }: IProduct) => {
  const {t} = useTranslation();
  const {assets, colors, sizes, icons} = useTheme();

  return (
    <TouchableOpacity>
      <Block
        safe
        showsVerticalScrollIndicator={false}
        row
        flex={0}
        marginBottom={sizes.s}
        style={{borderBottomColor: '#e2e2e2', borderBottomWidth: 1}} 
        justify="space-between"
      >
        <Block
          flex={0}
          row={true}
          justify="flex-start"
          paddingLeft={sizes.sm}
          paddingBottom={sizes.s}
        >
          <Image 
            source={assets.avatar1} 
            width={sizes.md}
            height={sizes.md}>
          </Image>
          <Block flex={0} marginLeft={sizes.sm}>
            <Text p bold size={sizes.s * 1.6}>Andrey</Text>
            <Text p size={sizes.s * 1.5} color={colors.text}>{title}</Text>
          </Block>
        </Block>
        <Text size={sizes.s} marginRight={sizes.s}>11:23pm</Text>
      </Block>
    </TouchableOpacity>
  );
};

export default ChatUserItem;
