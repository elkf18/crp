import OrderAPI from "app/api/order";
import { Model } from "libs/model/model";
import { runInAction, toJS } from "mobx";
import { Filter } from "../filter";
import { History } from "./history";

export class HistoryRepository extends Model {
  listOnGoing = History.hasMany(this);
  listDone = History.hasMany(this);

  originListOnGoing = History.hasMany(this);
  originListDone = History.hasMany(this);

  detail = History.childOf(this);

  filter: Filter = Filter.childOf(this);

  loading = false;

  get getHistoryCup() {
    let qty = 0;
    this.listDone
      .filter((x) => x.status === "paid" || x.status === "complete")
      .map((x) => {
        x.product
          .filter((y) => (y.unit === "cup" || y.unit === "CUP"))
          .map((y) => {
            qty += Number(y.qty);
          });
      });
    return qty;
  }

  getList(status: string) {
    switch (status) {
      case "paid":
        runInAction(()=>{
          this.listOnGoing = this.originListOnGoing
        })
        
        return this.listOnGoing;
      case "complete":
        runInAction(()=>{
          this.listDone = this.originListDone
        })
        return this.listDone;
    }
  }

  async load(status: string, fromOrder:boolean=false) {
    this._loadJSON({
      loading: true,
    });
    let stat = "";
    if (status === "paid") {
      stat = `'draft', '${status}'`;
    } else {
      stat = `'cancelled', 'expired', 'expired by user', 'cancelled by user', '${status}'`;
    }
    OrderAPI.listHistory(stat).then((res) => {
      if (status === "paid") {
        this._loadJSON({
          listOnGoing: res,
          originListOnGoing: res,
          loading: false,
        });
      } else {
        this._loadJSON({
          listDone: res,
          originListDone: res,
          loading: false,
        });
      }
    });
  }

  get getCurrentOrder() {
    let items = this.listOnGoing.filter((x) => x.status === "paid");
    let order = new History();
    if (items.length > 0) {
      order._loadJSON({...items[0]._json});
    }
    return order;
  }

  get getIsManyOrder() {
    let items = this.listOnGoing.filter((x) => x.status === "paid");
    return items.length > 1;
  }
}

const HistoryStore = HistoryRepository.create({
  localStorage: true,
  storageName: "HistoryOrderRepository",
});
export default HistoryStore;
