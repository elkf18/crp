import AppConfig from "libs/config/app";
import { Platform } from "react-native";
import CodePush, { SyncOptions } from "react-native-code-push";

const deploymentKey =
  AppConfig.mode === "production"
    ? ""
    : Platform.OS==="ios"?""
    :"gxfnP2HyEgTeUGqGVnLj2rJJZnif4yom-4Fr-";

export default {
  deploymentKey,
  // CHANGE MARK
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  installMode: CodePush.InstallMode.IMMEDIATE,
} as SyncOptions;
