import { Model } from "libs/model/model";
import fuzzyMatch from "libs/utils/fuzzy-match";
import ProductAPI from "app/api/product";
import { Filter } from "../filter";
import { Product } from "./product";
import { runInAction } from "mobx";

export class Category extends Model {
  id = null;
  category = "";
  sequence = 0;
  product: Product[] = Product.hasMany(this);
}

export class ProductRepository extends Model {
  list: Product[] = Product.hasMany(this);
  filter: Filter = Filter.childOf(this);
  detail: Product = Product.childOf(this);

  selectedCategory: Category = Category.childOf(this);
  isTabClick=false;

  lastPage=false;
  loading = false;

  get getProduct(): any[] {
    const list = [...this._json.list];
    return list
      .map((d: any) => {
        let product = d.product.filter((x: any) => {
          const search = this.filter.search.toLowerCase();
          if (!!search && !!x.product_name) {
            const value = x.product_name.toLowerCase();
            return fuzzyMatch(value, search);
          }
          return true;
        });

        return {
          ...d,
          data: product,
        };
      })
      .filter((x: any) => x.data.length > 0);
  }

  get getCurrentProduct(): any[] {
    return this._json.list.slice(0, 5);
  }

  get getProductFilterJSON(): Product[] {
    let product: Product[] = [];
    this.getProduct.forEach((x) => product.push(...x.product));
    return product;
  }

  get getCategoryIndex() {
    return this.getProduct.findIndex(
      (x: any) => x.id === this.selectedCategory.id
    );
  }

  async load(offset: number) {
    this.loading = true;
    let data: any = [];
    if (!!offset) {
      data = await ProductAPI.getList(offset);
    }
    this._loadJSON({
      list: data,
      loading: false,
    });
  }

  async loadMore(offset: number) {
    
    if (offset == 0) {
      runInAction(() => {
        this.list = []
      })
      this.lastPage = false
    }
    if (this.lastPage) {
      return;
    }

    
    this._loadJSON({
      loading: true,
    });

    
   // data = await ProductAPI.getList(offset);

    ProductAPI.getList(offset).then((data) => {
      this._loadJSON({
        loading: false,
      });
      if (offset == 0) {
        runInAction(() => {
          this.list = []
        })
        if (data.length > 0) {
          runInAction(() => {
            this.list = data
          })
        }else{
          this.lastPage = true;
        }

      } else {

        runInAction(() => {
          this.list.push(...data)
        })
      }
      if (data.length == 0) {
        this.lastPage = true
      }
      this._loadJSON({
        loading: false,
      });


    });
    
    
  }



  setCategory(item: Category) {
    this.selectedCategory._loadJSON(item);
  }
}

const ProductStore = ProductRepository.create({
  localStorage: true,
  storageName: "ProductRepository",
});
export default ProductStore;
