import Fonts from "libs/assets/fonts";
import { Button, Icon, Modal, ScrollView, Text, View } from "libs/ui";
import { moneyFormat } from "libs/utils/string-format";
import { useNavigation } from "@react-navigation/native";
import OrderStore from "app/model/order";
import ProductStore from "app/model/product";
import { runInAction } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { TouchableOpacity, useWindowDimensions } from "react-native";

export default observer(() => {
  const dim = useWindowDimensions();
  const nav = useNavigation();
  const productId = OrderStore.openProduct;

  if (!productId) return null;

  const product = ProductStore.loadProductComplement(productId);
  const dismiss = () => runInAction(() => (OrderStore.openProduct = null));

  return (
    <Modal
      visible={!!OrderStore.openProduct}
      onDismiss={dismiss}
      style={{
        justifyContent: "flex-end",
      }}
    >
      <TouchableOpacity
        onPress={(e) => {
          e.stopPropagation();
          dismiss();
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#0004",
          justifyContent: "flex-end",
        }}
      />
      <View
        style={{
          justifyContent: "flex-end",
          maxHeight: (3 / 4) * dim.height,
          width: dim.width,
        }}
      >
        <Button
          onPress={dismiss}
          mode="clean"
          style={{
            alignSelf: "flex-end",
            paddingHorizontal: 5,
            paddingVertical: 5,
            borderWidth: 1,
            borderColor: "#fff",
            borderRadius: 99,
            width: 40,
            height: 40,
          }}
        >
          <Icon name="md-close" size={25} color="#fff" />
        </Button>
        <View
          style={{
            backgroundColor: "#fff",
            position: "relative",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 15,
              marginTop: 15,
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.MontserratBold,
                flex: 1,
              }}
            >
              {product.product_name}
            </Text>
            <View
              style={{
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  fontFamily: Fonts.MontserratBold,
                }}
              >
                {moneyFormat(product.price)}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  color: "#aaa",
                }}
              >
                Base Price
              </Text>
            </View>
          </View>
          <ScrollView
            style={{
              paddingBottom: 50,
            }}
          >
            <View
              style={{
                padding: 15,
              }}
            >
              {OrderStore.currentOrder.orderItem
                .filter((x) => x.id_product === productId)
                .map((item, key) => {
                  return <RenderItem key={key} item={item} dismiss={dismiss} />;
                })}
            </View>
          </ScrollView>
          <Button
            style={{
              paddingVertical: 10,
              borderRadius: 999,
              margin: 15,
              backgroundColor: "#333",
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
            }}
            onPress={() => {
              dismiss();
              OrderStore.setTempProductOrder(product);
              nav.navigate("DetailProduct");
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.MontserratBold,
                color: "#fff",
              }}
            >
              Tambah Custom Lain
            </Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
});

const RenderItem = observer((props: any) => {
  const { item, dismiss } = props;
  const nav = useNavigation();

  return (
    <View
      style={{
        flexDirection: "row",
        marginBottom: 10,
      }}
    >
      <Text>{item.qty}x</Text>
      <View
        style={{
          marginHorizontal: 15,
          flex: 1,
        }}
      >
        {item.complements.length > 0 && (
          <Text>{item.complements.map((x: any) => x.name).join(", ")}</Text>
        )}
        <Button
          mode="clean"
          style={{
            alignSelf: "flex-start",
            paddingHorizontal: 10,
            paddingVertical: 5,
            margin: 0,
            backgroundColor: "#ddd",
          }}
          onPress={() => {
            dismiss();
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
      <Text>{moneyFormat(item.total)}</Text>
    </View>
  );
});
