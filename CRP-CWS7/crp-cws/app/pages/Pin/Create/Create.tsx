import Fonts from "libs/assets/fonts";
import { Button, ImageBackground, Text, View } from "libs/ui";
import ScrollView from "libs/ui/ScrollView";
import SessionStore from "app/model/session";
import GuestHeader from "app/ui/utils/GuestHeader";
import NumPad from "app/ui/utils/NumPad";
import PinInput from "app/ui/utils/PinInput";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import color from "app/config/color";
import { fontFamily, fontSize } from "app/config/const";

export default observer((props: any) => {
  const { onBack, meta } = props;

  return (
    <>
      <ScrollView
      style={{
        backgroundColor:color.primary_main
      }}>
          <GuestHeader onBack={onBack} />
          <View
            style={{
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
              {SessionStore.form.isRegister ? (
                <>
                  <Text
                    style={{
                      textAlign: "center",
                      marginBottom: 30,
                      fontSize: fontSize.xl,
                      fontFamily: fontFamily.bold,
                      color:color.natural_100
                    }}
                  >
                    Create Account PIN
                  </Text>
                </>
              ) : (
                <Text
                style={{
                  textAlign: "center",
                  marginBottom: 30,
                  fontSize: fontSize.xl,
                  fontFamily: fontFamily.bold,
                  color:color.natural_100
                }}
                >
                  Insert New PIN
                </Text>
              )}
            </View>
            <Pin />
            <Button
              style={{
                borderRadius: 99,
                paddingVertical: 10,
                margin: 0,
                marginHorizontal: 30,
                backgroundColor:color.secondary_main
              }}
              onPress={() => runInAction(() => (meta.mode = "confirm"))}
            >
              <Text
                style={{
                  color: color.primary_main,
                  fontFamily: Fonts.MontserratBold,
                  fontSize: 16,
                }}
              >
                Buat PIN
              </Text>
            </Button>
          </View>
      </ScrollView>
      <NumPadBoard />
    </>
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
        value={SessionStore.form.password}
        setValue={(value: string) =>
          runInAction(() => (SessionStore.form.password = value.slice(0, 6)))
        }
      />
    </View>
  );
});
