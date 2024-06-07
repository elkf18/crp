import { StackActions, useNavigation } from "@react-navigation/native";
import HistoryStore from "app/model/history";
import MembershipStore from "app/model/membership";
import OrderStore from "app/model/order";
import SessionStore from "app/model/session";
import ConfirmModal from "app/ui/utils/ConfirmModal";
import Fonts from "libs/assets/fonts";
import useTheme from "libs/hooks/useTheme";
import { Button, Checkbox, ChoiceGroup, Image, Text, View } from "libs/ui";
import { moneyFormat } from "libs/utils/string-format";
import { runInAction } from "mobx";
import { observer, useLocalObservable } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useWindowDimensions } from "react-native";

export default observer(() => {
  const nav = useNavigation();
  const dim = useWindowDimensions();
  const meta = useLocalObservable(() => ({
    visible: false,
  }));
  const dismiss = () => {
    runInAction(() => (meta.visible = false));
  };
  useEffect(()=>{
    MembershipStore.loadPoin()
    OrderStore.currentOrder.pointUsed=0;
  },[])

  return (
    <>
      <View
        style={{
          justifyContent: "space-between",
          borderTopWidth: 4,
          borderColor: "#efefef",
          padding: 20,
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: Fonts.MontserratBold,
            }}
          >
            Metode Pembayaran
          </Text>
          <ChoiceGroup
            value={OrderStore.currentOrder.method}
            onChangeValue={(value) => {
              runInAction(() => {
                OrderStore.currentOrder.method = value;
              });
            }}
            items={[
              { label: "OVO", value: "OVO" },
              { label: "GOPAY", value: "GOPAY" },
            ]}
            styles={{
              choiceWrapper: {
                flexDirection: "row",
                justifyContent: "space-between",
              },
            }}
            renderItem={(props) => {
              const Theme = useTheme();
              const { item, isSelected } = props;
              const source =
                item.value === "OVO"
                  ? require("app/assets/images/ovo.png")
                  : require("app/assets/images/gopay.png");
              const width = (dim.width - 50) / 2;

              return (
                <View
                  style={{
                    backgroundColor: isSelected
                      ? Theme.colors.primary + 50
                      : "#fff",
                    borderRadius: 8,
                    borderWidth: 2,
                    borderColor: isSelected ? Theme.colors.primary : "#efefef",
                  }}
                >
                  <Image
                    source={source}
                    style={{
                      width: width,
                      height: (3 / 4) * width,
                    }}
                  />
                </View>
              );
            }}
          />
        </View>
        <View
        style={{
          borderWidth:1,
          borderColor:"#E5E5E5",
          padding:10,
          borderRadius:8
        }}>
          <Text
          style={{
            color:"#967869",
            fontFamily:Fonts.MontserratBold
          }}>
            Jokopi Points
          </Text>
          <Text
          style={{
            color:"#808080",
            fontFamily:Fonts.MontserratRegular,
            marginTop:5
          }}>
            1 Jokopi Points = 1 Rupiah
          </Text>

          <View
            style={{
              
              backgroundColor:"#F5F5F5",
              
              borderRadius:8,
              flexDirection:"row",
              alignContent:"center",
              alignItems:"center",
              padding:10,
              marginTop:10
            }}>
               <Checkbox styles={{
                 item:{
                   marginBottom:0
                 },
                 label:{
                  color:"#000",
                  fontFamily:Fonts.MontserratRegular,
                 }

               }}
               initValue={false}
               label="Pakai points"
               onChange={(isChecked)=>{
                 if(isChecked){
                    OrderStore.currentOrder.pointUsed = OrderStore.currentOrder.getUsablePoint
                 }else{
                  OrderStore.currentOrder.pointUsed = 0;
                 }
               }}
               />
              
              <Text
              style={{
                color:"#967869",
                fontFamily:Fonts.MontserratRegular,
                
              }}>
                {OrderStore.currentOrder.getUsablePoint}{" Pts"}
              </Text>
          </View>
        </View>
        <View
          style={{
            height:1,
            width:"100%",
            backgroundColor:"#E5E5E5",
            marginVertical:16
          }}
        />
        <View
          style={{
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.MontserratBold,
              color: "#000",
            }}
          >
            Total Pembayaran
          </Text>
          <Text
            style={{
              fontFamily: Fonts.MontserratBold,
              fontSize: 24,
              color: "#000",
            }}
          >
            {moneyFormat(OrderStore.currentOrder.total - OrderStore.currentOrder.pointUsed)}
          </Text>

            {OrderStore.currentOrder.pointUsed > 0 &&
            <Text
            style={{
              fontFamily: Fonts.MontserratBold,
              fontSize: 14,
              color: "#808080",
              textDecorationLine: 'line-through', 
              textDecorationStyle: 'solid'
            }}
          >
            {moneyFormat(OrderStore.currentOrder.total)}
          </Text>
            }
          

        </View>
        <Button
          style={{
            margin: 0,
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 99,
            backgroundColor: "#333",
          }}
          onPress={async () => {
            runInAction(() => (meta.visible = true));
          }}
          disabled={!OrderStore.currentOrder.canCheckout && !OrderStore.loading}
        >
          <Text
            style={{
              fontFamily: Fonts.MontserratBold,
              color: "#fff",
            }}
          >
            {OrderStore.loading?"Sedang memesan":"Pesan Sekarang"}
          </Text>
        </Button>
      </View>
      <ConfirmModal
        title="Apakah kamu yakin order yang kamu masukkan sudah benar?"
        subtitle="Pesanan yang sudah dibuat tidak bisa dibatalkan"
        visible={meta.visible}
        onPressYes={async () => {
          meta.visible=false
          const res = await OrderStore.confirmOrder();
          if (!!res) {
            if (typeof res === "object") {
              //HistoryStore.detail.initialize(res);
              nav.navigate("DetailHistory");
            }
            nav.dispatch(StackActions.replace("DetailHistory"));
            
            // try{
            //   nav.dispatch(StackActions.replace("Home"));
            //    nav.navigate("History");
            //    nav.navigate("DetailHistory");
            // }catch(e:any){

            // }
            
            
          }
          //dismiss();
        }}
        onPressNo={dismiss}
      />
    </>
  );
});
