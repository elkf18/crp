import { useIsFocused, useNavigation } from "@react-navigation/native";
import OrderStore from "app/model/order";
import TopBar from "app/ui/utils/TopBar";
import { Screen, ScrollView, Spinner, View } from "libs/ui";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { AppState, Dimensions, Platform } from "react-native";
import List from "./List";
import OrderMethod from "./OrderMethod";
import Payment from "./Payment";



export default observer(() => {
  const dim = Dimensions.get("window");
  const nav = useNavigation();
  const isFocused = useIsFocused();

//   AppState.addEventListener('change', (nextAppState) => {
//     if (nextAppState === 'active') {
//       alert(isFocused)
//   //     messaging().getInitialNotification()
//   // .then(payload => {
//   //    alert(payload)
//   //   if(!!payload){
//   //     let item = payload.data;
//   //     switch (item.type) {
//   //       case "News":
//   //         NewsStore.detail.init(item);
//   //         nav.navigate("DetailNews");
//   //         break;
//   //       case "Order_Paid":
//   //         runInAction(()=>{
//   //           HistoryStore.detail.reset();
//   //           HistoryStore.detail.sales_order_number=item.ref_no;
//   //         })
//   //         nav.navigate("DetailHistory");
//   //         break;
//   //       case "Order_Completed":
//   //         runInAction(()=>{
//   //           HistoryStore.detail.reset();
//   //           HistoryStore.detail.sales_order_number=item.ref_no;
//   //         })
//   //         nav.navigate("DetailHistory");
//   //         break;
//   //       default:
//   //         // NotificationStore.detail.init(item._json);
//   //         // nav.navigate("DetailInbox");
//   //         break;
//   //     }
//   //   }else{

//   //   }
//   // });
//     }
// });



  return (
    <Screen
      style={{
        backgroundColor: "white",
      }}
      statusBar={{
        barStyle: "dark-content",
        backgroundColor: "#fff",
      }}
    >
      <TopBar title="Checkout" />
      <ScrollView
        style={{
          backgroundColor: "#fff",
        }}
      >
        <OrderMethod />
        <List />
        <Payment />
      </ScrollView>
      <LoadingComp />
    </Screen>
  );
});

const LoadingComp = observer(() => {
  if (!OrderStore.currentOrder.loading) return null;

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00000040",
      }}
    >
      <View
        style={{
          padding: 15,
          borderRadius: 8,
          backgroundColor: "#fff",
        }}
      >
        <Spinner />
      </View>
    </View>
  );
});
