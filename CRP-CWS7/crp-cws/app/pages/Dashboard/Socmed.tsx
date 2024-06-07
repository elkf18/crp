import color from "app/config/color";
import { fontFamily, fontSize } from "app/config/const";
import EventStore from "app/model/event";
import NewsStore from "app/model/news";
import useTheme from "libs/hooks/useTheme";
import { Button, Image, ScrollView, Text, View } from "libs/ui";
import { observer } from "mobx-react";
import React from "react";
import { Linking, Touchable, TouchableOpacity } from "react-native";
import RenderItem from "../Event/RenderItem";
import { useNavigation } from "@react-navigation/core";


export default observer(() => {
    const Theme = useTheme();
    const nav = useNavigation();

    const sns = [
        {
            label: "Facebook",
            icon: require("app/assets/images/icon/sns_fb.png"),
            link: "https://www.facebook.com/ciputraworldsby/"
        },
        {
            label: "Tiktok",
            icon: require("app/assets/images/icon/sns_tt.png"),
            link: "https://vt.tiktok.com/ZSePaE6Fa/"
        },
        {
            label: "Youtube",
            icon: require("app/assets/images/icon/sns_yt.png"),
            link: "https://youtube.com/user/CiputraWorldSurabaya"
        },
        {
            label: "Instagram",
            icon: require("app/assets/images/icon/sns_ig.png"),
            link: "https://www.instagram.com/ciputraworldsby/"
        }

    ]


    return (
        <View
            style={{
                paddingTop: 24,
                flex: 1,
                backgroundColor: color.primary_main,
                paddingBottom: 120,
            }}
        >
            <View style={{
                flexGrow: 1,
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "space-evenly",
                width: "90%",
            }}>
                {sns.map((item, key) => {
                    return <RenderMenu key={key} item={item} />;
                })}
            </View>


        </View>
    );
});

const RenderMenu = observer((props: any) => {
    const { item } = props;
    return (
        <Button
            mode="clean"
            style={{
                margin: 0,
                height: 44,
                width: 44,
                flexShrink: 1,
                paddingHorizontal: 0,
                justifyContent: "center",
                borderColor: "#ccc",
                borderRadius: 99,
                backgroundColor: color.secondary_main
            }}
            onPress={()=>{
                Linking.openURL(item.link).then();
            }}
        >
            <Image
                source={item.icon}
                style={{
                    height: 24,
                    width: 24,
                }}
            />
        </Button>

    );
});
