import api from "libs/utils/api";
import SessionStore from "app/model/session";
import AppConfig from "libs/config/app";
import { Alert } from "react-native";

const session = SessionStore;

const postPreOrder = async (data: any) => {

  console.log(JSON.stringify({
    url: `${AppConfig.serverUrl}index.php?r=apiService/postPreOrder`,
    method: "post",
    data: {
      appName: AppConfig.appName,
      appToken: AppConfig.appToken,
      client: AppConfig.client,
      customerToken: session.user.user_token,
      ...data,
    },
  }))
  
  const res: any = await api({
    url: `${AppConfig.serverUrl}index.php?r=apiService/postPreOrder`,
    method: "post",
    data: {
      appName: AppConfig.appName,
      appToken: AppConfig.appToken,
      client: AppConfig.client,
      customerToken: session.user.user_token,
      ...data,
    },
  });

  
  //console.log(JSON.stringify(res))

  if (typeof res === "object" && !!res.status) {
    if (!!res.status) {
      return res;
    } else {
      Alert.alert("Alert", res.message);
    }
  }
  Alert.alert(
    "Pesanan Dibatalkan",
    "Telah terjadi kesalah. Mohon coba kembali."
  );
  return null;
};

const listHistory = async (status: string) => {
  const res: any = await api({
    url: `${AppConfig.serverUrl}index.php?r=apiService/getListHistoryOrder`,
    method: "post",
    data: {
      appName: AppConfig.appName,
      appToken: AppConfig.appToken,
      client: AppConfig.client,
      customerToken: session.user.user_token,
      status,
      sales_order_number: "",
    },
  });

  // console.log(JSON.stringify({
  //   url: `${AppConfig.serverUrl}index.php?r=apiService/getListHistoryOrder`,
  //   method: "post",
  //   data: {
  //     appName: AppConfig.appName,
  //     appToken: AppConfig.appToken,
  //     client: AppConfig.client,
  //     customerToken: session.user.user_token,
  //     status,
  //     sales_order_number: "",
  //   },
  // }))

  // //console.log(JSON.stringify(res))
  if (Array.isArray(res)) {
    return res;
  }
  return [];
};

const detailHistory = async (sales_order_number: string) => {
  const res: any = await api({
    url: `${AppConfig.serverUrl}index.php?r=apiService/getListHistoryOrder`,
    method: "post",
    data: {
      appName: AppConfig.appName,
      appToken: AppConfig.appToken,
      client: AppConfig.client,
      customerToken: session.user.user_token,
      status: "",
      sales_order_number,
    },
  });

  console.log(JSON.stringify({
    url: `${AppConfig.serverUrl}index.php?r=apiService/getListHistoryOrder`,
    method: "post",
    data: {
      appName: AppConfig.appName,
      appToken: AppConfig.appToken,
      client: AppConfig.client,
      customerToken: session.user.user_token,
      status: "",
      sales_order_number,
    },
  }))

  
  if (Array.isArray(res) && res.length > 0) {
    return res[0];
  }
  return {};
};

const OrderAPI = {
  // postPreOrder,
  // listHistory,
  // detailHistory,
};

export default OrderAPI;
