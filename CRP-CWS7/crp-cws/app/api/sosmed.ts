import SessionStore from "app/model/session";
import AppConfig from "libs/config/app";
import api from "libs/utils/api";

const session = SessionStore;

const getList = async () => {
    // const res :any = await api({
    //   url: `${AppConfig.serverUrl}index.php?r=Api`,
    //   method: "post",
    //   data: {
    //     token: AppConfig.appToken,
    //     user_token: session.user.user_token,
    //     mode : "find",
    //     model : "MSosmed",
    //     condition:`id_client=${AppConfig.client}`
    //   },
    // });

    // //console.log(JSON.stringify(res))
    // if (!!res&& res.status==200) {
    //   return res.data;
    // }
    
    // alert(toJS(res))
    return [];
  };


  const SosmedAPI = {
    getList
  };
  
  export default SosmedAPI;
  