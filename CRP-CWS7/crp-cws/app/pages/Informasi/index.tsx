import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import HistoryStore from "app/model/history";
import NewsStore from "app/model/news";
import EventStore from "app/model/event";
import RenderItem from "../DetailNews/RenderItem";

import { onScroll, resetScrollState } from "app/utils/scrollEvent";
import useTheme from "libs/hooks/useTheme";
import { observer} from "mobx-react";
import React, { useEffect,useState } from "react";
import { FlatList, View } from "libs/ui";
import GroupTab from "./GroupTab";
// import RenderItem from "./RenderItem";
import { Dimensions, RefreshControl, ToastAndroid } from "react-native";
import TopBar from "app/ui/utils/TopBar";
import { runInAction } from "mobx";
import RenderEvent from "./RenderEvent";
import { useLocalObservable } from "mobx-react";

const NavigationTab = createMaterialTopTabNavigator();

export default observer((props: any) => {
  const { scrollState,index} = props;
  const route = useRoute()
  const { data }: any = route.params || {};

  const dim = Dimensions.get("window");
  const nav = useNavigation();
  const Theme = useTheme();
  const isFocused = useIsFocused();

  const refreshEvent = () => {
    meta.offsetEvent = 0
    loadMoreEvent()
  };

  const loadMoreEvent = () => {
    EventStore.load(meta.offsetEvent)
  }

  const refreshNews = () => {
    NewsStore.load()
  };  
  const refreshEventControl = (
    <RefreshControl
      refreshing={EventStore.loading}
      onRefresh={refreshEvent}
    />
  );
  const refreshNewsControl = (
    <RefreshControl
      refreshing={NewsStore.loading}
      onRefresh={refreshNews}
    />
  );

  
  const Tab = [
    {
      label: "Event",
      value: "event",
    },
    {
      label: "News",
      value: "news",
    },
  ];
  const meta = useLocalObservable(() => ({
    offsetNews:0,
    isLoading:false,
    lastPage:false,
    offsetEvent: 0
  }));
  useEffect(() => {
    if (isFocused) {
      resetScrollState(scrollState);
    }
  }, [isFocused]);
  const loadMoreNews = () => {
    NewsStore.loadMoreNews(meta.offsetNews);
  };

  return (
    <>
      
      <TopBar title="Event & Promo" />
      <FlatList
                refreshControl={refreshEventControl}
                data={EventStore.getList}
                keyExtractor={(item) => String(item.id)}
                renderItem={(props) => <RenderEvent {...props} />}
                onEndReached={()=> {
                  if(!EventStore.loading) {
                    meta.offsetEvent = EventStore.getList.length
                    loadMoreEvent()
                    console.log("offset index : "+meta.offsetEvent)
                  }
                }}
              />
      
       {/* <NavigationTab.Navigator
        initialRouteName={Tab[data.index].value}
        tabBar={(props) => <GroupTab tabs={Tab} {...props} />}
        tabBarPosition={"top"}
        swipeEnabled={true}
        style={{
          backgroundColor: Theme.colors.background,
        }}
      >
        {Tab.map((tab: any, key: number) => (
          <NavigationTab.Screen
            key={key}
            name={tab.value}
            children={(props: any) => (
              <View>
              {key == 1? (
                <FlatList
                refreshControl={refreshNewsControl}
                data={NewsStore.getList}
                keyExtractor={(item) => String(item.id)}
                renderItem={(props) => <RenderItem {...props} />}
                onEndReached={
                  ()=>{
                      meta.offsetNews = NewsStore.list.length
                      loadMoreNews()
                  }
                }
                onEndReachedThreshold={1}
              />
              ):(
                <FlatList
                refreshControl={refreshEventControl}
                data={EventStore.getList}
                keyExtractor={(item) => String(item.id)}
                renderItem={(props) => <RenderEvent {...props} />}
                onEndReached={()=> {
                  if(!EventStore.loading) {
                    meta.offsetEvent = EventStore.getList.length
                    loadMoreEvent()
                    console.log("offset index : "+meta.offsetEvent)
                  }
                }}
              />
              )}
              </View>
            )}
          />
        ))}
      </NavigationTab.Navigator>   */}
    </>
  );
});
