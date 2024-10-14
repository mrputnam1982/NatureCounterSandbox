import React from 'react';
import { Dimensions, ImageBackground, View, Platform } from 'react-native';
import { Row } from 'react-native-easy-grid';
import QuickLinkCard from '../Card/QuickLinkCard';

const QuickLinks = () => {


  //adjust position of the six quicklinkcards
  const cardWidth = 125;
  const gap = 0;
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const cardPositionW = (windowWidth - 3 * cardWidth + gap * 2) / 2;
  const cardHeight = 85;
  const cardPositionH = 12;
  return (
    <View>
      <View style={{left: cardPositionW, top: cardPositionH}}>
        <Row>
          <QuickLinkCard active={true} label={'Add Journal'} />
          {Platform.OS === 'android' ? (
            <QuickLinkCard active={true} label={'Explore'} />
          ) : (
            <QuickLinkCard active={false} label={'Explore'} />
          )}
          <QuickLinkCard active={true} label={'Edit Goal'} />
        </Row>
      </View>
      <View
        style={{left: cardPositionW, top: gap + cardPositionH + cardHeight}}>
        <Row>
          <QuickLinkCard active={true} label={'Articles'} />
          <QuickLinkCard active={false} label={'Favorites'} />
          <QuickLinkCard active={false} label={'See Benefits'} />
        </Row>
      </View>
    </View>
  );
};

const QuickLinksSection = () => {
  return (
    <ImageBackground
      source={require('../../assets/quick_link_rectangle.png')}
      style={{width: '100%', height: 220}}>
      <QuickLinks />
    </ImageBackground>
  );
};

export default QuickLinksSection;
