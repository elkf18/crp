import React, { Component } from "react";
import { Button, PermissionsAndroid, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";

export const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: "Akses Lokasi belum diizinkan",
        message:
          "Silahkan izinkan lokasi untuk mengetahui outlet terdekat.",
        buttonNeutral: "Lain kali",
        buttonNegative: "Tidak",
        buttonPositive: "Ya"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      //console.log("You can use the location");
    } else {
      //console.log("Location permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.item}>Try permissions</Text>
        <Button title="request permissions" onPress={requestLocationPermission} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#ecf0f1",
    padding: 8
  },
  item: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  }
});

// App;