import SessionStore from "app/model/session";
import AppConfig from "libs/config/app";
import api from "libs/utils/api";
import { toJS } from "mobx";
import { Alert } from "react-native";



const postRedeem = async (id_product: number) => {
  console.log(JSON.stringify(
    {
      url: `${AppConfig.serverUrl}index.php?r=Api`,
      method: "post",
      data: {
        mode: "function",
        model: "TRedeem",
        function: "CreateRedeem",
        params: {
          customer_token: SessionStore.user.user_token,
          id_product: id_product
        },
        token: AppConfig.apiToken,
        user_token: AppConfig.crpUserToken,
      },
    }
  ))
  const res: any = await api({
    url: `${AppConfig.serverUrl}index.php?r=Api`,
    method: "post",
    data: {
      mode: "function",
      model: "TRedeem",
      function: "CreateRedeem",
      params: {
        customer_token: SessionStore.user.user_token,
        id_product: id_product
      },
      token: AppConfig.apiToken,
      user_token: AppConfig.crpUserToken,
    },
  });

  //console.log(JSON.stringify(res))
  if (!!res && res.status == "submitted") {
    return res.data;
  } else if (!!res.status) {
    if(!!res.message){
      Alert.alert(res.status, res.message);
      return false;
    }
    alert(res.status)
    return false;
  }

  alert(JSON.stringify(res))
  return false;
};


const RedeemAPI = {
  postRedeem
};

export default RedeemAPI;
