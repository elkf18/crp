import MerchandiseStore from "app/model/merchandise";
import NewsStore from "app/model/news";
import OutletStore from "app/model/outlet";

export const initData = () => {};

export const initDataAuth = async () => {
  OutletStore.load();
  NewsStore.load();
  MerchandiseStore.load();
};
