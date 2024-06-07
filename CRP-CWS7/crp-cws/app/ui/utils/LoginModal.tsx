import useTheme from "libs/hooks/useTheme";
import { Button, Image, Modal, Text, View } from "libs/ui";
import { observer } from "mobx-react";
import { useWindowDimensions } from "react-native";
import React from "react";
import Fonts from "libs/assets/fonts";

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
            <View
                style={{
                    backgroundColor: "#fff",
                    flexShrink: 1,
                    width: "85%",
                    borderRadius: 8,
                    padding: 12
                }}>
                <Image
                    source={require("app/assets/images/res_login.png")}
                    style={{
                        height: 120,
                        width: 201,
                        marginVertical: 20,
                        marginHorizontal: 37
                    }}
                />
                <Text
                    style={{
                        fontFamily: Fonts.MontserratBold,
                        fontSize: 16,
                        color: "#333333"
                    }}>
                    Halo, Warga Jokopi
                </Text>
                <Text
                    style={{
                        fontFamily: Fonts.MontserratRegular,
                        fontSize: 14,
                        marginTop: 10,
                        color: "#808080"
                    }}>
                    Silahkan registrasi atau login, untuk melanjutkan
                </Text>

                <View style={{
                    flexDirection: "row",
                    marginTop: 16
                }}>
                    <Button
                        style={{
                            borderRadius: 100,
                            borderWidth: 1,
                            borderColor: "#AC9488",
                            flex: 1,
                            backgroundColor: "#fff"
                        }}
                        onPress={onPressNo}>
                        <Text
                            style={{
                                color: "#AC9488",
                                fontFamily: Fonts.MontserratBold,
                            }}>
                            Kembali
                        </Text>
                    </Button>
                    <Button
                        style={{
                            borderRadius: 100,
                            borderWidth: 1,
                            borderColor: "#AC9488",
                            flex: 1,
                            backgroundColor: "#AC9488",
                        }}
                        onPress={onPressYes}>
                        <Text
                            style={{
                                color: "#fff",
                                fontFamily: Fonts.MontserratBold,
                            }}>
                            Lanjut
                        </Text>
                    </Button>
                </View>
            </View>
        </Modal>
    );
});
