import OrderAPI from "app/api/order";
import { Model } from "libs/model/model";
import { Alert, Linking } from "react-native";
import { Filter } from "../filter";
import HistoryStore from "../history";
import { Product } from "../product/product";
import { Order } from "./order";
import { ProductOrder } from "./productOrder";
import { History } from "app/model/history/history";
import { runInAction } from "mobx";
import { useNavigation } from "@react-navigation/native";

export class OrderRepository extends Model {
  list: Order[] = Order.hasMany(this);
  listBerlangsung: Order[] = Order.hasMany(this);
  listSelesai: Order[] = Order.hasMany(this);
  currentOrder = Order.childOf(this);

  filter: Filter = Filter.childOf(this);

  selectedProduct: ProductOrder = ProductOrder.childOf(this);

  openProduct = null;
  loading = false;

  get getOrderHistory(): Order[] {
    return this.list.filter((item) => {
      if (item.status === this.filter.tab) {
        return true;
      }
      return false;
    });
  }

  isExistProduct(productId: number) {
    return (
      this.currentOrder.order.findIndex((x) => x.id_product === productId) > -1
    );
  }

  initOrder() {
    let a = new Order();
    this._loadJSON({
      currentOrder: a._json,
    });
  }

  initProductOrder() {
    let a = new ProductOrder();
    this._loadJSON({
      selectedProduct: a._json,
    });
  }

  setTempProductOrder(product: Product) {
    const pc = product.complements.filter((x: any) => !!x.is_default);
    this.selectedProduct._loadJSON({
      id: Math.floor(100000000 + Math.random() * 900000000),
      status: "insert",
      id_product: product.id,
      price: Number(product.valid_price || product.normal_price),
      qty: 1,
      complements: pc.map((x: any) => ({
        ...x,
        id: null,
        id_complement: x.id,
      })),
    });
  }

  cloneOrder(data: any) {
    this.initOrder();
    let order: any = [];
    data.product.map((x: any) => {
      const comps: any = x.complement.map((y: any) => ({
        id_complement: y.id_complement,
      }));
      order.push({
        id_product: x.id_product,
        price: x.price,
        qty: x.qty,
        remarks: x.remarks,
        total: x.total,
        complements: comps,
      });
    });
    // //console.log(order)
    this.currentOrder._loadJSON({
      outlet: data.id_outlet,
      sales_order_date: new Date().toJSON(),
      delivery_date: new Date().toJSON(),
      loading: false,
      order,
    });
    // //console.log(this.currentOrder)
  }

  setProductOrder() {
    let a = this.selectedProduct._json;
    const corder: any[] = this.currentOrder._json.order;
    if (a.status === "insert") {
      corder.push(a);
    } else {
      const index = corder.findIndex((x) => x.id === a.id);
      const qty = a.qty;
      const price = a.price;
      const complements = a.complements;
      const remarks = a.remarks;
      corder[index] = {
        ...corder[index],
        qty,
        price,
        complements,
        remarks,
      };
    }

    // merge product if same item and complements
    const norder: any[] = [];
    corder.map((o) => {
      const index = norder.findIndex((x) => {
        const isCompl = x.complements.length === o.complements.length;
        if (x.id_product === o.id_product && !!isCompl) {
          let isSame = true;
          let nC = o.complements.map((y: any) => y.id_complement);
          let eC = x.complements.map((y: any) => y.id_complement);
          nC.forEach((c: any) => {
            if (eC.indexOf(c) === -1) {
              isSame = false;
            }
          });
          return isSame;
        }
        return false;
      });

      if (index > -1) {
        norder[index] = {
          ...norder[index],
          qty: norder[index].qty + o.qty,
          // price: norder[index].price + o.price,
        };
      } else {
        norder.push(o);
      }
    });

    this.currentOrder._loadJSON({
      order: norder,
    });
    this.initProductOrder();
  }

  updateProduct(product: ProductOrder) {
    this.selectedProduct._loadJSON({
      ...product._json,
      status: "update",
    });
  }

  deleteProduct() {
    const id = this.selectedProduct.id;
    let corder = this.currentOrder._json.order;
    const index = corder.findIndex((x: any) => x.id === id);
    if (index > -1) {
      corder.splice(index, 1);
    }
    this.currentOrder._loadJSON({
      order: corder.map((x: any) => new ProductOrder()._loadJSON(x)),
    });
    this.initProductOrder();
  }

  async confirmOrder() {
    let res = true;
    this.currentOrder._loadJSON({
      loading: true,
    });
    let data = this.currentOrder._json;
    const r = await OrderAPI.postPreOrder(data).catch((e) => {
      this.currentOrder._loadJSON({
        loading: false,
      });
    });
    this.currentOrder._loadJSON({
      loading: false,
    });
    if (!!r) {
      let action;
      switch (r.data.merchant) {
        case "MIDTRANS":
          action = r.data.result.actions.find(
            (x: any) => x.name === "deeplink-redirect"
          );
          if (!!action) {
            if(!!r.data){
              HistoryStore.detail.initFromOrder(r.so);
              runInAction(()=>{
                HistoryStore.detail.sales_order_number=r.so.sales_order_number;
              })
              
            }
            runInAction(()=>{
              HistoryStore.detail.sales_order_number=r.so.sales_order_number;
            })
            Linking.openURL(action.url).then();
          }
          break;
        case "XENDIT":
          alert("Silahkan buka aplikasi OVO untuk melanjutkan pembayaran.");
          break;
      }
      const p = this.currentOrder.method


      if(!!r.data){
        //console.log("vvvvv")
        //console.log(JSON.stringify(r.so))
        //console.log("^^^^^")
        HistoryStore.detail.initFromOrder(r.so);
      }
      

      
      this.initOrder();
    } else {
      res = false;
      
    }

    //item.getPayment.payment_method
    // if (!!r) {
    //   res = await OrderAPI.detailHistory(r.data.inv_id);
    // }
    
    return res;
  }

  async cancelOrder() {
    const res = await new Promise((resolve) => {
      Alert.alert(
        "Pesananmu belum selesai",
        "Apakah kamu yakin akan membatalkan pesananmu?",
        [
          {
            text: "Tidak",
            onPress: () => {
              resolve(false);
            },
          },
          {
            text: "Iya",
            onPress: () => {
              resolve(true);
            },
          },
        ]
      );
    });

    if (!!res) {
      this.initOrder();
    }

    return res;
  }
}

const OrderStore = OrderRepository.create({
  localStorage: true,
  storageName: "OrderRepository",
});
export default OrderStore;
