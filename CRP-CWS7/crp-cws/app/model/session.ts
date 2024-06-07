import AsyncStorage from "@react-native-async-storage/async-storage";
import SessionAPI from "app/api/session";
import AppConfig from "libs/config/app";
import { Model } from "libs/model/model";
import { CodePush } from "libs/ui";
import DeviceInformation from "libs/utils/device-info";
import { runInAction } from "mobx";
import GlobalStore from "./global";
import SosmedStore from "./sosmed";
import { confirmRequestOTP, generateFileObj } from "./utils";
import messaging, { firebase } from '@react-native-firebase/messaging';
import DeviceInfo from "react-native-device-info";
import { Platform } from "react-native";
import NewsStore from "./news";
import NotificationStore from "./notification";

export class User extends Model {
  id = 0;
  id_client = 0;
  name = "";
  user_token = "";
  gender = "";
  date = "";
  phone1 = "";
  email = "";
  password = "";
  phone = "";

  phoneOTP = "";

  username = "";
  confirmPassword = "";
  oldPassword = "";
  otp = "";
  otpValue = "";
  foto = "";
  created_date = "";

  born_date="";
  sosmed:SosmedCust[] = SosmedCust.hasMany(this);

  get getUserToken() {
    if(!!this.user_token){
      return this.user_token
    }
    return AppConfig.otpToken;
  }

  get qrCode(){

    while(this.phone1.charAt(0) === '0')
    {
      return this.phone1.substring(1);
    }
  }
  

}

export class SosmedCust extends Model {
  id = null;
  sosmed = "";
  profile_id = "";
  id_customer = 0;
  dataid = "";
}

export class Features extends Model{
  lucky_draw=false
  evoucher=false
}

export class Form extends User {
  isRegister = false;
  get isValidOTP() {
    if (this.otp.length === 6) {
      return this.otp == this.otpValue;
    }
    return true;
  }
}

export class Session extends Model {
  isLoggedIn = false;
  jwt = "";
  user = User.childOf(this);
  expired = "";
  foto = "";
  loading = false;
  saveUserPass = false;
  form: Form = Form.childOf(this);

  features: Features = Features.childOf(this);
  
  latitude = 0
  longitude = 0
  //sosmed:SosmedCust[] = SosmedCust.hasMany(this);

  get AuthContext() {
    return {
      isLoggedIn: this.isLoggedIn,
      jwt: this.jwt,
    };
  }

  
  get getActiveMonth() {
    let dateArr = this.user.created_date.split(" ");
    let dateFrom = new Date();
    if (dateArr.length > 0) {
      dateFrom = new Date(dateArr[0]);
    }
    let dateTo = new Date();
    let diff =
      dateTo.getMonth() -
      dateFrom.getMonth() +
      12 * (dateTo.getFullYear() - dateFrom.getFullYear());
    return isNaN(diff) ? 0 : diff;
  }

  initForm(data: any = null) {
    let a = new Form();
    if (!!data) a._loadJSON(data);
    
    this._loadJSON({
      form: data,
      loading: false,
    });
  }


  // initFotos(type: string) {
  //   let val = "";

  //   let d = this.foto;
  //   if (!!d) {
  //     val = d.url;
  //   }

  //   this._loadJSON({
  //     foto: d,
  //   });
  // }

