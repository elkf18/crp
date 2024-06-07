import { Model } from "libs/model/model";
import MembershipStore from "../membership";
import OutletStore from "../outlet";
import { ProductOrder } from "./productOrder";

export class Order extends Model {
  id = null;
  outlet = null;
  promo = null;
  bookingStatus = 1;
  voucher = null;
  delivery_date = "";
  status = "done";
  sales_order_date = "";
  remarks = "";

  orderMethod = "TakeAway";
  method = "";
  src = "CRP";

  pickMode = "Now";

  order: ProductOrder[] = ProductOrder.hasMany(this);

  pointUsed=0;

  loading = false;

  get total() {
    let total = 0;
    this.order.forEach((x) => {
      total += x.total;
    });
    return total;
  }

  get getUsablePoint(){
    let usable = 0
    let cr = MembershipStore.credits

    let total = this.total

    if(total>=11000){
      usable = total-11000

      if(cr<=usable){
        usable=cr
      }
    }

    return usable
  }

  get orderItem(): ProductOrder[] {
    return this.order;
  }

  get orderLength(): number {
    let item = 0;
    this.order.forEach((x) => (item += x.qty));
    return item;
  }

  get canCheckout() {
    return !!this.method && this.order.length > 0;
  }

  getProductLengthById(id: number) {
    let item = 0;
    this.order
      .filter((x) => x.id_product === id)
      .forEach((x) => (item += x.qty));
    return item;
  }

  setPickMode(status: "Now" | "Time") {
    this._loadJSON({
      pickMode: status,
      delivery_date: new Date().toJSON(),
    });
  }

  setTime(time: string) {
    let timeArr = time.split(":").map((x) => Number(x));
    let c = new Date();
    let d = new Date();

    var maxTime = new Date();
    maxTime.setHours(parseInt(OutletStore.currentOutlet.closeHour));
    maxTime.setMinutes(parseInt(OutletStore.currentOutlet.closeMinute));
    maxTime.setMilliseconds(0);

    d.setHours(timeArr[0], timeArr[1], 0, 0);
    if (d.getTime() < c.getTime()) {
      alert("Jam yang anda pilih tidak sesuai.");
      d = c;
    }

    if (d.getTime() > maxTime.getTime()) {
      alert("Jam yang anda pilih melebihi jam tutup.");
      d = c;
    }

    this._loadJSON({
      delivery_date: d.toJSON(),
    });
  }
}
