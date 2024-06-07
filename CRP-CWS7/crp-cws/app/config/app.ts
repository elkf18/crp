import DeviceInfo from "react-native-device-info";

type Mode = "production" | "staging" | "dev" | string;
const mode: Mode = "staging"; // production //dev
const version: String = DeviceInfo.getVersion()  +  ".1"; //---> codepush Version
export default {
  mode,
  appName: "crp_apps_cws",
  appToken: "896c5b582166a0b28ee958ecc0cd3992",
  otpToken: "16faa08b23e16fce65724c3fdd0fdea6",

  crpUserToken:"1dab19f5286eb99d1a76fa0931f8aa14",
  apiToken:"4edc0073edc7cb832246685be0ae3518",

  client: 41,
  version:version,
  serverUrl:
    mode === "production"
      ? "https://dev.kelava.id/"
      : "https://dev.kelava.id/ciw/",
    //  mode === "production" ? "https://app.kelava.id/" : "https://qa.kelava.id/",
};