  getOTPCountdown() {
    if (!!this.expired) {
      const timeNow = new Date();
      const timeExp = new Date(this.expired);
      const distance = timeExp.getTime() - timeNow.getTime();
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance <= 0) {
        return "00:00";
      }
      return `${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
    }
    return "00:00";
  }

  isOTPExpired() {
    let exp = true;
    if (!!this.expired) {
      const timeNow = new Date();
      const timeExp = new Date(this.expired);
      let diff = timeExp.getTime() - timeNow.getTime();
      if (diff > 0) {
        exp = false;
      }
    }
    return exp;
  }

  async login() {
    // if(GlobalStore.deviceToken==""){
    //   CodePush.restartApp();
    // }
    const form = this.form;
    this.loading = true;

    let device_info:any = null;
    let uniqueId:any = null;
    let bundleId:any = null;
    let deviceToken:any = null;

    
    if ( Platform.OS=="ios") {
      let authMsg = await messaging().hasPermission()
      if(authMsg==firebase.messaging.AuthorizationStatus.AUTHORIZED){
        device_info = await DeviceInformation();
        uniqueId = DeviceInfo.getUniqueId();  
        bundleId = DeviceInfo.getBundleId();
        deviceToken = GlobalStore.deviceToken;
      }else{
        device_info = await DeviceInformation();
        uniqueId = DeviceInfo.getUniqueId();  
        bundleId = DeviceInfo.getBundleId();
        deviceToken = "unauthorized";
      }
    }else{
      device_info = await DeviceInformation();
      uniqueId = DeviceInfo.getUniqueId();
      bundleId = DeviceInfo.getBundleId();
      deviceToken = GlobalStore.deviceToken;
    }
    

    let res = await SessionAPI.login({
      username: form.username,
      password: form.password,
      device_token: deviceToken,
      unique_id:uniqueId,
      bundle_id:bundleId,
      device_info:device_info,
    });
    let data = new Session()._loadJSON({
      ...this._json,
    });
    if (!!res && !!res.jwt) {
      data._loadJSON({
        ...res,
        isLoggedIn: true,
      });

      this.loadSosmed()
      SosmedStore.load();
      

    } else {
      data._loadJSON({
        loading: false,
        form: {
          ...this.form._json,
          password: "",
        },
      });
    }
    this._loadJSON(data._json);
  }

  async logout() {
    let data = new Session();
    this._loadJSON(data._json);
    runInAction(()=>{
      NotificationStore.list=[];
    })
    AsyncStorage.clear();
  }

  async loadSosmed() {
      // this.loading = true;
      let data = await SessionAPI.getListCustSosmed(this.user);
      
      this._loadJSON({
        user:{
          sosmed:data,
          
        },
      });
  }

  async loadFeatures(){
    let data = await SessionAPI.getFeature();
    console.log(JSON.stringify(data));
      this.features._loadJSON({
        ...data
      });
      console.log(JSON.stringify(this.features._json));
  };

  async requestOTP(forgot: boolean = false) {
    var form = this.form._json;
    runInAction(()=>{
      this.form.phoneOTP = form.phone;
    })

    form = this.form._json;

    let res = await confirmRequestOTP(form.phoneOTP);
    if (!!res) {
      this._loadJSON({
        loading: true,
      });
      let otp = await SessionAPI.requestOTP({
        phone: form.phoneOTP,
      });
      let expired = new Date();
      expired.setMinutes(expired.getMinutes() + 1);
      this._loadJSON({
        loading: false,
        form: {
          isForgot: forgot,
          otp: "",
          otpValue: otp,
        },
        expired: expired.toJSON(),
      });
      if (AppConfig.mode !== "production") {
        alert(`Masukkan kode OTP berikut: ${otp}`);
      }
    }

    
    return res;
  }

  async isRegistered() {
    this.loading = true;
    const form = this.form;
    let status = await SessionAPI.isRegistered({
      username: form.username,
    });
    this._loadJSON({
      loading: false,
      form: {
        isRegister: !status,
      },
    });
    return status;
  }

  async register() {
    this.loading = true;
    const form = this.form;
    
    let device_info = await DeviceInformation();
    let res = await SessionAPI.register({
      username: form.username,
      password: form.password,
      name: form.name,
      phone1: form.phone,
      email: form.email,
      device_token: GlobalStore.deviceToken,
      device_info:JSON.stringify(device_info),
    });
    let data = new Session();
    if (!!res && !!res.jwt) {
      data._loadJSON({
        ...res,
        isLoggedIn: true,
      });
    } else {
      data._loadJSON({
        form: {
          ...this.form._json,
          password: "",
          confirmPassword: "",
          oldPassword: "",
        },
        loading: false,
      });
    }
    this._loadJSON(data._json);
    this.initForm();
  }

  async forgot() {
    this.loading = true;
    const form = this.form;
    let res = await SessionAPI.forgotPassword({
      username: form.username,
      password: form.password,
      token: form.otp,
    });
    let data = new Session();
    if (!!res && !!res.jwt) {
      data._loadJSON({
        ...res,
        isLoggedIn: true,
      });
    } else {
      data._loadJSON({
        form: {
          ...this.form._json,
          password: "",
          confirmPassword: "",
          oldPassword: "",
        },
        loading: false,
      });
    }
    this._loadJSON(data._json);
    this.initForm();
    return !!res;
  }

  async uopdateProfile() {
    this.loading = true;
    const data = this.form._json;
    
    const foto = await generateFileObj(data.foto);
    let res = await SessionAPI.updateProfile(this.jwt, data, foto);
    let result = {};
    if (!!res) {
      result = {
        jwt: res.jwt,
        user: res.user,
      };
    }
    this._loadJSON({
      ...result,
      loading: false,
    });

    if (!!res) {
      return true
    }else{
      return false
    }

   // let resp = await SessionAPI.postSosmed(this.form.sosmed,this.form._json);
    
  }

  async changePassword() {
    this.loading = true;
    const data = {
      password: this.form.password,
      oldPassword: this.form.oldPassword,
    };
    await SessionAPI.changePassword(this.jwt, data);
    this._loadJSON({
      loading: false,
    });
  }

  async updateDeviceToken() {
    if (!!this.jwt) {
      const device_info = await DeviceInformation();
      SessionAPI.updateDevice(this.jwt, {
        device_token: GlobalStore.deviceToken,
        device_info,
      });
    }
  }

  async validationOTP() {
    const res = await SessionAPI.validationOTP({
      phone: this.form.phone,
      token: this.form.otp,
    });

    return res;
  }

  async deleteAccount() {
    const res = await SessionAPI.deleteAccount(this.user)
    
    return res;
  }
}

const SessionStore = Session.create({
  localStorage: true,
  storageName: "Session",
});
export default SessionStore;
