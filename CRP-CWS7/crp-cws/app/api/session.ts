import SessionStore, { User } from "app/model/session";
import { generateFormData } from "app/model/utils";
import AppConfig from "libs/config/app";
import api, { IAPI } from "libs/utils/api";
import { toJS } from "mobx";
import LogAPI from "./log";

const session = SessionStore

const login = async (data: any) => {
  const params: IAPI = {
    method: "post",
    url:
      AppConfig.serverUrl + "index.php?r=apiAuthCustomer/LoginMobileCustomer",
    data: {
      appName: AppConfig.appName,
      appToken: AppConfig.appToken,
      client: AppConfig.client,
      data,
    },
  };

  const res: any = await api(params);
  
  if (typeof res === "object") {
    if (!!res.status) {
      return res.data;
    } else {
      alert(res.message);
      return {};
    }
  } else {
    
    LogAPI.saveLog({
      ...params,
      result: res,
    });
  }
};

const isRegistered = async (data: any) => {
  const params: IAPI = {
    method: "post",
    url: AppConfig.serverUrl + "index.php?r=apiAuthCustomer/isUserExist",
    data: {
      appName: AppConfig.appName,
      appToken: AppConfig.appToken,
      client: AppConfig.client,
      data,
    },
  };
  //console.log(params)
  const res: any = await api(params);
  if (typeof res === "object") {
    if (res.status) {
      return res.exist;
    } else {
      alert(res.message);
      return false;
    }
  } else {
    LogAPI.saveLog({
      ...params,
      result: res,
    });
  }
};

const register = async (data: any) => {
  const params: IAPI = {
    method: "post",
    url:
      AppConfig.serverUrl +
      "index.php?r=apiAuthCustomer/RegisterMobileCustomer",
    data: {
      appName: AppConfig.appName,
      appToken: AppConfig.appToken,
      client: AppConfig.client,
      data,
    },
  };
  console.log(params)
  const res: any = await api(params);
  if (typeof res === "object") {
    if (!!res.status) {
      return res.data;
    } else {
      alert(res.message);
      return {};
    }
  } else {
    LogAPI.saveLog({
      ...params,
      result: res,
    });
  }
};

function clean(obj:any) {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
      delete obj[propName];
    }
  }
  return obj
}

const updateProfile = async (jwt: string, data: any, foto?: any) => {
  data=clean(data)
  const fdata = generateFormData(data);
  if (!!foto) {
    fdata.append("foto", foto);
  }
  const params: IAPI = {
    method: "post",
    url: AppConfig.serverUrl + "index.php?r=apiAuthCustomer/updateProfile",
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    data: fdata,
    onError: (e) => console.log(e),
  };
  console.log(JSON.stringify(params));
  const res: any = await api(params);
  if (typeof res === "object") {
    if (!!res.status) {
      alert(res.message);
      return res.data;
    } else {
      alert(res.message);
      return null;
    }
  } else {
    LogAPI.saveLog({
      ...params,
      result: res,
    });
  }
};

const changePassword = async (jwt: string, data: any) => {
  const params: IAPI = {
    method: "post",
    url: AppConfig.serverUrl + "index.php?r=apiAuthCustomer/changePassword",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    data,
  };
  //console.log(JSON.stringify(params))
  const res: any = await api(params);
  if (typeof res === "object") {
    alert(res.message);
    return res.status;
  } else {
    alert(res.message);
    LogAPI.saveLog({
      ...params,
      result: res,
    });
  }
};

const forgotPassword = async (data: any) => {
  const params: IAPI = {
    method: "post",
    url: AppConfig.serverUrl + "index.php?r=apiAuthCustomer/forgotPassword",
    data: {
      appName: AppConfig.appName,
      appToken: AppConfig.appToken,
      client: AppConfig.client,
      data,
    },
  };

  //console.log(JSON.stringify(params))
  const res: any = await api(params);
  if (typeof res === "object") {
    if (!!res.status) {
      return res.data;
    } else {
      alert(res.message);
      return null;
    }
  } else {
    LogAPI.saveLog({
      ...params,
      result: res,
    });
  }
};

