import ReviewAPI from "app/api/review";
import { Model } from "libs/model/model";

export class Review extends Model {
    id= 0
    star= 0
    title= "Sangat tidak memuaskan"
    remark= "Apa yang membuatmu tidak puas?"
    data:ReviewDetail[] = ReviewDetail.hasMany(this)
  }
  

  export class ReviewDetail extends Model {
    id_item= 0;
    item= "";
  }

  export class ReviewForum extends Model{
    id_sales_order= 0
    id_review= 0
    item:ReviewDetail[] = ReviewDetail.hasMany(this)
    comment= ""

    saving =false

    init(){
      let x =new ReviewForum()
      this._loadJSON(x._json);
    }

    async save() {
      this._loadJSON({
        saving: true,
      });
      let data = this._json;
      let res: any = await ReviewAPI.postReview(data);
      this._loadJSON({
        saving: false,
      });
      if (!!res) {
        this.init();
        alert("Review berhasil dikirim.")
        return true;
      }
      return false;
    }
  }

  export class ReviewRepository extends Model {
    list: Review[] = Review.hasMany(this);
    loading = false;
    form:ReviewForum = ReviewForum.childOf(this);

    star=5;

    async load(id_sales_order: number) {
      this.loading = true;
      let data: any = [];
      if (!!id_sales_order) {
        data = await ReviewAPI.listReview(id_sales_order);
      }
      this._loadJSON({
        list: data,
        loading: false,
      });
    }

    get selected() {
      
      return  !!this.list.filter((x) => x.star === this.star)[0] ? this.list.filter((x) => x.star === this.star)[0] : new Review()
    }




  }

  const ReviewStore = ReviewRepository.create({
    localStorage: true,
    storageName: "ReviewRepository",
  });
  export default ReviewStore;