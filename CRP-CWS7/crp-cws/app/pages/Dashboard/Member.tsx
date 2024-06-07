import { useNavigation } from "@react-navigation/native";
import color from "app/config/color";
import { fontFamily, fontSize } from "app/config/const";
import HistoryStore from "app/model/history";
import MembershipStore from "app/model/membership";
import SessionStore from "app/model/session";
import Fonts from "libs/assets/fonts";
import AppConfig from "libs/config/app";
import useTheme from "libs/hooks/useTheme";
import { Button, Icon, Image, ImageBackground, Text, View } from "libs/ui";
import { moneyFormat } from "libs/utils/string-format";
import { observer } from "mobx-react";
import React from "react";
import { Dimensions } from "react-native";
import { SvgCss } from "react-native-svg";

import pic from "../../assets/images/default-pic.svg";

export default observer((props: any) => {
  const dim = Dimensions.get("window");
  let user = SessionStore.user;
  const Theme = useTheme();
  const nav = useNavigation();
  let Image_User = { uri: AppConfig.serverUrl + SessionStore.user.foto };


  const { profile } = props;

  return (
    <Button

      style={{
        marginHorizontal: 15,
        backgroundColor: color.secondary_main,
        borderRadius: 8,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        padding: 0,
        paddingVertical: 0,


      }}
      onPress={() => {
        nav.navigate("MembershipView")
      }}
    >
      <Image
        source={require("app/assets/images/bg-member.png")}
        style={{
          width: dim.width - 30,
          height: 108,

          borderRadius: 8,
          position: "absolute",
          top: 0,
          left: 0
        }}
        resizeMode="cover"
      />
      <View
        style={{
          flexDirection: "row",
          borderRadius: 99,
        }}>
        {!!SessionStore.user.foto ?
          <Image
            source={Image_User}
            style={{
              width: 90,
              height: 90,
              borderRadius: 4,
              margin: 8,
              borderColor: color.natural_100,
              borderWidth: 1

            }}
            resizeMode={"cover"}
          />
          :
          <View
            style={{
              margin: 8,
              borderRadius: 4,
              borderColor: color.natural_100,
              borderWidth: 1
            }}>
            <SvgCss
              xml={pic.toString()}
              width={90}
              height={90}
              style={{
              }}
            />
          </View>

        }


        <View
          style={{
            paddingVertical: 10,
            alignContent: "flex-start",
            alignSelf: "flex-start",
            alignItems: "flex-start",

            flexGrow: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: fontSize.l,
                fontFamily: fontFamily.bold,
                color: color.natural_100,
              }}
            >
              {user.name || ""}
            </Text>
          </View>
          <Text
            style={{
              fontSize: fontSize.s,
              fontFamily: fontFamily.reguler,
              color: color.natural_100,
            }}
          >
            {user.phone1 || ""}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexGrow: 1,
              width: "100%"
            }}
          >

            <View style={{
              flexGrow: 1
            }}>


              <View style={{
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                alignSelf: "center",
                marginTop: 8,
                flexGrow: 1
              }}>
                <View style={{
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  flexGrow: 1,
                }}>
                  <Icon name="star-circle-outline" source="MaterialCommunityIcons" size={16} color={color.primary_surface} />
                  <Text
                    style={{
                      fontFamily: fontFamily.bold,
                      fontSize: fontSize.l,
                      marginStart: 4,
                      color: color.natural_100,
                    }}
                  >
                    {moneyFormat(MembershipStore.credits)}

                  </Text>
                </View>

                {SessionStore.features.lucky_draw &&
                  <View style={{
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                    flexGrow: 1,
                  }}>
                    <Icon name="ticket-confirmation-outline" source="MaterialCommunityIcons" size={16} color={color.primary_surface} />
                    <Text
                      style={{
                        fontFamily: fontFamily.bold,
                        fontSize: fontSize.l,
                        marginStart: 4,
                        color: color.natural_100,
                      }}
                    >
                      {moneyFormat(MembershipStore.count)}
                    </Text>
                  </View>
                }
              </View>


            </View>
          </View>
        </View>



        {profile &&
          <Button
            shadow
            style={{
              backgroundColor: "#F1EFF0",
              flexGrow: 0,
              borderRadius: 99,
              position: "absolute",
              bottom: 10,
              right: 5,

              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
            onPress={() => nav.navigate("Profile")}
          >
            <Text
              style={{
                fontFamily: Theme.fontStyle.bold,
                color: "#888",
                fontSize: 12,
              }}
            >
              Ubah Profil
            </Text>
          </Button>
        }
      </View>


    </Button>
  );
});
