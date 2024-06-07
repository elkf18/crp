import { useNavigation, useRoute } from "@react-navigation/native";
import { fontFamily } from "app/config/const";

import Fonts from "libs/assets/fonts";
import useTheme from "libs/hooks/useTheme";
import { Icon, Image, ImageBackground, Screen, Spinner, Text, TopBar, View, WebView } from "libs/ui";
import get from "lodash.get";
import { observer } from "mobx-react-lite";
import React, { Component } from "react";
import { Dimensions } from "react-native";
import Accordion from 'react-native-collapsible/Accordion';
import { Constants } from "react-native-unimodules";

const SECTIONS = [
    {
      title: 'Apa itu C Club?',
      content: 'C Club adalah loyalty program untuk customer Ciputra World Surabaya (CWS) dengan keanggotaan virtual dan sistem cardless (tanpa kartu fisik).',
    },
    {
      title: 'Bagaimana syarat menjadi anggota C Club?',
      content: '• Download aplikasi Ciputra World Surabaya via App Store atau Playstore. \n• Daftar keanggotaan virtual melalui sistem online di telepon genggam tanpa syarat minimum pembelanjaan.\n• Berusia minimal 17 tahun, sudah memiliki KTP/SIM. \n• Mengisi data melalui aplikasi secara lengkap dan up-to-date.',
    },
    {
      title: 'Bagaimana cara mendapatkan poin?',
      content: 'Setiap pembelanjaan senilai Rp 1,000 (seribu rupiah) akan mendapatkan 1 poin, Berlaku kelipatan dalam satu struk pembelanjaan.',
    },
    {
      title: 'Bagaimana dan kapan struk bisa ditukarkan dengan poin?',
      content: 'Struk belanja didaftarkan melalui mesin cashlez yang ada di masing-masing kasir tenant atau Customer Service. Penukaran dengan poin berlaku di hari yang sama dengan tanggal transaksi yang tertera di struk. Pengecualian untuk transaksi di atas pukul 21.00, penukaran poin bisa dilakukan maksimal hari berikutnya pukul 22.00.',
    },
    {
      title: 'Apa saja syarat dan ketentuan untuk penukaran poin?',
      content: '• Struk belanja yang berlaku adalah yang tercetak melalui mesin kasir atau cash register dengan nama toko di Ciputra World Surabaya.\n• Tidak berlaku untuk pembelanjaan di Hypermart, toko perhiasan, ATM dan money changer.\n• Tidak berlaku pembelian voucher, credit/top up, gacha coin, atau sejenisnya, dan pembayaran membership tenant.',
    },
    {
      title: 'Apakah keuntungan dari pengumpulan poin melalui aplikasi C Club?',
      content: '• Poin dapat ditukarkan dengan reward yang terdapat di aplikasi.\n• Poin dapat ditukarkan dengan hadiah langsung sesuai syarat dan ketentuan yang berlaku.\n• Setiap 100 poin terkumpul akan otomatis mendapatkan 1 lucky draw coupon (kupon undian Magnificent Shopprize).\n• Special privilege untuk program-program tertentu.\n• Penambahan poin beberapa kali lipat saat ada program-program tertentu.',
    },
    {
      title: 'Apakah poin yang sudah ditukarkan dengan hadiah dapat dikembalikan/dibatalkan?',
      content: 'Poin yang sudah ditukarkan tidak dapat dikembalikan atau dibatalkan.',
    },
  ];

  const styles ={
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingTop: Constants.statusBarHeight,
      },
    title: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '300',
        marginBottom: 10,     
    },
    header: {
      padding: 10,
      marginHorizontal: 12,
      borderRadius:10,
      flexDirection: 'row' as 'row',
      justifyContent: 'space-between' as 'space-between',
    },
    headerActiveColor: {
      backgroundColor: '#3F64BF',
    },
    headerNonActiveColor: {
      backgroundColor: "#15213F"
    },
    headerText: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '500',
    },
    content: {
      padding: 20,
      backgroundColor: '#FFFFFF',
    },
    active: {
      backgroundColor: 'rgba(255,255,255,1)',
    },
    inactive: {
      backgroundColor: 'rgba(245,252,255,1)',
    },
    selectors: {
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    selector: {
      backgroundColor: '#F5FCFF',
      padding: 10,
    },
    activeSelector: {
      fontWeight: 'bold',
    },
    selectTitle: {
      fontSize: 14,
      fontWeight: '500',
      padding: 10,
    },
    multipleToggle: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 10,
      alignItems: 'center',
    },
    multipleToggle__title: {
      fontSize: 16,
      marginRight: 8,
    },
  };

  export default class App extends Component {
        

    state = {
      activeSections: [],
    };
  
    _renderSectionTitle = (section:any) => {
      return (
        <View style={{ marginBottom: 10}}>
          {/* <Text>{section.content}</Text> */}
        </View>
      );
    };
  
    _renderHeader = (section: any, _: any, isActive: any) => {
      return ( 
        <View style={[
          styles.header,
          isActive ? styles.headerActiveColor: styles.headerNonActiveColor,
        ]}>
          <Text style={{
              paddingLeft: 12,
              fontSize: 14,
              color: "#FFFFFF",
              paddingTop: 2,
              flexGrow:1,
              flexShrink:1,
              fontFamily: fontFamily.medium}}>
              {section.title}
          </Text>
          <Icon 
            source="Ionicons"
            name={isActive ? "chevron-up-sharp": "chevron-down-sharp"}
            color="#FFFFFF"
            size={24}
          />
        </View>
      );
    };

    _showIndex = (index: number) => {
      console.log(index)
    }
  
    _renderContent = (section:any) => {
      return (
        <View style={styles.content}>
          <Text
            style={{
              fontFamily: fontFamily.medium,
              fontSize: 14,
            }}
          >{section.content}
          </Text>
        </View>
      );
    };
  
    _updateSections = (activeSections:any) => {
      this.setState({ activeSections });
    };
  
    render() {
        // const Theme = useTheme();
        // const nav = useNavigation();
        // const route = useRoute();
        // const { data, onGoBack }: any = route.params || {};
      return (
        <Screen
          style={{
            backgroundColor: "#FFFFFF"
          }}
        >
             <TopBar
                style={{
                backgroundColor: "#15213F",
                }}
                enableShadow={false}
                backButton={true}
                iconProps={{
                
                    color: "#FFFFFF",
                    name: "left",
                    source: "AntDesign",
                    size: 28,
                
                }}
                // actionBackButton={() => {
                // if (!!onGoBack) {
                //     onGoBack();
                // } else {
                //     nav.goBack();
                // }
                // }}
            >
                <Text
                    style={{
                        color: "#FFFFFF",
                        fontSize: 20,
                        fontFamily: Fonts.MontserratBold,
                        flexGrow: 1,
                    }}
                    >
                    FAQ
                    </Text>
             </TopBar>
            <Accordion
            sections={SECTIONS}
            activeSections={this.state.activeSections}
            renderSectionTitle={this._renderSectionTitle}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            onChange={this._updateSections}
            underlayColor={"#fff"}
            />
        </Screen>
        
      );
    }
  }
