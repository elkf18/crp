import OrderAPI from "app/api/order";

import { Model } from "libs/model/model";
import { toJS } from "mobx";
import { runInAction } from "mobx";
import OutletStore from "../outlet";
import { ReviewDetail } from "../review";

export class Complement extends Model {
  id = null;
  id_complement = null;
  is_default = 0;
  name = "";
  price = 0;
  type = "";
}


export class ReviewHistory extends Model {
  id= 0
  star= 0
  title= ""
  remark= ""
  comment=""
  data:ReviewDetail[] = ReviewDetail.hasMany(this)
}

export class Product extends Model {
  amount_discount = "";
  complement = Complement.hasMany(this);
  discount = null;
  id = null;
  id_product = null;
  name = "";
  price = 0;
  qty = 0;
  subtotal = 0;
  total = 0;
  unit = "";
  remarks = "";
}

export class Payment extends Model {
  attachment_url = null;
  created_date = "";
  notes = "";
  payment_method = "";
  total_payment = 0;
}

export class History extends Model {
  amount_discount = "";
  created_by = 0;
  created_date = "";
  customer_name = "";
  discount = null;
  est_delivery = "";
  grand_total = "";
  id = 0;
  outlet_name = "";
  payment = Payment.hasMany(this);
  ppn = "";
  product = Product.hasMany(this);

  review = ReviewHistory.childOf(this)
  sales_order_date = "";
  sales_order_number = "";
  status = "";
  channel_code="";
  sub_total = 0;
  id_outlet = 0;
  qr_code = "";
  fromOrder=false;
  visible=false;

  loading = false;

  get getOutlet(): any {
    if(OutletStore.list.length==0){
      OutletStore.load()
    }
    let outlet = OutletStore.list.find((x) => +x.id === this.id_outlet);
    if (!!outlet) {
      return outlet;
    }

    return {};
  }

  initFromOrder(data: any) {
    //console.log(toJS("data length: "+data.product.length))
    var a = new History()._json;
    this._loadJSON(new History())

    this._loadJSON(data)
    this._loadJSON({...data})
    this._loadJSON({
      payment:data.payment,
      product:data.product,
    })

    this._loadJSON({
      payment:data.payment,
      product:data.product,
    })

    this.product=[];
    this.product.push(...data.product)


    //console.log(toJS("a length: "+a.product.length))
  }

  reset(){
    this._loadJSON(new History())
  }
  init(data: any) {
    var a = new History()._json;
    this._loadJSON(new History()._json)

    this._loadJSON(data)
    this._loadJSON({...data._json})
    this._loadJSON({
      payment:data.payment,
      product:data.product,
      visible:true
    })

    this._loadJSON({
      payment:data.payment,
      product:data.product,
      visible:true
    })
    //console.log(toJS("a length: "+a.product.length))
    // //console.log(toJS("init length: "+this.product.length))
  }

  async initialize(data:any,payment:any){
    //console.log("-->")
    let a:History = new History()._json;
    
    if (!!data) {
      runInAction(()=>{
        a = data
        a.product = []
        a.product = data.product
        a.product=data.product

        if(a.product.length==0){
          for(let i = 0; i < data.product.length; i++){
            a.product.push(data.product[i])
          }
        }
        
        a.visible=true
        //console.log(JSON.stringify(a))
      })
    }

    let p = new Payment()
    p.payment_method=payment
    a.payment.push(p)
    a.fromOrder=true;

    this.product=[];
    this._loadJSON({a});

    if(this.product.length==0){
      for(let i = 0; i < data.product.length; i++){
        this.product.push(data.product[i])
      }
    }

    this.payment.push(p);
    
  }

  async load() {
    var sales_order_number = this.sales_order_number;
    this.reset();
    this._loadJSON({
      loading: true
    });
    
    await OrderAPI.detailHistory(sales_order_number).then((res) => {
      this._loadJSON({
        ...res,
        sales_order_number:res.sales_order_number
      });
      this.payment=[];
      for(let i = 0; i < res.payment.length; i++){
        this.payment.push(res.payment[i])
      }
      
      this.product=[];
      for(let i = 0; i < res.product.length; i++){
        this.product.push(res.product[i])
      }
      
      this._loadJSON({
        loading: false,
      });
      return true;

    });
    this._loadJSON({
      loading: false,
    });
  }

  get getPayment(): Payment {
    if (this.payment.length === 0) return new Payment();

    let x = this.payment.findIndex(x => x.payment_method !== "Points");

    return this.payment[x];
  }
  get getAfterPoint(): number {
    let subtot = this.sub_total
    let point = this.getUsedPoint.total_payment
    

    return subtot-point;
  }

  get getUsedPoint(): Payment {
    const found = this.payment.some(el => el.payment_method === "Points");

    if (!found) return new Payment();

    let x = this.payment.findIndex(x => x.payment_method === "Points");

    return this.payment[x];
  }
}
