import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import color from "app/config/color";
import { fontFamily, fontSize } from "app/config/const";
import SessionStore, { SosmedCust } from "app/model/session";
import SosmedStore, { Sosmed } from "app/model/sosmed";
import TopBar from "app/ui/utils/TopBar";
import Fonts from "libs/assets/fonts";
import AppConfig from "libs/config/app";
import useTheme from "libs/hooks/useTheme";
import {
  Button,
  Camera,
  ChoiceGroup,
  DateTime,
  Field,
  Form,
  Icon,
  Image,
  Screen,
  ScrollView,
  Spinner,
  Text,
  TextInput,
  View,
} from "libs/ui";
import { dateFormat } from "libs/utils/date";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Dimensions, Platform, StyleSheet } from "react-native";
import * as Yup from "yup";

export default observer(() => {
  const dim = Dimensions.get("window");
  const nav = useNavigation();
  const Theme = useTheme();

  useEffect(() => {
    SessionStore.initForm(SessionStore.user);

    return () => {
      SessionStore.initForm(SessionStore.user);
    };
  }, []);

  var submit = async () => {

    SessionStore.uopdateProfile().then((res) => {
      if (!!res) {
        nav.goBack();
      }
    });

  }

  return (
    <Screen
      style={{
        backgroundColor: "white",
      }}
      statusBar={{
        barStyle: "dark-content",
        backgroundColor: "#fff",
      }}
    >
      <TopBar title="Edit Profil" textColor={color.natural_20} backgroundColor={color.natural_100} rightActionColor={color.natural_20}/>
      <ScrollView>
        <Form
          values={SessionStore.form}
          validationSchema={{
            name: Yup.string().required("Harus diisi"),
            email: Yup.string().required("Harus diisi"),
            phone1: Yup.string().required("Harus diisi"),
          }}
          onSubmit={() =>
            submit()
          }
          Submit={(submit, canSubmit) => (
            <Button
              style={{
                paddingVertical: 15,
                borderRadius: 8,
                margin: 0,
                marginHorizontal: 15,
                
              }}
              disabled={!canSubmit || SessionStore.loading}
              onPress={submit}
            >
              {SessionStore.loading ? (
                <Spinner color={color.secondary_main}></Spinner>
              ) : (
                <Text
                  style={{
                    fontFamily: Fonts.MontserratBold,
                    color:color.secondary_main,
                  }}
                >
                  Update
                </Text>
              )}
            </Button>
          )}
        >
          {(props) => (
            <>
              <Field
                initializeField={props}
                label="Foto"
                path="foto"
                hiddenLabel
                styles={{
                  input: {
                    width: 120,
                    height: 120,
                    borderRadius: 999,
                    overflow: "visible",
                  },
                  field: {
                    justifyContent: "center",
                    alignItems: "center",
                  },
                }}
              >
                <Camera renderPreview={(props) => <Preview {...props} />} />
              </Field>

              <Field
                initializeField={props}
                label="Full Name *"
                path="name"
                style={{ paddingHorizontal: 15 }}

                styles={{
                  label: {
                    color:  color.natural_20,
                    fontFamily:fontFamily.medium,
                    fontSize:fontSize.m
                  },
                  input: {
                    borderRadius: 4,
                    backgroundColor: color.primary_surface
                  },
                }}
              >
                <TextInput type="text"
                style={{
                  fontFamily:fontFamily.medium,
                  fontSize:fontSize.m,
                  color:color.primary_main
                }} />
              </Field>

              <Field
                initializeField={props}
                label="Email *"
                path="email"
                style={{ paddingHorizontal: 15 }}
                styles={{
                  label: {
                    color:  color.natural_20,
                    fontFamily:fontFamily.medium,
                    fontSize:fontSize.m
                  },
                  input: {
                    borderRadius: 4,
                    backgroundColor: color.primary_surface
                  },
                }}
              >
                <TextInput type="text" 
                style={{
                  fontFamily:fontFamily.medium,
                  fontSize:fontSize.m,
                  color:color.primary_main
                }}
                
                />
              </Field>
              <Field
                initializeField={props}
                label="Phone Number *"
                path="phone1"
                editable={false}
                style={{ paddingHorizontal: 15 }}
                styles={{
                  label: {
                    color:  color.natural_20,
                    fontFamily:fontFamily.medium,
                    fontSize:fontSize.m
                  },
                  input: {
                    borderRadius: 4,
                    backgroundColor: color.primary_surface
                  },
                }}
              >
                <TextInput type="number" 
                style={{
                  fontFamily:fontFamily.medium,
                  fontSize:fontSize.m,
                  color:color.primary_main
                }}/>
              </Field>
              {/* <Field initializeField={props} label="PIN" path="password">
                <TextInput type="password" />
              </Field> */}
              {Platform.OS=="android"?
              <Field initializeField={props} label="Date of Birth" path="born_date"

              style={{ paddingHorizontal: 15, }}
              styles={{
                label: {
                  color:  color.natural_20,
                  fontFamily:fontFamily.medium,
                  fontSize:fontSize.m
                },
                input: {
                  borderRadius: 4,
                  backgroundColor: color.primary_surface
                },
              }}>
              <DateTime styles={{
                label:{
                  fontFamily:fontFamily.medium,
                  fontSize:fontSize.m,
                  color:color.primary_main
                }
              }}/>
            </Field>
            :
            <DateTime
                type="date"

                value={SessionStore.form.born_date}
                onChangeValue={(value) => {
                  SessionStore.form.born_date = value
                }}
                iconProps={{
                  name: "md-calendar",
                }}
                
                styles={{
                  label: {
                    
                  },
                }}
                Label={({ value }: any) => {
                  return (
                    <View
                    style={{
                      flexDirection:"column",
                      flexGrow:1
                    }}
                    >
                      <Text 
                      style={{
                        fontFamily:Fonts.GothamBold,
                        marginHorizontal:8,
                        marginBottom:8,
                        marginTop:-8
                      }}> Tanggal Lahir
                      </Text>
                      <View
                      style={{
                        flexDirection: "row",
                        backgroundColor: color.primary_surface,
                        marginHorizontal:8,
                        paddingHorizontal:8,
                        paddingVertical:10,
                        borderRadius:10
                      }}
                    >
                      <Text 
                      style={{
                        flexGrow:1
                      }}
                      >{!!value? dateFormat(value,"dd MMMM yyyy"):"dd MMMM yyyy"}</Text>
                      <Icon name="md-calendar" color={Theme.colors.text} />
                    </View>
                    </View>
                      
                  )}}

              />
            }
              

              

              <Field
                initializeField={props}
                label="Gender"
                path="gender"
                style={{ paddingHorizontal: 15 }}
              >
                <ChoiceGroup
                  mode="tags"
                  items={[
                    { label: "Laki-laki", value: "LAKI-LAKI" },
                    { label: "Perempuan", value: "PEREMPUAN" },
                  ]}
                  valuePath={"value"}
                  labelPath={"label"}
                  styles={{
                    label:{
                      fontFamily:fontFamily.medium,
                      fontSize:fontSize.m,
                    }
                  }}
                />
              </Field>
              
              <View
                style={{
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: "#333",
                    paddingHorizontal: 15,
                    marginTop: 10

                  }}
                >
                  {/* (*) Mandatory / harus diisi */}
                </Text>
              </View>
            </>
          )}
        </Form>
      </ScrollView>
    </Screen>
  );
});

