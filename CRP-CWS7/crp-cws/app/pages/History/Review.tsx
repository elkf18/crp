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
import ReviewStore, { Review } from "app/model/review";
import { Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ITheme } from "libs/config/theme";

export default observer(() => {
    //const Theme = useTheme();
        const nav = useNavigation();
    // const { data, onGoBack }: any = route.params || {};

    const meta = useLocalObservable(() => ({
        data: {} as any,
        
        starSelected: [],
        starList: {} as any,
        comment: "",
        send: false,
        readyReview: false,
        loading: true,
      }))

      useEffect(() => {
        if (ReviewStore.star != null && ReviewStore.list.length > 0) {
          meta.starSelected = [];
          meta.starList = ReviewStore.list.find((x: any) => x.id === ReviewStore.star);
        }
      }, [ReviewStore.star]);

      useEffect(() => {
        if (meta.starSelected != null) {
          meta.starSelected;
        }
      }, [meta.starSelected]);


      useEffect(() => {
        ReviewStore.form.init()
        ReviewStore.load(HistoryStore.detail.id)
        ReviewStore.form.id_sales_order = HistoryStore.detail.id
        ReviewStore.star = 5
        ReviewStore.form.id_review = ReviewStore.selected.id

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
                    Buat Ulasan
                    </Text>
             </TopBar>
                        

             <ScrollView>
                 <View 
                    style={{
                        padding:16
                    }}>

                    <Form
                        values={ReviewStore.form}
                        validationSchema={{
                        //   id_outlet:Yup.string().required("Harus di isi."),
                        //   email: Yup.string().required("Harus di isi.").email("Email tidak sesuai"),
                        //   description: Yup.string().required("Harus di isi."),
                        //   foto: Yup.string().required("Harus di isi."),
                        }}
                        onSubmit={() => {
                            ReviewStore.form.save().then((res) => {
                            if (!!res) {
                              
                              nav.goBack();
                            }
                          });
                        }}
                        Submit={(handleSubmit, canSubmit) => (
                            <RenderSubmit handleSubmit={handleSubmit} canSubmit={canSubmit} />
                          )}
                    >
                        {(props) => (
                        <>
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
                            <Button
                                key={index}
                                mode={"clean"}
                                onPress={() => {
                                  if(ReviewStore.star!==item.star){
                                    ReviewStore.form.item=[]
                                  }
                                  ReviewStore.star = item.star;
                                  ReviewStore.form.id_review = item.id;
                                }}
                            >
                                <Icon
                                source={"FontAwesome"}
                                name={item.star <= ReviewStore.star ? "star" : "star-o"}
                                color={item.star <= ReviewStore.star ? "#AC9488" : "#AC9488"}
                                size={40}
                                style={{
                                    marginLeft: 5,
                                    margin: 0,
                                }}
                                />
                            </Button>
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
                            {!!ReviewStore.selected.remark?ReviewStore.selected.remark:"-"}
                        </Text>

                        <View
                        style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            marginBottom: 10,
                        }}
                        >
                        {Array.isArray(ReviewStore.selected.data) &&
                            ReviewStore.selected.data.map((item, key) => {
                            return <RenderItem key={key} state={item} meta={meta} />;
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

                        <Field
                            initializeField={props}
                            label={""}
                            path={"comment"}
                            hiddenLabel={true}
                            
                            styles={{
                                label:{
                                fontFamily:Fonts.RobotoBold ,
                                color:"#333333"
                                },
                                input: {
                                borderRadius: 8,
                                borderWidth: 1,
                                borderColor: "#E6E6E6",
                                backgroundColor: "transparent",
                                borderBottomWidth: 1,
                                },
                            }}
                            value={ReviewStore.form.comment}
                            >
                                <TextInput type={"multiline"} placeholder="Tulis ulasanmu disini"/>
                            </Field>

                        </>
                        )}
                    </Form>
                                            

                 </View>
            </ScrollView>
             
     </Screen>
  )})


  const RenderSubmit = observer((props: any) => {
    const { handleSubmit, canSubmit } = props;
    const nav = useNavigation();
    const Theme: ITheme = useTheme() as any;
  
    return (
      <Button
        style={{
          margin: 0,
          marginTop: 15,
          paddingVertical: 12,
        }}
        onPress={handleSubmit}
        disabled={!canSubmit || ReviewStore.form.saving}
      >
        <Text
          style={{
            color: Theme.colors.textLight,
            fontSize: 16,
            fontFamily: Fonts.MontserratBold,
          }}
        >
          {ReviewStore.form.saving ? "Mengirim..." : "Kirim"}
          
        </Text>
      </Button>
    );
  });

  const RenderItem  = observer(({ state, meta }: any) => {
    const dim = Dimensions.get("window");
    const nav = useNavigation();
    const route = useRoute();
  
    const colorCheck = ReviewStore.form.item.find(
      (x: any) => x.id_item === state.id_item
    );
  
    return (
      <Button
        
        onPress={() => {
          
            if (colorCheck != null) {
            let idx = ReviewStore.form.item.findIndex(
              (x: any) => x.id_item === state.id_item
            );
            ReviewStore.form.item.splice(idx, 1);
          } else {
            ReviewStore.form.item.push(state);
          }

        }}


        style={{
          backgroundColor:
            colorCheck != null ? "#786054" : "#FBFAF9",
            
        }}
      >
          <Text
          style={{
              color:colorCheck != null ? "#fff" : "#786054",
          }}
          >
            {state.item}
          </Text>

          
      </Button>
    );
  });
  