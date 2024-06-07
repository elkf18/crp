import React,{useState, useEffect} from 'react';
import animImages from './image';
import {Easing, StyleSheet, SafeAreaView, Image, Animated, Dimensions } from 'react-native';
function Remember(){
    const [textImg, setTextImg] = useState("textImg1");
    const [guy, setGuy] = useState("pertama");
    const [brainScale, setBrainScale] = useState(new Animated.Value(0));
    const [brainPos, setBrainPos] = useState(new Animated.Value(0));
    const [textImgAnim, setTextImgAnim] = useState(new Animated.Value(0));
    const [YPos, setYPos] = useState(0);

    const brainPosInterpolate=brainPos.interpolate({
        inptRange:[0,1],
        outputRange:[-500,150],
        extrapolate:'clamp'
    });
    const brainScalesInterpolate=brainScale.interpolate({
        inputRange:[0,1],
        outputRange:[0,1],
        extrapolate:'clamp'
    });
    const textImgPosInterpolate=textImgAnim.interpolate({
        inputRange:[0,1],
        outputRange:[yPos==0?300:-500, yPos==0?100:500],
    })
    const textImgScaleInterpolate=textImgAnim.interpolate({
        inptRange:[0,1],
        outputRange:[0,1],
        extrapolate:'clamp',
    })
    const brainTrans={
        transform:[
            {translateX:brainPosInterpolate},
            {scale:brainScalesInterpolate},
        ]
    }
    const textImgTrans={
        transform:[
            {translateX:textImgPosInterpolate},
            {scale:textImgScaleInterpolate},
        ]
    }
    const textImgTransY={
        transform:[
            {translateX:textImgPosInterpolate},
            {scale:textImgScaleInterpolate},
        ]
    }
    const moveTextImg=()=>{
        Animated.timing(brainPos,{
            toValue:1,
            duration:1000,
            useNativeDriver:true,
            easing:Easing.linear
        }).start(); 
    }
    useEffect(()=>{
        Animated.parallel([
            
            Animated.timing(brainScale,{
                toValue:1,
                duration:1000,
                useNativeDriver:true,
                easing:Easing.linear
            })
        ]).start(()=>{
            setTimeout(()=>{
                moveTextImg();
            },500)
        });
    },[])
    return(
        <SafeAreaView style={{flex:1, justifyContent:'flex-end;'}}>
            <Animated.View style={[styles.brain,brainTrans]}>
                <Image source={animImages[guy]}/>
            </Animated.View>
        </SafeAreaView>
    )
    const styles = StyleSheet.create({
        brain:{
            marginBottom:200
        }
    })
}

export default Remember;