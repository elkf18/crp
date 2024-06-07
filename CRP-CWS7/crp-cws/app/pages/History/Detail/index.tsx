import { useIsFocused, useNavigation } from "@react-navigation/native";
import HistoryStore from "app/model/history";
//import {History} from "app/model/history";
import OutletStore from "app/model/outlet";
import TopBar from "app/ui/utils/TopBar";
import Fonts from "libs/assets/fonts";
import AppConfig from "libs/config/app";
import useTheme from "libs/hooks/useTheme";
import { Image, Screen, ScrollView, Text, View, Button } from "libs/ui";
import { dateFormat } from "libs/utils/date";
import { moneyFormat } from "libs/utils/string-format";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { AppState, RefreshControl } from "react-native";
import PaymentMethod from "./PaymentMethod";
import QRCode from "./QRCode";
import Transaksi from "./Transaksi";
import TransaksiList from "./TransaksiList";

function useForceUpdate(){
  
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}

export default observer(() => {
  const Theme = useTheme();
  // const item = HistoryStore.detail;
  const outlet = OutletStore.list.find((x) => x.id === HistoryStore.detail.id_outlet.toString());
  const nav = useNavigation();
  const isFocused = useIsFocused();
  const forceUpdate = useForceUpdate();

  const refresh = async () => {
    
    forceUpdate();
    await HistoryStore.detail.load().then(()=>{
      forceUpdate();
    });
  };

  useEffect(()=>{
    refresh();
  },[])

   AppState.addEventListener('change', (nextAppState) => {
    if (nextAppState === 'active') {
      refresh();
    }
});

  const refreshControl = (
    <RefreshControl
      refreshing={HistoryStore.detail.loading}
      onRefresh={refresh}
    />
  );

  return (
    <Screen
      style={{
        backgroundColor: "white",
      }}
      statusBar={{
        barStyle: "dark-content",
        backgroundColor: "#00000000",
      }}
    >
      <TopBar title={"Status Pesanan"} />
      <ScrollView
      refreshControl={refreshControl}>
      <View
      style={{
        backgroundColor:"#fff",
        
        paddingTop: HistoryStore.detail.status === "paid"||HistoryStore.detail.status === "draft"?0:10,
        borderTopStartRadius:20,
        borderTopEndRadius:20,
      }}>
      
          {HistoryStore.detail.status === "paid"? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              backgroundColor: Theme.colors.primary,
            }}
          >
            <Text
              style={{
                color: "#fff",
              }}
            >
              Waktu pengambilan {dateFormat(HistoryStore.detail.est_delivery, "HH:mm")}.
            </Text>
          </View>
        ):<></>}
        {HistoryStore.detail.status === "draft"? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              backgroundColor: "#ffb037",
            }}
          >
            <Text
              style={{
                color: "#fff",
              }}
            >
              Sedang menunggu pembayaran.
            </Text>
          </View>
        ):<></>}
        <ScrollView >
          <View
            style={{
              flexDirection:"row",
              padding:15,
              alignItems:"center"
            }}>
              {(HistoryStore.detail.status === "cancelled"||HistoryStore.detail.status === "expired"||HistoryStore.detail.status === "expired by user"||HistoryStore.detail.status === "cancelled by user") ? 
                <Image
                source={require("app/assets/images/history-inactive.png")}
                style={{
                  height: 45,
                  width: 45,
                }}
              />
                :
                (
                <Image
                  source={require("app/assets/images/history-active.png")}
                  style={{
                    height: 45,
                    width: 45,
                  }}
                />
                )}
                <View
              style={{
                flexGrow:1
              }}></View>
            <View
              style={{
                flexDirection:"column",
              }}>
                <Text
                style={{
                  textAlign:"right"
                }}>
                {dateFormat(HistoryStore.detail.created_date, "EEEE, d MMMM yyyy, HH:mm")}
              </Text>
              <Text
                style={{
                  textAlign:"right"
                }}
              >
               No. Order {HistoryStore.detail.sales_order_number}
              </Text>
            </View>
          </View>
          
          <View
          style={{
            marginVertical:10,
            backgroundColor:"#dfdfdf",
            height:1
          }}
          />
          <View
          style={{
            padding:15
          }}
          >
            {(HistoryStore.detail.status === "cancelled"||HistoryStore.detail.status === "expired"||HistoryStore.detail.status === "expired by user"||HistoryStore.detail.status === "cancelled by user") && (
              <Text
                style={{
                  fontFamily: Fonts.MontserratBold,
                  fontSize:14,
                  color:"#ff0000"
                }}
              >
              Pesanan Dibatalkan
              </Text>
            )}
            <Text
                style={{
                  fontFamily: Fonts.MontserratBold,
                  marginBottom: 10,
                }}
              >
                {/* {outlet?.nama} */}
                { HistoryStore.detail.getOutlet.nama}
              </Text>
              <Text
                style={{
                  fontSize:12
                }}
              >
                { HistoryStore.detail.getOutlet.alamat}, { HistoryStore.detail.getOutlet.kota}, { HistoryStore.detail.getOutlet.provinsi}
                {/* {outlet?.alamat}, {outlet?.kota}, {outlet?.provinsi} */}
              </Text>
          </View>
          
          <View
          style={{
            marginVertical:10,
            backgroundColor:"#dfdfdf",
            height:1
          }}
          />
          {/* <TrxList /> */}
          <View
      style={{
        paddingHorizontal: 15,
      }}
    >
      <Text
        style={{
          fontFamily: Theme.fontStyle.bold,
          
          color:Theme.colors.primary
        }}
      >
        Pesanan {HistoryStore.detail.product.length}
      </Text>
      { HistoryStore.detail.product.map((p, key) => (
        <View
          key={key}
          style={{
            flexDirection: "row",
            marginVertical: 10,
          }}
        >
          <Text
            style={{
              fontFamily: Theme.fontStyle.bold,
              fontSize: 12,
            }}
          >
            {p.qty}x
          </Text>
          <View
            style={{
              flex: 1,
              marginHorizontal: 10,
            }}
          >
            <Text
              style={{
                fontFamily: Theme.fontStyle.bold,
                fontSize: 12,
              }}
            >
              {p.name}
            </Text>
            {p.complement.length > 0 && (
              <Text
                style={{
                  fontSize: 12,
                }}
              >
                {p.complement.map((x) => x.name).join(", ")}
              </Text>
            )}
          </View>
          <Text
            style={{
              fontFamily: Theme.fontStyle.bold,
            }}
          >
            {moneyFormat(p.total)}
          </Text>
        </View>
      ))}
      <View
        style={{
          paddingTop: 10,
          alignItems: "center",
          flexDirection:"row",
          borderTopWidth:1,
          borderColor: "#ccc",

        }}
      >
      <Text
        style={{
          
          marginEnd:10
        }}
      >
        Subtotal
      </Text>
        <View
        style={{
          flexGrow:1
        }}
        />
        <Text
          style={{
            fontFamily: Theme.fontStyle.bold,
          }}
        >
          {moneyFormat( HistoryStore.detail.sub_total, "Rp. ")}
        </Text>

      </View>

      <View
        style={{
          marginTop: 10,
          alignItems: "center",
          flexDirection:"row"
        }}
      >
      <Text
        style={{
          
          marginEnd:10
        }}
      >
        Jokopi Points
      </Text>
        <View
        style={{
          flexGrow:1
        }}
        />
        <Text
          style={{
            
          }}
        >
          {moneyFormat( HistoryStore.detail.getUsedPoint.total_payment, "- Rp. ")}
        </Text>

      </View>

      <View
        style={{
          marginTop: 15,
          alignItems:"center",
          flexDirection:"row",
          
        }}
      >



        <Text
          
        >
          Total
        </Text>
        <View
        style={{
            flexGrow:1
        }}
        />
        { HistoryStore.detail.getPayment.payment_method.toUpperCase().includes("GOPAY") ? (
          <Image
            source={require("app/assets/images/gopay.png")}
            style={{
              width: 50,
              height: 40,
            }}
          />
        ) :  HistoryStore.detail.getPayment.payment_method.toUpperCase().includes("OVO") ? (
          <Image
            source={require("app/assets/images/ovo.png")}
            style={{
              width: 50,
              height: 30,
            }}
          />
        ) : (
          <>
          </>
          // <Image
          //   source={require("app/assets/images/cash.png")}
          //   style={{
          //     width: 50,
          //     height: 40,
          //   }}
          // />
        )}
        <Text
          style={{
            fontFamily: Theme.fontStyle.bold,
            fontSize: 18,
          }}
        >
          {moneyFormat( HistoryStore.detail.getAfterPoint, "Rp. ")}
          {/* {( HistoryStore.detail.sub_total)} */}
        </Text>
      </View>
    </View>
          {/* <TransaksiList/> */}
          {/* <PaymentMethod /> */}
          <View
          style={{
            marginVertical:10,
            backgroundColor:"#dfdfdf",
            height:1
          }}
          />
          {/* <QRCode /> */}
          {HistoryStore.detail.status !== "draft" && HistoryStore.detail.status!=="expired by user" &&
          <View
          style={{
            marginTop:15,
            justifyContent: "center",
            alignItems: "center",
            flexDirection:"column",
            
          }}
        >
          <View
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  marginBottom: 20,
                  borderRadius: 16,
                  overflow: "hidden",
                  height: 300,
                  width: 300,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{
                    uri:
                      AppConfig.serverUrl +
                      HistoryStore.detail.qr_code,
                  }}
                  style={{
                    width: 300,
                    height: 300,
                  }}
                />
              </View>
              <Text
                style={{
                  fontFamily: Theme.fontStyle.bold,
                  fontSize: 16,
                }}
              >
                {HistoryStore.detail.sales_order_number}
              </Text>

              {/* {HistoryStore.getIsManyOrder && (
                <Text
                  style={{
                    fontFamily: Theme.fontStyle.bold,
                    fontSize: 16,
                  }}
                  onPress={() => {
                    nav.navigate("History");
                  }}
                >
                  Lihat order lainnya.
                </Text>
              )} */}

            
              <View
                style={{
                  justifyContent: "center",
                  padding: 20,
                }}
              >
                <Text
                  style={{
                    fontFamily: Fonts.MontserratBold,
                    color: Theme.colors.primary,
                    fontSize: 20,
                    marginBottom: 10,
                    textAlign: "center",
                  }}
                >
                  Kode QR Kamu
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                  }}
                >
                  Tunjukan kode QR kamu ke kasir pada saat pengambilan langsung
                  di outlet.
                </Text>
              </View>
            

              {HistoryStore.detail.status=="complete" && HistoryStore.detail.review.id==0 &&
              <Button
              style={{
                flex:1,
                flexGrow:1,
                width:"90%",
                flexDirection:"column",
                marginHorizontal:16,
                marginBottom:16,
                borderRadius:99,
                borderWidth:1,
                backgroundColor:"#fff",
                borderColor:Theme.colors.primary
              }}
              onPress={()=>{
                HistoryStore.detail.visible=false
                HistoryStore.detail.visible=false
                nav.navigate("Review")
              }}
              >
              <Text
                  style={{
                    textAlign: "center",
                    color:Theme.colors.primary,
                    fontFamily:Fonts.MontserratBold
                  }}
                >
                Berikan Ulasan
                </Text>
              </Button>
              }

        { HistoryStore.detail.review.id!=0 &&
              <Button
              style={{
                flex:1,
                flexGrow:1,
                width:"90%",
                flexDirection:"column",
                marginHorizontal:16,
                marginBottom:16,
                borderRadius:99,
                borderWidth:1,
                backgroundColor:"#fff",
                borderColor:Theme.colors.primary
              }}
              onPress={()=>{
                HistoryStore.detail.visible=false
                nav.navigate("ReviewHistory")
              }}
              >
              <Text
                  style={{
                    textAlign: "center",
                    color:Theme.colors.primary,
                    fontFamily:Fonts.MontserratBold
                  }}
                >
                Lihat Ulasan
                </Text>
              </Button>
              }   

              
        </View>
        }
        </ScrollView>
      </View>
      </ScrollView>
      
    </Screen>
  );
  
});
// const TrxList = observer((props:any) => {
//   const { item } = props;
//   const Theme = useTheme();
//   const forceUpdate = useForceUpdate();
//   useEffect(()=>{
//     forceUpdate();
//   },[HistoryStore.detail.product.toString()])

//   // //console.log("------Transaksi Item List----")
//   // //console.log(toJS(item))
//   // //console.log("----------")
  

//   return (
    
//   );
// });