import OutletAPI from "app/api/outlet";
import { Model } from "libs/model/model";
import getCurrentLocation, { ILocation } from "libs/utils/current-location";
import fuzzyMatch from "libs/utils/fuzzy-match";
import { Filter } from "../filter";
import OrderStore from "../order";
import ProductStore from "../product";
import { Location } from "./location";
import * as ExpoLocation from 'expo-location';
import { Area, Outlet } from "./outlet";
import {
  create, all
} from 'mathjs'
import SessionStore from "../session";
import { runInAction } from "mobx";
import locationService from "app/utils/location";
import _ from "lodash";
import { ToastAndroid } from "react-native";




export class OutletRepository extends Model {
  list: Outlet[] = Outlet.hasMany(this);
  area: Area[] = Area.hasMany(this);
  filter: Filter = Filter.childOf(this);

  currentOutlet: Outlet = Outlet.childOf(this);
  currentLocation: Location = Location.childOf(this);

  selectedOutlet: Outlet = Outlet.childOf(this);

  selectedCategory: Area = Area.childOf(this);


  loading = false;
  
  isFirst=true;
  isChosen=false;

  isTabClick=false;

  get getCategoryIndex() {
    return this.getOutlet.findIndex(
      (x: any) => x.id === this.selectedCategory.id
    );
  }

  setCategory(item: Area) {
    this.selectedCategory._loadJSON(item);
  }

  get getList(): Outlet[] {
    return this.list.filter((x) => {
      const search = this.filter.search.toLowerCase();
      const value = x.nama.toLowerCase();
      if (!!search) {
        return fuzzyMatch(search, value);
      }
      return true;
    });
  }

  getOutletByArea(code: string):Outlet[] {

    let selectArea:Area[]=this.area.filter((a:Area)=>{
      return a.code==code
    })
    
    if(selectArea.length>0){
      return selectArea[0].outlet.filter((x: any) => {
        const search = this.filter.search.toLowerCase();
        if (!!search && !!x.nama) {
          const value = x.nama.toLowerCase();
          return fuzzyMatch(value, search);
        }
        return true;
      });
    }
    
    return selectArea[0].outlet;
  }

  get getOutlet(): any[] {
    const list = [...this._json.area];
    return list
      .map((d: any) => {
        let outlet = d.outlet.filter((x: any) => {
          const search = this.filter.search.toLowerCase();
          if (!!search && !!x.nama) {
            const value = x.nama.toLowerCase();
            return fuzzyMatch(value, search);
          }
          return true;
        });

        return {
          ...d,
          data: outlet,
        };
      })
      .filter((x: any) => x.data.length > 0);
  }

  get getCurrentLocation() {
    return this._json.currentLocation;
  }