const Preview = observer((props: any) => {
  const { source, styles } = props;
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
    s.uri = s.uri;
  } else if (!!s && !!s.uri && s.uri === SessionStore.form.foto) {
    s.uri = AppConfig.serverUrl + s.uri;
  }

  return (
    <>
      <View
        style={{
          alignItems: "center",
          width: 100,
          height: 100,
          overflow: "hidden",
          justifyContent: "center",
          borderWidth: 1,
          borderRadius: 999,
          borderColor: "#ddd",
        }}
      >
        {!!s && !!s.uri ? (
          <Image source={s} resizeMode="cover" style={cstyle} />
        ) : (
          <Icon name="person" size={60} color={"#ccc"} />
        )}
      </View>
      <View
        style={{
          position: "absolute",
          width:100,
          height:100,
          backgroundColor: "#0004",
          borderWidth: 1,
          borderColor: "#eee",
          paddingTop: 38,
          borderRadius: 99,
          alignContent:"center",
          alignItems:"center",
          alignSelf:"center",
          
          
        }}
      >
        <Icon source="FontAwesome" name="edit" size={24} color={"#fff"} 
        style={{
          textAlignVertical:"center",
          alignContent:"center",
          alignItems:"center",
          alignSelf:"center"
        }}/>
      </View>
    </>
  );
});
