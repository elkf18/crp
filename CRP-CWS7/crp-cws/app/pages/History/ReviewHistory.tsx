import useTheme from "libs/hooks/useTheme";
import { observer, useLocalObservable } from "mobx-react-lite";
import React, { Component, useEffect } from "react";
import {
    Button,
    Field,
    Form,
    Icon,
    Image,
    Screen,
    ScrollView,
    Text,
    TextInput,
    TopBar,
    View,
  } from "libs/ui";
import Fonts from "libs/assets/fonts";
import HistoryStore from "app/model/history";
import { Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ITheme } from "libs/config/theme";
import ReviewStore from "app/model/review";

export default observer(() => {
    //const Theme = useTheme();
        const nav = useNavigation();
    // const { data, onGoBack }: any = route.params || {};
    ReviewStore.load(HistoryStore.detail.id)
    useEffect(() => {
        ReviewStore.load(HistoryStore.detail.id)
      }, []);
      useEffect(() => {
        ReviewStore.load(HistoryStore.detail.id)
      }, []);
      
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
            >
                <Text
                    style={{
                        fontSize: 20,
                        fontFamily: Fonts.MontserratBold,
                        flexGrow: 1,
                    }}
                    >
                    Ulasan
                    </Text>
             </TopBar>
                        

             <ScrollView>
                 <View 
                    style={{
                        padding:16
                    }}>

                    
                        <Text
                        style={{
                            color:"#000",
                            fontFamily:Fonts.MontserratBold
                        }}>
                            {HistoryStore.detail.outlet_name}
                        </Text>
                        <Text
                        style={{
                            color:"#000",
                            marginTop:8,
                            fontFamily:Fonts.MontserratBold
                        }}>
                            Order: {HistoryStore.detail.sales_order_number}
                        </Text>
                        <View
                            style={{
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            marginVertical: 10,
                            backgroundColor:"#FBFAF9",
                            borderWidth:1,
                            borderRadius:8,
                            padding:14,
                            marginTop:16,
                            borderColor:"#E5E5E5"
                            }}
                        >
                        {Array.isArray(ReviewStore.list) &&
                        ReviewStore.list.map((item,index) => {
                            return (
                            // <Button
                            //     key={index}
                            //     mode={"clean"}
                            //     onPress={() => {
                            //         ReviewStore.star = item.star;
                            //         ReviewStore.form.id_review = item.id;
                            //     }}
                            // >
                                <Icon
                                source={"FontAwesome"}
                                name={item.star <= HistoryStore.detail.review.star ? "star" : "star-o"}
                                color={item.star <= HistoryStore.detail.review.star ? "#AC9488" : "#AC9488"}
                                size={40}
                                style={{
                                    marginLeft: 5,
                                    margin: 0,
                                }}
                                />
                            // </Button>
                            );
                        })}
                        </View>

                        <Text
                        style={{
                            fontSize: 14,
                            color: "#000",
                            marginVertical: 10,
                            marginHorizontal: 5,
                            fontFamily:Fonts.MontserratBold
                            
                        }}
                        >
                            {!!HistoryStore.detail.review.remark?HistoryStore.detail.review.remark:"-"}
                        </Text>

                        <View
                        style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            marginBottom: 10,
                        }}
                        >
                        {Array.isArray(HistoryStore.detail.review.data) &&
                            HistoryStore.detail.review.data.map((item, key) => {
                            return <RenderItem key={key} state={item} />;
                            })}
                        </View>

                        <Text
                            style={{
                                fontSize: 14,
                                color: "#000",
                                marginVertical: 10,
                                marginHorizontal: 5,
                                fontFamily:Fonts.MontserratBold
                                
                            }}
                            >
                            Tulis Review
                        </Text>

                        <View
                            style={{
                                
                                borderRadius: 8,
                                borderWidth: 1,
                                borderColor: "#E6E6E6",
                                backgroundColor: "transparent",
                                borderBottomWidth: 1,
                                
                            }}
                            
                            
                            >
                                <TextInput type={"multiline"}
                                editable={false}
                                value={HistoryStore.detail.review.comment}
                                />
                            </View>


                                            

                 </View>
            </ScrollView>
             
     </Screen>
  )})



  const RenderItem  = observer(({ state, meta }: any) => {
    const dim = Dimensions.get("window");
    const nav = useNavigation();
    const route = useRoute();
  
    return (
      <Button
        style={{
          backgroundColor: "#786054",
          borderRadius:99,
          padding:8
        }}
      >
          <Text
          style={{
              color:"#fff",
          }}
          >
            {state.item}
          </Text>

          
      </Button>
    );
  });
  