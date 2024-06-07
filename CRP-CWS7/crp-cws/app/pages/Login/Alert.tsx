import Fonts from "libs/assets/fonts";
import { Button, Modal, Text, View } from "libs/ui";
import { useNavigation } from "@react-navigation/native";
import SessionStore from "app/model/session";
import { action } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { Dimensions } from "react-native";

export default observer((props: any) => {
  const dim = Dimensions.get("window");
  const { meta } = props;
  const nav = useNavigation();
  const requestOTP = async () => {
    dismiss();
    SessionStore.requestOTP();
    nav.navigate("guest/OTP");
  };
  const dismiss = action(() => (meta.showAlert = false));

  return (
    <Modal visible={meta.showAlert} onDismiss={dismiss}>
      <View
        style={{
          backgroundColor: "rgba(0,0,0,0.4)",
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
          padding: 30,
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 8,
            padding: 15,
            paddingBottom: 0,
          }}
        >
          <Text>
            Kami akan mengirim kode OTP melalui SMS. Pastikan nomor{" "}
            <Text
              style={{
                fontFamily: Fonts.MontserratBold,
              }}
            >
              {SessionStore.form.phone}
            </Text>{" "}
            aktif.
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: 20,
            }}
          >
            <Button mode="clean" onPress={dismiss}>
              <Text>Tidak</Text>
            </Button>

            <Button mode="clean" onPress={requestOTP}>
              <Text
                style={{
                  color: "#009B4D",
                }}
              >
                Ya
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
});
