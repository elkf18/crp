import { Lapor } from "app/model/lapor";
import SessionStore, { Session } from "app/model/session";
import { generateFormData } from "app/model/utils";
import AppConfig from "libs/config/app";
import api, { IAPI } from "libs/utils/api";

const session = SessionStore;
const saveLaporan = async (jwt: string, data: Lapor, foto?: any) => {
    const fdata = generateFormData(data);
    if(!!AppConfig.client){
        fdata.append("id_client", String(AppConfig.client));
    }
    if(!!session.user.id){
        fdata.append("id_customer", String(session.user.id));
    }
    
    if (!!foto) {
        fdata.append("foto", foto);
    }
    const params: IAPI = {
      method: "post",
      url : `${AppConfig.serverUrl}index.php?r=apiService/SaveLaporanTicket`,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
      data: fdata,
      onError: (e) => console.log(e),
    };

    const res: any = await api(params);
  //   //console.log(JSON.stringify(`Bearer ${jwt}`))
  //  //console.log(JSON.stringify(fdata))

   //console.log(res);

  if (typeof res === "object") {
    if (!!res.status) {
      return res.status;
    } else {
      alert(JSON.stringify(res.errors));
      return null;
    }
  } else {
    alert(JSON.stringify(res));
    //console.log(JSON.stringify(res));
  }
};

const LaporAPI = {
    saveLaporan,
};

export default LaporAPI;
