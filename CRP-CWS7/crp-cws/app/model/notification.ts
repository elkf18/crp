import NotificationAPI from "app/api/notification";
import { Model } from "libs/model/model";
import { runInAction } from "mobx";
import { Filter } from "./filter";

export class DataPesan extends Model {
  id = null;
  created_date = "";
  group="";
  type: "News" | "Event" | "Lucky Draw" | "Catalog" | null = null;
  msg_i = "";
  msg_ii = "";
  msg_iii = "";
  id_user = "";
  ref_data=0;
  ref_data_ii=0;
  title="";
  body="";
  android_channel_id="";
  channelId="";
  isRead = false;
}

export class Data extends Model {
  type: "News" | "Event"|"Events"|"Lucky Draw" | "Catalog"| null = null;
  id = null;
  title = "";
  description = "";
  img_url = "";
  status = "";
  link_url = "";
  created_date = "";
  location = "";
  tag="";
  ref_id = "";
  ref_no="";
}


export class Notification extends Model {
  collapseKey = "";
  data = Data.childOf(this);
  from = "";
  messageId = "";
  notification = {};
  sentTime = 0;
  ttl = 0;
  isRead = false;

  init(data?: any) {
    let a = new Notification()._json;
    if (!!data) {
      a = data;
    }
    this._loadJSON(data);
  }
}

export class NotificationRepository extends Model {
  list: Notification[] = Notification.hasMany(this);
  detail: Notification = Notification.childOf(this);


  dataList: DataPesan[] = DataPesan.hasMany(this);
  alreadyread: String[] =[];

  filter: Filter = Filter.childOf(this);
  loading = false;
  lastPage = false;

  get isNew() {
    return this.list.filter((x) => !x.isRead).length > 0;
  }

  get getList(): Notification[] {
    return this.list;
  }

  load(offset: number){
    if (offset == 0) {
      
    }
    if (this.lastPage || this.loading) {
      return;
    }
    this._loadJSON({
      loading: true,
    });

    NotificationAPI.getList(offset).then((data) => {
      
      if (data.length>0){
        runInAction(()=>{
          this.dataList = data
        })
        
      }
      if (data.length === 0) {
        runInAction(()=>{
          this.lastPage = true
        })
        
      }

      this._loadJSON({
        //list: data,
        loading: false
      });
    });
  }

  

  updateRead() {
    this.list.forEach((x) =>
      x._loadJSON({
        isRead: true,
      })
    );
  }

  receiveNotif(notif: any) {
    
    let idx = this.list.findIndex((x) => x.messageId === notif.messageId);

    let idm = this.list.findIndex((x) => x.data.id===notif.data.id)
    // 
    if(notif.data.type=="Lucky Draw"){
      return;
    }
    if (idm === -1 &&idx === -1) {
      let list = [...this.list];
      list.unshift({
        ...notif,
        isRead: false,
      });
      this._loadJSON({
        list,
      });
      

    }
   
  }
}

const NotificationStore = NotificationRepository.create({
  localStorage: true,
  storageName: "NotificationRepository",
});
export default NotificationStore;
