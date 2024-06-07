import { useNavigation } from "@react-navigation/core";
import color from "app/config/color";
import { fontFamily, fontSize } from "app/config/const";
import { Button, Image, Text, View } from "libs/ui";
import { dateFormat } from "libs/utils/date";
import { observer } from "mobx-react";
import React from "react";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default observer((props: any) => {
  const { item } = props;
  const nav = useNavigation();
  const dim = Dimensions.get("window");
  const imgW = dim.width;
  const imgH = 185;


  return (
    <View style={{
        marginVertical:8,
        paddingHorizontal:15
      }}>
        <TouchableOpacity
        onPress={()=>{
          nav.navigate("MembershipView/Coupon",{data:{sales_order_number:item.sales_order_number}})
        }}
        >
        <View style={{
          flexDirection:"row",
          alignContent:"center",
          alignItems:"center",
          alignSelf:"center",
          flexGrow:1,    
        }}>
          <View style={{
            alignContent:"center",
            alignSelf:"center",
            flexGrow:1,
            // borderColor: color.natural_60,
            // borderWidth:1,
          }}>
            <Text
              style={{
                fontFamily: fontFamily.reguler,
                fontSize: fontSize.m,
                marginStart:4,
                color: color.natural_10,
            }}>
              {}
              {dateFormat(item.sales_order_date, "dd MMM yyyy - HH:mm")}
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.reguler,
                fontSize: fontSize.m,
                marginStart:4,
                color: color.natural_60,
            }}>
              {item.sales_order_number}
            </Text>
            {/* <Text
              style={{
                fontFamily: fontFamily.reguler,
                fontSize: fontSize.m,
                marginStart:4,
                color: color.natural_60,
            }}>
              {item.point} Pts
            </Text> */}
          </View>

          <View style={{
            flexDirection:"row",
          }}>
            {/* {item.statusCoupon == '-' ?(
              <Text
                style={{
                  fontFamily: fontFamily.bold,
                  fontSize: fontSize.m,
                  marginStart:4,
                  color: color.natural_10,
                }}>
              - {item.kupon.length} Coupon
              </Text>
            ):( */}
              <Text
                style={{
                  fontFamily: fontFamily.bold,
                  fontSize: fontSize.m,
                  marginStart:4,
                  color: color.secondary_main,
                }}>
                + {item.coupon_count} Coupon
              </Text>
            {/* )} */}
          </View>
        </View>      

        </TouchableOpacity>
        
      </View>
  );
});
