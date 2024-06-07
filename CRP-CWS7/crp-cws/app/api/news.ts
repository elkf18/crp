import api from "libs/utils/api";
import SessionStore from "app/model/session";
import AppConfig from "libs/config/app";

const session = SessionStore;

const getList = async (offset:number) => {
  const res = await api({
    url: `${AppConfig.serverUrl}index.php?r=apiService/listNews`,
    method: "post",
    data: {
      appName: AppConfig.appName,
      appToken: AppConfig.appToken,
      customerToken: session.user.getUserToken,
      client: AppConfig.client,
      limit: "",
      offset
    },
  });
  console.log(JSON.stringify({
    url: `${AppConfig.serverUrl}index.php?r=apiService/listNews`,
    method: "post",
    data: {
      appName: AppConfig.appName,
      appToken: AppConfig.appToken,
      customerToken: session.user.getUserToken,
      client: AppConfig.client,
      limit: "",
    },
  }))
  if (Array.isArray(res)) {
    return res;
  }
  return [];
};

const NewsAPI = {
  getList,
};

export default NewsAPI;
