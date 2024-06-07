import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";

import Fonts from "libs/assets/fonts";
import useTheme from "libs/hooks/useTheme";
import {
    Button,
    FlatList,
    Icon,
    Image,
    ImageBackground,
    Screen,
    ScrollView,
    Text,
    TopBar,
    View,
} from "libs/ui";
import { ITheme } from "libs/config/theme";
import get from "lodash.get";
import { observer } from "mobx-react-lite";
import React, { Component, useEffect } from "react";
import Accordion from 'react-native-collapsible/Accordion';
import { Constants } from "react-native-unimodules";
import LaporStore from "app/model/lapor";
import * as Yup from "yup";
import OutletStore from "app/model/outlet";
import AppConfig from "libs/config/app";
import { Dimensions, RefreshControl, StyleSheet, ToastAndroid } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import MembershipStore, { MembershipLevel } from "app/model/membership";
import { dateFormat } from "libs/utils/date";
import color from "app/config/color";
import { statusBarHeight } from "libs/ui/Screen";
import SessionStore from "app/model/session";
import { fontFamily, fontSize } from "app/config/const";
import { TouchableOpacity } from "react-native-gesture-handler";
import { moneyFormat } from "libs/utils/string-format";
import ProductStore from "app/model/product";
import RenderItem from "./RenderItem";

