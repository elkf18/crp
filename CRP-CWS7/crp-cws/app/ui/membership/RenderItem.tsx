import Fonts from "libs/assets/fonts";
import { Button, Image, Text, View } from "libs/ui";
import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React from "react";
import { moneyFormat } from "libs/utils/string-format";
import { dateFormat } from "libs/utils/date";
import { History } from "app/model/history/history";
import OrderStore from "app/model/order";
import OutletStore from "app/model/outlet";
import ProductStore from "app/model/product";
import HistoryStore from "app/model/history";
import { runInAction } from "mobx";
import { PointHistory } from "app/model/membership";

export default observer((props: any) => {
  const item: PointHistory = props.item;
  const useForceUpdate= props.useForceUpdate;
  const nav = useNavigation();


  return (
    <Button
      style={{
        borderRadius: 0,
        marginHorizontal:0,
        marginVertical:0,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        paddingHorizontal: 12,
        borderBottomColor:"#E5E5E5",
        borderBottomWidth:1,
        backgroundColor: "#fff",
      }}
      // onPress={goToDetail}
    >
      
      
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row"
            
          }}
        >
          
          <Text
            style={{
              fontSize: 12,
              color:"#B2B2B2"
            }}
          >
            {dateFormat(item.created_date, "d MMM - HH:mm")}
          </Text>
        </View>
        
        <Text
            style={{
              fontFamily: Fonts.MontserratBold,
              marginTop: 10,
              marginBottom:2,
              flex: 1,
            }}
          >
            Order #{item.sales_order_number}
          </Text>

        <Text
          style={{
            fontSize: 12,
            color:"#B2B2B2"
          }}
        >
          Berlaku s/d {item.expired_date}
        </Text>
        
      </View>

      <Text
        style={{
            fontFamily: Fonts.MontserratBold,
            color: item.poin>=0?"#AC9488":"#DB6464",
            textAlignVertical:"center",
            height:"100%"
        }}
        >
        {item.poin>0&&"+"}{item.poin} Pts
        </Text>
    </Button>
  );
});
