import Fonts from "libs/assets/fonts";
import { Button, Text, View } from "libs/ui";
import { moneyFormat } from "libs/utils/string-format";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import OrderStore from "app/model/order";
import { runInAction } from "mobx";
import { observer, useLocalObservable } from "mobx-react";
import React, { useEffect, useRef } from "react";
import OutletStore from "app/model/outlet";
import { Animated } from "react-native";

export default observer((props: any) => {
  const nav = useNavigation();
  const isFocused = useIsFocused();
  const { section, scrollState } = props;
  const meta = useLocalObservable(() => ({
    selectedProduct: 0,
  }));
  const animate = useRef(new Animated.Value(0)).current;
  const position = animate.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 80],
  });

  try {
  useEffect(() => {
    if (!!scrollState.direction) {
      if (scrollState.direction === "down") {
        Animated.spring(animate, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.spring(animate, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    } else {
      Animated.spring(animate, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [scrollState.direction]);
} catch (e: any) {
}

  useEffect(() => {
    let selectedProduct = OrderStore.currentOrder.orderLength;
    if (meta.selectedProduct != selectedProduct) {
      runInAction(() => (meta.selectedProduct = selectedProduct));
    }
  }, [isFocused, OrderStore.currentOrder.orderLength]);

  if (OrderStore.currentOrder.order.length === 0) return null;

  return (
    <Animated.View
      style={{
        position: "absolute",
        bottom: 80,
        left: 0,
        right: 0,
        transform: [
          {
            translateY: position,
          },
        ],
      }}
    >
      <Button
        style={{
          margin: 15,
          paddingVertical: 10,
          borderRadius: 999,
          backgroundColor: "#333",
        }}
        onPress={() => {
          OrderStore.currentOrder._loadJSON({
            outlet: OutletStore.currentOutlet.id,
            sales_order_date: new Date().toJSON(),
            delivery_date: new Date().toJSON(),
            loading: false,
          });
          nav.navigate("Checkout");
        }}
        disabled={OutletStore.currentOutlet.status !== "BUKA"}
      >
        <Text
          style={{
            fontFamily: Fonts.MontserratBold,
            color: "#fff",
          }}
        >
          {meta.selectedProduct} Item
        </Text>
        <Text
          style={{
            fontFamily: Fonts.MontserratBold,
            color: "#fff",
            position: "absolute",
            right: 15,
          }}
        >
          {moneyFormat(OrderStore.currentOrder.total)}
        </Text>
      </Button>
    </Animated.View>
  );
});
