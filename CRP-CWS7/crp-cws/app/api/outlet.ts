import api from "libs/utils/api";
import SessionStore from "app/model/session";
import AppConfig from "libs/config/app";

const session = SessionStore;

const getList = async () => {
  const res = await api({
    url: `${AppConfig.serverUrl}index.php?r=apiService/listOutlet`,
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


const getListArea = async () => {
  const res = await api({
    url: `${AppConfig.serverUrl}index.php?r=apiService/listOutletCategory`,
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

const getDetail = async (id: any) => {
  const res: any = await api({
    url: `${AppConfig.serverUrl}index.php?r=apiService/detailOutlet`,
    method: "post",
    data: {
      appName: AppConfig.appName,
      appToken: AppConfig.appToken,
      client: AppConfig.client,
      customerToken: session.user.getUserToken,
      outlet: id,
    },
  });
  if (!!res && !!res.id) {
    return res;
  }
  return {};
};

const OutletAPI = {
  getList,
  getListArea,
  getDetail,
};

export default OutletAPI;
