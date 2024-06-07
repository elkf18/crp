import Fonts from "libs/assets/fonts";
import { Button, DateTime, Icon, TextInput, Text, TopBar, View } from "libs/ui";
import { useNavigation, useRoute } from "@react-navigation/native";
import { action } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import useTheme from "libs/hooks/useTheme";

export default observer((props: any) => {
  const handleSrcBtn = action(() => {
    props.filter.showSearch = !props.filter.showSearch;
  });
  const nav = useNavigation();
  const route = useRoute();

  return (
    <TopBar
      enableShadow={false}
      style={{
        backgroundColor: "#fff",
      }}
      backButton
      customProps={{
        iconBackButton: {
          color: "#3a3a3a",
          name: "left",
          source: "AntDesign",
          size: 28,
        },
      }}
      rightAction={<Action {...props} handleSrcBtn={handleSrcBtn} />}
    >
      <DetailHead {...props} handleSrcBtn={handleSrcBtn} />
    </TopBar>
  );
});

const DetailHead = observer(({ filter, handleSrcBtn, label }: any) => {
  const Theme = useTheme();
  if (!!filter.showSearch)
    return (
      <View
        style={{
          paddingLeft: 10,
          flexDirection: "row",
          alignItems: "center",
          flexGrow: 1,
          justifyContent: "flex-start",
          minHeight: 45,
          height: 45,
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
          color={"#818181"}
        ></Icon>
        <TextInput
          placeholder={"Search"}
          autoFocus={true}
          type={"text"}
          style={{
            flexGrow: 1,
          }}
          value={filter.search}
          onChangeText={action((value: string) => {
            filter.search = value;
          })}
          onBlur={() => handleSrcBtn()}
        ></TextInput>

        <Button
          mode={"clean"}
          style={{
            margin: 0,
            paddingLeft: 0,
            paddingRight: 0,
            minWidth: 45,
            backgroundColor: "transparent",
          }}
          onPress={() => handleSrcBtn()}
        >
          <Icon name={"ios-close-circle"} size={24} color={"#333333"} />
        </Button>
      </View>
    );
  return (
    <Text
      style={{
        color: Theme.colors.primary,
        fontSize: 20,
        fontFamily: Fonts.MontserratBold,
        flexGrow: 1,
      }}
    >
      {label || ""}
    </Text>
  );
});

const Action = observer(
  ({ filter, disableSearch, disableDate, handleSrcBtn }: any) => {
    const Theme = useTheme();
    if (!filter.showSearch)
      return (
        <View
          style={{
            flexDirection: "row",
          }}
        >
          {!disableSearch && (
            <Button
              mode={"clean"}
              style={{
                margin: 0,
                paddingHorizontal: 0,
                minWidth: 45,
              }}
              onPress={() => handleSrcBtn()}
            >
              <Icon
                name={"ios-search"}
                size={24}
                color={Theme.colors.primary}
              />
            </Button>
          )}
          {!disableDate && (
            <DateTime
              type="date"
              visibility="icon-only"
              onChange={action((value: string) => {
                filter.date = value;
              })}
              iconProps={{
                color: Theme.colors.primary,
              }}
              style={{
                margin: 0,
                minWidth: 45,
              }}
            />
          )}
        </View>
      );
    return null;
  }
);
