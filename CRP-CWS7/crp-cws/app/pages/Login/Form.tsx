import { useNavigation } from "@react-navigation/native";
import IconsIphone from "app/assets/elements/IconsIphone";
import SessionStore from "app/model/session";
import Fonts from "libs/assets/fonts";
import AppConfig from "libs/config/app";
import useTheme from "libs/hooks/useTheme";
import { Button, Field, Form, Image, Spinner, Text, TextInput, View } from "libs/ui";
import { runInAction } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import * as Yup from "yup";
import messaging, { firebase } from '@react-native-firebase/messaging';
import { fontFamily, fontSize } from "app/config/const";
import color from "app/config/color";

export default observer((props: any) => {
  const nav = useNavigation();
  const Theme = useTheme();
  const { meta } = props;
  const onSubmit = async () => {

    await messaging().requestPermission();
    

    if (await messaging().hasPermission()!=firebase.messaging.AuthorizationStatus.AUTHORIZED) {
      //alert("Please allow notifications permission to receive order push notifications")
      // return;
    }
    let exist = await SessionStore.isRegistered();
    if (exist) {
      nav.navigate("guest/Pin");
    } else {
      if(SessionStore.form.phoneOTP==SessionStore.form.phone){
        if (SessionStore.isOTPExpired()) {
          let res = await SessionStore.requestOTP();
          if (!!res) {
            nav.navigate("guest/OTP");
          }
        } else {
          nav.navigate("guest/OTP");
        }

      }else{
        let res = await SessionStore.requestOTP();
        if (!!res) {
          nav.navigate("guest/OTP");
        }

      }
    }
  };

  return (
    <View
      style={{
        justifyContent: "center",
        marginHorizontal: 40,
        flex: 1,
      }}
    >
      <Image
        source={require("app/assets/images/logo.png")}
        style={{
          width: 193,
          height: 80,
          margin: 20,
          marginBottom: 16,
        }}
      ></Image>
      <Text
          style={{
            fontSize: fontSize.xs,
            marginBottom: 60,
            textAlign: "center",
            color: color.natural_100
          }}
        >
          The Magnificent World of Lifestyle
        </Text>
      {AppConfig.mode !== "production" && !meta.visibleKeyboard && (
        <Text
          style={{
            fontSize: fontSize.xl,
            marginBottom: 20,
            textAlign: "center",
            color: color.natural_100
          }}
        >
          Development
        </Text>
      )}
      <Form
        values={SessionStore.form}
        validationSchema={{
          username: Yup.string().required("Harus diisi"),
        }}
        onSubmit={onSubmit}
        Submit={(handleSubmit, canSubmit) => (
          <Button
            style={{
              margin: 0,
              paddingVertical: 10,
              borderRadius: 4,
              backgroundColor: color.secondary_main,
            }}
            onPress={handleSubmit}
            disabled={!canSubmit || SessionStore.loading}
          >
            {SessionStore.loading ? (
              <Spinner color="#fff"></Spinner>
            ) : (
              <Text
                style={{
                  color: color.primary_main,
                  fontFamily: fontFamily.bold,
                  fontSize: 16,
                }}
              >
                Masuk / Daftar
              </Text>
            )}
          </Button>
        )}
      >
        {(props) => (
          <>
            <Field
              hiddenLabel={true}
              initializeField={props}
              label={"Nomor HP"}
              path={"username"}
              onChange={(value) => {
                value = value.replace(/[^0-9]/g, "");
                let phone = value;
                let username = value;
                if (phone[0] != "0") {
                  phone = "0" + phone;
                }
                if (username[0] == "0") {
                  username = username.slice(1, username.length);
                }
                runInAction(() => {
                  SessionStore.form.phone = phone;
                  SessionStore.form.username = username;
                });
              }}
              styles={{
                input: {
                  borderRadius: 4,
                  backgroundColor: "#364363",
                },
              }}
              Prefix={
                <View
                  style={{
                    borderTopStartRadius:4,
                    borderBottomStartRadius:4,
                    backgroundColor: "#EFEFEF",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 10,
                    flexDirection: "row",
                    height: 40,
                  }}
                >
                  <Text
                    style={{
                      fontSize: fontSize.m,
                      color: color.primary_main,
                      fontFamily: fontFamily.medium,
                    }}
                  >
                    +62
                  </Text>
                </View>
              }
            >
              <TextInput
                type={"text"}
                keyboardType={"number-pad"}
                placeholder={"8X-XXX-XXX"}
                placeholderTextColor={color.natural_50}
                style={{
                    fontSize: fontSize.m,
                      color: color.natural_100,
                      fontFamily: fontFamily.medium
                }}
              ></TextInput>
            </Field>
          </>
        )}
      </Form>
    </View>
  );
});