export default observer(() => {
    const dim = Dimensions.get("window");
    const imgSize = (dim.width * 2) / 15

    let Image_User = { uri: AppConfig.serverUrl + SessionStore.user.foto };
    const nav = useNavigation();
    useEffect(() => {
        refresh()
    }, [])
    const refresh = () => {
        MembershipStore.member.load()

        MembershipStore.loadCountCoupon();
        ProductStore.loadMore(0);
    };

    const refreshControl = (
        <RefreshControl refreshing={MembershipStore.member.loading} onRefresh={refresh} />
    );
    // const route = useRoute();
    // const { data, onGoBack }: any = route.params || {};
    return (

        <Screen
            style={{
                backgroundColor: color.natural_100,
                height: "100%"
            }}
        >
            <ImageBackground
                source={require("app/assets/images/bg-member-page.jpg")}

                imageStyle={{
                    resizeMode: "cover",
                    height: SessionStore.features.lucky_draw ? 280 : 255,
                    width: dim.width,
                    position: 'absolute',
                    top: 0,
                    alignSelf: "flex-start",
                    backgroundColor: color.natural_100,
                    alignContent: 'flex-start',
                    alignItems: "flex-start"
                }}
                style={{
                    height: "100%"
                }}
            >

                <TopBar
                    style={{
                        backgroundColor: "#0000",
                    }}
                    enableShadow={false}
                    backButton={true}
                    iconProps={{

                        color: color.natural_100,
                        name: "chevron-left",
                        source: "Entypo",
                        size: 28,

                    }}
                // actionBackButton={() => {
                // if (!!onGoBack) {
                //     onGoBack();
                // } else {
                //     nav.goBack();
                // }
                // }}
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
                        <Image
                            source={require("app/assets/images/logo-white.png")}
                            style={{
                                width: 90,
                                height: 60,
                                margin: 0,
                            }}
                        />
                    </View>
                </TopBar>

                {/* <ScrollView refreshControl={refreshControl}> */}

                <View
                    style={{
                        height: dim.height - 85,
                    }}>
                    <View
                        style={{
                            backgroundColor: "#0000",
                            paddingHorizontal: 16,
                            marginBottom: 12,
                        }}>
                        <Image
                            source={Image_User}
                            style={{
                                height: imgSize,
                                width: imgSize,
                                borderWidth: 1,
                                borderColor: "#fff",
                                borderRadius: 4,
                                marginTop: 10
                            }}
                            resizeMode={"cover"}
                        />
                        <Text
                            style={{
                                fontSize: fontSize.l,
                                fontFamily: fontFamily.bold,
                                color: color.natural_100,
                                textAlign: "center",
                                marginTop: 8
                            }}
                        >
                            {SessionStore.user.name || ""}
                        </Text>

                        <View
                            style={{
                                flexDirection: "row",
                                alignContent: "center",
                                alignItems: "center",
                                alignSelf: "center",
                                marginTop: 8,
                                backgroundColor: "#ffffff11",
                                paddingHorizontal: 8,
                                paddingVertical: 10,
                                borderRadius: 8,
                                flexGrow: 1,
                            }}
                        >
                            <Icon name="star-circle-outline" source="MaterialCommunityIcons" size={24} color={color.primary_surface} />
                            <Text
                                style={{
                                    fontFamily: fontFamily.reguler,
                                    fontSize: fontSize.m,
                                    marginStart: 4,
                                    color: color.natural_100,
                                }}
                            >
                                Points
                            </Text>
                            <View
                                style={{
                                    flexGrow: 1
                                }}
                            />
                            <Text
                                style={{
                                    fontFamily: fontFamily.bold,
                                    fontSize: fontSize.xl,
                                    marginTop: 2,
                                    color: color.natural_100,
                                    textAlign: "center"
                                }}
                            >
                                {moneyFormat(MembershipStore.credits)}
                            </Text>

                        </View>


                    </View>

                    {SessionStore.features.lucky_draw ?
                        <View
                            shadow
                            style={{
                                borderRadius: 8,
                                backgroundColor: color.natural_100,
                                padding: 8,
                                marginHorizontal: 16,
                                flexDirection: "row",
                            }}
                        >
                            <Button
                                style={{
                                    padding: 8,
                                    flexGrow: 1,
                                    flex: 1,
                                    borderRadius: 8,
                                    backgroundColor: "#0000",
                                    alignContent: "flex-start",
                                    alignSelf: "flex-start",
                                    alignItems: "flex-start",

                                }}
                                onPress={() => {
                                    nav.navigate("MembershipView/Coupon")
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        flexGrow: 1
                                    }}>
                                    <Icon name="ticket-confirmation-outline" source="MaterialCommunityIcons" size={24} color={color.secondary_pressed}
                                        style={{
                                            backgroundColor: color.secondary_border,
                                            borderRadius: 4,
                                            padding: 8
                                        }} />
                                    <View
                                        style={{
                                            flexDirection: "column",
                                            alignSelf: "center",
                                            marginStart: 10
                                        }}>
                                        <Text
                                            style={{
                                                fontFamily: fontFamily.medium,
                                                fontSize: fontSize.s,
                                                color: color.natural_20
                                            }}
                                        >
                                            {moneyFormat(MembershipStore.count)}
                                        </Text>
                                        <Text
                                            style={{
                                                fontFamily: fontFamily.reguler,
                                                fontSize: fontSize.s,
                                                color: color.natural_50
                                            }}>
                                            Lucky Draw
                                        </Text>

                                    </View>
                                </View>
                            </Button>

                            {/* <Button
                                style={{
                                    padding: 8,
                                    flexGrow: 1,
                                    flex: 1,
                                    borderRadius: 8,
                                    backgroundColor: "#0000"
                                }}
                                onPress={() => {
                                    // nav.navigate("MembershipView/Catalog")
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        flexGrow: 1
                                    }}>
                                    <Icon name="gift-outline" source="MaterialCommunityIcons" size={24} color={color.secondary_pressed}
                                        style={{
                                            backgroundColor: color.secondary_border,
                                            borderRadius: 4,
                                            padding: 8
                                        }} />
                                    <View
                                        style={{
                                            flexDirection: "column",
                                            alignSelf: "center",
                                            marginStart: 10
                                        }}>
                                        <Text
                                            style={{
                                                fontFamily: fontFamily.medium,
                                                fontSize: fontSize.s,
                                                color: color.natural_20
                                            }}
                                        >
                                            0
                                        </Text>
                                        <Text
                                            style={{
                                                fontFamily: fontFamily.reguler,
                                                fontSize: fontSize.s,
                                                color: color.natural_50
                                            }}>
                                            E-Voucher
                                        </Text>

                                    </View>
                                </View>
                            </Button> */}


                        </View>
                        :
                        <View />}

                    <View
                        style={{
                            flexDirection: "row",
                            marginHorizontal: 15,
                            alignItems: "center"
                        }}>
                        <Text
                            style={{
                                fontFamily: fontFamily.bold,
                                marginTop: 15,
                                textAlign: "center",
                                color: color.natural_20,
                                fontSize: fontSize.l,
                            }}
                        >
                            Special for you
                        </Text>
                        <View style={{
                            flexGrow: 1
                        }} />
                        <TouchableOpacity
                            onPress={() => {
                                nav.navigate("MembershipView/Catalog")
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: fontFamily.medium,
                                    marginTop: 15,
                                    textAlign: "center",
                                    color: color.secondary_main,
                                    fontSize: fontSize.s,
                                }}
                            >
                                Lihat Semua
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        refreshControl={refreshControl}
                        data={ProductStore.getCurrentProduct}
                        keyExtractor={(item) => String(item.id)}
                        style={{

                        }}
                        renderItem={(props) => <RenderItem {...props} />}

                    />

                </View>

                {/* </ScrollView> */}
            </ImageBackground>
        </Screen>



    );
}
)