const requestOTP = async (data: any) => {
  const params: IAPI = {
    method: "post",
    url: AppConfig.serverUrl + "index.php?r=apiAuthCustomer/RequestOTP",
    data: {
      appName: AppConfig.appName,
      appToken: AppConfig.appToken,
      client: AppConfig.client,
      data,
    },
  };

  //console.log(JSON.stringify(params))
  const res: any = await api(params);
  ////console.log(JSON.stringify(res))
  if (typeof res === "object") {
    if (!!res.status) {
      return String(res.otp || "");
    } else {
      return "";
    }
  } else {
    LogAPI.saveLog({
      ...params,
      result: res,
    });
  }
};

const updateDevice = async (jwt: string, data: any) => {
  const params: IAPI = {
    method: "post",
    url: AppConfig.serverUrl + "index.php?r=apiAuthCustomer/updateDevice",
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    data,
  };
  const res: any = await api(params);
  if (typeof res === "object") {
    if (!!res.status) {
      return true;
    }
  } else {
    LogAPI.saveLog({
      ...params,
      result: res,
    });
  }
  return false;
};

const validationOTP = async (data: any) => {
  const params: IAPI = {
    method: "post",
    url: AppConfig.serverUrl + "index.php?r=apiAuthCustomer/validationOTP",
    data: {
      appName: AppConfig.appName,
      appToken: AppConfig.appToken,
      client: AppConfig.client,
      data,
    },
  };

  //console.log(JSON.stringify(params))
  const res: any = await api(params);
  if (typeof res === "object") {
    if (!!res.status) {
      return true;
    } else {
      alert(res.message);
      return false;
    }
  }
  LogAPI.saveLog({
    ...params,
    result: res,
  });
  return false;
};

const getListSosmed = async () => {
  const res :any = await api({
    url: `${AppConfig.serverUrl}index.php?r=Api`,
    method: "post",
    data: {
      token: AppConfig.appToken,
      user_token: sessionStorage.user.user_token,
      mode : "find",
      model : "MCustomerSocialMedia",
      condition:`id_client=${sessionStorage.user.id_client}`
    },
  });
  
  if (!!res&& res.status==200) {
    return res.data;
  }
  
  alert(toJS(res))
  return [];
};

const getListCustSosmed = async (user:User) => {
  const params: IAPI = {
    method: "post",
    url: AppConfig.serverUrl + "index.php?r=apiService/listCustSosmed",
    data: {
      appName: AppConfig.appName,
      appToken: AppConfig.appToken,
      userToken: user.user_token,
      client: user.id_client,
      id_user: user.id,
    },
  };

  const res: any = await api(params);
  
  if (Array.isArray(res)) {
    return res;
  }else{
    //console.log(JSON.stringify(res))
  }
  return [];
};

const postSosmed = async (data: any,user:User) => {
  
  const params: IAPI = {
    method: "post",
    url: AppConfig.serverUrl + "index.php?r=apiService/postCustSosmed",
    data: {
      appName: AppConfig.appName,
      appToken: AppConfig.appToken,
      userToken: user.user_token,
      client: user.id_client,
      id_user: user.id,
      sosmed: data,
    },
    
    
  };
  const res: any = await api(params);

  if (typeof res === "object") {
    if (!!res.status) {
      alert(res.message);
      return res.data;
    } else {
      alert(res.message);
      return null;
    }
  }
};

const deleteAccount = async (user: User) => {
  const params: IAPI = {
    method: "post",
    url: AppConfig.serverUrl + "index.php?r=apiAuthCustomer/deletAccount",
    data: {
      appName: AppConfig.appName,
      appToken: AppConfig.appToken,
      customerToken: user.user_token,
      client: user.id_client,
      user: ""
    }
  }

  const res: any = await api(params);

  if(typeof res === "object") {
      if(res != null) {
        return res
      }   
    }
}


const getFeature = async () => {
  const params: IAPI = {
    method: "post",
    url: AppConfig.serverUrl + "index.php?r=apiService/Features",
    data: {
      appName: AppConfig.appName,
      appToken: AppConfig.appToken,
      customerToken: SessionStore.user.user_token,
      client: SessionStore.user.id_client
    }
  }

  const res: any = await api(params);

  if(typeof res === "object") {
      if(res != null) {
        return res
      }   
    }
}

const SessionAPI = {
  login,
  isRegistered,
  register,
  requestOTP,
  forgotPassword,
  changePassword,
  updateProfile,
  updateDevice,
  validationOTP,
  getListSosmed,
  getListCustSosmed,
  postSosmed,
  deleteAccount,
  getFeature
};

export default SessionAPI;
