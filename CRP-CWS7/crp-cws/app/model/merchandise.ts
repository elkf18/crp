import { Model } from "libs/model/model";
import MerchandiseAPI from "app/api/merchandise";
import { Filter } from "./filter";

export class Merchandise extends Model {
  id_product = null;
  featured_img = "";
}

export class MerchandiseRepository extends Model {
  list: Merchandise[] = Merchandise.hasMany(this);

  filter: Filter = Filter.childOf(this);

  get getList() {
    return this._json.list;
  }

  async load() {
    let data = await MerchandiseAPI.getList();
    this._loadJSON({
      list: data,
    });
  }
}

const MerchandiseStore = MerchandiseRepository.create({
  localStorage: true,
  storageName: "MerchandiseRepository",
});
export default MerchandiseStore;
