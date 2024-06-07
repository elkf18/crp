import Fonts from "libs/assets/fonts";
import {
  Button,
  Field,
  Form,
  ImageBackground,
  TextInput,
  Screen,
  Spinner,
  Text,
  View,
} from "libs/ui";
import ScrollView from "libs/ui/ScrollView";
import { useNavigation } from "@react-navigation/native";
import SessionStore from "app/model/session";
import GuestHeader from "app/ui/utils/GuestHeader";
import { observer } from "mobx-react-lite";
import React from "react";
import { Alert, Dimensions } from "react-native";
import * as Yup from "yup";
import color from "app/config/color";
import { fontFamily, fontSize } from "app/config/const";

export default observer(() => {
  const dim = Dimensions.get("window");
  const nav = useNavigation();

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
        >
          <GuestHeader
            onBack={async () => {
              Alert.alert(
                "Apakah anda yakin?",
                "Pendataran belum selesai, apakah anda yakin akan meninggalkan halaman ini?",
                [
                  {
                    text: "Iya",
                    onPress: () => {
                      nav.goBack();
                    },
                  },
                  {
                    text: "Tidak",
                  },
                ]
              );
            }}
          />
          <View
            style={{
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              flexGrow: 1,
              paddingVertical: 40,
              paddingHorizontal: 30,
            }}
          >
            <Text
              style={{
                fontSize: fontSize.xl,
                fontFamily: fontFamily.bold,
                color:color.natural_100,
                textAlign: "center",
                paddingHorizontal: 20,
                marginVertical: 10,
              }}
            >
              Data Registration
            </Text>
            <Form
              values={SessionStore.form}
              onSubmit={() => {
                nav.navigate("guest/CreatePin");
              }}
              validationSchema={{
                name: Yup.string().required("Harus diisi"),
                email: Yup.string()
                  .required("Harus diisi")
                  .email("Email tidak sesuai"),
              }}
              Submit={(submit, canSubmit) => (
                <Button
                  style={{
                    marginTop: 30,
                    paddingVertical: 10,
                    borderRadius: 99,
                    margin: 0,
                    
                    backgroundColor: color.secondary_main,
                  }}
                  onPress={submit}
                  disabled={!canSubmit || SessionStore.loading}
                >
                  {SessionStore.loading ? (
                    <Spinner color="#fff"></Spinner>
                  ) : (
                    <Text
                      style={{
                        color: color.primary_main,
                        fontFamily: Fonts.MontserratBold,
                        fontSize: 16,
                      }}
                    >
                      Berikutnya
                    </Text>
                  )}
                </Button>
              )}
            >
              {(props) => (
                <>
                  <Field
                    initializeField={props}
                    label={"Nama"}
                    path={"name"}
                    styles={{
                      label: {
                        color:  color.natural_100,
                        fontFamily:fontFamily.medium,
                        fontSize:fontSize.m
                      },
                      input: {
                        borderRadius: 4,
                        backgroundColor: "#364363"
                      },
                    }}
                  >
                    <TextInput
                      type={"text"}
                      placeholder={"Nama Lengkap"}
                      placeholderTextColor={color.natural_50}
                      style={{
                        fontSize: fontSize.m,
                        fontFamily:fontFamily.medium,
                        color:color.natural_100,
                        
                      }}
                    />
                  </Field>
                  <Field
                    initializeField={props}
                    label={"E-mail"}
                    path={"email"}
                    styles={{
                      label: {
                        color:  color.natural_100,
                        fontFamily:fontFamily.medium,
                        fontSize:fontSize.m
                      },
                      input: {
                        borderRadius: 4,
                        backgroundColor: "#364363"
                      },
                    }}
                  >
                    <TextInput
                      type={"text"}
                      placeholder={"Alamat E-mail"}
                      placeholderTextColor={color.natural_50}
                      style={{
                        fontSize: fontSize.m,
                        fontFamily:fontFamily.medium,
                        color:color.natural_100,
                        
                      }}
                    />
                  </Field>
                </>
              )}
            </Form>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
});
