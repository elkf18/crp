import OutletStore from "app/model/outlet";
import { MapView, Marker, View } from "libs/ui";
import { observer } from "mobx-react";
import React from "react";
import { useWindowDimensions } from "react-native";

export default observer(() => {
  const dim = useWindowDimensions();

  return (
    <View
      style={{
        width: "100%",
        height: (1 / 4) * dim.width,
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 10,
      }}
    >
      <MapView
        style={{
          flex: 1,
        }}
        maxZoomLevel={12}
        region={OutletStore.selectedOutlet.location}
        pitchEnabled={false}
        scrollEnabled={false}
        zoomEnabled={false}
        zoomTapEnabled={false}
      >
        <Marker
          coordinate={OutletStore.selectedOutlet.location}
          title={OutletStore.selectedOutlet.nama}
          description={OutletStore.selectedOutlet.alamat}
        />
      </MapView>
    </View>
  );
});
