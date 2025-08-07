import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LocationTemplate from "../../bucket/formComponent/LocationTemplate";
import TextAreaComponent from "../../bucket/formComponent/TextAreaComponent";
import { updateApp } from "../../redux/actions";
import MediaForm from "../../bucket/MediaFrom";
import TheMediaModal from "../../bucket/TheMediaModal";
import ArrayAndAdd from "../../bucket/formComponent/ArrayAndAdd";
import Dialog from "../../bucket/dialog/Dialog";
import AppBar from "../../bucket/dialog/AppBar";
import Toolbar from "../../bucket/dialog/Toolbar";
import { IoChevronDown, IoChevronUp, IoClose } from "react-icons/io5";
import SelectComponent from "../../bucket/formComponent/SelectComponent";
import ObjectsInArray from "../../bucket/formComponent/ObjectsInArray";
import AddObjectToArray from "../../bucket/formComponent/AddObjectToArray";

const AppProfile = ({ accountId, open, handleClose }) => {
  const dispatch = useDispatch();
  const { data: app, loading } = useSelector((state) => state.app);

  const [aboutUsHeaderBannerImage, setAboutUsHeaderBannerImage] =
    useState(null);
  const [openAboutBanner, setOpenAboutBanner] = useState(false);
  const [termsAndConditions, setTermsAndConditions] = useState("");
  const [privacyPolicy, setPrivacyPolicy] = useState("");
  const [refundPolicy, setRefundPolicy] = useState("");
  const [automobileRentPolicies, setAutomobileRentPolicies] = useState([]);
  const [cancellationPolicy, setCancellationPolicy] = useState("");
  const [bookingPolicies, setBookingPolicies] = useState([]);

  const [autoCategoryNew, setAutoCategoryNew] = useState("");
  const [buildingCategoryNew, setBuildingCategorNew] = useState("");
  const [autoCategoriesInitial, setAutoCategoriesInitial] = useState([]);
  const [buildingCategoriesInitial, setBuildingCategoriesInitial] = useState(
    []
  );

  const [locations, setLocations] = useState([]);

  const [openAutoInput, setOpenAutoInput] = useState(false);
  const [openPropertyInput, setOpenPropertyInput] = useState(false);
  const [naira, setNaira] = useState(0);

  const [USD, setUSD] = useState(0);
  const [pounds, setPounds] = useState(0);
  const [taxable, setTaxable] = useState("No");
  const [taxRate, setTaxRate] = useState(0);

  const [howAreWeEarning, setHowAreWeEarning] = useState(
    "Pre-determined percentage on all products."
  );
  const [earningPercentage, setEarningPercentage] = useState(0);

  const [topAboutTitle, setTopAboutTitle] = useState("");
  const [topAboutDescription, setTopAboutDescription] = useState("");
  const [vision, setVision] = useState("");
  const [mission, setMission] = useState("");
  const [objectives, setObjectives] = useState("");
  const [objectivesInitial, setObjectivesInitial] = useState([]);
  const [openWhoWeAreImage, setOpenWhoWeAreImage] = useState(false);
  const [whoWeAreImage, setWhoWeAreImage] = useState(null);
  const [whoWeAreTitle, setWhoWeAreTitle] = useState("");
  const [whoWeAreDescription, setWhoWeAreDescription] = useState("");
  const [whyUs, setWhyUs] = useState({});
  const [whyUsInitial, setWhyUsInitial] = useState([]);
  const [openWhyUs, setOpenWhyUs] = useState(false);
  const [coreValues, setCoreValues] = useState(null);
  const [coreValuesInitial, setCoreValuesInitial] = useState({});
  const [openCoreValues, setOpenCoreValues] = useState(false);

  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [tel1, setTel1] = useState("");
  const [tel2, setTel2] = useState("");
  const [tel3, setTel3] = useState("");
  const [email, setEmail] = useState("");

  const [address, setAddress] = useState("");
  const [faqHotel, setFAQHotel] = useState(null);
  const [faqHotelInitial, setFAQHotelInitial] = useState([]);
  const [faqShortlet, setFAQShortlet] = useState(null);
  const [faqShortletInitial, setFAQShortletInitial] = useState([]);
  const [faqProperty, setFAQProperty] = useState(null);
  const [faqPropertyInitial, setFAQPropertyInitial] = useState([]);
  const [faqProduct, setFAQProduct] = useState(null);
  const [faqProductInitial, setFAQProductInitial] = useState([]);
  const [faqInterior, setFAQInterior] = useState(null);
  const [faqInteriorInitial, setFAQInteriorInitial] = useState([]);
  const [faqAutomobile, setFAQAutomobile] = useState(null);
  const [faqAutomobileInitial, setFAQAutomobileInitial] = useState([]);

  const handleHowWeAreEarning = (e) => setHowAreWeEarning(e.target.value);
  const [allowPosting, setAllowPosting] = useState("");
  const [propertyFeatures, setPropertyFeatures] = useState([]);
  const handleAllowPosting = (e) => setAllowPosting(e.target.value);
  const handleTaxable = (e) => setTaxable(e.target.value);

  const [allowHotels, setAllowHotels] = useState("");
  const [allowShortlets, setAllowShortlets] = useState("");
  const [allowProperties, setAllowProperties] = useState("");
  const [allowInteriors, setAllowInteriors] = useState("");
  const [allowProducts, setAllowProducts] = useState("");
  const [allowAutomobiles, setAllowAutomobiles] = useState("");
  const [hidden, setHidden] = useState([]);

  const handleHidden = useCallback(
    (item) => () => {
      setHidden((prev) => {
        const _search = prev.includes(item);
        if (_search) {
          return prev.filter((x) => x !== item);
        } else {
          return [...prev, item];
        }
      });
    },
    []
  );

  const handleAllowHotels = (e) => setAllowHotels(e.target.value);
  const handleAllowShortlets = (e) => setAllowShortlets(e.target.value);
  const handleAllowProperties = (e) => setAllowProperties(e.target.value);
  const handleAllowInteriors = (e) => setAllowInteriors(e.target.value);
  const handleAllowProducts = (e) => setAllowProducts(e.target.value);
  const handleAllowAutomobiles = (e) => setAllowAutomobiles(e.target.value);

  useEffect(() => {
    if (app) {
      setLocations(app.locations);
      setAllowHotels(app?.allowHotels ? "Yes" : "No");
      setAllowShortlets(app?.allowShortlets ? "Yes" : "No");
      setAllowProperties(app?.allowProperties ? "Yes" : "No");
      setAllowInteriors(app?.allowInteriors ? "Yes" : "No");
      setAllowProducts(app?.allowProducts ? "Yes" : "No");
      setAllowAutomobiles(app?.allowAutomobiles ? "Yes" : "No");
      setTermsAndConditions(app.termsAndConditions);
      setAutoCategoriesInitial(app?.settings?.autoCategories);
      setBuildingCategoriesInitial(app?.settings?.buildingCategories);
      setHowAreWeEarning(app?.settings?.howAreWeEarning);
      setEarningPercentage(app?.settings?.earningPercentage);
      setAllowPosting(app?.settings?.allowPosting === "Yes" ? true : false);
      setPropertyFeatures(app?.settings?.propertyFeatures);
      setCancellationPolicy(app?.settings?.cancellationPolicy);
      setTaxable(app?.settings?.taxable ? "Yes" : "No");
      setTaxRate(app?.settings?.taxRate);
      setUSD(app.settings.currencies.USD);
      setPounds(app.settings.currencies.pounds);
      setPrivacyPolicy(app.settings.privacyPolicy);
      setRefundPolicy(app.settings.refundPolicy);
      setAutomobileRentPolicies(app.settings.automobileRentPolicies);
      setBookingPolicies(app.settings.bookingPolicies);

      setVision(app?.homePage?.vision);
      setMission(app?.homePage?.mission);
      setObjectivesInitial(app?.homePage?.objectives);
      setWhoWeAreImage(app?.homePage?.whoWeAre?.image);
      setWhoWeAreTitle(app?.homePage?.whoWeAre?.title);
      setWhoWeAreDescription(app?.homePage?.whoWeAre?.description);
      setWhyUsInitial(app?.homePage?.whyUs);
      setCoreValuesInitial(app?.homePage?.coreValues);
      setAboutUsHeaderBannerImage(app?.homePage?.headingSecion?.image);
      setTopAboutTitle(app?.homePage?.headingSecion?.title);
      setTopAboutDescription(app?.homePage?.headingSecion?.description);

      setFacebook(app?.contact?.facebook);
      setInstagram(app?.contact?.instagram);
      setTwitter(app?.contact?.twitter);
      setLinkedin(app?.contact?.linkedin);
      setTiktok(app?.contact?.tiktok);
      setTel1(app?.contact?.tel1);
      setTel2(app?.contact?.tel2);
      setTel3(app?.contact?.tel3);
      setEmail(app?.contact?.email);
      setAddress(app?.contact?.address);
      setFAQHotelInitial(app?.faqs?.hotel);
      setFAQShortletInitial(app?.faqs?.shortlet);
      setFAQPropertyInitial(app?.faqs?.property);
      setFAQProductInitial(app?.faqs?.product);
      setFAQInteriorInitial(app?.faqs?.interior);
      setFAQAutomobileInitial(app?.faqs?.automobile);
    }
  }, [app]);

  const updateServer = () => {
    let data = {
      locations,
      allowPosting: allowPosting === "Yes" ? true : false,
      allowHotels: allowHotels === "Yes" ? true : false,
      allowShortlets: allowShortlets === "Yes" ? true : false,
      allowProperties: allowProperties === "Yes" ? true : false,
      allowInteriors: allowInteriors === "Yes" ? true : false,
      allowProducts: allowProducts === "Yes" ? true : false,
      allowAutomobiles: allowAutomobiles === "Yes" ? true : false,
      faqs: {
        hotel: faqHotelInitial,
        shortlet: faqShortletInitial,
        property: faqPropertyInitial,
        product: faqProductInitial,
        interior: faqInteriorInitial,
        automobile: faqAutomobileInitial,
      },
      settings: {
        propertyFeatures,
        buildingCategories: buildingCategoriesInitial,
        termsAndConditions,
        howAreWeEarning,
        earningPercentage: Number(earningPercentage),
        taxable: taxable === "Yes" ? true : false,
        taxRate: Number(taxRate),
        refundPolicy,
        privacyPolicy,
        automobileRentPolicies,
        bookingPolicies,
        cancellationPolicy,
        autoCategories: autoCategoriesInitial,
        currencies: {
          pounds: Number(pounds),
          USD: Number(USD),
        },
      },

      homePage: {
        vision: vision,
        mission: mission,

        objectives: objectivesInitial,
        whoWeAre: {
          image: whoWeAreImage,
          title: whoWeAreTitle,
          description: whoWeAreDescription,
        },
        whyUs: whyUsInitial,
        coreValues: coreValuesInitial,

        headingSecion: {
          image: aboutUsHeaderBannerImage,
          title: topAboutTitle,
          description: topAboutDescription,
        },
      },
      contact: {
        facebook,
        instagram,
        twitter,
        linkedin,
        tiktok,
        tel1,
        tel2,
        tel3,
        email,
        address,
      },
    };

    dispatch(updateApp(data));
  };

  const aboutData = [
    {
      name: "Who we are page top banner",
      display: true,
      required: true,
      description:
        "This file must be a jpg, png or jpeg file and must be of high quality.",
      isSingle: true,
      setOpenMedia: setOpenAboutBanner,
      target: "file",
      htmlFor: "aboutTopBanner",
      accept: "image/jpeg, image/png",
      media: aboutUsHeaderBannerImage,
      setMedia: setAboutUsHeaderBannerImage,
    },
    {
      name: "Who we are top section title",
      display: true,
      required: false,
      value: topAboutTitle,
      placeholder: "Facebook",
      target: "input",
      type: "text",
      setChange: setTopAboutTitle,
    },
    {
      name: "Who we are top section description",
      display: true,
      required: true,
      value: topAboutDescription,
      target: "textArea",
      rows: 7,
      setChange: setTopAboutDescription,
    },
    {
      name: "Vision",
      display: true,
      required: true,
      value: vision,
      target: "textArea",
      rows: 7,
      setChange: setVision,
    },
    {
      name: "Mission",
      display: true,
      required: true,
      value: mission,
      target: "textArea",
      rows: 7,
      setChange: setMission,
    },
    {
      name: "Objectives",
      value: objectives,
      setValue: setObjectives,
      target: "arrayAndAdd",
      display: true,
      initial: objectivesInitial,
      setInitial: setObjectivesInitial,
      // setOpenInput: setOpenPropertyInput,
      // openInput: openPropertyInput,
    },
  ];
  const whoWeAre = [
    {
      name: "Who we are banner",
      display: true,
      required: true,
      description:
        "This file must be a jpg, png or jpeg file and must be of high quality.",
      isSingle: true,
      setOpenMedia: setOpenWhoWeAreImage,
      target: "file",
      htmlFor: "whoWeAreImage",
      accept: "image/jpeg, image/png",
      media: whoWeAreImage,
      setMedia: setWhoWeAreImage,
    },
    {
      name: "Who we are section title",
      display: true,
      required: false,
      value: whoWeAreTitle,
      placeholder: "Who we are section title",
      target: "input",
      type: "text",
      setChange: setWhoWeAreTitle,
    },
    {
      name: "Who we are section description",
      display: true,
      required: true,
      value: whoWeAreDescription,
      target: "textArea",
      rows: 7,
      setChange: setWhoWeAreDescription,
    },
    {
      name: "Why us",
      value: whyUs,
      setValue: setWhyUs,
      target: "addObjectToArray",
      display: true,
      initial: whyUsInitial,
      setInitial: setWhyUsInitial,
      openInput: openWhyUs,
      setOpenInput: setOpenWhyUs,
    },
    {
      name: "Core values",
      value: coreValues,
      setValue: setCoreValues,
      target: "addObjectToArray",
      display: true,
      initial: coreValuesInitial,
      setInitial: setCoreValuesInitial,
      openInput: openCoreValues,
      setOpenInput: setOpenCoreValues,
    },
  ];

  const faqs = [
    {
      name: "Hotel",
      value: faqHotel,
      setValue: setFAQHotel,
      target: "addObjectToArray",
      display: true,
      initial: faqHotelInitial,
      setInitial: setFAQHotelInitial,
    },
    {
      name: "Shortlet",
      value: faqShortlet,
      setValue: setFAQShortlet,
      target: "addObjectToArray",
      display: true,
      initial: faqShortletInitial,
      setInitial: setFAQShortletInitial,
    },
    {
      name: "Property",
      value: faqProperty,
      setValue: setFAQProperty,
      target: "addObjectToArray",
      display: true,
      initial: faqPropertyInitial,
      setInitial: setFAQPropertyInitial,
    },
    {
      name: "Product",
      value: faqProduct,
      setValue: setFAQProduct,
      target: "addObjectToArray",
      display: true,
      initial: faqProductInitial,
      setInitial: setFAQProductInitial,
    },
    {
      name: "Interior",
      value: faqInterior,
      setValue: setFAQInterior,
      target: "addObjectToArray",
      display: true,
      initial: faqInteriorInitial,
      setInitial: setFAQInteriorInitial,
    },
    {
      name: "Automobile",
      value: faqAutomobile,
      setValue: setFAQAutomobile,
      target: "addObjectToArray",
      display: true,
      initial: faqAutomobileInitial,
      setInitial: setFAQAutomobileInitial,
    },
  ];

  const contact = [
    {
      name: "facebook",
      display: true,
      required: false,
      value: facebook,
      placeholder: "Facebook",
      target: "input",
      type: "text",
      setChange: setFacebook,
    },
    {
      name: "Instagram",
      display: true,
      required: false,
      value: instagram,
      placeholder: "Instagram",
      target: "input",
      type: "text",
      setChange: setInstagram,
    },
    {
      name: "Twitter",
      display: true,
      required: false,
      value: twitter,
      placeholder: "Twitter",
      target: "input",
      type: "text",
      setChange: setTwitter,
    },
    {
      name: "Linkedin",
      display: true,
      required: false,
      value: linkedin,
      placeholder: "Linkedin",
      target: "input",
      type: "text",
      setChange: setLinkedin,
    },
    {
      name: "Tiktok",
      display: true,
      required: false,
      value: tiktok,
      placeholder: "Tiktok",
      target: "input",
      type: "text",
      setChange: setTiktok,
    },
    {
      name: "Tel1",
      display: true,
      required: false,
      value: tel1,
      placeholder: "Tel1",
      target: "input",
      type: "text",
      setChange: setTel1,
    },
    {
      name: "Tel2",
      display: true,
      required: false,
      value: tel2,
      placeholder: "Tel2",
      target: "input",
      type: "text",
      setChange: setTel2,
    },
    {
      name: "Tel3",
      display: true,
      required: false,
      value: tel3,
      placeholder: "Tel3",
      target: "input",
      type: "text",
      setChange: setTel3,
    },
    {
      name: "Email",
      display: true,
      required: false,
      value: email,
      placeholder: "Email",
      target: "input",
      type: "text",
      setChange: setEmail,
    },
    {
      name: "Address",
      display: true,
      required: true,
      value: address,
      target: "textArea",
      rows: 7,
      setChange: setAddress,
    },
  ];

  const revenue = [
    {
      name: "How are we deducting our earnings from products ?",
      display: true,
      required: true,
      value: howAreWeEarning,
      target: "select",
      setChange: setHowAreWeEarning,

      options: [
        "Pre-determined percentage on all products.",
        "Earning will be manually set during product upload.",
        "Free",
      ],

      defaultValue: howAreWeEarning,
      click: handleHowWeAreEarning,
    },
    {
      name: "Pre-determined percenatge",
      display:
        howAreWeEarning === "Pre-determined percentage on all products."
          ? true
          : false,
      required: true,
      value: earningPercentage,
      target: "input",
      defaultValue: earningPercentage,
      type: "number",
      min: 1,
      max: 50,
      setChange: setEarningPercentage,
    },
  ];

  const productsData = [
    {
      name: "Allow product managers or product owners post manage products?",
      placeholder: "Allow posting from product managers?",
      display: true,
      required: true,
      value: allowPosting,
      target: "select",
      setChange: setAllowPosting,
      options: ["Yes", "No"],
      defaultValue: allowPosting,
      click: handleAllowPosting,
    },
    {
      name: "Properties categories",
      value: buildingCategoryNew,
      setValue: setBuildingCategorNew,
      target: "arrayAndAdd",
      display: true,
      initial: buildingCategoriesInitial,
      setInitial: setBuildingCategoriesInitial,
      setOpenInput: setOpenPropertyInput,
      openInput: openPropertyInput,
    },
    {
      name: "Property features",
      selections: propertyFeatures,
      target: "feature",
      setSelections: setPropertyFeatures,
      display: true,
    },
    {
      name: "Allow Hotels",
      display: true,
      required: true,
      value: allowHotels,
      target: "select",
      setChange: setAllowHotels,
      options: ["Yes", "No"],
      defaultValue: allowHotels,
      click: handleAllowHotels,
    },
    {
      name: "Allow Shortlets",
      display: true,
      required: true,
      value: allowShortlets,
      target: "select",
      setChange: setAllowShortlets,
      options: ["Yes", "No"],
      defaultValue: allowShortlets,
      click: handleAllowShortlets,
    },
    {
      name: "Allow Properties",
      display: true,
      required: true,
      value: allowProperties,
      target: "select",
      setChange: setAllowProperties,
      options: ["Yes", "No"],
      defaultValue: allowProperties,
      click: handleAllowProperties,
    },
    {
      name: "Allow Interiors",
      display: true,
      required: true,
      value: allowInteriors,
      target: "select",
      setChange: setAllowInteriors,
      options: ["Yes", "No"],
      defaultValue: allowInteriors,
      click: handleAllowInteriors,
    },
    {
      name: "Allow Products",
      display: true,
      required: true,
      value: allowProducts,
      target: "select",
      setChange: setAllowProducts,
      options: ["Yes", "No"],
      defaultValue: allowProducts,
      click: handleAllowProducts,
    },
    {
      name: "Allow Automobiles",
      display: true,
      required: true,
      value: allowAutomobiles,
      target: "select",
      setChange: setAllowAutomobiles,
      options: ["Yes", "No"],
      defaultValue: allowAutomobiles,
      click: handleAllowAutomobiles,
    },
    {
      name: "Automobile brands",
      value: autoCategoryNew,
      setValue: setAutoCategoryNew,
      target: "arrayAndAdd",
      display: true,
      initial: autoCategoriesInitial,
      setInitial: setAutoCategoriesInitial,
      setOpenInput: setOpenAutoInput,
      openInput: openAutoInput,
    },
  ];

  const terms = [
    {
      name: "Terms and conditions",
      display: true,
      required: true,
      value: termsAndConditions,
      target: "textArea",
      rows: 7,
      setChange: setTermsAndConditions,
    },
    {
      name: " Confidentiality and Privacy Policy",
      display: true,
      required: true,
      value: privacyPolicy,
      target: "textArea",
      rows: 7,
      setChange: setPrivacyPolicy,
    },
    {
      name: "Refund policy",
      display: true,
      required: true,
      value: refundPolicy,
      target: "textArea",
      rows: 7,
      setChange: setRefundPolicy,
    },
    {
      name: "Automobile rent policy",
      target: "addObjectToArray",
      display: true,
      initial: automobileRentPolicies,
      setInitial: setAutomobileRentPolicies,
    },
    {
      name: "Cancellation policy",
      display: true,
      required: true,
      value: cancellationPolicy,
      target: "textArea",
      rows: 7,
      setChange: setCancellationPolicy,
    },
    {
      name: "Booking policies",
      target: "addObjectToArray",
      display: true,
      initial: bookingPolicies,
      setInitial: setBookingPolicies,
    },
  ];
  const locationData = [
    {
      selections: locations,
      target: "location",
      setSelections: setLocations,
      display: true,
    },
  ];
  const card = ({ i, item }) => {
    return (
      item.display && (
        <div className="appProfileCard" key={i}>
          <div className="appProfileCardHeader">{item.name}</div>
          {item?.description && (
            <div className="appProfileCardDescription">{item.description}</div>
          )}
          {item.target === "input" ? (
            <div className="appProfileCardForm">
              <input
                className="formLayoutInput appProfileCardFormInput"
                type={item.type}
                defaultValue={item?.defaultValue}
                placeholder={item?.placeholder}
                onChange={(e) => item.setChange(e.target.value)}
                display={true}
                min={item?.min}
                max={item.max}
              />
            </div>
          ) : item.target === "textArea" ? (
            <div className="appProfileCardBody">
              <TextAreaComponent
                defaultValue={item?.value}
                placeholder="Enter text here"
                onChange={(e) => item.setChange(e.target.value)}
                className="noBorderInput"
                display={true}
                rows={item?.rows}
              />
            </div>
          ) : item.target === "select" ? (
            <div className="appProfileCardBody">
              <SelectComponent
                display={true}
                name={item.placeholder}
                showLabel={true}
                title={item?.name}
                required={item.required}
                placeholder={item.placeholder}
                options={item.options}
                defaultValue={item.defaultValue}
                handleChangeSelect={item.click}
              />
            </div>
          ) : item.target === "button" ? (
            <div className="appProfileCardSave" onClick={item.click}>
              {item?.value}
            </div>
          ) : item.target === "file" ? (
            <MediaForm
              isSingle={item.isSingle}
              media={item.media}
              display={true}
              htmlFor={item.htmlFor}
              title={""}
              isVideo={item.isVideo}
              setMedia={item.setMedia}
              setOpen={item.setOpenMedia}
            />
          ) : item?.target === "arrayAndAdd" && item?.display ? (
            <ArrayAndAdd
              name={item.name}
              setInitial={item.setInitial}
              initial={item.initial}
            />
          ) : item?.target === "addObjectToArray" && item?.display ? (
            <AddObjectToArray
              name={item.name}
              setInitial={item.setInitial}
              setOpenInput={item.setOpenInput}
              initial={item.initial}
            />
          ) : item?.target === "location" ? (
            <LocationTemplate
              selections={item.selections}
              setSelections={item.setSelections}
              display={item.display}
            />
          ) : item?.target === "feature" ? (
            <ObjectsInArray
              selections={item.selections}
              setSelections={item.setSelections}
              display={item.display}
            />
          ) : null}
        </div>
      )
    );
  };

  const handleCloseAboutBanner = () => setOpenAboutBanner((prev) => !prev);

  const handleCloseWhoWeAreImage = () => setOpenWhoWeAreImage((prev) => !prev);
  const imageUploadAboutBannerProps = {
    accountId,
    openSlideComponent: openAboutBanner,
    handleClose: handleCloseAboutBanner,
    isArray: false,
    setSelectedMedia: setAboutUsHeaderBannerImage,
    selectedMedia: aboutUsHeaderBannerImage,
  };

  const imageUploadWhoWeAreProps = {
    accountId,
    openSlideComponent: openWhoWeAreImage,
    handleClose: handleCloseWhoWeAreImage,
    isArray: false,
    setSelectedMedia: setWhoWeAreImage,
    selectedMedia: whoWeAreImage,
  };

  // const homeVideoMobileProps = {
  //   accountId,
  //   openSlideComponent: openHomeVideo,
  //   handleClose: handleCloseHomeVideo,
  //   isArray: true,
  //   videosOnly: true,
  //   setSelectedMediaArray: setServerVideosMobile,
  //   selectedMediaArray: serverVideosMobile,
  // };
  // const homeVideoWideProps = {
  //   accountId,
  //   openSlideComponent: openHomeVideoWide,
  //   handleClose: handleCloseHomeVideo,
  //   isArray: true,
  //   videosOnly: true,
  //   setSelectedMediaArray: setServerVideosWideScreen,
  //   selectedMediaArray: serverVideosWideScreen,
  // };
  return (
    <>
      <Dialog
        parentDialog={true}
        open={open}
        adjustFullscreen={true}
        onClose={handleClose}
      >
        <AppBar>
          <Toolbar>
            <div onClick={handleClose} className="modalBack">
              <IoClose className="arrowStyle" />
              <span className="headerLeftSection">App settings</span>
            </div>
          </Toolbar>
        </AppBar>
        <div className="app">
          {/* <ul className="appProfile">
          <div className="appProfileTitle">About us</div>
          {aboutData?.map((item, i) => item?.display && card({ item, i }))}
        </ul> */}

          {/* <ul className="appProfile">
          <div className="appProfileTitle">Contact details</div>

          {contactData?.map((item, i) => item?.display && card({ item, i }))}
        </ul> */}

          <ul className="appProfile">
            <div className="appProfileHeading" onClick={handleHidden("Earnings")}>
              <span className="appProfileHeadingTitle">Earnings</span>
              <span
                className="appProfileHeadingSwitch"
              >
                {hidden.includes("Earnings") ? <IoChevronDown /> : <IoChevronUp /> }
              </span>
            </div>
            {hidden.includes("Earnings") &&
              revenue?.map((item, i) => item?.display && card({ item, i }))}
          </ul>
          <ul className="appProfile">
            <div className="appProfileHeading" onClick={handleHidden("Product and store configurations")}>
              <span className="appProfileHeadingTitle">
                Product and store configurations
              </span>
              <span
                className="appProfileHeadingSwitch"
              >
              {hidden.includes("Product and store configurations") ? <IoChevronDown /> : <IoChevronUp /> }
              </span>
            </div>
            {hidden.includes("Product and store configurations") &&
              productsData?.map(
                (item, i) => item?.display && card({ item, i })
              )}
          </ul>
          <ul className="appProfile">
            <div className="appProfileHeading" onClick={handleHidden("Social accounts and contacts")}>
              <span className="appProfileHeadingTitle">
                Social accounts and contacts
              </span>
              <span
                className="appProfileHeadingSwitch"
              >
              {hidden.includes("Social accounts and contacts") ? <IoChevronDown /> : <IoChevronUp /> }
              </span>
            </div>
            {hidden.includes("Social accounts and contacts") &&
              contact?.map((item, i) => item?.display && card({ item, i }))}
          </ul>
          <ul className="appProfile">
            <div className="appProfileHeading" onClick={handleHidden("About-Us page")}>
              <span className="appProfileHeadingTitle">About-Us page</span>
              <span
                className="appProfileHeadingSwitch"
              >
              {hidden.includes("About-Us page") ? <IoChevronDown /> : <IoChevronUp /> }
              </span>
            </div>
            {hidden.includes("About-Us page") &&
              aboutData?.map((item, i) => item?.display && card({ item, i }))}
          </ul>
          <ul className="appProfile">
            <div className="appProfileHeading" onClick={handleHidden("Who we are section")}>
              <span className="appProfileHeadingTitle">Who we are section</span>
              <span
                className="appProfileHeadingSwitch"
              >
              {hidden.includes("Who we are section") ? <IoChevronDown /> : <IoChevronUp /> }
              </span>
            </div>
            {hidden.includes("Who we are section") &&
              whoWeAre?.map((item, i) => item?.display && card({ item, i }))}
          </ul>
          <ul className="appProfile">
            <div className="appProfileHeading" onClick={handleHidden("FAQ")}>
              <span className="appProfileHeadingTitle">FAQ</span>
              <span
                className="appProfileHeadingSwitch"
              >
              {hidden.includes("FAQ") ? <IoChevronDown /> : <IoChevronUp /> }
              </span>
            </div>
            {hidden.includes("FAQ") &&
              faqs?.map((item, i) => item?.display && card({ item, i }))}
          </ul>
          <ul className="appProfile">
            <div className="appProfileHeading" onClick={handleHidden("Location")}>
              <span className="appProfileHeadingTitle">Location</span>
              <span
                className="appProfileHeadingSwitch"
              >
              {hidden.includes("Location") ? <IoChevronDown /> : <IoChevronUp /> }
              </span>
            </div>
            {hidden.includes("Location") &&
              locationData?.map(
                (item, i) => item?.display && card({ item, i })
              )}
          </ul>
          <ul className="appProfile">
            <div className="appProfileHeading" onClick={handleHidden("Terms and conditions")}>
              <span className="appProfileHeadingTitle">
                Terms and conditions
              </span>
              <span
                className="appProfileHeadingSwitch"
              >
              {hidden.includes("Terms and conditions") ? <IoChevronDown /> : <IoChevronUp /> }
              </span>
            </div>
            {hidden.includes("Terms and conditions") &&
              terms?.map((item, i) => item?.display && card({ item, i }))}
          </ul>
          <div className="btn" onClick={updateServer}>
            Update Settings
          </div>
        </div>
      </Dialog>
      <TheMediaModal {...imageUploadAboutBannerProps} />
      <TheMediaModal {...imageUploadWhoWeAreProps} />
    </>
  );
};
export default memo(AppProfile);
