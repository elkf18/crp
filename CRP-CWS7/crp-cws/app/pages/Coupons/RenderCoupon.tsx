import { useNavigation } from "@react-navigation/core";
import color from "app/config/color";
import { fontFamily, fontSize } from "app/config/const";
import { Button, Image, Text, View } from "libs/ui";
import { observer } from "mobx-react";
import React from "react";
import { Dimensions } from "react-native";

export default observer((props: any) => {
    const { item } = props;
    const nav = useNavigation();
    const dim = Dimensions.get("window");
    const imgW = dim.width;
    const imgH = 185;

    return (
        <View style={{
            marginVertical: 6,
        }}>
            <View style={{
                flexDirection: "row",
                flexGrow: 1,
            }}>
                <Text
                    style={{
                        fontFamily: item.is_win?fontFamily.bold:fontFamily.reguler,
                        fontSize: fontSize.s,
                        color: item.is_win?color.secondary_main:color.natural_50,
                    }}>
                    {item.undian}
                </Text>
                <View
                style={{
                    flexGrow:1
                }}
                />
                <Text
                    style={{
                        fontFamily: item.is_win?fontFamily.bold:fontFamily.reguler,
                        fontSize: fontSize.s,
                        marginStart: 4,
                        color: item.is_win?color.secondary_main:color.natural_50,
                    }}>
                    {item.kode_kupon}
                </Text>
            </View>
        </View>
    );
});
