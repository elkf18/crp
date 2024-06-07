import Fonts from "libs/assets/fonts";
import { Button, LinierGradient, Text, View } from "libs/ui";
import { moneyFormat } from "libs/utils/string-format";
import { useNavigation } from "@react-navigation/native";
import OrderStore from "app/model/order";
import { observer, useLocalObservable } from "mobx-react";
import React from "react";
import { runInAction } from "mobx";

export default observer(() => {
  const nav = useNavigation();
  const meta = useLocalObservable(() => ({
    expand: false,
  }));
  const data = [...OrderStore.currentOrder.orderItem];
  ////console.log(data)
  if (!meta.expand && data.length > 4) {
    data.splice(0, 2);
  }

  data.map((item, key) => {
    if(item.getDetailProduct.product_name===null||item.getDetailProduct.product_name===""){
      data.splice(key,1);
      OrderStore.currentOrder.orderItem.splice(key,1);
    }
  })

  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <View>
        {data.map((item, key) => {
          
          return (
            <View
              key={key}
              style={{
                flexDirection: "row",
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: Fonts.MontserratBold,
                }}
              >
                {item.qty}x
              </Text>
              <View
                style={{
                  marginHorizontal: 15,
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    fontFamily: Fonts.MontserratBold,
                    marginBottom: 5,
                  }}
                >
                  {item.getDetailProduct.product_name}
                </Text>
                {item.complements.length > 0 && (
                  <Text
                    style={{
                      marginBottom: 5,
                      fontSize: 12,
                    }}
                  >
                    {item.complements.map((x: any) => x.name).join(", ")}
                  </Text>
                )}
                <Text
                  style={{
                    marginBottom: 5,
                    fontSize: 12,
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {!!item.remarks ? item.remarks : "Tidak ada catatan."}
                </Text>
                <Button
                  mode="clean"
                  style={{
                    alignSelf: "flex-start",
                    paddingHorizontal: 15,
                    margin: 0,
                    backgroundColor: "#efefef",
                    paddingVertical: 2,
                  }}
                  onPress={() => {
                    OrderStore.updateProduct(item);
                    nav.navigate("DetailProduct");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                    }}
                  >
                    Ubah/Hapus
                  </Text>
                </Button>
              </View>
              <Text
                style={{
                  fontFamily: Fonts.MontserratBold,
                }}
              >
                {moneyFormat(item.total)}
              </Text>
            </View>
          );
        })}

        {OrderStore.currentOrder.orderItem.length > 3 && (
          <LinierGradient
            colors={["#ffffff00", "#fff", "#fff"]}
            start={{
              x: 0,
              y: 0,
            }}
            style={{
              position: meta.expand ? "relative" : "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: 10,
            }}
          >
            <Button
              mode="clean"
              style={{
                marginTop: 15,
                paddingVertical: 5,
                borderRadius: 99,
                alignSelf: "center",
              }}
              onPress={() => {
                runInAction(() => (meta.expand = !meta.expand));
              }}
            >
              <Text
                style={{
                  fontFamily: Fonts.MontserratBold,
                  color: "#000",
                  textDecorationLine: "underline",
                }}
              >
                {meta.expand ? "Sembunyikan" : "Lihat"}{" "}
                {OrderStore.currentOrder.orderItem.length - 3} lainnya
              </Text>
            </Button>
          </LinierGradient>
        )}
      </View>
      <Button
        style={{
          marginTop: 15,
          paddingVertical: 5,
          borderRadius: 99,
          alignSelf: "center",
        }}
        onPress={() => {
          nav.navigate("Menu");
          // nav.goBack();
        }}
      >
        <Text
          style={{
            fontFamily: Fonts.MontserratBold,
            color: "#fff",
          }}
        >
          Tambah Item
        </Text>
      </Button>
    </View>
  );
});
