import color from "app/config/color";
import { fontSize } from "app/config/const";
import AppConfig from "libs/config/app";
import { Text } from "libs/ui";
import { observer } from "mobx-react";
import React from "react";
import { Dimensions } from "react-native";

export default observer((props: any) => {
  const dim = Dimensions.get("window");
  const { meta } = props;

  if (!!meta.visibleKeyboard) return null;

  return (
    <>
      <Text
        style={{
          marginBottom: 90,
          fontSize: fontSize.xs,
          textAlign: "center",
          color: color.natural_100,
        }}
      >
        Dengan masuk atau mendaftar, Anda menyetujui{" "}
        <Text
          style={{
            fontSize: fontSize.xs,
            textDecorationLine: "underline",
            color: color.secondary_main,
          }}
        >
          Ketentuan Layanan
        </Text>{" "}
        dan{" "}
        <Text
          style={{
            fontSize: fontSize.xs,
            textDecorationLine: "underline",
            color: color.secondary_main,
          }}
        >
          Kebijakan Privasi
        </Text>{" "}
        kami.
      </Text>
      <Text
        style={{
          fontSize: 12,
          textAlign: "center",
          color: "#000",
        }}
      >
        v{AppConfig.version}
      </Text>
    </>
  );
});
