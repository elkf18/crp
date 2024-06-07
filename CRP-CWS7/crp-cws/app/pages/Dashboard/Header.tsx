import { useIsFocused, useNavigation } from "@react-navigation/native";
import color from "app/config/color";
import BannerStore from "app/model/banner";
import NotificationStore from "app/model/notification";
import SessionStore from "app/model/session";
import AppConfig from "libs/config/app";
import { Button, Icon, Image, Text, View } from "libs/ui";
import { statusBarHeight } from "libs/ui/Screen";
import { runInAction } from "mobx";
import { observer, useLocalObservable } from "mobx-react";
import React, { useEffect } from "react";
import { Animated, Linking, Dimensions, StyleSheet, ToastAndroid, Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Carousel, CarouselPagination } from "libs/ui";
export const SLIDER_WIDTH = Dimensions.get('window').width
export const ITEM_WIDTH = Dimensions.get('window').width

export default observer((props: any) => {
  const dim = Dimensions.get("window");
  const width = dim.width;
  const height = (3 / 4) * dim.height + 10;
  const nav = useNavigation();
  const isFocused = useIsFocused()
  const { headerTranslate, HEADER_MAX_HEIGHT, imageTranslate } = props;


  const meta = useLocalObservable(() => ({
    banner: "",
    prevSource: "",
    link: "",
    index: 0,
    props
  }));
  const RenderItem = observer((props: any) => {
    const { item } = props;
    const dim = Dimensions.get("window");

    return (
      <Pressable
        onPress={() => {

          let link = item.url;
          if (!item.url.includes("https://")) {
            link = "https://" + item.url
          }
          if (link != "https://") {
            Linking.openURL(link).catch(err => console.error("Couldn't load page", err));
          }

        }}>
        <Animated.Image
          source={{
            uri: AppConfig.serverUrl + item.img_alt_url,
          }}
          style={{
            width: "100%",
            height: (height - 150),
            transform: [{ translateY: imageTranslate }],
          }}
          resizeMode={"cover"}
        />
      </Pressable>

    );
  });

  useEffect(() => {
    let interval: any;
    if (isFocused && BannerStore.getList.length > 0) {
      meta.banner = `${AppConfig.serverUrl + BannerStore.list[meta.index].img_url}`;
      interval = setInterval(() => {
        runInAction(() => {
          meta.prevSource = meta.banner;
          if (meta.index < BannerStore.list.length - 1) {
            meta.index = meta.index + 1;
          } else {
            meta.index = 0;
          }
          if (!!BannerStore.list[meta.index].url && BannerStore.list[meta.index].url != "") {
            if (!BannerStore.list[meta.index].url.includes("https://")) {
              meta.link = "https://" + BannerStore.list[meta.index].url
            } else {
              meta.link = BannerStore.list[meta.index].url
            }
          } else {
            meta.link = "";
          }

          meta.banner = `${AppConfig.serverUrl + BannerStore.list[meta.index].img_url}`;
        })

      }, 5000);

    }

    return () => {
      if (!!interval) {
        clearInterval(interval);
      }
    };
  }, [isFocused, BannerStore.getList.length]);

  return (
    <>

      <Animated.View

        style={{
          height: HEADER_MAX_HEIGHT,//
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          transform: [{ translateY: headerTranslate }],
          backgroundColor: color.primary_main
        }}
      >
        {BannerStore.getList.length == 0 ?
          <Animated.Image
            source={require("app/assets/images/content/banner.png")}

            style={{
              width: "100%",
              position: "absolute",
              top: 0,
              height: HEADER_MAX_HEIGHT + 20,
              transform: [{ translateY: imageTranslate }],
            }}
            fadeDuration={500}

            resizeMode={"cover"}
          />
          : <>

            <Carousel
              layout={"default"}
              data={BannerStore.getList}
              renderItem={({ item }) => {
                return <RenderItem item={item} height={height} />;
              }}
              itemWidth={width}
              itemHeight={height}
              sliderWidth={width}
              sliderHeight={height}
              scrollEnabled={true}
              autoplay={true}
              loop={true}
              lockScrollWhileSnapping={true}
              enableMomentum={true}
              inactiveSlideOpacity={1}
              inactiveSlideScale={1}
              slideStyle={{
                width: dim.width,
                margin: 0,
              }}
              autoplayDelay={5000}
              autoplayInterval={5000}
              scrollEndDragDebounceValue={10}
            >
              {(data, activeSlide) => (
                <CarouselPagination
                  dotsLength={data.length}
                  activeDotIndex={activeSlide}
                  dotStyle={{
                    height: 8,
                    width: 8,
                    borderRadius: 20,
                    backgroundColor: 'white',
                    borderWidth: 1.5,
                    borderStyle: "solid",
                    borderColor: "#fff",
                  }}
                  containerStyle={{
                    paddingHorizontal: 0,
                    paddingVertical: 0,
                    bottom: 30,
                  }}
                />
              )}
            </Carousel>


          </>


        }
        <View
          style={{
            height: 20,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            backgroundColor: "#fff",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >

        </View>

      </Animated.View>
      {/* <Button
        onPress={()=>{
          if(!!meta.link && meta.link!=""){
            Linking.openURL(meta.link).catch(err => console.error("Couldn't load page", err));
          }
        }}
      style={{
        height: HEADER_MAX_HEIGHT-20,
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        transform: [{ translateY: headerTranslate }],
        overflow: "hidden",
        borderRadius:0,
        backgroundColor:"#0000"
      }}
      >

      </Button>  */}
      <View
        style={{
          position: "absolute",
          top: statusBarHeight,
          left: 0,
          right: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 10,
          alignItems: "center",
        }}
      >
        <View
          style={{
            padding: 10,
            borderRadius: 4,
            backgroundColor: "#00000077",
            overflow: "hidden",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >

          <Image
            source={require("app/assets/images/logo_small.png")}
            resizeMode="cover"
            style={{
              height: 32,
              width: 77,
            }}
          />

        </View>
        {SessionStore.isLoggedIn &&
          <Button
            mode="clean"
            onPress={() => {
              // //console.log("halooo");
              nav.navigate("Inbox");
            }}
            style={{
              width: 40,
              height: 40,
              padding: 0,
              paddingHorizontal: 0,
              borderRadius: 99,
              margin: 0,
              zIndex: 99,
            }}
          >
            <Icon name="md-notifications-outline" source="Ionicons" size={25} color={color.secondary_main} />
            {NotificationStore.isNew && (
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 99,
                  backgroundColor: color.warning_main,
                  position: "absolute",
                  top: 7,
                  right: 7,
                }}
              />
            )}
          </Button>
        }


      </View>

    </>
  );
});