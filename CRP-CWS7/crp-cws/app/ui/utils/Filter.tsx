import React, { useEffect } from "react";
import { observer, useLocalObservable } from "mobx-react-lite";
import { View, Text, Button, Icon } from "libs/ui";
import { dateFormat } from "libs/utils/date";
import { action } from "mobx";

export default observer(({ state }: any) => {
  const meta = useLocalObservable(() => ({
    filter: [],
  }));
  const handleClrDate = action(() => {
    state.date = "";
  });

  const handleClrSearch = action(() => {
    state.search = "";
  });
  useEffect(() => {
    const filter: any = [];
    if (!!state.date)
      filter.push({
        label: dateFormat(state.date, "d MMM yyyy"),
        action: handleClrDate,
      });
    if (!!state.search)
      filter.push({
        label: state.search,
        action: handleClrSearch,
      });
    action(() => (meta.filter = filter));
  }, [state.date, state.search]);
  return (
    <>
      {meta.filter.length > 0 && (
        <View
          style={{
            flexDirection: "row",
            padding: 15,
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          {meta.filter.map((item: any, key) => (
            <View
              key={key}
              style={{
                borderRadius: 99,
                flexDirection: "row",
                backgroundColor: "#fff",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: 10,
                borderColor: "#d2d2d2",
                borderStyle: "solid",
                borderWidth: 1,
                overflow: "hidden",
                marginRight: 5,
              }}
            >
              <Text>{item.label}</Text>
              <Button
                style={{
                  paddingLeft: 0,
                  paddingRight: 0,
                  margin: 0,
                  backgroundColor: "transparent",
                  minHeight: 30,
                  minWidth: 30,
                }}
                onPress={item.action}
              >
                <Icon name={"ios-close-circle-outline"} style={{ margin: 0 }} />
              </Button>
            </View>
          ))}
        </View>
      )}
    </>
  );
});
