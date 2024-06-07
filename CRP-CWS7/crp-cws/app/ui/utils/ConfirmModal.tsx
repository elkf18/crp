import useTheme from "libs/hooks/useTheme";
import { Button, Image, Modal, Text, View } from "libs/ui";
import { observer } from "mobx-react";
import { useWindowDimensions } from "react-native";
import React from "react";

interface IConfirmModal {
  visible: boolean;
  title: string;
  subtitle?: string;
  onPressYes: () => void;
  onPressNo: () => void;
  onPressCancel?: () => void;
}

export default observer((props: IConfirmModal) => {
  const { visible, onPressYes, onPressNo, title, subtitle } = props;
  const Theme = useTheme();
  const dim = useWindowDimensions();

  return (
    <Modal visible={visible}>
      <View>
        <Image
          source={require("app/assets/images/hand.png")}
          style={{
            width: dim.width,
            height: dim.width / 2,
            zIndex: 1,
            position: "absolute",
            bottom: 0,
          }}
        />
        <View
          shadow
          style={{
            backgroundColor: "#fff",
            borderRadius: 8,
            padding: 15,
            marginHorizontal: 10,
            marginTop: -15,
            zIndex: 2,
          }}
        >
          <Text
            style={{
              fontFamily: Theme.fontStyle.bold,
              fontSize: 16,
              lineHeight: 20,
              marginBottom: 10,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: "#666",
            }}
          >
            {subtitle}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Button
              mode="clean"
              style={{
                width: 100,
                margin: 0,
              }}
              onPress={onPressNo}
            >
              <Text
                style={{
                  fontFamily: Theme.fontStyle.bold,
                  fontSize: 16,
                  lineHeight: 20,
                }}
              >
                Tidak
              </Text>
            </Button>
            <Button
              style={{
                width: 100,
                margin: 0,
              }}
              onPress={onPressYes}
            >
              <Text
                style={{
                  fontFamily: Theme.fontStyle.bold,
                  fontSize: 16,
                  lineHeight: 20,
                  color: "#fff",
                }}
              >
                YA
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
});
