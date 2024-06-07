import { StackActions, useNavigation } from "@react-navigation/native";
import color from "app/config/color";
import SessionStore from "app/model/session";
import GuestHeader from "app/ui/utils/GuestHeader";
import NumPad from "app/ui/utils/NumPad";
import { ImageBackground, Screen, View } from "libs/ui";
import ScrollView from "libs/ui/ScrollView";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import Form from "./Form";

export default observer(() => {
  const nav = useNavigation();
  const length = 4;

  const checkUser = async () => {
    if (SessionStore.form.otp.length === length) {
      let valid = await SessionStore.validationOTP();
      if (!!valid) {
        runInAction(() => {
          SessionStore.expired = "";
        });
        if (!!SessionStore.form.isRegister) {
          nav.dispatch(StackActions.replace("guest/Register"));
        } else {
          nav.dispatch(StackActions.replace("guest/CreatePin"));
        }
      }
    }
  };

  const change = (value: string) => {
    runInAction(() => (SessionStore.form.otp = value.slice(0, 6)));
    checkUser();
  };

  return (
    <Screen
      style={{
        backgroundColor: "white",
      }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor:color.primary_main
        }}
      >
        
          <GuestHeader />
          <Form />
      </ScrollView>
      <KeyBoard change={change} />
    </Screen>
  );
});

const KeyBoard = observer(({ change }: any) => {
  return (
    <View
      style={{
        backgroundColor: color.primary_main,
      }}
    >
      <NumPad value={SessionStore.form.otp} setValue={change} />
    </View>
  );
});
