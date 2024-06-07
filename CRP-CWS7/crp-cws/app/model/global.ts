import { Model } from "libs/model/model";

export class Global extends Model {
  activeMenu = {
    label: "",
    path: "",
  };
  expandContent = false;
  deviceToken = "";
}
const GlobalStore = Global.create({
  localStorage: true,
  storageName: "Global",
});
export default GlobalStore;
