import { FlatList } from "libs/ui";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import NewsStore from "app/model/news";
import { observer } from "mobx-react-lite";
import React,{useEffect, useState} from "react";
import { Dimensions, RefreshControl, ToastAndroid } from "react-native";
import RenderItem from "./RenderItem";
import { useLocalObservable } from "mobx-react";
import News from "../News";

export default observer(() => {
  const nav = useNavigation();
  const isFocus = useIsFocused(); 
  const isFocused = useIsFocused();

  useEffect(() => {
    refresh();
  }, [isFocus])

  const refresh = async () => {
    meta.offset = 0
    NewsStore.loadMoreNews(meta.offset)
  }
  const meta = useLocalObservable(() => ({
    offset:0,
    isLoading:false,
    lastPage:false
  }));
  const refreshControl = (
    <RefreshControl refreshing={NewsStore.loading} onRefresh={refresh} />
  );
  const loadMore = () => {
    NewsStore.loadMoreNews(meta.offset);
  };

  return (
    <FlatList
      refreshControl={refreshControl}
      data={NewsStore.list}
      keyExtractor={(item) => String(item.id)}
      renderItem={(props) => <RenderItem {...props} />}
      onEndReached={
        ()=>{
            meta.offset = NewsStore.list.length
            console.log(meta.offset)
            loadMore()
        }
      }
      onEndReachedThreshold={5}
    />
  );
});
