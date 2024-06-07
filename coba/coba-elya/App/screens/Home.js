import React from 'react';
import Lottie from 'lottie-react-native';
import { StyleSheet,Dimensions, Image} from 'react-native';
// import {useWindowDimensions} from 'react-native';

// const windowWidth = useWindowDimensions().width;
// const windowHeight = useWindowDimensions().height;
export default function Animation() {
  const dim = Dimensions.get("window");
  return (
    <Image source={require('./onboarding3.gif')} style={{width:dim.width}}/>
    // <Lottie source={require('./onboarding.json')} autoPlay loop resizeMode='center' />
  );
}
const styles = StyleSheet.create({
  lottie:{
    position: 'absolute',
    width: '100%',
    height: '100%',
    top:0,
    left: 0,
    // min-inline-size: max-content;
  }
})