import { useIsFocused, useNavigation } from "@react-navigation/core";
import OutletStore from "app/model/outlet";
import { resetScrollState } from "app/utils/scrollEvent";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { Alert } from "react-native";
import List from "./List";
import Submit from "./Submit";
import TopBar from "./TopBar";
import Update from "./Update";

export default observer((props: any) => {
  
  

  // useEffect(() => {
  //   OutletStore.loadArea();
    
  //   if (!!OutletStore.filter.search) {
  //     runInAction(() => (OutletStore.filter.search = ""));
  //   }
  // }, []);

  // useEffect(() => {
  //   OutletStore.loadArea();
    
  // }, [OutletStore.filter.search]);

  return (
    <>
      <TopBar filter={OutletStore.filter} />
      <List  />
    </>
  );
});
