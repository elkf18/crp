import { Alert, Platform } from "react-native";
import * as mime from "mime-types";

export const confirmData = async () =>
  await new Promise((resolve) => {
    Alert.alert(
      "Data belum tersimpan.",
      "Apakah anda ingin menyimpan data ini di penyimpanan lokal?",
      [
        {
          text: "Tidak",
          onPress: () => {
            resolve(false);
          },
        },
        {
          text: "Batal",
          onPress: () => {
            resolve(null);
          },
        },
        {
          text: "Simpan",
          onPress: () => {
            resolve(true);
          },
        },
      ]
    );
  });

export const confirmLoadData = async () =>
  await new Promise((resolve) => {
    Alert.alert(
      "Data sebelumnya terdeteksi.",
      "Apakah anda ingin memuat data sebelumnya yang belum disimpan?",
      [
        {
          text: "Tidak",
          onPress: () => {
            resolve(false);
          },
        },
        {
          text: "Iya",
          onPress: () => {
            resolve(true);
          },
        },
      ]
    );
  });

export const confirmRequestOTP = async (phone: string) =>
  await new Promise((resolve) => {
    Alert.alert(
      "Pastikan nomor kamu aktif.",
      `Kami akan mengirim kode OTP ke nomor ${phone}.`,
      [
        {
          text: "KEMBALI",
          onPress: () => {
            resolve(false);
          },
        },
        {
          text: "OK",
          onPress: () => {
            resolve(true);
          },
        },
      ]
    );
  });

export const generateFileObj = async (path: string) => {
  if (!path || path.indexOf("file://") === -1) {
    return null;
  }
  const uri = path;
  const uripath = uri.split("/");
  const fileName = uripath[uripath.length - 1];
  const file: any = {
    name: fileName,
    type: mime.lookup(fileName),
    uri: Platform.OS === "android" ? uri : uri.replace("file://", ""),
  };

  return file;
};

export const generateFormData = (data: any) => {
  const fdata = new FormData();

  for (const key in data) {
    let v = data[key];
    if (Array.isArray(v)) {
      v = JSON.stringify(v);
    }
    fdata.append(key, v);
  }
  return fdata;
};
