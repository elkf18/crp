import OutletStore from "app/model/outlet";
import useTheme from "libs/hooks/useTheme";
import { Text, View } from "libs/ui";
import { observer } from "mobx-react";
import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";

export default observer(({ scrollState, filter }: any) => {
  const Theme = useTheme();
  const animate = useRef(new Animated.Value(0)).current;
  const position = animate.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -80],
  });

  useEffect(() => {
    if (!!scrollState.direction) {
      if (scrollState.direction === "down") {
        Animated.spring(animate, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.spring(animate, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    } else {
      Animated.spring(animate, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [scrollState.direction]);

  return (
    <Animated.View
      style={{
        backgroundColor: "#fff",
        justifyContent: "space-between",
        flexDirection: "row",
        flexWrap: "wrap",
        transform: [
          {
            translateY: position,
          },
        ],
      }}
    >
      {filter.search.length === 0 && (
        <View
          style={{
            paddingHorizontal: 20,
            alignItems: "flex-start",
          }}
        >
          <View
            style={{
              backgroundColor: "#D6B097",
              paddingHorizontal: 5,
              borderRadius: 99,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontFamily: Theme.fontStyle.bold,
                color: "#fff",
              }}
            >
              {OutletStore.currentOutlet.status}
            </Text>
          </View>
          {
            ({
              BUKA: (
                <Text>
                  Hari ini {OutletStore.currentOutlet.status.toLowerCase()}{" "}
                  sampai pukul {OutletStore.currentOutlet.close} WIB
                </Text>
              ),
              "SEGERA BUKA": (
                <Text>
                  {" "}
                  Outlet akan buka pukul {OutletStore.currentOutlet.open} WIB
                </Text>
              ),
              TUTUP: <Text> Outlet sudah tutup.</Text>,
            } as any)[OutletStore.currentOutlet.status]
          }
        </View>
      )}
    </Animated.View>
  );
});
