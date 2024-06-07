import api from "libs/utils/api";
import SessionStore from "app/model/session";
import AppConfig from "libs/config/app";

const session = SessionStore;

const getList = async () => {
  const res = await api({
    url: `${AppConfig.serverUrl}index.php?r=apiService/listBanner`,
    method: "post",
    data: {
      appName: AppConfig.appName,
      appToken: AppConfig.appToken,
      customerToken: session.user.getUserToken,
      client: AppConfig.client,
      limit: "",
    },
  });
  if (Array.isArray(res)) {
    return res;
  }
  return [];
};

const BannerAPI = {
  getList,
};

export default BannerAPI;
