import SessionStore from "app/model/session";
import AppConfig from "libs/config/app";
import api from "libs/utils/api";

const session = SessionStore;

const getList = async (offset: number) => {
  const res = await api({
    url: `${AppConfig.serverUrl}index.php?r=apiService/listCatalogue`,
    method: "post",
    data: {
      appName: AppConfig.appName,
      appToken: AppConfig.appToken,
      customerToken: SessionStore.user.user_token,
      client: AppConfig.client,
      offset:offset,
    },
  });
  if (Array.isArray(res)) {
    return res;
  }
  return [];
};

const getDetail = async (id: number) => {
  const res = await api({
    url: `${AppConfig.serverUrl}index.php?r=apiService/detailCatalogue`,
    method: "post",
    data: {
      appName: AppConfig.appName,
      appToken: AppConfig.appToken,
      customerToken: SessionStore.user.user_token,
      client: AppConfig.client,
      id:id,
    },
  });
  if (!!res) {
    return res;
  }
  return {};
};


const ProductAPI = {
  getList,
  getDetail
};

export default ProductAPI;
