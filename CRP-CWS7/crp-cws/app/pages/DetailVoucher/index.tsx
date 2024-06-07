import { useNavigation, useRoute } from "@react-navigation/core";
import { useEffect, useState } from "react"
import NewsStore from "app/model/news";
import AppConfig from "libs/config/app";
import useTheme from "libs/hooks/useTheme";
import color from "app/config/color";
import {
  Button,
  Icon,
  Image,
  Screen,
  ScrollView,
  Spinner,
  Text,
  View
} from "libs/ui";
import { dateFormat } from "libs/utils/date";
import { observer } from "mobx-react";
import React from "react";
import {
  Linking,
  useWindowDimensions,
  Modal,
  Pressable,
  StyleSheet,
  Alert,
  RefreshControl
} from "react-native";
import {
  fontFamily,
  fontSize
} from "app/config/const";
import ProductStore from "app/model/product";
import { moneyFormat } from "libs/utils/string-format";
import RedeemStore from "app/model/product/redeem";
import { runInAction } from "mobx";
import QRCode from "react-native-qrcode-svg";

export default observer(() => {
  const nav = useNavigation();
  const route = useRoute()
  const { data }: any = route.params || {};
  const dim = useWindowDimensions();
  const [modalVisible,
    setModalVisible] = useState(false);
  const [modalSuccess,
    setModalSuccess] = useState(false);
    const [modalQR,
      setModalQR] = useState(false);

  const refresh = () => {
    ProductStore.detail.load(data.id)
    runInAction(() => {
      RedeemStore.isLoading = false;
    })
  };
  useEffect(() => {
    refresh()
  }, [])
  const refreshControl = (
    <RefreshControl
      refreshing={NewsStore.loading}
      onRefresh={refresh}
    />
  );

  return (
    <Screen
      statusBar={{
        barStyle: "light-content",
      }}
      style={{
        backgroundColor: color.natural_100
      }}
    >
      <View>
        <Image
          source={{
            uri: AppConfig.serverUrl + ProductStore.detail.url_pic,
          }}
          style={{
            height: dim.width,
            width: dim.width,
          }}
          resizeMode="cover"
        />
        <Button
          style={{
            position: "absolute",
            top: 50,
            left: 0,
            borderRadius: 99,
            backgroundColor: "#ffffff50",
            paddingHorizontal: 5,
            height: 45,
            width: 45,
          }}
          onPress={() => {
            nav.goBack();
          }}
        >
          <Icon
            name="chevron-back"
            size={30}
            color="#fff"
            style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,
              elevation: 4,
            }}
          />
        </Button>
      </View>
      <ScrollView
        refreshControl={refreshControl}
        contentContainerStyle={{
          paddingBottom:80
        }}
      >
        <View
          style={{
            paddingHorizontal: 30,
            paddingBottom: 15,
          }}
        >
          <Text
            style={{
              fontSize: fontSize.xl,
              fontFamily: fontFamily.medium,
              color: color.natural_20,
              marginTop: 20
            }}
          >
            {ProductStore.detail.name}
          </Text>
          <Text
            style={{
              fontSize: fontSize.s,
              fontFamily: fontFamily.reguler,
              color: color.natural_60,
              marginTop: 5
            }}
          >
            {ProductStore.detail.qty!=null?"Sisa "+ProductStore.detail.qty+" Kuota":""}
          </Text>


          {ProductStore.detail.redeem.id != null &&

            <>
              <View style={{ marginVertical: 16, borderBottomColor: color.natural_90, borderBottomWidth: 1, }} />
              <View style={{
                flexDirection: 'row',
                flex: 1,
                alignSelf: 'center'
              }}>
                <Text
                  style={{
                    fontSize: fontSize.s,
                    fontFamily: fontFamily.reguler,
                    color: color.natural_60,
                    marginVertical: 5
                  }}
                >
                  Timeout Redeem
                </Text>
                <Text
                  style={{
                    fontSize: fontSize.s,
                    fontFamily: fontFamily.medium,
                    color: color.secondary_main,
                    marginVertical: 5,
                    marginLeft: 2
                  }}
                >
                  {dateFormat(ProductStore.detail.redeem.expired_time)}
                </Text>
              </View>
              <Pressable
                style={{
                  flex: 1,
                  flexGrow: 1,
                }}
                onPress={() => setModalQR(true)}
              >
                <View style={{
                  flexGrow: 1,
                  width: "100%",
                  alignItems: 'center',
                  alignContent: "center",
                  alignSelf: "center",
                  backgroundColor: color.natural_20,
                  borderStyle: 'dashed',
                  borderRadius: 1,
                  borderWidth: 2,
                  borderColor: color.natural_20,
                  flexDirection: "row",
                  paddingHorizontal: 16,

                }}>
                  <Text style={{
                    fontSize: fontSize.m,
                    fontFamily: fontFamily.medium,
                    color: color.natural_100,
                    paddingTop: 8,
                    paddingBottom: 4,
                    marginBottom: 5,
                    flexGrow: 1
                  }}>
                    {ProductStore.detail.redeem.redeem_code}
                  </Text>
                  <Icon name="qrcode" source="FontAwesome" size={24} color={color.secondary_main} />
                </View>
              </Pressable>
              <Modal
                animationType="fade"
                transparent={true}
                statusBarTranslucent={true}
                visible={modalQR}
                onRequestClose={() => {
                  setModalQR(!modalQR);
                }}
              >
                <View style={{
                  flex: 2,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#00000077"
                }}>
                  <View style={{
                    flexDirection: 'column',
                    margin: 20,
                    backgroundColor: "white",
                    borderRadius: 16,
                    padding: 20,
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5
                  }}>
                    <Text style={{
                      color: color.natural_20,
                      fontFamily: fontFamily.medium,
                      textAlign: 'center',
                      fontSize: fontSize.l
                    }}>
                      QR Code Redeem
                    </Text>
                    <Text style={{
                      color: color.natural_60,
                      fontFamily: fontFamily.reguler,
                      textAlign: 'center',
                      fontSize: fontSize.m,
                      marginBottom: 16
                    }}>
                      Tunjukan QR ke CS untuk mengambil reward
                    </Text>

                    <QRCode
                      backgroundColor={color.primary_surface}
                      value={ProductStore.detail.redeem.redeem_code}
                      size={200}
                    />
                    <Text style={{
                      color: color.natural_20,
                      fontFamily: fontFamily.reguler,
                      textAlign: 'center',
                      fontSize: fontSize.s,
                      marginTop: 16
                    }}>
                      {ProductStore.detail.redeem.redeem_code}
                    </Text>
                    <View style={{ flexDirection: "row", marginBottom: 10, marginTop: 10, }}>
                      <Text style={{
                        color: color.natural_60,
                        fontFamily: fontFamily.reguler,
                        textAlign: 'center',
                        fontSize: fontSize.s,
                      }}>
                        Timeout Reedem </Text>
                      <Text style={{ color: color.secondary_main, fontFamily: fontFamily.bold, textAlign: 'center', fontSize: fontSize.s, }}>
                        {dateFormat(ProductStore.detail.redeem.expired_time)}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', }}>
                      <Pressable
                        style={{ flexGrow: 1, marginLeft: 5 }}
                        onPress={() => setModalQR(!modalQR)}
                      >
                        <Text style={{ textAlign: 'center', color: color.natural_100, backgroundColor: color.primary_main, fontFamily: fontFamily.bold, fontSize: fontSize.m, paddingVertical: 8, borderRadius: 4 }}>Tutup</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </Modal>

              <View style={{
                flexDirection: 'row',
                flex: 1,
                alignSelf: 'center',
                marginTop: 5
              }}>
                <Icon style={{ flexGrow: 0, marginHorizontal: 10, alignItems: 'center' }} name="alert-circle-outline" source="MaterialCommunityIcons" size={16} color={color.warning_main} />
                <Text style={{ color: color.warning_main, fontFamily: fontFamily.reguler, fontSize: fontSize.s }}>
                  Segera tukarkan ke Customer Center
                </Text>
              </View>
              <View style={{ marginTop: 16, borderBottomColor: color.natural_90, borderBottomWidth: 1, }} />
            </>
          }







          <Text
            style={{
              fontSize: fontSize.m,
              fontFamily: fontFamily.reguler,
              color: color.natural_20,
              marginTop: 20,
              textAlign: 'justify'
            }}
          >
            {ProductStore.detail.description}
          </Text>




        </View>
      </ScrollView>

      {ProductStore.detail.redeem.id == null &&
        <View
          shadow
          style={{
            flexDirection: 'column',
            backgroundColor: color.natural_100,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            width: "100%",
            padding: 16,
          }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{
              flexDirection: 'column',
              flexGrow: 1
            }}>
              <Text
                style={{
                  fontSize: fontSize.s,
                  fontFamily: fontFamily.reguler,
                  color: color.natural_60,
                }}
              >
                Redeem Points
              </Text>
              <Text
                style={{
                  fontSize: fontSize.m,
                  fontFamily: fontFamily.bold,
                  color: color.secondary_main,
                }}
              >
                {moneyFormat(ProductStore.detail.redeem_point)}
              </Text>
            </View>
            <Pressable
              onPress={() => setModalVisible(true)}
            >
              <View style={{
                flexGrow: 1,
                alignSelf: 'center',
              }}>
                <Text style={{
                  color: color.natural_100,
                  backgroundColor: color.primary_main,
                  fontSize: fontSize.m,
                  fontFamily: fontFamily.bold,
                  borderRadius: 4,
                  paddingVertical: 8,
                  paddingHorizontal: 16
                }}>Redeem</Text>
              </View>
            </Pressable>

          </View>

        </View>
      }


      <Modal
        animationType="fade"
        transparent={true}
        statusBarTranslucent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#00000077"
        }}>
          <View style={{
            flexDirection: 'column',
            margin: 20,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
          }}>
            <Icon style={{
              backgroundColor: color.natural_20,
              margin: 10,
              padding: 10,
              flexGrow: 0,
              borderRadius: 50,
            }} name="help-circle-outline" source="MaterialCommunityIcons" size={24} color={color.natural_100} />
            <Text style={{
              textAlign: 'center',
              marginVertical: 5,
              color: color.natural_20,
              fontFamily: fontFamily.medium,
              fontSize: fontSize.l,
            }}>Apa Anda Yakin?</Text>
            <View style={{
              flexDirection: "row",
              marginBottom: 10,
            }}>
              <Text style={{
                color: color.natural_60,
                fontFamily: fontFamily.reguler,
                textAlign: 'center',
                fontSize: fontSize.m,
              }}>Reedem Point Sejumlah </Text>
              <Text style={{
                color: color.secondary_main,
                fontFamily: fontFamily.bold,
                textAlign: 'center',
                fontSize: fontSize.m,
              }}>{moneyFormat(ProductStore.detail.redeem_point)} </Text>
              <Text style={{
                color: color.natural_60,
                fontFamily: fontFamily.reguler,
                textAlign: 'center',
                fontSize: fontSize.m,
              }}>Points</Text>
            </View>
            <View style={{
              flexDirection: 'row',
            }}>
              <Button
                mode="outlined"
                style={{
                  flexGrow: 1,
                  flex: 1,
                  marginRight: 5,
                  borderRadius: 4,
                  borderColor: color.primary_main,

                }}
                disabled={RedeemStore.isLoading}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={{
                  textAlign: 'center',
                  color: color.natural_20,
                  fontFamily: fontFamily.bold,
                  fontSize: fontSize.m,
                  paddingVertical: 8,
                  borderRadius: 4
                }}>Batal</Text>
              </Button>

              <Button
                style={{
                  flexGrow: 1,
                  marginLeft: 5,
                  borderRadius: 4
                }}
                disabled={RedeemStore.isLoading}
                onPress={async () => {
                  const res = await RedeemStore.confirmRedeem(ProductStore.detail.id)
                  if (!!res) {
                    setModalSuccess(true)
                  }

                }}
              >
                {RedeemStore.isLoading ?
                  <Spinner color="#fff"></Spinner>
                  :
                  <Text style={{
                    textAlign: 'center',
                    color: color.natural_100,
                    fontFamily: fontFamily.bold,
                    fontSize: fontSize.m,
                    paddingVertical: 8,
                    borderRadius: 4
                  }}>OK</Text>}

              </Button>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        statusBarTranslucent={true}
        visible={modalSuccess}
        onRequestClose={() => {
          setModalSuccess(!modalSuccess);
        }}>
        <View style={{
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#00000077"
        }}>
          <View style={{
            flexDirection: 'column',
            margin: 20,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
          }}>
            <Icon style={{
              backgroundColor: color.natural_20,
              margin: 10,
              padding: 10,
              flexGrow: 0,
              borderRadius: 50,
            }} name="check-circle-outline" source="MaterialCommunityIcons" size={24} color={color.natural_100} />
            <Text style={{
              textAlign: 'center',
              marginVertical: 5,
              color: color.natural_20,
              fontFamily: fontFamily.medium,
              fontSize: fontSize.l,
            }}>
              Request Redeem Berhasil
            </Text>
            <View style={{
              flexDirection: "row",
              marginBottom: 10,
            }}>
              <Text style={{
                color: color.natural_60,
                fontFamily: fontFamily.reguler,
                textAlign: 'center',
                fontSize: fontSize.m,
              }}>
                Silahkan datang ke CS untuk mengambil reward Anda
              </Text>
            </View>
            <View style={{
              flexDirection: 'row',
            }}>
              <Pressable
                style={{
                  flexGrow: 1,
                  marginRight: 5
                }}
                onPress={() => {
                  setModalSuccess(false);
                  setModalVisible(false);

                  refresh();
                }}
              >
                <Text style={{
                  textAlign: 'center',
                  color: color.natural_100,
                  backgroundColor: color.primary_main,
                  fontFamily: fontFamily.bold,
                  fontSize: fontSize.m,
                  paddingVertical: 8,
                  borderRadius: 4
                }}> OK</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </Screen>
  );
});



const styles = StyleSheet.create({
  centeredView: {

  },
  modalView: {

  },
  button: {
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});