  async load() {
    this.loading = true;
    let data = await OutletAPI.getList();
    this._loadJSON({
      list: data,
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
    
    // if(this.isFirst){
    //   this.isFirst=false
    // }
    
  }

  async loadArea() {
    this._loadJSON({
      loading: true,
    });
    this.loading = true;
    let data = await OutletAPI.getListArea();
    this._loadJSON({
      area: data,
      loading: false,
    });
  }

  nearestOutlet(lat:number, long:number) {
    let data = {};
    SessionStore.latitude  = lat;
    SessionStore.longitude = long;
    if(SessionStore.longitude==0 && SessionStore.latitude==0){
      return
    }

    if (this.list.length > 0) {// && !this.currentOutlet.id
      let item = this.getList.find((x: any) => x.id === 9);

      let nearest=-1;
      let index=0


      // //console.log("ava")
      for(let y of this.list){
        
        const R = 6371
        const config = { }
        const maths = create(all, config)
        if (SessionStore.longitude!==0 && SessionStore.latitude!==0) {
          let lat1= +y.latitude
          let lat2 =SessionStore.latitude//location.latitude
          let dlat = lat1 - lat2

          let long1=+y.longitude
          let long2=SessionStore.longitude//location.longitude
          let dlon :any =long1 - long2
          
          var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
          var dLon = this.deg2rad(long2-long1); 
          var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)
            ; 
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
          var d = R * c; // Distance in km
          
          let distance = R * c              

          if(nearest==-1){
            nearest=distance
            item = this.getList.find((x: any) => x.id === y.id);
            // //console.log("nearest: "+item!!.latitude+", "+item!!.longitude)
            // //console.log("Outlet: "+this.getList.find((x: any) => x.id === y.id)?.nama)
            // //console.log("> "+nearest)
          }else{
            if(nearest>distance){
              nearest=distance
              item = this.getList.find((x: any) => x.id === y.id);
              // //console.log("nearest: "+item!!.latitude+", "+item!!.longitude)
              // //console.log("Outlet: "+this.getList.find((x: any) => x.id === y.id)?.nama)
              // //console.log("> "+nearest)
            }
          }
        }
        index++;
        
      }
      if (!!item) {
        data = {
          ...data,
          currentOutlet: item._json,
        };
        runInAction(()=>{
          this.isChosen=false;
        })
      }
    }
    this._loadJSON(data);

  }

  async checkNearestOutletX(lat:number, long:number) {
    let data = {};
    
    
    runInAction(()=>{
      SessionStore.latitude  = lat;
      SessionStore.longitude = long;
    })

    // data = {
    //   currentLocation: location,
    // };
  
  if(SessionStore.longitude==0 && SessionStore.latitude==0){
    return
  }

    
    if (this.list.length > 0) {// && !this.currentOutlet.id
      let item = this.getList.find((x: any) => x.id === 9);

      let nearest=-1;
      let index=0
      for(let y of this.list){
        
        const R = 6371
        const config = { }
        const maths = create(all, config)
        if (!!location) {
          let lat1= +y.latitude
          let lat2 =SessionStore.latitude//location.latitude
          let dlat = lat1 - lat2

          let long1=+y.longitude
          let long2=SessionStore.longitude//location.longitude
          let dlon :any =long1 - long2
          
          var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
          var dLon = this.deg2rad(long2-long1); 
          var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)
            ; 
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
          var d = R * c; // Distance in km
          
          let distance = R * c              

          if(nearest==-1){
            nearest=distance
            item = this.getList.find((x: any) => x.id === y.id);
            // //console.log("nearest: "+item!!.latitude+", "+item!!.longitude)
            // //console.log("> "+nearest)
          }else{
            if(nearest>distance){
              nearest=distance
              item = this.getList.find((x: any) => x.id === y.id);
              // //console.log("nearest: "+item!!.latitude+", "+item!!.longitude)
              // //console.log("> "+nearest)
            }
          }
        }
        index++;
        
      }

      
      if (!!item) {
        data = {
          currentOutlet: item._json,
        };
        runInAction(()=>{
          this.isChosen=false;
        })
      }
    }
    this._loadJSON(data);
  }

  async checkNearestOutletY() {
    let data = {};
    
    if(SessionStore.longitude==0 && SessionStore.latitude==0){
      return
    }

    // //console.log("axa")
    if (this.list.length > 0) {// && !this.currentOutlet.id
      
      let item :Outlet|undefined= new Outlet();

      let nearest=-1;
      let index=0
      
      for(let y of this.list){
        
        const R = 6371
        const config = { }
        const maths = create(all, config)
          let lat1= +y.latitude
          let lat2 =SessionStore.latitude//location.latitude
          let dlat = lat1 - lat2

          let long1=+y.longitude
          let long2=SessionStore.longitude//location.longitude
          let dlon :any =long1 - long2
          
          var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
          var dLon = this.deg2rad(long2-long1); 
          var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)
            ; 
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
          var d = R * c; // Distance in km
          
          let distance = R * c              

          if(nearest==-1){
            nearest=distance
            item = this.getList.find((x: any) => x.id === y.id);
            // //console.log("nearest: "+item!!.latitude+", "+item!!.longitude)
            // //console.log("> "+nearest)
          }else{
            if(nearest>distance){
              nearest=distance
              item = this.getList.find((x: any) => x.id === y.id);
              // //console.log("nearest: "+item!!.latitude+", "+item!!.longitude)
              // //console.log("> "+nearest)
            }
          }
        
        index++;
        
      }


      if (!!item) {
        data = {
          currentOutlet: item._json,
        };
        runInAction(()=>{
          this.isChosen=false;
        })
      }
    }
    
