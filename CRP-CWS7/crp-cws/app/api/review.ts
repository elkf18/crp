import api from "libs/utils/api";
import SessionStore from "app/model/session";
import AppConfig from "libs/config/app";
import { Alert } from "react-native";

const session = SessionStore;



const listReview = async (id_sales_order:number) => {
  const res: any = await api({
    url: `${AppConfig.serverUrl}index.php?r=apiService/listReview`,
    method: "post",
    data: {
      appName: AppConfig.appName,
      appToken: AppConfig.appToken,
      customerToken: session.user.user_token,
      id_sales_order: id_sales_order,
    },
  });

  console.log(JSON.stringify({
    url: `${AppConfig.serverUrl}index.php?r=apiService/listReview`,
    method: "post",
    data: {
      appName: AppConfig.appName,
      appToken: AppConfig.appToken,
      customerToken: session.user.user_token,
      id_sales_order: id_sales_order,
    },
  }))

  if (Array.isArray(res)) {
    return res;
  }
  return [];
};

const postReview = async (data:any) => {
  const res: any = await api({
    url: `${AppConfig.serverUrl}index.php?r=apiService/postReview`,
    method: "post",
    data: {
      appName: AppConfig.appName,
      appToken: AppConfig.appToken,
      customerToken: session.user.user_token,
      ...data

      
    },
  })

  console.log(JSON.stringify({
    url: `${AppConfig.serverUrl}index.php?r=apiService/postReview`,
    method: "post",
    data: {
      appName: AppConfig.appName,
      appToken: AppConfig.appToken,
      customerToken: session.user.user_token,
      ...data

      
    },
  }))

  if (res==1) {
    return true;
  }
  return false;
};

const ReviewAPI = {
    listReview,
    postReview
};

export default ReviewAPI;
