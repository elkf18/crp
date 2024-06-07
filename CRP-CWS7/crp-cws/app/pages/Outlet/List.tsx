import { FlatList, View } from "libs/ui";
import { useNavigation } from "@react-navigation/native";
import OutletStore from "app/model/outlet";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import RenderItem from "./RenderItem";
import { RefreshControl } from "react-native";

export default observer(() => {
  const nav = useNavigation();

  const refresh = async () => {
    OutletStore.load();
  };

  const refreshControl = (
    <RefreshControl refreshing={OutletStore.loading} onRefresh={refresh} />
  );

  useEffect(() => {
    refresh();
  }, []);

  return (
    <FlatList
      refreshControl={refreshControl}
      data={OutletStore.getList}
      keyExtractor={(item) => String(item.id)}
      renderItem={(props) => <RenderItem {...props} />}
      ItemSeparatorComponent={() => (
        <View
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
          }}
        />
      )}
    />
  );
});
