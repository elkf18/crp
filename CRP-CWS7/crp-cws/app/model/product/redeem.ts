import ProductAPI from "app/api/product";
import RedeemAPI from "app/api/redeem";
import { Model } from "libs/model/model";

export class Redeem extends Model {
    id = null;
    redeem_code = "";
    id_product = 0;
    id_customer = 0;
    created_time = "";
    expired_time = "";
    status = "";
    redeemed_time = "";
}

export class RedeemRepository extends Model {

    detail: Redeem = Redeem.childOf(this);
    list: Redeem[] = Redeem.hasMany(this);
    isLoading = false

    async confirmRedeem(id_product: number) {
        this.isLoading = true;
        const res = await RedeemAPI.postRedeem(id_product).catch((e) => {
            this._loadJSON({
                loading: false,
            });
        });
        if(res){
            this._loadJSON({
                isLoading: false,
                detail:res
            });
            this.list.push(res)
            return true;
        }else{
            this._loadJSON({
                isLoading: false,
            });
            return false;
        }
    }

}

const RedeemStore = RedeemRepository.create({
    localStorage: true,
    storageName: "RedeemRepository",
});
export default RedeemStore;