import { FlatList } from "libs/ui";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import EventStore from "app/model/event";
import { observer } from "mobx-react-lite";
import React,{useEffect, useState} from "react";
import { Dimensions, RefreshControl, ToastAndroid } from "react-native";
import RenderItem from "./RenderItem";
import { useLocalObservable } from "mobx-react";
import { runInAction } from "mobx";
import EmptyList from "app/ui/utils/EmptyList";

export default observer(() => {
  const nav = useNavigation();
  const isFocus = useIsFocused(); 
  const isFocused = useIsFocused();
  useEffect(() => {
    onRefresh();
  }, [isFocus]);

  const onRefresh = async () => {
    runInAction(()=>{
      // SalesStore.list = [] as Sales[];
      meta.offset=0
      EventStore.loadMore(meta.offset);
    })
  };

  const meta = useLocalObservable(() => ({
    offset:0,
    isLoading:false,
    lastPage:false
  }));
  const loadMore = () => {
    EventStore.loadMore(meta.offset);
  };
  const refreshControl = (
    <RefreshControl refreshing={EventStore.loading} onRefresh={onRefresh} />
  );


  return (
    <FlatList
    refreshControl={refreshControl}
    data={EventStore.LoadedList}
    renderItem={({ item }: any) => {
      return <RenderItem item={item} />;
    }}
    keyExtractor={(item: any) => String(item.id)}
    ListEmptyComponent={
      <EmptyList text={"Maaf untuk saat ini, tidak ada data penjualan."} />
    }
    contentContainerStyle={{
      paddingBottom: 80,
    }}
    onEndReached={
      ()=>{
        if(!EventStore.loading){
          meta.offset = EventStore.list.length
          loadMore()
        }
      }
    }
    />
  );
});
