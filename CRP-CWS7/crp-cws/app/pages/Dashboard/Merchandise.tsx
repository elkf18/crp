import { Carousel, Image, CarouselPagination } from "libs/ui";
import AppConfig from "libs/config/app";
import MerchandiseStore from "app/model/merchandise";
import { observer } from "mobx-react";
import React from "react";
import { Dimensions } from "react-native";
import useTheme from "libs/hooks/useTheme";

export default observer((props: any) => {
  const { meta } = props;
  const dim = Dimensions.get("window");
  const width = dim.width;
  const height = (3 / 4) * dim.height + 10;
  const Theme = useTheme();

  return (
    <Carousel
      data={MerchandiseStore.getList}
      renderItem={({ item }) => {
        return <RenderItem item={item} height={height} />;
      }}
      itemWidth={width}
      itemHeight={height}
      sliderWidth={width}
      sliderHeight={height}
      autoplay={true}
      scrollEnabled={!meta.expand}
      loop={true}
      lockScrollWhileSnapping={true}
      enableMomentum={false}
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
            backgroundColor: Theme.colors.secondary,
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
  );
});

const RenderItem = observer((props: any) => {
  const { item, height } = props;
  const dim = Dimensions.get("window");

  return (
    <Image
      source={{
        uri: AppConfig.serverUrl + item.featured_img,
      }}
      style={{
        width: "100%",
        height: height,
      }}
      resizeMode={"cover"}
    />
  );
});
