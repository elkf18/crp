import TopBar from "app/ui/utils/TopBar";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import color from "app/config/color";
import { fontFamily, fontSize } from "app/config/const";
import NewsStore from "app/model/news";
import useTheme from "libs/hooks/useTheme";
import { Button, Text, View, Icon} from "libs/ui";
import { observer } from "mobx-react";
import React from "react";
import { Touchable, TouchableOpacity, Dimensions, SafeAreaView} from "react-native";
import RenderItem from "./RenderItem";
import { min } from "lodash";

export default observer(() => {
    const Theme = useTheme();
    const nav = useNavigation();
    const dim = Dimensions.get("window");
    return(
        <>
        <View>
        
        </View>
        <TopBar title="Catalog" style={{backgroundColor:'yellow !important'}}/>
        <View style={{backgroundColor:color.secondary_main,}}>
            <View
            style={{
            marginTop: 80,
            }}>
            <View style={{ backgroundColor:'white', }}>
                
            <View style={{
                flexDirection:'column', 
                // flexGrow: 0,
                borderRadius: 8, 
                margin:15, 
                backgroundColor:color.natural_100,  marginTop:-30}}>
                <View style={{
                    flexDirection:"row",
                    alignContent:"center",
                    alignItems:'flex-start',
                    // alignSelf:"center",
                    flexGrow:0,
                    }}>
                    <Icon style={{backgroundColor:color.secondary_border,
                        margin:10,padding:10, flexGrow: 0,borderRadius:20, }} name="star-circle-outline" source="MaterialCommunityIcons" size={24} color={color.secondary_pressed} />
                    <View style={{flexDirection:'column', margin:8}}>
                        <Text style={{fontFamily: fontFamily.reguler, fontSize: fontSize.m,color: color.natural_60}}>Points</Text>
                        <Text style={{fontFamily: fontFamily.medium, fontSize: fontSize.m, color: color.natural_20,}}>100000</Text>
                    </View>
                </View>
                
            </View>
            <View style={{width:dim.width, height:dim.height,marginTop:'30%'}}>
                <Icon style={{alignSelf:'center',alignContent:'center' }} name="star-circle-outline" source="MaterialCommunityIcons" size={120} color={color.primary_border} />
                <Text style={{alignSelf:'center',  alignItems:'flex-end',fontFamily:fontFamily.reguler, fontSize:fontSize.l,color:color.natural_20}}>Coming Soon..</Text>
            </View>
           
            </View>
            </View>
        </View>
        </>
    )
})