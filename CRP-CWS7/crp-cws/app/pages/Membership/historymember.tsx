import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";

import Fonts from "libs/assets/fonts";
import useTheme from "libs/hooks/useTheme";
import {
    Button,
    Camera,
    ChoiceGroup,  
    Field,
    FlatList,
    Form,
    Icon,
    Image,
    Screen,
    ScrollView,
    Select,
    Text,
    TextInput,
    TopBar,
    View,
  } from "libs/ui";
  import { ITheme } from "libs/config/theme";
import get from "lodash.get";
import { observer } from "mobx-react-lite";
import React, { Component, useEffect } from "react";

import { useLocalObservable } from "mobx-react";
import { runInAction } from "mobx";
import MembershipStore from "app/model/membership";
import { RefreshControl } from "react-native";
import RenderItem from "app/ui/membership/RenderItem";


export default observer(() => {
    //const Theme = useTheme();
    // const nav = useNavigation();
    // const route = useRoute();
    // const { data, onGoBack }: any = route.params || {};
    const meta = useLocalObservable(() => ({
        offset:0
        }));
        const onRefresh = async () => {
        runInAction(()=>{
            MembershipStore.list = []
            meta.offset=0
            MembershipStore.loadHistory(meta.offset);
        })
        };

        useEffect(() => {
            onRefresh();
        }, []);

        const loadMore = () => {
            MembershipStore.loadHistory(meta.offset);
          };
          const refreshControl = (
            <RefreshControl refreshing={MembershipStore.loading} onRefresh={onRefresh} />
          );

      return (
        <Screen>
             <TopBar
                style={{
                backgroundColor: "#fff",
                }}
                enableShadow={false}
                backButton={true}
                iconProps={{
                
                    color: "#3a3a3a",
                    name: "left",
                    source: "AntDesign",
                    size: 28,
                
                }}
                // actionBackButton={() => {
                // if (!!onGoBack) {
                //     onGoBack();
                // } else {
                //     nav.goBack();
                // }
                // }}
            >
                <Text
                    style={{
                        // color: Theme.colors.primary,
                        fontSize: 20,
                        fontFamily: Fonts.MontserratBold,
                        flexGrow: 1,
                    }}
                    >
                    Riwayat
                    </Text>
             </TopBar>
            
             <FlatList
                refreshControl={refreshControl}
                data={MembershipStore.list}
                keyExtractor={(item) => String(item.id)}
                renderItem={(props) => <RenderItem {...props}/>}
                
                contentContainerStyle={{
                    paddingBottom: 80,
                }}
                onEndReached={
                    ()=>{
                      if(!MembershipStore.loading){
                        meta.offset = MembershipStore.list.length
                        loadMore()
                      }
                    }
                  }
                // ItemSeparatorComponent={() => (
                //   <View
                //     style={{
                //       borderWidth: 1,
                //       borderColor: "#ccc",
                //     }}
                //   />
                // )}
                />
        </Screen>
        
      );
    })
  