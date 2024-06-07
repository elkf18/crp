import HistoryStore from "app/model/history";
import useTheme from "libs/hooks/useTheme";
import { Image, Text, View } from "libs/ui";
import { dateFormat } from "libs/utils/date";
import { moneyFormat } from "libs/utils/string-format";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";

function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
   //console.log("scarooo -> "+value+": "+HistoryStore.detail.visible)
  return () => setValue(value => value + 1); // update the state to force render
}

export default observer(() => {
  const Theme = useTheme();
  const forceUpdate = useForceUpdate();
  useEffect(()=>{
    forceUpdate();
  },[HistoryStore.detail.product])

  // //console.log("------Transaksi Item List----")
  // //console.log(toJS(item))
  // //console.log("----------")
  

  return (
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
        Pesanan
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
  );
});
