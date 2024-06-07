import AppConfig from "libs/config/app";
import api, { IAPI } from "libs/utils/api";
interface ILog extends Partial<IAPI> {
  result: any;
}

const saveLog = async (data: ILog) => {
  api({
    method: "post",
    url: AppConfig.serverUrl + "index.php?r=apiService/saveLog",
    data: {
      appName: AppConfig.appName,
      appToken: AppConfig.appToken,
      client: AppConfig.client,
      data,
    },
  });
};

const LogAPI = {
  saveLog,
};

export default LogAPI;
