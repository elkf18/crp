import Fonts from "libs/assets/fonts";
import {
  Button,
  Field,
  Icon,
  Image,
  Screen,
  ScrollView,
  Text,
  TextInput,
  View,
} from "libs/ui";
import { moneyFormat } from "libs/utils/string-format";
import { useNavigation } from "@react-navigation/native";
import OrderStore from "app/model/order";
import Complements from "./Complements";
import CounterProduct from "./CounterProduct";
import { observer, useLocalObservable } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { Dimensions, KeyboardAvoidingView, Keyboard, KeyboardEvent, Platform  } from "react-native";
import AppConfig from "libs/config/app";
import { runInAction } from "mobx";
import OutletStore from "app/model/outlet";

export default observer(() => {
  const dim = Dimensions.get("window");
  const nav = useNavigation();
  const refList = useRef(null as any);
  const imgH = (1 / 3) * dim.height;
  const product = OrderStore.selectedProduct.getDetailProduct;

  const meta = useLocalObservable(() => ({
    visibleKeyboard: false,
    showAlert: false,
    keyboardHeight: 0,
  }));

  useEffect(() => {
    return () => {
      OrderStore.initProductOrder();
    };
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e: KeyboardEvent) => {
        //setKeyboardVisible(true); // or some other action
        runInAction(() => (meta.visibleKeyboard = true));
        if(Platform.OS=="ios"){
          meta.keyboardHeight = e.endCoordinates.height
        }else{
          meta.keyboardHeight = 0
        }
        
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        // setKeyboardVisible(false); // or some other action
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
      statusBar={{
        barStyle: "light-content",
        backgroundColor: "#00000000",
      }}
      style={{
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          flex: 1,
          flexGrow: 1,
        }}>
      <ScrollView
        style={{
          marginBottom:meta.visibleKeyboard ? meta.keyboardHeight/2 : 0,
        }}>
        <View
          style={{
            height: imgH,
            overflow: "hidden",
          }}
        >
          <Button
            mode="clean"
            onPress={() => nav.goBack()}
            style={{
              position: "absolute",
              top: 30,
              left: 0,
              zIndex: 99,
              borderRadius: 0,
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}
          >
            <Icon source="AntDesign" name="left" size={30} />
          </Button>
          {!!product.url_pic?
          <Image
            source={{
              uri: AppConfig.serverUrl + product.url_pic,
            }}
            style={{
              height: imgH,
              width: "100%",
            }}
            resizeMode={"cover"}
          />
          :
          <Image
          source={require("app/assets/images/default_cup.png")}
            style={{
              height: imgH,
              width: "100%",
              
            }}
            resizeMode={"cover"}
          />
          }
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderBottomWidth: 4,
            borderColor: "#EEEEEE",
            paddingBottom: 20,
          }}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.MontserratBold,
                overflow: "hidden",
                marginEnd:12
               // fontSize: 16,
              }}
              ellipsizeMode={"tail"}
              //numberOfLines={2}
            >
              {product.product_name}
            </Text>
            {!!product.description && 
            <Text
            style={{
              fontSize: 12,
              overflow: "hidden",
            }}
            ellipsizeMode={"tail"}
            numberOfLines={2}
          >
            {product.description}
          </Text>
            } 
            
          </View>
          {/* <Text
            style={{
              fontFamily: Fonts.MontserratBold,
              fontSize: 18,
              marginLeft: 15,
            }}
          >
            {moneyFormat(OrderStore.selectedProduct.price)}
          </Text> */}
          <View
            style={{
              //alignSelf: "center",
            }}
          >
            {!product.valid_price ? (
              <Text
                style={{
                  fontFamily: Fonts.MontserratBold,
                }}
              >
                {product.normal_price!==0? moneyFormat(product.normal_price):"FREE"}
              </Text>
            ) : (
              <>
                <Text
                  style={{
                    textDecorationLine: "line-through",
                  }}
                >
                  {product.normal_price!=0?moneyFormat(product.normal_price):"FREE"}
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.MontserratBold,
                  }}
                >
                  {product.valid_price!=0?moneyFormat(product.valid_price || 0):"FREE"}
                </Text>
              </>
            )}
          </View>
        </View>
        <Complements />
        <Field
          label="Catatan"
          path="remarks"
          value={String(OrderStore.selectedProduct.remarks)}
          onChange={(value) => {
            runInAction(() => (OrderStore.selectedProduct.remarks = value));
          }}
          style={{
            margin: 15,
          }}
        >
          <TextInput type="multiline" placeholder="Contoh: Es dikurangi" />
        </Field>
      </ScrollView>
      {OutletStore.currentOutlet.status === "BUKA" && <CounterProduct margin={meta.visibleKeyboard ? meta.keyboardHeight : 0} />}
      </View>
    </Screen>
  );
});
