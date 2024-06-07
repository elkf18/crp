import { useNavigation } from "@react-navigation/native";
import color from "app/config/color";
import { fontFamily, fontSize } from "app/config/const";
import OutletStore from "app/model/outlet";
import Fonts from "libs/assets/fonts";
import useTheme from "libs/hooks/useTheme";
import { Button, Icon, Text, TextInput, TopBar, View } from "libs/ui";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { ToastAndroid } from "react-native";

export default observer((props: any) => {
  const nav = useNavigation();
  const handleSrcBtn = () => {
    runInAction(() => (props.filter.showSearch = !props.filter.showSearch));
  };
  const handleClrSrcBtn = () => {
    runInAction(() => (props.filter.showSearch = !props.filter.showSearch));
    runInAction(() => (props.filter.search = ""));
  };

  return (
    <TopBar
      style={{
        backgroundColor: color.primary_main,
        zIndex: 9,
      }}
      enableShadow={false}
      rightAction={
        <RightAction
          {...props}
          handleSrcBtn={handleSrcBtn}
          handleClrSrcBtn={handleClrSrcBtn}
        />
      }
      leftAction={
        <LeftAction
          {...props}
          handleSrcBtn={handleSrcBtn}
          handleClrSrcBtn={handleClrSrcBtn}
        />
      }
    >
      <DetailHead {...props} handleSrcBtn={handleSrcBtn} />
    </TopBar>
  );
});

const DetailHead = observer(({ filter, handleSrcBtn }: any) => {
  const nav = useNavigation();
  const Theme = useTheme();
  if (!!filter.showSearch || filter.search.length > 0)
    return (
      <View
        style={{
          paddingLeft: 10,
          flexDirection: "row",
          alignItems: "center",
          flexGrow: 1,
          justifyContent: "flex-start",
          borderWidth: 1,
          borderColor: color.natural_100,
          borderRadius: 99,
          flexShrink: 1,
          height: 35,
        }}
      >
        <Icon
          source={"AntDesign"}
          name={"search1"}
          size={20}
          style={{
            margin: 0,
            marginRight: 8,
          }}
          color={color.natural_100}
        ></Icon>
        <TextInput
          placeholder={"Search"}
          autoFocus={true}
          type={"text"}
          placeholderTextColor={color.natural_50}
          style={{
            flexGrow: 1,
            paddingVertical: 5,
            color:color.natural_100
          }}
          value={filter.search}
          onChangeValue={(value) => {
            runInAction(() => {
              filter.search = value;
              OutletStore.filter.search=value;
            });
          }}
          onBlur={handleSrcBtn}
        ></TextInput>
      </View>
    );
  return (
    <Button
      mode="clean"
      style={{
        paddingHorizontal: 0,
        paddingVertical: 5,
        flexGrow: 1,
        justifyContent: "flex-start",
      }}
    >
      <Text
        style={{
          color: color.natural_100,
          fontFamily: fontFamily.bold,
          fontSize: fontSize.xl,
        }}
      >
        Tenants
      </Text>
    </Button>
  );
});

const RightAction = observer(
  ({ filter, handleSrcBtn, handleClrSrcBtn }: any) => {
    const Theme = useTheme();
    if (!filter.showSearch)
      return (
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Button
            mode={"clean"}
            style={{
              margin: 0,
              paddingHorizontal: 0,
              minWidth: 45,
            }}
            onPress={handleSrcBtn}
          >
            <Icon name={"ios-search"} size={24} color={color.natural_100} />
          </Button>
        </View>
      );
    return (
      <Button
        mode={"clean"}
        style={{
          margin: 0,
          paddingLeft: 0,
          paddingRight: 0,
          minWidth: 45,
          backgroundColor: "transparent",
        }}
        onPress={handleClrSrcBtn}
      >
        <Icon name={"ios-close-circle-outline"} size={24} color={color.natural_100} />
      </Button>
    );
  }
);

const LeftAction = observer(() => {
  const nav = useNavigation();
  return (
    <Button
      mode="clean"
      style={{
        margin: 0,
        paddingLeft: 0,
        paddingRight: 0,
        minWidth: 45,
      }}
      onPress={async () => {
        if (OutletStore.filter.search!="") {
          OutletStore.filter.search=""
        } else {
          nav.goBack();
        }
      }}
    >
      <Icon name={"chevron-back"} size={24} color={color.natural_100} />
    </Button>
  );
});