    this._loadJSON(data);
  }


  // async checkNearestOutlet() {
  //   let data = {};
  //   //let location = await ExpoLocation.getCurrentPositionAsync();
  //   let lat =0;
  //   let long =0;
  //   if (!!location) {
  //     runInAction(()=>{
  //       SessionStore.latitude  = _.get(location, "latitude", 0);
  //       SessionStore.longitude = _.get(location, "longitude", 0);

  //       // lat  = _.get(location, "latitude", 0);
  //       // long = _.get(location, "longitude", 0);

  //       // SessionStore.latitude  = location!!.latitude
  //       // SessionStore.longitude = location!!.longitude
  //       // SessionStore.latitude  = location!!.latitude
  //       // SessionStore.longitude = location!!.longitude
  //     })
  //     // //console.log("myloc: "+location.latitude+", "+location.longitude)
  //     data = {
  //       currentLocation: location,
  //     };
      
  //   }else{
  //     locationService.askPermission()

  //     if (!!location) {
  //       runInAction(()=>{
  //         SessionStore.latitude  = _.get(location, "latitude", 0);
  //         SessionStore.longitude = _.get(location, "longitude", 0);
  //       })
  //       // //console.log("myloc: "+location.latitude+", "+location.longitude)
  //       data = {
  //         currentLocation: location,
  //       };
  //     }
  //   }
    
  //   if(SessionStore.longitude==0 && SessionStore.latitude==0){
  //     return
  //   }

    
  //   // //console.log("axa")
  //   if (this.list.length > 0) {// && !this.currentOutlet.id
  //     let item = this.getList.find((x: any) => x.id === 9);

  //     let nearest=-1;
  //     let index=0
  //     for(let y of this.list){
        
  //       const R = 6371
  //       const config = { }
  //       const maths = create(all, config)
  //       if (!!location) {
  //         let lat1= +y.latitude
  //         let lat2 =SessionStore.latitude//location.latitude
  //         let dlat = lat1 - lat2

  //         let long1=+y.longitude
  //         let long2=SessionStore.longitude//location.longitude
  //         let dlon :any =long1 - long2
          
  //         var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
  //         var dLon = this.deg2rad(long2-long1); 
  //         var a = 
  //           Math.sin(dLat/2) * Math.sin(dLat/2) +
  //           Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
  //           Math.sin(dLon/2) * Math.sin(dLon/2)
  //           ; 
  //         var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  //         var d = R * c; // Distance in km
          
  //         let distance = R * c              

  //         if(nearest==-1){
  //           nearest=distance
  //           item = this.getList.find((x: any) => x.id === y.id);
  //           // //console.log("nearest: "+item!!.latitude+", "+item!!.longitude)
  //           // //console.log("> "+nearest)
  //         }else{
  //           if(nearest>distance){
  //             nearest=distance
  //             item = this.getList.find((x: any) => x.id === y.id);
  //             // //console.log("nearest: "+item!!.latitude+", "+item!!.longitude)
  //             // //console.log("> "+nearest)
  //           }
  //         }
  //       }
  //       index++;
        
  //     }


  //     if (!!item) {
  //       data = {
  //         ...data,
  //         currentOutlet: item._json,
  //       };
  //       runInAction(()=>{
  //         this.isChosen=false;
  //       })
  //     }
  //   }
  //   this._loadJSON(data);
  // }

  deg2rad(deg:number) {
    return deg * (Math.PI/180)
  }

  setSelectedtOutlet(outlet: Outlet) {
    // //console.log("setSelectedtOutlet")
    this._loadJSON({
      selectedOutlet: outlet._json,
    });
  }

  setCurrentOutlet(outlet: Outlet) {
    // //console.log("setCurrentOutlet")
    this._loadJSON({
      currentOutlet: outlet._json,
      isChosen:true
    });
    
    ProductStore.load(outlet._json.id);
    OrderStore.initOrder();
  }

  setLocation(location: ILocation) {
    // //console.log("setLocation")
    this._loadJSON({
      currentLocation: location,
    });
  }
}

const OutletStore = OutletRepository.create({
  localStorage: true,
  storageName: "OutletRepository",
});
export default OutletStore;
