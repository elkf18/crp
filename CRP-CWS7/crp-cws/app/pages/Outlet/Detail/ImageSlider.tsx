import OutletStore from "app/model/outlet";
import AppConfig from "libs/config/app";
import { Button, Icon, Image, Modal, PagerView, View } from "libs/ui";
import { runInAction } from "mobx";
import { observer, useLocalObservable } from "mobx-react";
import React, { useRef, useState } from "react";
import { TouchableOpacity, useWindowDimensions } from "react-native";

export default observer((props: any) => {
  const { state } = props;
  const dim = useWindowDimensions();
  const refSwipe = useRef(null);
  const meta = useLocalObservable(() => ({
    active: 0,
  }));
  const dismiss = () => {
    runInAction(() => (state.visible = false));
  };

  return (
    <Modal visible={state.visible} onDismiss={dismiss} onRequestClose={dismiss}>
      <View
        style={{
          width: dim.width,
          justifyContent: "center",
        }}
      >
        <PagerView
          onPageSelected={(e) => {
            runInAction(() => (meta.active = e.nativeEvent.position));
          }}
          childRef={(ref: any) => {
            (refSwipe as any).current = ref;
          }}
          initialPage={0}
          style={{
            height: dim.height,
            width: dim.width,
          }}
        >
          {OutletStore.selectedOutlet.gallery.map((item: any, key: number) => (
            <RenderItem key={key} item={item} dismiss={dismiss} />
          ))}
        </PagerView>
        <Action
          refSwipe={refSwipe}
          meta={meta}
          items={OutletStore.selectedOutlet.gallery}
        />
      </View>
    </Modal>
  );
});

const RenderItem = observer((props: any) => {
  const dim = useWindowDimensions();
  const { item, dismiss } = props;
  const [size, setsize] = useState({ width: dim.width, height: 300 });
  const height = (size.height * (dim.width - 10)) / size.width;

  return (
    <View
      style={{
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: "#00000050",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        onPress={dismiss}
      />
      <View>
        <Image
          source={{
            uri: AppConfig.serverUrl + item.url,
          }}
          style={{
            width: dim.width - 10,
            height,
            borderRadius: 14,
            margin: 5,
          }}
          resizeMode="contain"
          onLoad={(props) => {
            setsize(props.nativeEvent);
          }}
        />
      </View>
    </View>
  );
});

const Action = observer((props: any) => {
  const { refSwipe, meta, items } = props;

  return (
    <View
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
      }}
    >
      <Button
        mode="clean"
        style={{
          paddingHorizontal: 0,
          paddingVertical: 0,
        }}
        onPress={() => {
          refSwipe?.current.setPage(meta.active - 1);
        }}
        disabled={meta.active === 0}
      >
        <Icon name="arrow-back-circle-outline" color="#fff" size={40} />
      </Button>
      <Button
        mode="clean"
        style={{
          paddingHorizontal: 0,
          paddingVertical: 0,
        }}
        onPress={() => {
          refSwipe?.current.setPage(meta.active + 1);
        }}
        disabled={items.length - 1 === meta.active}
      >
        <Icon name="arrow-forward-circle-outline" color="#fff" size={40} />
      </Button>
    </View>
  );
});
