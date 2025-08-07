
// const blogTestData = [
//   {
//     image: "benz1.jpg",
//     title: "Car name",
//     description:
//       "but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset ",
//   },
//   {
//     image: "benz1.jpg",
//     title: "Property name",
//     description:
//       "but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset ",
//   },
//   {
//     image: "benz1.jpg",
//     title: "Property name",
//     description:
//       "but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset ",
//   },

import { IoLogoFacebook, IoLogoInstagram, IoLogoTiktok, IoLogoTwitter, IoMail } from "react-icons/io5";
import { PiPhone } from "react-icons/pi";

// ];
const social = contact=> [
  {
    link: `https://facebook.com/${contact?.facebook}`,
    icon: IoLogoFacebook,
    className: "facebook",
    display: contact?.facebook ? true : false,
    name: "Facebook",
  },
  {
    link: `https://instagram.com/${contact?.instagram}`,
    icon: IoLogoInstagram,
    className: "instagram",
    display: contact?.instagram ? true : false,
    name: "Instagram",
  },
  {
    link: `https://twitter.com/${contact?.twitter}`,
    icon: IoLogoTwitter,
    className: "linkedin",
    display: contact?.twitter ? true : false,
    name: "Linkedin",
  },
  {
    link: `https://tiktok.com/${contact?.tiktok}`,
    icon: IoLogoTiktok,
    className: "",
    display: contact?.tiktok ? true : false,
    name: "Tiktok",
  },
  {
    link: `tel:+${contact?.tel1}`,
    icon: PiPhone,
    className: "phone",
    display: contact?.tel1 ? true : false,
    name: "Tel 1",
  },
 
  {
    link: `mailto:${contact?.email}`,
    icon: IoMail,
    className: "email",
    display: contact?.email ? true : false,
    name: "Email",
  },
];

const selectCountryOptions = ({ data, country, city, target }) => {
  let result = [""];
  for (let item of data) {
    result = [...result, item.country];
  }
  return result;
};

const selectCityOptions = ({ data, country, city }) => {
  let cities = data.find((x) => x.country === country);
  let result = cities.find((x) => x.name === city);
  return result;
};

const selectNeighborhoodOptions = ({ data, country, city }) => {
  let result = [];
  let cities = data.find((x) => x.country === country);
  result = cities.find((x) => x.name === city);
  return result;
};

const shareContent = ({ url, title, description }) => {
  // let linkTo = link;
  if (window.navigator.share) {
    navigator
      .share({
        url,
        title,
        text: description,
      })
      .then(() => {
        return;
      })
      .catch((error) => null);
  } else {
    // alert("Please don't forget to share");
    return null;
  }
};



export {
  social,
  shareContent,
  selectCountryOptions,
  selectCityOptions,
  selectNeighborhoodOptions,
};
