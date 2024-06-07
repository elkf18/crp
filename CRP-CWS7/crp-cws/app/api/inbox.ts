import api from "libs/utils/api";
import SessionStore from "app/model/session";
import AppConfig from "libs/config/app";

const session = SessionStore;

const getList = async () => {
  const res = await api({
    url: `${AppConfig.serverUrl}index.php?r=apiService/listNews`,
    method: "post",
    data: {
      appName: AppConfig.appName,
      appToken: AppConfig.appToken,
      customerToken: session.user.user_token,
      client: AppConfig.client,
    },
  });
  if (Array.isArray(res)) {
    return res;
  }
  return [];
};

const InboxAPI = {
  getList,
};

export default InboxAPI;
