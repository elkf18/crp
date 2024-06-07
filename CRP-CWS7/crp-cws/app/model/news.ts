import { Model } from "libs/model/model";
import NewsAPI from "app/api/news";
import { Filter } from "./filter";
import { runInAction } from "mobx";

export class News extends Model {
  id = null;
  title = "";
  description = "";
  img_url = "";
  status = "";
  link_url = "";
  created_date = "";


  init(data?: any) {
    let a:News = new News()._json;
    if (!!data) {
      a.id=data.id
      a.title=data.title
      a.img_url=data.img_url
      a.status=data.status
      a.link_url=data.link_url
      a.created_date=data.created_date
      a.description=data.description
    }
    //alert(JSON.stringify(a))
    this._loadJSON(a);
  }
}

export class NewsRepository extends Model {
  loadingNews = false;
  
  loading = false;
  saving = false;
  cached = true;
  lastPage = false
  lastPageNews = false;
  list: News[] = News.hasMany(this);
  detail = News.childOf(this);

  filter: Filter = Filter.childOf(this);
  get getList(): News[] {
    return this._json.list;
  }

  get getCurrentList(): News[] {
    return this._json.list.slice(0, 5);
  }

  async load() {
    runInAction(()=>{
      this.loading=true
    })
    let data = await NewsAPI.getList(0);
    this._loadJSON({
      list: data,
    });
    runInAction(()=>{
      this.loading=false
    })
  }
  
  async loadMoreNews(offset: number) {

    if (offset == 0) {
      runInAction(() => {
        this.list = []
      })
      this.lastPage = false
    }
    if (this.lastPage) {
      return;
    }

    this.lastPage = true;
    let mode = 1;
    this._loadJSON({
      loading: true,
    });
    NewsAPI.getList(offset).then((data) => {
      if (offset == 0) {
        runInAction(() => {
          this.list = []
        })
        if (data.length > 0) {
          runInAction(() => {
            this.list = data
          })
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
        //list: data,
        loading: false,
      });


    });
  }
  
}

const NewsStore = NewsRepository.create({
  localStorage: true,
  storageName: "NewsRepository",
});
export default NewsStore;
