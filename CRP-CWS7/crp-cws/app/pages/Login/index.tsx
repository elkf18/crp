import { ImageBackground, Screen, View } from "libs/ui";
import ScrollView from "libs/ui/ScrollView";
import Footer from "app/pages/Login/Footer";
import Form from "app/pages/Login/Form";
import Header from "app/pages/Login/Header";
import { runInAction } from "mobx";
import { observer, useLocalObservable } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Dimensions, Keyboard } from "react-native";
import color from "app/config/color";

export default observer(() => {
  const dim = Dimensions.get("window");
  const meta = useLocalObservable(() => ({
    visibleKeyboard: false,
    showAlert: false,
  }));

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        runInAction(() => (meta.visibleKeyboard = true));
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
      runInAction(() => (meta.visibleKeyboard = false));
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <Screen
      style={{
        backgroundColor: color.primary_main,
        
      }}
      statusBar={{
        barStyle: "light-content",
      }}
    >
      <ScrollView
        keyboardAvoidingProps={{
        }}
      >
        <View
          style={{
            backgroundColor:color.primary_main,
            height:dim.height
          }}
        >
          {/* <Header meta={meta} /> */}
          <View
            style={{
              flexGrow: 1,
            }}
          >
            <Form meta={meta} />
            <Footer meta={meta} />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
});
