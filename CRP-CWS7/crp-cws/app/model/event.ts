import { Model } from "libs/model/model";
import EventAPI from "app/api/event";
import { Filter } from "./filter";
import { runInAction } from "mobx";

export class Event extends Model {
  id = null;
  title = "";
  remarks = "";
  end_date = "";
  start_date = "";
  img_url = "";
  location = "";
  contact_person_phone="";
  contact_person_name="";
  url = "";
  img_alt_url="";
  created_date = "";

  init(data?: any) {
    let a:Event = new Event()._json;
    if (!!data) {
      a.id=data.id
      a.title=data.title
      a.img_url=data.img_url
      a.created_date=data.created_date
    }
    //alert(JSON.stringify(a))
    this._loadJSON(a);
  }
}

export class EventRepository extends Model {
  list: Event[] = Event.hasMany(this);
  detail = Event.childOf(this);

  filter: Filter = Filter.childOf(this);

  loading = false

  lastPage = false

  get getList(): Event[] {
    return this._json.list;
  }

  get getCurrentList(): Event[] {
    return this._json.list.slice(0, 5);
  }

  async load(offset: number) {
    if(offset == 0) {
      runInAction(() => {
        this.lastPage = false
        this._loadJSON({
          lastPage: false
        })
      })
    }
    if(this.lastPage) {
      return;
    }
    runInAction(()=>{
      this.loading=true
    })
    this._loadJSON({
      loading: true
    })

    EventAPI.getList(offset).then((data) => {
      if(offset == 0) {
        runInAction(() => {
          this._json.list = []
        })
        runInAction(() => {
          this.list = data
          this._loadJSON({
            list: this.list
          })
        })
      } else {   
        runInAction(() => {
          this.list.push(...data)
          this._loadJSON({
            list: this.list
          })
        })
      }
      if(data.length === 0) {
        this.lastPage = true
        this._loadJSON({
          lastPage: true
        })
      }
      runInAction(() => {
        this.loading = false
      })
      this._loadJSON({
        loading: false
      })
    })
  }
  get LoadedList(){
    return this.list
  }

  async loadMore(offset:number) {
    if(offset==0){
      this.lastPage=false
      // runInAction(()=>{
        
      //   this.list= [] as Sales[];
      // })
    }
    if(this.lastPage){
      return;
    }

    this._loadJSON({
      loading: true,
    });
  }
}

const EventStore = EventRepository.create({
  localStorage: true,
  storageName: "EventRepository",
});
export default EventStore;
