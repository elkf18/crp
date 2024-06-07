import { useIsFocused, useNavigation } from "@react-navigation/native";
import color from "app/config/color";
import { fontFamily, fontSize } from "app/config/const";
import SessionStore from "app/model/session";
import PinInput from "app/ui/utils/PinInput";
import { ITheme } from "libs/config/theme";
import useTheme from "libs/hooks/useTheme";
import { Button, Text, View } from "libs/ui";
import { runInAction } from "mobx";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";

export default observer((props: any) => {
  const Theme: ITheme = useTheme() as any;
  const nav = useNavigation();

  return (
    <View
      style={{
        backgroundColor: color.primary_main,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
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
          Masukkan Kode OTP
        </Text>
        <Text
          style={{
            textAlign: "center",
                  marginBottom: 20,
                  fontSize: fontSize.s,
                  fontFamily: fontFamily.reguler,
                  color:color.natural_100
          }}
        >
          Kode OTP telah dikirim melalui SMS ke{" "}
          <Text
            style={{
              textAlign: "center",
                  fontSize: fontSize.s,
                  fontFamily: fontFamily.bold,
                  color:color.natural_100
            }}
          >
            {SessionStore.form.phone}
          </Text>
        </Text>
      </View>
      <Pin />
      <ResendButton />
    </View>
  );
});

const Pin = observer(() => {
  const length = 4;

  return (
    <View
      style={{
        marginVertical: 15,
      }}
    >
      <PinInput value={SessionStore.form.otp} length={length} />
    </View>
  );
});

const ResendButton = observer((props: any) => {
  const [Timer, setTimer] = useState(SessionStore.getOTPCountdown());
  const isFocused = useIsFocused();
  const Theme: ITheme = useTheme() as any;
  const resendOTP = async () => {
    const r = await SessionStore.requestOTP();
  };
  useEffect(() => {
    let interval: any;
    if (isFocused) {
      if (!SessionStore.isOTPExpired()) {
        interval = setInterval(() => {
          setTimer(SessionStore.getOTPCountdown());
          if (SessionStore.isOTPExpired()) {
            clearInterval(interval);
            setTimer("00:00");
            runInAction(() => (SessionStore.expired = ""));
          }
        }, 1000);
      } else {
        setTimer("00:00");
      }
    }

    return () => {
      if (!!interval) {
        clearInterval(interval);
      }
    };
  }, [isFocused, SessionStore.expired]);

  return (
    <Button
      style={{
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignSelf: "center",
      }}
      onPress={resendOTP}
      disabled={Timer !== "00:00"}
    >
      <Text
        style={{
          color: "#ffffff",
          fontFamily: Theme.fontStyle.bold,
          fontSize: Theme.fontSize.h4,
        }}
      >
        {Timer === "00:00" ? "Kirim ulang kode OTP" : Timer}
      </Text>
    </Button>
  );
});
