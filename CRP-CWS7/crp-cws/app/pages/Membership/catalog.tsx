import TopBar from "app/ui/utils/TopBar";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import color from "app/config/color";
import { fontFamily, fontSize } from "app/config/const";
import NewsStore from "app/model/news";
import useTheme from "libs/hooks/useTheme";
import { Button, Text, View, Icon, ScrollView, FlatList, Screen } from "libs/ui";
import { observer, useLocalObservable } from "mobx-react";
import React, { useEffect, useState } from "react";
import { Touchable, TouchableOpacity, Dimensions, SafeAreaView, Pressable, Alert, Modal, RefreshControl } from "react-native";
import RenderItem from "./RenderItem";
import { min } from "lodash";
import MembershipStore from "app/model/membership";
import ProductStore from "app/model/product";
import { moneyFormat } from "libs/utils/string-format";


export default observer(() => {
    const Theme = useTheme();
    const nav = useNavigation();
    const dim = Dimensions.get("window");
    const [modalVisible, setModalVisible] = useState(false);
    const meta = useLocalObservable(() => ({
        offset: 0
    }));

    const loadMore = () => {
        ProductStore.loadMore(meta.offset);
    };
    const refresh = () => {
        meta.offset = 0;
        loadMore();
    };
    useEffect(() => {
        refresh()
    }, [])
    const refreshControl = (
        <RefreshControl
            refreshing={ProductStore.loading}
            onRefresh={refresh}
        />
    );

    return (
        <Screen
            style={{
                backgroundColor: color.natural_100
            }}
        >
            {/* <ScrollView> */}
            <TopBar title="Rewards Catalogue" backgroundColor={color.secondary_main} />
            <View style={{ backgroundColor: color.secondary_main, }}>
                <View
                    style={{
                        marginTop: 40,
                    }}>
                    <View style={{
                        backgroundColor: 'white',
                        width: dim.width
                    }}>

                        <View
                            shadow
                            style={{
                                flexDirection: 'column',
                                borderRadius: 8,
                                margin: 15,
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
                                }} name="star-circle-outline" source="MaterialCommunityIcons" size={24} color={color.secondary_pressed} />
                                <View style={{ flexDirection: 'column', margin: 8 }}>
                                    <Text style={{ fontFamily: fontFamily.reguler, fontSize: fontSize.m, color: color.natural_60 }}>Points</Text>
                                    <Text style={{ fontFamily: fontFamily.medium, fontSize: fontSize.m, color: color.natural_20, }}>{moneyFormat(MembershipStore.credits)}</Text>
                                </View>
                            </View>

                        </View>

                    </View>
                </View>
            </View>
            <FlatList
                refreshControl={refreshControl}
                data={ProductStore.list}
                keyExtractor={(item) => String(item.id)}
                style={{

                    flexGrow: 1,

                }}
                renderItem={(props) => <RenderItem {...props} />}
                onEndReached={
                    () => {
                        if (!ProductStore.loading) {
                            meta.offset = ProductStore.list.length
                            loadMore()
                        }

                    }
                }
                onEndReachedThreshold={3}
            />
            {/* </ScrollView> */}
        </Screen>
    )
})

