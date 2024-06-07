import LaporAPI from "app/api/lapor";
import { Model } from "libs/model/model";
import { Filter } from "./filter";
import OutletStore from "./outlet";
import SessionStore from "./session";
import { generateFileObj } from "./utils";

export class Lapor extends Model {
  id_outlet=""
  email =""
  description=""

  foto = ""
  fotoPost =""

  
  loading = false
  saving = false

  init() {
    this._loadJSON(new Lapor()._json);
    this._loadJSON({
      email : SessionStore.user.email,
      id_outlet : OutletStore.currentOutlet.id
    });
  }

  async save() {
    this._loadJSON({
      saving: true,
      created_by: SessionStore.user.id
    });
    let data = this._json;
    const foto = await generateFileObj(data.foto);
    let res: any = await LaporAPI.saveLaporan(SessionStore.jwt, data, foto);
    this._loadJSON({
      saving: false,
    });
    if (!!res) {
      this.init();
      alert("Laporan berhasil dikirim.")
      return true;
    }
    return false;
  }
}

export class DetailFoto extends Model {
    id = null;
    path = "";
  }

export class LaporRepository extends Model {
    list: Lapor[] = Lapor.hasMany(this);
    form : Lapor = new Lapor()
    filter: Filter = Filter.childOf(this);

  get getList() {
    return this._json.list;
  }

//   async load() {
//     let data = await LaporAPI.getList();
//     this._loadJSON({
//       list: data,
//     });
//   }
}

const LaporStore = LaporRepository.create({
  localStorage: true,
  storageName: "LaporRepository",
});
export default LaporStore;
