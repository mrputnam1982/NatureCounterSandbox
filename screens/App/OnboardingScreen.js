import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform
} from 'react-native';
import Video from 'react-native-video';
import LottieView, {Lottie} from 'lottie-react-native';
import Carousel, {Pagination} from 'react-native-reanimated-carousel';
import Logo from '../../assets/Logo.svg';
import LogoText from '../../assets/LogoText.svg';
import Button from '../../components/Button/Button';
import TextBar from '../../components/Utilities/TextBar';
import {THEME_GREEN} from '../../components/Utilities/Constants';
import { useSharedValue } from 'react-native-reanimated';



const states = {
  SPLASH: 0,
  VIDEO: 1,
  VIDEO_IMAGE: 2,
  CAROUSEL: 3,
};


const OnboardingScreen = ({onEnd}) => {
  const progress = useSharedValue(0);
  const ref = React.useRef(null);

  const [isVertical, setIsVertical] = useState(false);
  const {width: viewportWidth} = Dimensions.get('window').width;
  const {height: viewportHeight} = Dimensions.get('window').height;
  // return(
  //   <View><Text>Onboarding screen reached</Text></View>
  // )
  const [state, setState] = useState(states.SPLASH);
  const [activeIndex, setActiveIndex] = useState(0);
  const [seconds, setSeconds] = useState(20);
  const [onLastItem, setOnLastItem] = useState(false);
  useEffect(() => {
    if (seconds === 0) {
      setState(states.CAROUSEL);
    }
  }, [seconds]);
  
  // useEffect(() => {
  //   console.log("Progress: ", progress);
  //   setOnLastItem(() => {progress === items.length - 1});
  // }, [progress])
  const isEnd = (index) => {
    let isEnd = index === items.length - 1;
    setOnLastItem(isEnd);
  }

  const renderCarouselItem = ({item}) => (
    <View style={styles.carouselItem}>
      <LottieView source={item.animation} autoPlay style={styles.itemAnimation} />
      <TextBar text={item.title} width={item.barWidth} />
      <Text style={styles.itemText}>{item.text}</Text>
    </View>
  );

  const items = [
    {
      animation: require('../../assets/OnboardingAnim1.json'),
      title: 'Track\nYour Progress',
      barWidth: 235,
      text: 'See your achievements as you set goals and work towards them.',
    },
    {
      animation: require('../../assets/OnboardingAnim2.json'),
      title: 'Nature\nAs Medicine',
      barWidth: 210,
      text:
        'Contact with nature is an affordable and equitable form of preventative and restorative medicine.',
    },
    {
      animation: require('../../assets/OnboardingAnim3.json'),
      title: 'Explore\nNature More',
      barWidth: 210,
      text:
        'Getting out into nature is for everyone—see how it can improve your wellbeing.',
    },
  ];

  

  if (state === states.SPLASH) setTimeout(() => setState(states.VIDEO), 2000);

  if (state === states.SPLASH) {
    return (
      <View style={styles.container}>
        <Logo style={styles.logo} />
        <LogoText />
      </View>
    );
  }

  if (state === states.VIDEO || state === states.VIDEO_IMAGE) {
    return (
      <>
        {state === states.VIDEO ? (
          <Video
            source={require('../../assets/Onboarding.mp4')}
            style={styles.coverVideo}
            onProgress={props =>
              setSeconds(Math.floor(props.seekableDuration - props.currentTime))
            }
            resizeMode="cover"
            onEnd={() => setState(states.VIDEO_IMAGE)}
          />
        ) : (
          <Image
            source={require('../../assets/OnboardingEndCard.png')}
            style={styles.image}
          />
        )}
        <TouchableOpacity
          style={styles.skipWrapper}
          onPress={() => setState(states.CAROUSEL)}>
          <Text style={styles.skipText}>
            {(state === states.VIDEO) ? `Skip (${seconds}s)` : 'Skip'}
          </Text>
        </TouchableOpacity>
      </>
    );
  }
  // console.log("On Last Item? ", onLastItem)


  if (state === states.CAROUSEL) {
    return (
      <View style={styles.container}>
        <Carousel
          ref={ref}
          vertical = {isVertical}
          width = {Dimensions.get('window').width}
          height = {viewportHeight}
          renderItem={renderCarouselItem}
          data={items}
          onProgressChange={progress}
          onSnapToItem = {(index) => isEnd(index)}
        />
        <Pagination.Basic
          progress={progress}
          data={items}
          dotStyle={styles.dotStyle}
          containerStyle={styles.dotContainer}
        />
        {/* <View style={styles.circles}>
          {items.map(({title}, i) => (
            <View
              key={title}
              style={[styles.circle, i === progress ? styles.active : null]}
            />
          ))}
        </View> */}
        <View style={styles.buttonContainer}>
          {onLastItem && <Button label="Let's Go!" onPress={onEnd} />}
        </View>
          {!onLastItem && (
          <TouchableOpacity style={styles.skipWrapper} onPress={onEnd}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    marginTop: -60,
    marginBottom: 24,
  },
  coverVideo: {
    ...Platform.select({
      android: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      },
      ios: {
        position: 'absolute',
        top: 25,
        left: 0,
        bottom: 0,
        right: 0,
      },
    }),
  },
  skipWrapper: {
    ...Platform.select({
      android: {
        position: 'absolute',
        top: 0,
        right: 0,
        margin: 12,
  
      },
      ios: {
        position: 'absolute',
        top: 35,
        right: 5,
        margin: 12,
      }
    }),
  },
  skipText: {
    color: '#A4A9AE',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  carouselItem: {
    margin: 24,
  },
  itemAnimation: {
    marginTop: 24,
    marginBottom: 56,
    width: '100%',
    height: '50%',
    alignSelf: 'center',
  },
  itemText: {
    color: '#1D2023',
    fontSize: 16,
  },
  circles: {
    flexDirection: 'row',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C4C4C4',
    marginHorizontal: 4,
  },
  dotContainer: { gap: 5, marginTop: 10 },
  dotStyle: { backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 50 },
  active: {
    backgroundColor: THEME_GREEN,
  },
  buttonContainer: {
    height: 90,
    justifyContent: 'center',
  },
});

export default OnboardingScreen;
