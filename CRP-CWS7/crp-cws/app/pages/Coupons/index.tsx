import TopBar from "app/ui/utils/TopBar";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import color from "app/config/color";
import { fontFamily, fontSize } from "app/config/const";
import useTheme from "libs/hooks/useTheme";
import { Button, Text, View, Icon, ScrollView, SectionList } from "libs/ui";
import { observer, useLocalObservable } from "mobx-react";
import React, { useEffect, useState, useRef } from "react";
import { Dimensions, SafeAreaView, Pressable, Alert, Modal, RefreshControl } from "react-native";

import { dateFormat } from "libs/utils/date";
import RenderCoupon from "./RenderCoupon";
import { TouchableOpacity } from "react-native-gesture-handler";
import MembershipStore from "app/model/membership";
import { moneyFormat } from "libs/utils/string-format";


export default observer(() => {
    const dim = Dimensions.get("window");
    const route = useRoute()
    const { data }: any = route.params || {};



    useEffect(() => {
        if (!!data) {
            MembershipStore.filterCoupon.search = data.sales_order_number;
        }

        refresh();
        return (() => {
            MembershipStore.filterCoupon.search = "";
        })
    }, []);

    const refresh = async () => {
      MembershipStore.loadCoupon();
    }
    const refreshControl = (
      <RefreshControl refreshing={MembershipStore.loading} onRefresh={refresh} />
    );


    const getKupon = () => {

        return MembershipStore.getCouponList
            .map((d: any) => {
                let kupon = d.kupon.filter((x: any) => {

                    return true;
                });

                return {
                    ...d,
                    data: kupon,
                };
            })
            .filter((x: any) => x.data.length > 0);
    }

    return (
        <>
            <TopBar title="Lucky Draw" backgroundColor={color.secondary_main} />
            {/* <ScrollView> */}
            <View style={{ backgroundColor: color.secondary_main, }}>
                <View
                    style={{
                        marginTop: 50,
                    }}>
                    <View style={{ backgroundColor: 'white', width: dim.width, height: dim.height }}>

                        <View
                            shadow
                            style={{
                                flexDirection: 'column',
                                borderRadius: 8,
                                marginHorizontal: 15,
                                backgroundColor: color.natural_100, marginTop: -30
                            }}>
                            <View style={{
                                flexDirection: "row",
                                alignContent: "center",
                                alignItems: 'flex-start',
                                // alignSelf:"center",
                                flexGrow: 0,
                            }}>
                                <Icon style={{
                                    backgroundColor: color.secondary_border,
                                    margin: 10, padding: 10, flexGrow: 0, borderRadius: 4,
                                }} name="ticket-confirmation-outline" source="MaterialCommunityIcons" size={24} color={color.secondary_pressed} />
                                <View style={{ flexDirection: 'column', margin: 8 }}>
                                    <Text style={{ fontFamily: fontFamily.reguler, fontSize: fontSize.m, color: color.natural_60 }}>
                                        Lucky Draw
                                    </Text>
                                    <Text style={{ fontFamily: fontFamily.medium, fontSize: fontSize.m, color: color.natural_20, }}>
                                    
                                        {moneyFormat(
                                            !!MembershipStore.filterCoupon.search?
                                            MembershipStore.couponCount
                                            :
                                            MembershipStore.count
                                        )}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        {!!MembershipStore.filterCoupon.search &&
                            <View
                                style={{
                                    flexDirection: "row",
                                    marginTop: 18,
                                    marginHorizontal: 16
                                }}>
                                <Text
                                    style={{
                                        fontFamily: fontFamily.medium,
                                        fontSize: fontSize.s,
                                        color: color.natural_20,
                                        backgroundColor: color.secondary_surface,
                                        borderColor: color.secondary_border,
                                        borderRadius: 999,
                                        paddingHorizontal: 10,
                                        paddingVertical: 4,
                                        borderWidth: 1
                                    }}>
                                    {MembershipStore.filterCoupon.search}
                                </Text>
                                <View
                                    style={{
                                        flexGrow: 1,

                                    }}
                                />
                                <TouchableOpacity
                                    onPress={() => {
                                        MembershipStore.filterCoupon.search = "";
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: fontFamily.medium,
                                            fontSize: fontSize.s,
                                            color: color.primary_main,
                                            borderRadius: 999,
                                            paddingHorizontal: 10,
                                            paddingVertical: 4
                                        }}>
                                        Clear
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        }                       

                        <SectionList
                            // sectionListRef={refList}
                            refreshControl={refreshControl}
                            sections={getKupon()}
                            style={{

                            }}
                            nestedScrollEnabled={false}
                            keyExtractor={(item, index) => item + index}
                            renderItem={({ item }: any) => <RenderCoupon item={item} />}

                            renderSectionHeader={({ section: { sales_order_date, sales_order_number } }) => (
                                <View style={{
                                    flexDirection: "row",
                                    backgroundColor: "#F5F5F5",
                                    marginHorizontal: -15,
                                    paddingHorizontal: 16,
                                    paddingVertical: 4,
                                    marginVertical: 6
                                }}>
                                    <Text style={{
                                        fontFamily: fontFamily.medium,
                                        fontSize: fontSize.s,
                                    }}>
                                        {dateFormat(sales_order_date, 'dd MMM yyyy')}
                                    </Text>
                                    <View style={{ flexGrow: 1 }} />
                                    <Text style={{
                                        fontFamily: fontFamily.medium,
                                        fontSize: fontSize.s,
                                    }}>
                                        {sales_order_number}
                                    </Text>
                                </View>

                            )}
                            contentContainerStyle={{
                                paddingBottom: 180,
                            }}
                        />

                    </View>
                </View>
            </View>
            {/* </ScrollView> */}
        </>
    )
})