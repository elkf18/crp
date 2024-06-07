import Fonts from "libs/assets/fonts";
import { Button, ScrollView, Text, View } from "libs/ui";
import { observer } from "mobx-react";
import React, { useEffect, useRef } from "react";
import useTheme from "libs/hooks/useTheme";
import { Animated } from "react-native";
import OutletStore from "app/model/outlet";
import color from "app/config/color";
import { fontFamily } from "app/config/const";

export default observer((props: any) => {
  const { refList, scrollState, filter } = props;
  const Theme = useTheme();
  const animate = useRef(new Animated.Value(0)).current;
  const position = animate.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -60],
  });
  try {
    useEffect(() => {
      if (scrollState.offset > 5) {
        Animated.spring(animate, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
      } else if (scrollState.offset <= 5) {
        Animated.spring(animate, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    }, [scrollState.offset]);
  } catch (e: any) {
  }
  return (
    <Animated.View
      style={{
        backgroundColor: "#fff",
        justifyContent: "space-between",
        flexDirection: "row",
        flexWrap: "wrap",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        transform: [
          {
            translateY: position,
          },
        ],
      }}
    >
      
      {OutletStore.filter.search.length === 0 &&
         (
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyboardAvoidingProps={{
              style: {
                flexGrow: 1,
                flexShrink: 0,
              },
            }}
          >
            <View
              style={{
                flexDirection: "row",
                
                flex: 1,
                // backgroundColor:"#f00"
              }}
            >
              {OutletStore.getOutlet.map((item: any, key: number) => (
                <RenderItem key={key} item={item} refList={refList} />
              ))}
            </View>
          </ScrollView>
        )}
    </Animated.View>
  );
});

const RenderItem = observer((props: any) => {
  const { item, refList } = props;
  const active = item.id === OutletStore.selectedCategory.id;
  return (
    <Button
      mode="clean"
      style={{
        margin: 0,
        borderRadius: 0,
        flexGrow: 1,
        minWidth: 120,
        alignItems: "center",
        borderBottomWidth: !!active ? 2 : 1,
        borderColor: !!active ? color.secondary_main : color.natural_50,
        paddingHorizontal: 15,
        paddingVertical: 15,
      }}
      onPress={() => {
        OutletStore.setCategory(item);
        if (!!refList.current && OutletStore.getCategoryIndex > -1) {
          refList.current.scrollToLocation({
            animated: true,
            sectionIndex: OutletStore.getCategoryIndex,
            itemIndex: 0,
          });

          OutletStore.isTabClick = true
        }
      }}
    >
      <Text
        style={{
          color: !!active ? color.secondary_main : color.natural_50,
          flexWrap: "nowrap",
          flexDirection: "column",
          alignItems: "center",
          fontFamily: !!active ? fontFamily.bold : fontFamily.reguler,
        }}
        numberOfLines={2}
        ellipsizeMode={"tail"}
      >
        {item.category}
      </Text>
    </Button>
  );
});
