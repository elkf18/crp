import OutletAPI from "app/api/outlet";
import { Model } from "libs/model/model";
import getCurrentLocation from "libs/utils/current-location";
import { dateFormat } from "libs/utils/date";
import { Alert } from "react-native";
import OutletStore from ".";

import {
  create, all
} from 'mathjs'
import SessionStore from "../session";
import { runInAction } from "mobx";

export class Outlet extends Model {
  id = "";
  nama = "";
  alamat = "";
  telpon = "";
  latitude = "";
  longitude = "";
  m_area = null;
  created_time = "";
  info = "";
  kota = "";
  provinsi = "";
  negara = "";
  img_url = "";
  code = null;
  is_live = 1;
  mon_start = null;
  mon_end = null;
  tue_start = null;
  tue_end = null;
  wed_start = null;
  wed_end = null;
  thu_start = null;
  thu_end = null;
  fri_start = null;
  fri_end = null;
  sat_start = null;
  sat_end = null;
  sun_start = null;
  sun_end = null;
  id_client = null;
  gallery = [];
  setting = [];

  loading = false;
  firstAppOpen=false
  distance=0

  get firstGallery() {
    if (this.gallery.length > 0) {
      return (this.gallery[0] as any).url;
    }
    return this.img_url;
  }

  get open(): string {
    const today = new Date();
    const day = dateFormat(today, "EEE", "en").toLowerCase();
    let open = (this as any)[day + "_start"];
    if (!!open) open = open.slice(0, 5);
    return open;
  }

  get close(): string {
    const today = new Date();
    const day = dateFormat(today, "EEE", "en").toLowerCase();
    let close = (this as any)[day + "_end"];
    if (!!close) close = close.slice(0, 5);
    return close;
  }
  get closeHour(): string {
    const today = new Date();
    const day = dateFormat(today, "EEE", "en").toLowerCase();
    let close = (this as any)[day + "_end"];
    // //console.log("closeHour ["+this.nama+"]: "+close)
    if (!!close){ 
      close = close.slice(0, 5);
      return close.substring(0,2);
    }
    return "00";
  }
  get closeMinute(): string {
    const today = new Date();
    const day = dateFormat(today, "EEE", "en").toLowerCase();
    let close = (this as any)[day + "_end"];
    // //console.log("closeMinute ["+this.nama+"]: "+close)
    if (!!close){ 
      close = close.slice(0, 5);
      return close.substr(close.length - 2) ;
    }
    return "00";
  }

  get status(): string {
    let status = "TUTUP";
    const today = new Date();
    const day = dateFormat(today, "EEE", "en").toLowerCase();
    
    try {
      const open = (this as any)[day + "_start"].split(":");
      const close = (this as any)[day + "_end"].split(":");
    
    const currentTime = today.getTime();
    const openTime = new Date(dateFormat(today, "yyyy-MM-dd")).setHours(
      open[0] || 0,
      open[1] || 0,
      open[2] || 0
    );
    const closeTime = new Date(dateFormat(today, "yyyy-MM-dd")).setHours(
      close[0] || 0,
      close[1] || 0,
      close[2] || 0
    );

    if (
      !isNaN(currentTime) &&
      !isNaN(openTime) &&
      !isNaN(closeTime) &&
      currentTime >= openTime &&
      currentTime <= closeTime
    ) {
      status = "BUKA";
    } else {
      const diff = 1 * 60 * 1000;
      let soonTime = openTime - currentTime;
      if (!!open && !!close && soonTime > 0 && soonTime <= diff) {
        status = "SEGERA BUKA";
      } else {
        status = "TUTUP";
      }
    }
    }
    catch (exception_var) {
      
    }
    return status;
  }

  get location(): any {
    return {
      latitude: parseFloat(this.latitude),
      longitude: parseFloat(this.longitude),
      latitudeDelta: 0.0043,
      longitudeDelta: 0.0034,
    };
  }

  setDistance(distance:any) {
    this.distance = 123
  }

  get getDistance(){
    const R = 6371
        const config = { }
        const maths = create(all, config)
        // //console.log("session: "+SessionStore.latitude+", "+SessionStore.longitude)
        if (SessionStore.latitude!==0 && SessionStore.longitude!==0) {
          
          let lat1= +this.latitude
          let lat2 =SessionStore.latitude
          let dlat = lat1 - lat2

          let lon1=+this.longitude
          let lon2=SessionStore.longitude
          let dlon :any =lon1 - lon2
          
          var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
          var dLon = this.deg2rad(lon2-lon1); 
          var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)
            ; 
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
          var d = R * c; // Distance in km

          var num = Number(0.005) // The Number() only visualizes the type and is not needed
          var roundedString = d.toFixed(2);
          var rounded = Number(roundedString); 

          return rounded;
        }
        return -1

  }

  deg2rad(deg:number) {
    return deg * (Math.PI/180)
  }

  getOperational(key: string) {
    let open = (this as any)[key + "_start"];
    if (!!open) open = open.slice(0, 5);
    let close = (this as any)[key + "_end"];
    if (!!close) close = close.slice(0, 5);
    return { open, close };
  }

  load() {
    this.loading = true;
    OutletAPI.getDetail(this.id).then((res) => {
      this._loadJSON({
        ...res,
        loading: false,
      });


      if(OutletStore.currentOutlet.firstAppOpen){
        OutletStore.checkNearestOutletY();

        if(OutletStore.currentOutlet.nama!==""){
          runInAction(()=>{
            OutletStore.currentOutlet.firstAppOpen= false
          })
        }  
      }
      
    });
  }
}

export class Area extends Model {
  code = "";
  id = 0;
  id_client = 0;
  name = "";
  category = "";
  outlet: Outlet[] = Outlet.hasMany(this);


  loading = false;
  firstAppOpen=false
  distance=0
}
