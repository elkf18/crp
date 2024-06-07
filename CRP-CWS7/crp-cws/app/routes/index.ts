import { IRoute, TStackProps } from "libs/routes";

// Public Navigation
export const PublicInitialStack: TStackProps = {
  initialRouteName: "Home",
};

export const PublicRoutes: IRoute[] = [
  {
    name: "Home",
    component: require("app/pages/Home").default,
    roles: [],
  },
  {
    name: "guest/Login",
    component: require("app/pages/Login").default,
    roles: [],
  },
  {
    name: "guest/OTP",
    component: require("app/pages/OTP").default,
    roles: [],
  },
  {
    name: "guest/Register",
    component: require("app/pages/Register").default,
    roles: [],
  },
  {
    name: "guest/CreatePin",
    component: require("app/pages/Pin/Create").default,
    roles: [],
  },
  {
    name: "guest/Pin",
    component: require("app/pages/Pin").default,
    roles: [],
  },
  {
    name: "MediaWebView",
    component: require("app/pages/MediaWebView").default,
    roles: [],
  },
  {
    name: "FaqView",
    component: require("app/pages/Faq").default,
    roles: [],
  },
  {
    name: "LaporView",
    component: require("app/pages/Lapor").default,
    roles: [],
  },
  {
    name: "Menu",
    component: require("app/pages/Menu/index").default,
    roles: [],
  },

  {
    name: "Outlet",
    component: require("app/pages/Outlet").default,
    roles: [],
  },
  {
    name: "DetailOutlet",
    component: require("app/pages/Outlet/Detail").default,
    roles: [],
  },
  {
    name: "DetailNews",
    component: require("app/pages/DetailNews").default,
    roles: [],
  },
  {
    name: "Informasi",
    component: require("app/pages/Informasi/index").default,
    roles: [],
  },
];

// Private Navigation
export const PrivateInitialStack: TStackProps = {
  initialRouteName: "Home",
};

export const PrivateRoutes: IRoute[] = [
  {
    name: "Home",
    component: require("app/pages/Home").default,
    roles: [],
  },
  {
    name: "DetailHistory",
    component: require("app/pages/History/Detail").default,
    roles: [],
  },
  {
    name: "DetailHistory2",
    component: require("app/pages/DetailHistory2").default,
    roles: [],
  },
  {
    name: "Review",
    component: require("app/pages/History/Review").default,
    roles: [],
  },
  {
    name: "ReviewHistory",
    component: require("app/pages/History/ReviewHistory").default,
    roles: [],
  },
  {
    name: "DetailProduct",
    component: require("app/pages/DetailProduct").default,
    roles: [],
  },
  {
    name: "DetailVoucher",
    component: require("app/pages/DetailVoucher").default,
    roles: [],
  },
  {
    name: "Redeem",
    component: require("app/pages/DetailVoucher/Redeem").default,
    roles: [],
  },
  {
    name: "Outlet",
    component: require("app/pages/Outlet").default,
    roles: [],
  },
  {
    name: "DetailOutlet",
    component: require("app/pages/Outlet/Detail").default,
    roles: [],
  },
  {
    name: "Inbox",
    component: require("app/pages/Inbox").default,
    roles: [],
  },
  {
    name: "DetailInbox",
    component: require("app/pages/DetailInbox").default,
    roles: [],
  },
  {
    name: "News",
    component: require("app/pages/News").default,
    roles: [],
  },
  {
    name: "DetailNews",
    component: require("app/pages/DetailNews").default,
    roles: [],
  },
  {
    name: "Checkout",
    component: require("app/pages/Checkout").default,
    roles: [],
  },
  {
    name: "Profile",
    component: require("app/pages/Profile").default,
    roles: [],
  },
  {
    name: "Setting",
    component: require("app/pages/Setting").default,
    roles: [],
  },
  {
    name: "MediaWebView",
    component: require("app/pages/MediaWebView").default,
    roles: [],
  },
  {
    name: "FaqView",
    component: require("app/pages/Faq").default,
    roles: [],
  },
  {
    name: "LaporView",
    component: require("app/pages/Lapor").default,
    roles: [],
  },
  {
    name: "MembershipView",
    component: require("app/pages/Membership/index").default,
    roles: [],
  },
  {
    name: "MembershipView/History",
    component: require("app/pages/Membership/historymember").default,
    roles: [],
  },
  {
    name: "MembershipView/Catalog",
    component: require("app/pages/Membership/catalog").default,
    roles: [],
  },
  {
    name: "MembershipView/ListEmpty",
    component: require("app/pages/Membership/ListEmpty").default,
    roles: [],
  },
  {
    name: "QRCode",
    component: require("app/pages/QRCode").default,
    roles: [],
  },
  {
    name: "Menu",
    component: require("app/pages/Menu/index").default,
    roles: [],
  },
  {
    name: "Informasi",
    component: require("app/pages/Informasi/index").default,
    roles: [],
  },
  {
    name: "MembershipView/Coupon",
    component: require("app/pages/Coupons/index").default,
    roles: [],
  },
  {
    name: "MembershipView/Winner",
    component: require("app/pages/Coupons/Winner").default,
    roles: [],
  },
];
