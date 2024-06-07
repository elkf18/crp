import { Screen } from "libs/ui";
import { useNavigation } from "@react-navigation/native";
import SessionStore from "app/model/session";
import Confirm from "./Confirm";
import { runInAction } from "mobx";
import { observer, useLocalObservable } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import Create from "./Create";
import color from "app/config/color";

export default observer(() => {
  const dim = Dimensions.get("window");
  const nav = useNavigation();
  const meta = useLocalObservable(() => ({
    mode: "create",
  }));

  const onBack = () => {
    if (meta.mode === "create") {
      nav.goBack();
    } else {
      runInAction(() => (meta.mode = "create"));
    }
  };

  useEffect(() => {
    runInAction(() => {
      SessionStore.form.password = "";
      SessionStore.form.confirmPassword = "";
    });
  }, []);

  return (
    <Screen
      style={{
        backgroundColor: color.primary_main,
      }}
      statusBar={{
        backgroundColor: "#00000000",
        barStyle:"light-content"
      }}
    >
      {
        ({
          create: <Create meta={meta} onBack={onBack} />,
          confirm: <Confirm meta={meta} onBack={onBack} />,
        } as any)[meta.mode]
      }
    </Screen>
  );
});
