import assets from "app/assets/images/icon/assets";
import { IRoute, TStackProps } from "libs/routes";

// Navigation Tab
export const TabInitialStack: TStackProps = {
  initialRouteName: "Dashboard",
  headerMode: "none",
};

export const TabRoutes: IRoute[] = [
  {
    title: "Beranda",
    name: "Dashboard",
    svgIcon: assets.home,
    component: require("app/pages/Dashboard").default,
    roles: [],
  },
  {
    title: "Tenants",
    name: "Tenant",
    svgIcon: assets.outlet,
    component: require("app/pages/Menu").default,
    roles: [],
  },
  {
    title: "Scan",
    name: "QRCode",
    imageIcon: {
      active: require("app/assets/images/icon/m-qr.png"),
      inActive: require("app/assets/images/icon/m-qr.png"),
    },
    roles: [],
  },
  {
    title: "Pembelian",
    name: "History",
    svgIcon: assets.order,
    component: require("app/pages/History").default,
    roles: [],
  },
  {
    title: "Profil",
    name: "Account",
    svgIcon: assets.profile,
    component: require("app/pages/Account").default,
    // component: require("app/pages/Profile").default,
    roles: [],
  },
];
// Navigation Tab
export const GuestInitialStack: TStackProps = {
  initialRouteName: "Dashboard",
  headerMode: "none",
};

export const GuestRoutes: IRoute[] = [
  {
    title: "Beranda",
    name: "Dashboard",
    svgIcon: assets.home,
    component: require("app/pages/Dashboard").default,
    roles: [],
  },
  {
    title: "Login",
    name: "Login",
    imageIcon: {
      active: require("app/assets/images/icon/m-login.png"),
      inActive: require("app/assets/images/icon/m-login.png"),
    },
    component: require("app/pages/Login").default,
    roles: [],
  },
  {
    title: "Tenants",
    name: "Tenant",
    svgIcon: assets.outlet,
    component: require("app/pages/Menu").default,
    roles: [],
  },
];

