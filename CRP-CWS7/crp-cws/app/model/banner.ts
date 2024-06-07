import { Model } from "libs/model/model";
import BannerAPI from "app/api/banner";
import { Filter } from "./filter";
import EventAPI from "app/api/event";

export class Banner extends Model {
  id = null;
  end_date = "";
  start_date = "";
  img_url = "";
  status = true;
  url = "";
  img_alt_url="";
  created_date = "";
  
}

export class BannerRepository extends Model {
  list: Banner[] = Banner.hasMany(this);
  detail = Banner.childOf(this);

  filter: Filter = Filter.childOf(this);

  get getList(): Banner[] {
    return this._json.list;
  }

  get getCurrentList(): Banner[] {
    return this._json.list.slice(0, 5);
  }

  async load() {
    let data = await EventAPI.getList(0,1);
    this._loadJSON({
      list: data,
    });
  }
}

const BannerStore = BannerRepository.create({
  localStorage: true,
  storageName: "BannerRepository",
});
export default BannerStore;
