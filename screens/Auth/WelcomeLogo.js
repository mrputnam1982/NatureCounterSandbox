import React from 'react';
import { View } from 'react-native';
import LeafLogo from '../../assets/Logo.svg';
import LeaflessLogo from '../../assets/LogoLeafless.svg';
import TextBar from '../../components/Utilities/TextBar';

const WelcomeLogo = ({
  text, width, large, leaf = true,
}) => {
  const Logo = leaf ? LeafLogo : LeaflessLogo;

  return (
    <View>
      <Logo
        style={{
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          resizeMode: 'contain',
        }}
        width={large ? 216 : 90}
        height={large ? 216 : 90}
      />

      <TextBar text={text} width={width} />
    </View>
  );
};

export default WelcomeLogo;
