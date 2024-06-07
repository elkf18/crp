import HistoryStore from "app/model/history";
import useTheme from "libs/hooks/useTheme";
import { Text, View } from "libs/ui";
import { dateFormat } from "libs/utils/date";
import { moneyFormat } from "libs/utils/string-format";
import { observer } from "mobx-react";
import React from "react";

export default observer(() => {
  const item = HistoryStore.detail;
  const Theme = useTheme();

  return (
    <View
      style={{
        padding: 15,
      }}
    >
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              fontFamily: Theme.fontStyle.bold,
            }}
          >
            Nomor Order
          </Text>
          <Text
            style={{
              marginBottom: 15,
            }}
          >
            {item.sales_order_number}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: Theme.fontStyle.bold,
          }}
        >
          {dateFormat(item.created_date, "d MMM yyyy - HH:mm")}
        </Text>
      </View>
      <Text
        style={{
          fontFamily: Theme.fontStyle.bold,
          marginBottom: 10,
        }}
      >
        Transaksi
      </Text>
      {item.product.map((p, key) => (
        <View
          key={key}
          style={{
            flexDirection: "row",
            margin: 10,
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
          marginTop: 15,
          alignItems: "flex-end",
        }}
      >
        <Text
          style={{
            fontFamily: Theme.fontStyle.bold,
          }}
        >
          Grand Total
        </Text>
        <Text
          style={{
            fontFamily: Theme.fontStyle.bold,
            fontSize: 18,
          }}
        >
          {moneyFormat(item.grand_total, "Rp. ")}
        </Text>
      </View>
    </View>
  );
});
