import SosmedAPI from "app/api/sosmed";
import { Model } from "libs/model/model";
import { Filter } from "./filter";

export class Sosmed extends Model {
  id = null;
  id_client = "";
  sosmed = "";
  is_deleted = 0;
  loading=false;
  
}

export class SosmedRepository extends Model {
    list: Sosmed[] = [];
  filter: Filter = Filter.childOf(this);

  loading = false;

  async load() {
    this.loading = true;
    let data = await SosmedAPI.getList();
    this._loadJSON({
      list: data,
      loading: false,
    });
  }
}

const SosmedStore = SosmedRepository.create({
    localStorage: true,
    storageName: "SosmedRepository",
  });
  export default SosmedStore;