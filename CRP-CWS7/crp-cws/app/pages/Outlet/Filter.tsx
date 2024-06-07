import { Button, Field, Icon, TextInput, Text, View } from "libs/ui";
import { useNavigation } from "@react-navigation/native";
import OutletStore from "app/model/outlet";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";

export default observer((props: any) => {
  const nav = useNavigation();

  const goToDetail = () => nav.navigate("DetailOutlet");

  return (
    <View
      style={{
        padding: 15,
      }}
    >
      <Field
        hiddenLabel
        path=""
        label="Search"
        value={OutletStore.filter.search}
        onChange={(value) => {
          runInAction(() => (OutletStore.filter.search = value));
        }}
        Suffix={
          OutletStore.filter.search.length === 0 ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 10,
              }}
            >
              <Icon name="ios-search" color="#333" />
            </View>
          ) : (
            <Button
              mode="clean"
              style={{
                margin: 0,
                paddingVertical: 0,
                paddingHorizontal: 10,
              }}
            >
              <Icon name="ios-close-circle-outline" color="#333" />
            </Button>
          )
        }
        style={{
          marginBottom: 0,
        }}
      >
        <TextInput
          type="text"
          placeholder="Cari lokasi"
          style={{
            paddingHorizontal: 20,
          }}
        />
      </Field>
    </View>
  );
});
