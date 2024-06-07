import ProductAPI from "app/api/product";
import { Model } from "libs/model/model";
import { Redeem } from "./redeem";

export class Product extends Model {
  id = 0;
  name = "";
  code = "";
  normal_price = 0;
  qty=0;
  redeem_point=0;
  valid_price = null;
  url_pic = "";
  description = "";
  redeem: Redeem = Redeem.childOf(this);

  
  isLoading=false;

  get price() {
    return Number(this.valid_price || this.normal_price);
  }

  

  init() {
    let a = new Product();
    this._loadJSON(a._json);
  }

  async load(id:number){
    this.init();
    this.isLoading = true

    ProductAPI.getDetail(id).then((res) => {
      this._loadJSON({
        ...res,
        loading: false,
      });
    });
  }
}
