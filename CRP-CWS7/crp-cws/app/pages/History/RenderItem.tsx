import Fonts from "libs/assets/fonts";
import { Button, Image, Text, View } from "libs/ui";
import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React from "react";
import { moneyFormat } from "libs/utils/string-format";
import { dateFormat } from "libs/utils/date";
import { History } from "app/model/history/history";
import OrderStore from "app/model/order";
import OutletStore from "app/model/outlet";
import ProductStore from "app/model/product";
import HistoryStore from "app/model/history";
import { runInAction } from "mobx";
import { ToastAndroid } from "react-native";
import color from "app/config/color";
import { fontFamily, fontSize } from "app/config/const";

export default observer((props: any) => {
    const { item } = props;

    const dataType = (): string => {
        var type = ''

        if (item.hasOwnProperty('poin')) {
            type = 'poin'
        }

        return type
    }

    const PointRenderItem = () => {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 16,
                paddingHorizontal: 10
            }}>
                <View>
                    <Text style={{
                        color: color.natural_20,
                        fontFamily: fontFamily.reguler,
                        fontSize: fontSize.m
                    }}>
                        {dateFormat(item.created_date)}
                    </Text>

                    {(!!item.sales_order_number || !!item.remarks) &&
                        <Text style={{
                            color: '#808080',
                            fontFamily: fontFamily.reguler,
                            fontSize: fontSize.m
                        }}>
                            
                            {!!item.sales_order_number ? item.sales_order_number : item.remarks}
                        </Text>
                    }

                    {(!!item.transaction_amount || item.product_name) &&
                        <Text style={{
                            color: '#808080',
                            fontFamily: fontFamily.reguler,
                            fontSize: fontSize.m
                        }}>
                            {item.remarks != "Catalog redeem" ? moneyFormat(item.transaction_amount, "Rp. ") : item.product_name}
                        </Text>
                    }

                </View>
                <View style={{
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        color: item.poin > 0 ? color.secondary_main : color.natural_20,
                        fontFamily: fontFamily.bold,
                        fontSize: fontSize.m
                    }}>
                        {item.poin > 0 ? '+' : ''}{item.poin} Pts
                    </Text>
                </View>
            </View>
        )
    }

    return (
        <View style={{
            paddingTop: 8,
            paddingHorizontal: 8
        }}>
            {(dataType() == 'poin') && <PointRenderItem />}
        </View>
    );
});
