import { useIsFocused, useNavigation } from "@react-navigation/native";
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
import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default observer(() => {
  const dim = Dimensions.get("window");
  const isFocused = useIsFocused();
  const meta = useLocalObservable(() => ({
    timer: 0,
    match: true,
  }));

  useEffect(() => {
    runInAction(() => {
      SessionStore.form.password = "";
    });
  }, []);

  return (
    <Screen
      style={{
        backgroundColor: color.primary_main,
      }}
      statusBar={{
        barStyle:"light-content"
      }}
    >
      <ScrollView>
        <View
        style={{
          height:dim.height
        }}
        >
          <GuestHeader />
          <View
            style={{
              flexGrow: 1,
              padding: 30,
            }}
          >
            <View
              style={{
                marginHorizontal: 30,
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
                Account PIN
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
                Masukkan PIN untuk masuk ke dalam aplikasi
              </Text>
            </View>
            <Pin />
            <ResendButton meta={meta} />
          </View>

          
        </View>
      </ScrollView>
      <View
        style={{
          borderTopRightRadius:16,
          borderTopLeftRadius:16,
          paddingVertical:16
        }}
      >
        <NumPad
          value={SessionStore.form.password}
          setValue={(value: string) => {
            runInAction(() => (SessionStore.form.password = value.slice(0, 6)));

            if (SessionStore.form.password.length === 6) {
              SessionStore.login();
            }
          }}
        />
      </View>
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
      <PinInput value={SessionStore.form.password} length={6} />
    </View>
  );
});

const ResendButton = observer((props: any) => {
  const nav = useNavigation();
  const forgot = async () => {
    let res = await SessionStore.requestOTP(true);
    if (!!res) {
      nav.navigate("guest/OTP");
    }
  };

  return (
    <TouchableOpacity
      style={{
        alignContent:"center",
        alignItems:"center",
        alignSelf:"center",
        paddingVertical: 10,
        margin: 0,
      }}
      onPress={forgot}
    >
      <Text
        style={{
          color: color.secondary_main,
          fontFamily: fontFamily.reguler,
          fontSize: fontSize.m,
          textDecorationLine: "underline",
          textDecorationStyle: "solid",
          textDecorationColor: color.secondary_main
        }}
        
      >
        Lupa PIN
      </Text>
    </TouchableOpacity>
  );
});
