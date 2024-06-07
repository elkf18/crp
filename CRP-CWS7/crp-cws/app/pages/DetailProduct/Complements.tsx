import OrderStore from "app/model/order";
import { Complement } from "app/model/product/complement";
import Fonts from "libs/assets/fonts";
import useTheme from "libs/hooks/useTheme";
import { Button, Text, View } from "libs/ui";
import { moneyFormat } from "libs/utils/string-format";
import { observer } from "mobx-react";
import React from "react";

export default observer(() => {
  const product = OrderStore.selectedProduct.getDetailProduct;

  return (
    <View>
      {product.getComplementList.map((item: any, key: number) => (
        <RenderComplement key={key} item={item} />
      ))}
    </View>
  );
});

const RenderComplement = observer((props: any) => {
  const { item }: any = props;
  const Theme = useTheme();

  return (
    <View
      style={{
        padding: 15,
        marginBottom: 15,
        borderColor: "#EEEEEE",
        borderBottomWidth: 4,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: Fonts.MontserratBold,
            // fontSize: 16,
          }}
        >
          {item.type}
        </Text>
        <Text
          style={{
            borderRadius: 99,
            paddingHorizontal: 10,
            paddingVertical: 2,
            backgroundColor: "#A68063",
            color: "#fff",
            marginLeft: 15,
            fontSize: 12,
          }}
        >
          Pilih Salah Satu
        </Text>
      </View>
      {item.data.map((comp: Complement, key: number) => (
        <RenderItem key={key} comp={comp} />
      ))}
    </View>
  );
});

const RenderItem = observer((props: any) => {
  const {
    comp,
  }: {
    comp: Complement;
  } = props;

  const active =
    OrderStore.selectedProduct.complements.findIndex(
      (x) => x.id_complement === comp.id
    ) > -1;

  return (
    <Button
      mode={"clean"}
      style={{
        paddingHorizontal: 0,
      }}
      onPress={() => {
        OrderStore.selectedProduct.changeComplement(comp);
      }}
    >
      <Text
        style={{
          flex: 1,
          fontFamily: Fonts.MontserratBold,
        }}
      >
        {comp.name}
      </Text>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontFamily: Fonts.MontserratBold,
            marginRight: 10,
          }}
        >
          {!comp.price || comp.price === 0 ? "Free" : moneyFormat(comp.price)}
        </Text>
        <View
          style={{
            backgroundColor: active ? "#555" : "#EFEFEF",
            width: 25,
            height: 25,
            borderRadius: 99,
            borderWidth: 4,
            borderColor: "#EFEFEF",
          }}
        />
      </View>
    </Button>
  );
});
