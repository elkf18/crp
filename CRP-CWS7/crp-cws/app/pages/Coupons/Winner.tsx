import { useRoute } from "@react-navigation/native";
import React, {Component, useEffect, useState} from 'react';
import {
    Image,
    ImageBackground,
    Screen,
    ScrollView,
    Text,
    TopBar,
    View,
} from "libs/ui";
import { Dimensions, RefreshControl, StyleSheet, ToastAndroid } from "react-native";

import MembershipStore, { MembershipLevel, Winner } from "app/model/membership";
import { observer, useLocalObservable } from "mobx-react";
import color from "app/config/color";
import { statusBarHeight } from "libs/ui/Screen";

import { fontFamily, fontSize } from "app/config/const";

function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    //console.log("scarooo -> "+value+": "+HistoryStore.detail.visible)
    return () => setValue(value => value + 1); // update the state to force render
  }

export default observer(() => {
    const dim = Dimensions.get("window");
    const route = useRoute()
    const { data }: any = route.params || {};
    const meta = useLocalObservable(() => ({
        dataWinner: {}
      }));
    const refresh = async () => {
        meta.dataWinner = MembershipStore.winner.load(data.no_kupon)
    };

    useEffect(()=>{
        refresh();
    },[data.no_kupon])

    const refreshControl = (
        <RefreshControl
          refreshing={MembershipStore.winner.isLoading}
          onRefresh={refresh}
        />
      );
    return (

        <Screen
            style={{
                backgroundColor: color.natural_100
            }}
        >
            <ImageBackground
                source={require("app/assets/images/winner_bg.jpg")}

                imageStyle={{
                    resizeMode: "contain",
                    height: 280,
                    padding: 99,
                    width: dim.width,
                    position: 'absolute',
                    top: 0,
                    alignSelf: "flex-start",
                    backgroundColor: color.primary_surface,
                    alignContent: 'flex-start',
                    alignItems: "flex-start"
                }}
            >

                <TopBar
                    style={{
                        backgroundColor: "#0000",
                        position: "absolute",
                        top: 0
                    }}
                    enableShadow={false}
                    backButton={true}
                    iconProps={{

                        color: color.natural_20,
                        name: "chevron-left",
                        source: "Entypo",
                        size: 28,

                    }}
                >
                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            paddingHorizontal: 40,
                            position: "absolute",
                            left: 0,
                            right: 0,
                            top: statusBarHeight + 5,
                        }}
                    >

                    </View>
                </TopBar>

                <ScrollView
                refreshControl={refreshControl}>

                    <View>
                        <View
                            style={{
                                backgroundColor: "#0000",
                                paddingHorizontal: 16,
                                marginTop: 40
                            }}>
                            <Image
                                source={require("app/assets/images/winner.png")}
                                style={{
                                    height: 190,
                                    width: 250,
                                }}
                            />

                        </View>

                        <View
                            shadow
                            style={{
                                borderRadius: 8,
                                backgroundColor: color.natural_100,
                                padding: 16,
                                marginTop: 12,
                                marginHorizontal: 16,
                                flexDirection: "column",
                                
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: fontFamily.bold,
                                    fontSize: fontSize.l,
                                    color: color.natural_20
                                }}
                            >
                                Congratulation, Lucky Draw Winner !
                            </Text>
                            <Text
                                style={{
                                    fontFamily: fontFamily.reguler,
                                    fontSize: fontSize.m,
                                    color: color.natural_20,
                                    marginTop:8
                                }}
                            >
                                {MembershipStore.winner.undian_name}
                            </Text>
                            <View
                            style={{
                                height:1,
                                borderTopColor:color.natural_90,
                                borderTopWidth:1,
                                marginVertical:16
                            }}
                            />
                            <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text
                                style={{
                                    fontFamily: fontFamily.reguler,
                                    fontSize: fontSize.s,
                                    color: color.natural_60,
                                }}
                            >
                                No. Lucky Draw
                            </Text>
                            <View
                            style={{
                                flexGrow:1
                            }}
                            />
                            <Text
                                style={{
                                    fontFamily: fontFamily.reguler,
                                    fontSize: fontSize.s,
                                    color: color.natural_20,
                                }}
                            >
                               {MembershipStore.winner.no_kupon}
                            </Text>

                            </View>
                            <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop:8
                            }}>
                                <Text
                                style={{
                                    fontFamily: fontFamily.reguler,
                                    fontSize: fontSize.s,
                                    color: color.natural_60,
                                }}
                            >
                                Reward
                            </Text>
                            <View
                            style={{
                                flexGrow:1
                            }}
                            />
                            <Text
                                style={{
                                    fontFamily: fontFamily.reguler,
                                    fontSize: fontSize.s,
                                    color: color.natural_20,
                                }}
                            >
                               {MembershipStore.winner.info}
                            </Text>

                            </View>
                            <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text
                                style={{
                                    fontFamily: fontFamily.reguler,
                                    fontSize: fontSize.s,
                                    color: color.natural_60,
                                    marginTop:8
                                }}
                            >
                                Pelanggan
                            </Text>
                            <View
                            style={{
                                flexGrow:1
                            }}
                            />
                            <Text
                                style={{
                                    fontFamily: fontFamily.reguler,
                                    fontSize: fontSize.s,
                                    color: color.natural_20,
                                    marginTop:8
                                }}
                            >
                               {MembershipStore.winner.winner_name}
                            </Text>

                            </View>
                            <Text
                                style={{
                                    fontFamily: fontFamily.reguler,
                                    marginTop:16,
                                    padding:4,
                                    textAlign: "center",
                                    color: color.info_main,
                                    fontSize: fontSize.s,
                                    backgroundColor:color.info_surface,
                                    borderRadius:4
                                }}
                            >
                                Pergi ke CS untuk mengambil reward anda
                            </Text>
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                marginHorizontal: 15,
                                alignItems: "center"
                            }}>
                            
                            <View style={{
                                flexGrow: 1
                            }} />

                        </View>

                    </View>

                </ScrollView>
            </ImageBackground>
        </Screen>



    );
}
)

