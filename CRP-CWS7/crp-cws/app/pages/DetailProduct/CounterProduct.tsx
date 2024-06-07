import Fonts from "libs/assets/fonts";
import { Button, Field, Icon, TextInput, Text, View } from "libs/ui";
import { moneyFormat } from "libs/utils/string-format";
import { useNavigation } from "@react-navigation/native";
import OrderStore from "app/model/order";
import { runInAction } from "mobx";
import { observer, useLocalObservable } from "mobx-react";
import React from "react";
import ConfirmModal from "app/ui/utils/ConfirmModal";

export default observer(({margin}:any) => {
  const nav = useNavigation();
  const meta = useLocalObservable(() => ({
    visible: false,
  }));
  const dismiss = () => {
    runInAction(() => (meta.visible = false));
  };

  return (
    <>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 15,
          backgroundColor: "#fff",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.41,
          shadowRadius: 9.11,
          elevation: 14,
          position:"absolute",
          bottom:margin,
          width:"100%"
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Button
            mode="clean"
            style={{
              borderWidth: 1,
              borderRadius: 99,
              height: 40,
              width: 40,
              paddingHorizontal: 0,
              paddingVertical: 0,
              margin: 0,
            }}
            disabled={OrderStore.selectedProduct.qty === 0}
            onPress={() => {
              runInAction(
                () =>
                  (OrderStore.selectedProduct.qty =
                    OrderStore.selectedProduct.qty - 1)
              );
            }}
          >
            <Icon name={"ios-remove"} color="#333" size={30} />
          </Button>
          <Field
            hiddenLabel
            label="Quantity"
            path={""}
            value={String(OrderStore.selectedProduct.qty)}
            onChange={(value) => {
              runInAction(
                () => (OrderStore.selectedProduct.qty = Number(value))
              );
            }}
            style={{
              marginBottom: 0,
            }}
            styles={{
              input: {
                borderWidth: 0,
                borderRadius: 99,
                width: 120,
                backgroundColor: "#EFEFEF",
                marginHorizontal: 10,
                marginBottom: 0,
                paddingBottom: 0,
                justifyContent: "center",
                alignItems: "center",
              },
            }}
          >
            <TextInput
              type={"number"}
              style={{
                fontSize: 18,
                textAlign: "center",
                height: 40,
              }}
            />
          </Field>
          <Button
            mode="clean"
            style={{
              borderWidth: 1,
              borderRadius: 99,
              height: 40,
              width: 40,
              paddingHorizontal: 0,
              paddingVertical: 0,
              margin: 0,
            }}
            onPress={() => {
              runInAction(
                () =>
                  (OrderStore.selectedProduct.qty =
                    OrderStore.selectedProduct.qty + 1)
              );
            }}
          >
            <Icon name={"ios-add"} color="#333" size={30} />
          </Button>
        </View>
        {OrderStore.selectedProduct.status === "update" &&
        OrderStore.selectedProduct.qty === 0 ? (
          <Button
            style={{
              borderRadius: 99,
              paddingVertical: 10,
              backgroundColor: "red",
            }}
            onPress={async () => {
              runInAction(() => (meta.visible = true));
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontFamily: Fonts.MontserratBold,
              }}
            >
              Hapus Item
            </Text>
          </Button>
        ) : (
          <Button
            style={{
              borderRadius: 99,
              paddingVertical: 10,
              backgroundColor: "#000",
              justifyContent: "space-between",
            }}
            onPress={() => {
              OrderStore.setProductOrder();
              nav.goBack();
            }}
            disabled={OrderStore.selectedProduct.qty === 0}
          >
            <Text
              style={{
                color: "#fff",
                fontFamily: Fonts.MontserratBold,
              }}
            >
              {OrderStore.selectedProduct.status === "insert"
                ? "Tambah ke Keranjang"
                : "Perbarui Keranjang"}
            </Text>
            <Text
              style={{
                color: "#fff",
                fontFamily: Fonts.MontserratBold,
              }}
            >
              {moneyFormat(OrderStore.selectedProduct.total)}
            </Text>
          </Button>
        )}
      </View>
      <ConfirmModal
        title="Apakah kamu yakin ingin menghapus item dari cart?"
        visible={meta.visible}
        onPressYes={async () => {
          dismiss();
          OrderStore.deleteProduct();
          nav.goBack();
        }}
        onPressNo={dismiss}
      />
    </>
  );
});
