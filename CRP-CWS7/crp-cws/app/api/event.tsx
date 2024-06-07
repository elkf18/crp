import api from "libs/utils/api";
import SessionStore from "app/model/session";
import AppConfig from "libs/config/app";

const session = SessionStore;

const getList = async (offset: number = 0, isBanner=0) => {
  const res = await api({
    url: `${AppConfig.serverUrl}index.php?r=apiService/listEvents`,
    method: "post",
    data: {
      appName: AppConfig.appName,
      appToken: AppConfig.appToken,
      customerToken: session.user.getUserToken,
      client: AppConfig.client,
      offset: offset,
      limit: "",
      is_banner:isBanner
    },
  });
  if (Array.isArray(res)) {
    return res;
  }
  return [];
};

const EventAPI = {
  getList,
};

export default EventAPI;
