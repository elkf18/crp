import api, { IAPI } from "libs/utils/api";
import SessionStore, { User } from "app/model/session";
import AppConfig from "libs/config/app";
import Membership from "app/pages/Membership";
import App from "app/pages/Faq";

const session = SessionStore;

const getMembershipStatus = async () => {
  const res = await api({
    url: `${AppConfig.serverUrl}index.php?r=apiService/getMembershipStatus`,
    method: "post",
    data: {
      appName: AppConfig.appName,
      appToken: AppConfig.appToken,
      customerToken: session.user.user_token,
    },
  });

  
  if (typeof res === "object"){
    //console.log(JSON.stringify(res))
    return res;
  }
  return Membership();
};


const getListHistory = async (limit: number = 20, offset: number = 0) => {
  const res = await api({
    url: `${AppConfig.serverUrl}index.php?r=apiService/getPointHistory`,
    method: "post",
    data: {
      appName: AppConfig.appName,
      appToken: AppConfig.appToken,
      customerToken: session.user.user_token,
      offset: offset,
      limit: limit
    },
  });
  if (Array.isArray(res)) {
    return res;
  }
  return [];
};

// limit: number = 1, offset: number = 0

const getListCoupon = async (sales_order_number: string="", offset: number = 0) => {

  const rest = await api({
    url: `${AppConfig.serverUrl}index.php?r=apiService/listKupon`,
    method: "post",
    data: {
      appName: AppConfig.appName,
      appToken: AppConfig.appToken,
      customerToken: session.user.user_token,
      client: 41,
      user: "",
      offset: offset,
      sales_order_number: sales_order_number
    }
  });
  
  if (Array.isArray(rest)) {
    return rest;
  }
  return [];
}

const getHistoryCoupon = async (limit: number = 20, offset: number = 0) => {

  const rest = await api({
    url: `${AppConfig.serverUrl}index.php?r=apiService/listKuponHistory`,
    method: "post",
    data: {
      appName: AppConfig.appName,
      appToken: AppConfig.appToken,
      customerToken: session.user.user_token,
      client: 41,
      user: "",
      offset: offset,
      limit: limit
    }
  });
  
  if (Array.isArray(rest)) {
    return rest;
  }
  return [];
}

const getCustomerPoin = async (user:User) => {
  const params: IAPI = {
    method: "post",
    url: AppConfig.serverUrl + "index.php?r=apiService/getCustomerPoin",
    data: {
      appName: AppConfig.appName,
      appToken: AppConfig.appToken,
      userToken: user.user_token,
      client: user.id_client,
      id_customer: user.id,
    },
  };

  //console.log(JSON.stringify(params))

  const res: any = await api(params);
  
  if (!!res) {
    return res;
  }else{
  }
  return [];
};


const getWinner = async (no_kupon:string) => {
  const params: IAPI = {
    method: "post",
    url: AppConfig.serverUrl + "index.php?r=apiService/getWinner",
    data: {
      appName: AppConfig.appName,
      appToken: AppConfig.appToken,
      customerToken: SessionStore.user.user_token,
      client: SessionStore.user.id_client,
      no_kupon: no_kupon
    },
  };
  console.log(params)
  const res: any = await api(params);
  

  if (!!res) {
    return res;
  }else{
  }
  return {};
}
  

const getCouponCount = async (user:User) => {
  const params: IAPI = {
    method: "post",
    url: AppConfig.serverUrl + "index.php?r=apiService/countKupon",
    data: {
      appName: AppConfig.appName,
      appToken: AppConfig.appToken,
      userToken: user.user_token,
      client: user.id_client
    },
  };

  // console.log(JSON.stringify(params))

  const res: any = await api(params);
  console.log(res)

  if (!!res) {
    return res;
  }else{
  }
  return [];
};



const MembershipAPI = {
    getMembershipStatus,
    getListHistory,
    getCustomerPoin,
    getListCoupon,
    getWinner,
    getCouponCount,
    getHistoryCoupon

};

export default MembershipAPI;
