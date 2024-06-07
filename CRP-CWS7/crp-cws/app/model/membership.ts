import { Model } from "libs/model/model";
import MembershipAPI from "app/api/membership";
import SessionStore from "./session";
import { runInAction } from "mobx";
import { Filter } from "./filter";

export class Membership extends Model {
  cust_name = "";
  cust_id = "";
  points = 0;
  credits = "";
  level = "";
  next_level_poin = 0;
  next_level = "";
  point_needed = "";
  end_date = "";
  membershipLevels: MembershipLevel[] = MembershipLevel.hasMany(this)

  loading = false

  async load() {
    this._loadJSON({
      loading: true
    })
    await MembershipAPI.getMembershipStatus().then((res) => {
      this._loadJSON({
        ...res,
        loading: false
      });

      const data: Membership = res as Membership
      this._loadJSON({
        ...data,
        membershipLevels: data.membershipLevels,
        loading: false
      });
    })

  }
}

export class MembershipLevel extends Model {
  id = "";
  level = "";
  id_client = ""
  minimum_points = "";
  start_points = "";
  scale_points = "";
  achieved = 0
}

export class PointHistory extends Model {
  id = 0
  id_customer = ""
  id_membership_level = ""
  created_date = ""
  poin = 0
  status = ""
  transaction_amount = ""
  expired_date = ""
  id_sales_order = ""
  remarks = ""
  sales_order_number = ""
  product_name=""
}

export class CouponHistory extends Model {
  sales_order_number = ""
  sales_order_date = ""
  kupon: Coupon[] = Coupon.hasMany(this)
}

export class Coupon extends Model {
  id = 0
  sales_order_number = ""
  sales_order_date = ""
  id_undian = 0
  id_customer = 0
  undian = ""
  kode_kupon = ""
  created_time = ""
  id_sales_order = 0
  coupon_count=0
  is_win=false
}



export class Winner extends Model {
  id = 0
  id_undian = 0
  id_kupon = 0
  no_kupon = ""
  created_time = ""
  info = ""
  kode_kupon = ""
  id_customer = 0
  undian_name = ""
  winner_name = ""

  isLoading=false

  async load(no_kupon:string) {
    
    this.isLoading = true;
    let res = await MembershipAPI.getWinner(no_kupon);
    this._loadJSON({
      ...res,
      isLoading:false
    });
    return this._json
  }
  

}

export class MembershipRepository extends Model {
  member: Membership = new Membership()
  listPoint: PointHistory[] = PointHistory.hasMany(this)
  listCoupon: CouponHistory[] = CouponHistory.hasMany(this)
  historyCoupon: CouponHistory[] = CouponHistory.hasMany(this)
  filterCoupon: Filter = Filter.childOf(this);

  winner: Winner = Winner.childOf(this);
  
  
  loading = false;
  loadingPoint = false;
  loadingCoupon = false;

  lastPagePoint = false;
  lastPageCoupon = false;
  lastPage = false;



  credits = 0
  poinIsLoading = false
  level = ""
  st = 0
  count= 0

  async loadPoin() {
    this.poinIsLoading = true;
    let res = await MembershipAPI.getCustomerPoin(SessionStore.user);
    this._loadJSON({
      poinIsLoading: false,
      credits: res.poin,
      level: res.level
    });
  }

  async loadCountCoupon() {
    let res = await MembershipAPI.getCouponCount(SessionStore.user);
    this._loadJSON({
      st: res.st,
      count: res.count
    });
  }

  async loadCoupon() {
    this._loadJSON({
      loading: true
    })

    let data = await MembershipAPI.getListCoupon(this.filterCoupon.search);

    runInAction(() => {
      this.listCoupon = [];
      this.listCoupon.push(...data)
    })

    this._loadJSON({
      loading: false
    })
  }

  async loadMorePoint(offset: number) {
    if (offset == 0) {
      runInAction(() => {
        this.lastPagePoint = false
      })    
    }
    if (this.lastPagePoint) {
      return;
    }

    this._loadJSON({
      loadingPoint: true
    })

    MembershipAPI.getListHistory(1, offset).then((data) => {
      if(offset == 0) {
        runInAction(() => {
          this.listPoint = []
        })
        runInAction(() => {
          this.listPoint = data
        })
      } else {
        runInAction(() => {
          this.listPoint.push(...data)
        })
      }
      if(data.length == 0) {
        runInAction(()=>{
          this.lastPagePoint = true
        })
      }
      this._loadJSON({
        loadingPoint: false,
      })
    })
    this._loadJSON({
      loadingPoint: false,
    })
  }

  async loadMoreHistoryCoupon(offset: number) {
    if (offset == 0) {
      runInAction(() => {
        this.lastPageCoupon = false
      })    
    }
    if (this.lastPageCoupon) {
      return;
    }
    this.loadingCoupon = true;

    this._loadJSON({
      loadingCoupon: true
    })

    MembershipAPI.getHistoryCoupon(1, offset).then((data) => {
      if(offset == 0) {
        runInAction(() => {
          this.historyCoupon = []
        })
        runInAction(() => {
          this.historyCoupon = data
        })
      } else {
        runInAction(() => {
          this.historyCoupon.push(...data)
        })
      }
      if(data.length == 0) {
        runInAction(()=>{
          this.lastPageCoupon = true
        })
        
      }
      this._loadJSON({
        loadingCoupon: false,
      })
    })
  }

  async loadHistory(offset = 0) {
    if (offset == 0) {
      this._loadJSON({
        lastPage: false
      })
    }

    this._loadJSON({
      loading: true,
    })

    let data = await MembershipAPI.getListHistory(offset);
    if (data.length == 0) {
      this._loadJSON({
        lastPage: true
      })
    }
    if (offset == 0) {
      this._loadJSON({
        list: data,
        loading: false
      });
    } else {
      this.listPoint.push(...data)
    }
    this._loadJSON({
      loading: false
    });

  }

  get getCouponList() {
    const list = [...this._json.listCoupon];
    return list.filter((item) => {
      let match = true;
      if (!!this.filterCoupon.search) {
        match = this.filterCoupon.search==item.sales_order_number
      }
      return match
    });
    
  }

  get couponCount() {
    var count = 0;
    const list = [...this._json.listCoupon];
    this.listCoupon.filter((item) => {
      let match = true;
      if (!!this.filterCoupon.search) {
        match = this.filterCoupon.search==item.sales_order_number
      }
      return match
    }).forEach(function (value) {
      count = count + value.kupon.length;
    });
    
    return count;
  }
}

const MembershipStore = MembershipRepository.create({
  localStorage: true,
  storageName: "MembershipRepository",
});
export default MembershipStore;
