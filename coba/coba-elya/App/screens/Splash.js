import React, {useRef, useEffect} from 'react';
import {StyleSheet, Animated, Easing} from 'react-native';
export default function App() {
   const backgroundFade = useRef(new Animated.Value(0)).current;
   const backgroundFade2 = useRef(new Animated.Value(0)).current;
   const logoFade = useRef(new Animated.Value(0)).current;
   const logoFade2 = useRef(new Animated.Value(0)).current;
   const logoMovement = useRef(new Animated.Value(0)).current;
   const logoMovement2 = useRef(new Animated.Value(0)).current;
   useEffect(() => {
      Animated.timing(backgroundFade, {
         toValue: 1,
         duration: 2000,
         useNativeDriver: true,
      }).start();
      Animated.timing(logoFade, {
         toValue: 1,
         duration: 2000,
         useNativeDriver: true,
      }).start();
      setTimeout(() => {
         Animated.timing(logoMovement, {
               toValue: -250,
               duration: 2000,
               easing: Easing.inOut(Easing.exp),
               useNativeDriver: true,
         }).start();
      }, 2250);
      Animated.timing(backgroundFade, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
     }).start();
     Animated.timing(logoFade2, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
     }).start();
     setTimeout(() => {
        Animated.timing(logoMovement2, {
              toValue: -250,
              duration: 2000,
              easing: Easing.inOut(Easing.exp),
              useNativeDriver: true,
        }).start();
     }, 2250);
   }, []);
   const styles = StyleSheet.create({
      container: {
         flex: 2,
         alignItems: 'center',
         justifyContent: 'center',
         backgroundColor: 'orange',
         opacity: backgroundFade,
         Animated:
      },
      container2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'pink',
        opacity: backgroundFade2,
     },
      logo: {
         color: 'white',
         fontSize: 48,
         fontWeight: 'bold',
         opacity: logoFade,
         transform: [{translateY: logoMovement}],
      },
      logo2: {
        color: 'black',
        fontSize: 48,
        fontWeight: 'bold',
        opacity: logoFade2,
        transform: [{translateY: logoMovement2}],
     },
   });
   return (
      <Animated.View style={styles.container}>
         <Animated.Text style={styles.logo}>Logo</Animated.Text>
         <Animated.Text style={styles.logo2}>Logo</Animated.Text>
      </Animated.View>
   );
}