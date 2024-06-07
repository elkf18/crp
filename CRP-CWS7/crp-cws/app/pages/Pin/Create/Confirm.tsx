import { useNavigation } from "@react-navigation/native";
import color from "app/config/color";
import { fontFamily, fontSize } from "app/config/const";
import SessionStore from "app/model/session";
import GuestHeader from "app/ui/utils/GuestHeader";
import NumPad from "app/ui/utils/NumPad";
import PinInput from "app/ui/utils/PinInput";
import Fonts from "libs/assets/fonts";
import { Button, ImageBackground, Screen, Text, View } from "libs/ui";
import ScrollView from "libs/ui/ScrollView";
import { runInAction } from "mobx";
import { observer, useLocalObservable } from "mobx-react-lite";
import React from "react";

export default observer((props: any) => {
  const { onBack, meta: state } = props;
  const meta = useLocalObservable(() => ({
    match: true,
  }));

  return (
    <Screen
      style={{
        backgroundColor: color.primary_main,
      }}
      statusBar={{
        backgroundColor: "#00000000",
        barStyle:"light-content"
      }}
    >
      <ScrollView>
        <View
        >
          <GuestHeader onBack={onBack} />

          <View
            style={{
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              flexGrow: 1,
              paddingVertical: 40,
              paddingHorizontal: 30,
            }}
          >
            <View
              style={{
                marginHorizontal: 20,
                marginBottom: 30,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  marginBottom: 30,
                  fontSize: fontSize.xl,
                  fontFamily: fontFamily.bold,
                  color:color.natural_100
                }}
              >
                PIN Confirmation
              </Text>
             
              
              <Text
                style={{
                  textAlign: "center",
                  marginBottom: 30,
                  fontSize: fontSize.s,
                  fontFamily: fontFamily.reguler,
                  color:color.natural_100
                }}
              >
                Masukkan kembali PIN yang kamu buat.
              </Text>
            </View>
            {!meta.match && (
              <Text
                style={{
                  textAlign: "center",
                  color: "#E6212A",
                  marginBottom: 20,
                }}
              >
                Kombinasi PIN salah!
              </Text>
            )}
            <Pin />
            <ConfirmButton meta={meta} />
          </View>
        </View>
      </ScrollView>
      <NumPadBoard />
    </Screen>
  );
});
const Pin = observer(() => {
  return (
    <View
      style={{
        marginVertical: 15,
      }}
    >
      <PinInput value={SessionStore.form.confirmPassword} length={6} />
    </View>
  );
});

const NumPadBoard = observer(() => {
  return (
    <View
      style={{
        
        borderTopRightRadius:16,
        borderTopLeftRadius:16,
        paddingVertical:16
      }}
    >
      <NumPad
        value={SessionStore.form.confirmPassword}
        setValue={(value: string) =>
          runInAction(
            () => (SessionStore.form.confirmPassword = value.slice(0, 6))
          )
        }
      />
    </View>
  );
});

const ConfirmButton = observer((props: any) => {
  const nav = useNavigation();
  const { meta } = props;
  const confirm = async () => {
    if (SessionStore.form.password === SessionStore.form.confirmPassword) {
      if (SessionStore.form.isRegister) {
        await SessionStore.register();
      } else {
        await SessionStore.forgot();
      }
    } else {
      runInAction(() => {
        SessionStore.form.confirmPassword = "";
        meta.match = false;
      });
    }
  };

  return (
    <Button
      style={{
        borderRadius: 99,
        paddingVertical: 10,
        backgroundColor:color.secondary_main
      }}
      onPress={confirm}
      disabled={SessionStore.loading}
    >
      <Text
        style={{
          color: color.primary_main,
          fontFamily: Fonts.MontserratBold,
          fontSize: 16,
        }}
      >
        Konfirmasi
      </Text>
    </Button>
  );
});
