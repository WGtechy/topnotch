const web = process.env.REACT_APP_WEB_ADDRESS;
const server = process.env.REACT_APP_API_KEY;
const paystackLiveKey = process.env.REACT_APP_PAYMENT_LIVE;
const paystackPublicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
const isDevelopment = window.location.hostname === "localhost" ? true : false;
const push = process.env.REACT_APP_PUSH_NOTIFICATION_PUBLIC_KEY;
const api = window?.location.host === "localhost:3000"
    ? "http://localhost:5000/api"
    : server;
const frontURL = window?.location.host === "localhost:3000" ? "localhost:3000" : web;
const generatePublicUrl = (fileName) => {
  return fileName;
};
 
let production = false;

const url = (link) => {
  return `${frontURL}/${link}`; 
};
const paystackKey =
  window?.location.host === "localhost:3000"
    ? paystackPublicKey
    : paystackLiveKey;
const pwa = window.matchMedia("(display-mode: standalone)").matches ||
  window.navigator.standalone ||
  document.referrer.includes("android-app://")
    ? true
    : false;
let activeHostName = window.location.hostname;


export {
  url,
  production,
  api,
  frontURL,
  generatePublicUrl,
  isDevelopment,
  activeHostName,
  paystackLiveKey,
  pwa,
  paystackKey,
};

