import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";

import Fonts from "libs/assets/fonts";
import useTheme from "libs/hooks/useTheme";
import {
    Button,
    Camera,
    ChoiceGroup,  
    Field,
    Form,
    Icon,
    Image,
    Screen,
    ScrollView,
    Select,
    Text,
    TextInput,
    TopBar,
    View,
  } from "libs/ui";
  import { ITheme } from "libs/config/theme";
import get from "lodash.get";
import { observer } from "mobx-react-lite";
import React, { Component, useEffect } from "react";
import Accordion from 'react-native-collapsible/Accordion';
import { Constants } from "react-native-unimodules";
import LaporStore from "app/model/lapor";
import * as Yup from "yup";
import OutletStore from "app/model/outlet";
import AppConfig from "libs/config/app";
import { Dimensions, StyleSheet, ToastAndroid } from "react-native";
import SessionStore from "app/model/session";



export default observer(() => {
        const nav = useNavigation();

        useEffect(()=>{
          LaporStore.form.init();
        },[])
      return (
        <Screen>
             <TopBar
                style={{
                backgroundColor: "#fff",
                }}
                enableShadow={false}
                backButton={true}
                iconProps={{
                
                    color: "#3a3a3a",
                    name: "left",
                    source: "AntDesign",
                    size: 28,
                
                }}
                // actionBackButton={() => {
                // if (!!onGoBack) {
                //     onGoBack();
                // } else {
                //     nav.goBack();
                // }
                // }}
            >
                <Text
                    style={{
                        // color: Theme.colors.primary,
                        fontSize: 20,
                        fontFamily: Fonts.MontserratBold,
                        flexGrow: 1,
                    }}
                    >
                    Lapor
                    </Text>
             </TopBar>
            
             <ScrollView>
                <View
                style={{
                    padding: 15,
                }}
                >
                    <Form
                        values={LaporStore.form}
                        validationSchema={{
                          id_outlet:Yup.string().required("Harus di isi."),
                          email: Yup.string().required("Harus di isi.").email("Email tidak sesuai"),
                          description: Yup.string().required("Harus di isi."),
                          
                        }}
                        onSubmit={() => {
                          LaporStore.form.save().then((res) => {
                            if (!!res) {
                              
                              nav.goBack();
                            }
                          });
                        }}
                        Submit={(handleSubmit, canSubmit) => (
                            <RenderSubmit handleSubmit={handleSubmit} canSubmit={canSubmit} />
                          )}
                    >
                        {(props) => (
                        <>

                        <Field
                        initializeField={props}
                        label={"Pilih Outlet*"}
                        path={"id_outlet"}
                        styles={{
                            label:{
                            fontFamily:Fonts.RobotoBold ,
                            color:"#333333"
                            },
                            input: {
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: "#E6E6E6",
                            backgroundColor: "transparent",
                            borderBottomWidth: 1,
                            },
                        }}
                        
                        >
                        <Select
                            placeholder={"Select"}
                            items={OutletStore.list}
                            labelPath={"nama"}
                            valuePath={"id"}
                        ></Select>
                        </Field>

                        <Field
                            initializeField={props}
                            label={"Email *"}
                            path={"email"}
                            styles={{
                                label:{
                                fontFamily:Fonts.RobotoBold ,
                                color:"#333333"
                                },
                                input: {
                                borderRadius: 8,
                                borderWidth: 1,
                                borderColor: "#E6E6E6",
                                backgroundColor: "transparent",
                                borderBottomWidth: 1,
                                },
                            }}
                            
                            >
                                <TextInput type={"text"}></TextInput>
                            </Field>

                            <Field
                            initializeField={props}
                            label={"Keluhan Kamu*"}
                            path={"description"}
                            styles={{
                                label:{
                                fontFamily:Fonts.RobotoBold ,
                                color:"#333333"
                                },
                                input: {
                                borderRadius: 8,
                                borderWidth: 1,
                                borderColor: "#E6E6E6",
                                backgroundColor: "transparent",
                                borderBottomWidth: 1,
                                },
                            }}
                            
                            >
                                <TextInput type={"multiline"} placeholder="Tulis Keluhanmu disini"></TextInput>
                            </Field>

                            <Text
                                style={{
                                    marginHorizontal: 5,
                                    marginBottom: 8,
                                    fontFamily: Fonts.MontserratBold
                                }}
                            >
                            Upload Gambar
                            </Text>
                            <DetailFoto
                                    key={0}
                                    index={0}
                                    item={LaporStore.form.foto}
                                    initialize={props}
                                />
                            <Text
                                style={{
                                    marginHorizontal: 5,
                                    marginBottom: 8,
                                    fontFamily: Fonts.MontserratRegular,
                                    color:"#808080"
                                }}
                            >
                            *Maksimum 5MB, denga format .jpg atau .png
                            </Text>
                            
                  
                        </>)}
                    </Form>

                </View>
             </ScrollView>
        </Screen>
        
      );
    }
)

  const RenderSubmit = observer((props: any) => {
    const { handleSubmit, canSubmit } = props;
    const nav = useNavigation();
    const Theme: ITheme = useTheme() as any;
  
    return (
      <Button
        style={{
          margin: 0,
          marginTop: 15,
          paddingVertical: 12,
        }}
        onPress={handleSubmit}
        disabled={!canSubmit || LaporStore.form.saving}
      >
        <Text
          style={{
            color: Theme.colors.textLight,
            fontSize: 16,
            fontFamily: Fonts.MontserratBold,
          }}
        >
          {LaporStore.form.saving ? "Mengirim..." : "Kirim"}
          
        </Text>
      </Button>
    );
  });

  const DetailFoto = observer((props: any) => {
    const { index: key, item, initialize } = props;
  
    const isFocus = useIsFocused()
    useEffect(() => {
      
    }, [isFocus]);
    
    const Theme: ITheme = useTheme() as any;
    return (
      <View
        key={key}
        style={{
          flexDirection: "row",
          
          flex: 1,
        }}
      >
        
        <View
          key={key}
          style={{
            padding: 0,
            paddingBottom: 0,
            backgroundColor: "white",
            flex: 1,
            borderRadius: 8,
            borderColor: "#ccc",
            borderWidth: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <Field
              initializeField={initialize}
              label={""}
              path={`foto`}//additional_data.listFoto[0].path
              style={{ flex: 1 }}
              value={!!item ? AppConfig.serverUrl + item : ""}
            >
              {/* <Camera/> */}
              <Camera renderPreview={(props) => <Preview {...props} url={LaporStore.form.foto}  />} />
              
            </Field>
            
          </View>
          
        </View>
      </View>
    );
  });
  
  const Preview = observer((props: any) => {
    const { source, styles, url } = props;
    const Theme = useTheme();
    const cstyle = StyleSheet.flatten([
      {
        height: 120,
        width: "100%",
      },
      styles?.thumbnail,
    ]);
    const s = source;
    if (!!s && !!s.uri && s.uri.includes("file://")) {
      s.uri = s.uri.replace(AppConfig.serverUrl,"");
    } else if (!!s && !!s.uri) {// && s.uri === ActivityStore.form.listFoto[key].path
      s.uri = s.uri;//AppConfig.serverUrl + 
    }
  
    return (
      <>
          {/* <Text>
            {url}
          </Text> */}
          {!!s && !!s.uri ? (
            <Image source={s} resizeMode="cover" style={cstyle} />
            
          ) : (
            <Icon name="file-image-o" source="FontAwesome" size={60} color={"#ccc"} />
          )}
      </>
    );
  });
  