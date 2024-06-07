import SessionStore from "app/model/session";
import { initData, initDataAuth } from "./initData";

export default () => {
  initData();

  if (SessionStore.isLoggedIn) {
    initDataAuth();
  }
};
