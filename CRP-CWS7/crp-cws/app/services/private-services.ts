import HistoryStore from "app/model/history";
import MerchandiseStore from "app/model/merchandise";
import NewsStore from "app/model/news";
import OutletStore from "app/model/outlet";
import SessionStore from "app/model/session";
import locationService from "app/utils/location";

const PrivateService = () => {
  locationService.askPermission()
  SessionStore.updateDeviceToken();
  NewsStore.load();
  MerchandiseStore.load();
  OutletStore.load();
  HistoryStore.load("complete");
};

export default PrivateService;
