import { useNavigation } from "@react-navigation/native";
import NotificationStore from "app/model/notification";
import { FlatList, Text, View } from "libs/ui";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import RenderItem from "./RenderItem";
import RenderNotif from "./RenderNotif";

export default observer(() => {
  const nav = useNavigation();

  return (
    <>
    <FlatList
      data={NotificationStore.getList}
      keyExtractor={(_, index) => String(index)}
      renderItem={(props) => <RenderNotif {...props} />}
      
    />
    </>
  );
});
