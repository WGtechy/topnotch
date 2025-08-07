import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import TextAreaComponent from "../../bucket/formComponent/TextAreaComponent";
import SelectComponent from "../../bucket/formComponent/SelectComponent";
import CalendarSelectComponent from "../../bucket/formComponent/CalendarSelectComponent";
import { useDispatch, useSelector } from "react-redux";
import CheckComponent from "../../bucket/formComponent/CheckBoxComponent";
import MultipleSelect from "../../bucket/formComponent/MultipleSelect";
import TheMediaModal from "../../bucket/TheMediaModal";
import TimeComponent from "../../bucket/formComponent/TimeComponent";
import InputComponent from "../../bucket/formComponent/InputComponent";
import { getProduct, productCrud } from "../../redux/actions";
import { componentLoader } from "../../bucket/loading-components/componentLoader";
import ImageUpload from "../../bucket/ImageUpload";
import ArrayAndAdd from "../../bucket/formComponent/ArrayAndAdd";
import RecommendationTemplate from "./RecommendationTemplate";
import AllProductsSlide from "../../bucket/AllProductsSlide";
import AllPropertiesFeatures from "./AllPropertiesFeatures";
import AddObjectToArray from "../../bucket/formComponent/AddObjectToArray";
import useUrlSearchParams from "../../utilities-config/useUrlSearchParams";

const AddProduct = (props) => {
  const {
    isAdmin,
    isMobile,
    locations,
    accountId,
    autoCategories,
    buildingCategories,
    propertyFeatures,
  } = props;
  const dispatch = useDispatch();
  const { loadingNew, newProduct, product } = useSelector(
    (state) => state.products
  );
  const { data: app } = useSelector((state) => state.app);
  const { ptype } = useUrlSearchParams();
  // const { loadingNew, newProduct } = useSelector((state) => state.products);
  const virtualTourFee = useRef(0);
  const onsiteTourFee = useRef(0);
  const productTitle = useRef("");
  const shortDescription = useRef("");
  const fullDescription = useRef("");
  const bedrooms = useRef(0);
  const bathrooms = useRef(0);
  const toilets = useRef(0);
  const parking = useRef(0);
  const price = useRef(0);
  const minimumPurchase = useRef(0);
  const maximumPurchase = useRef(0);
  const serviceChargeDescription = useRef("");
  const agencyFee = useRef(0);
  const legalFee = useRef(0);
  const platformFee = useRef(0);
  const cautionFee = useRef(0);
  const discount = useRef(0);
  const termsAndConditions = useRef("");
  // const taxRate = useRef(0);
  const otherFeatures = useRef("");
  const onceCount = useRef(true);
  const onsiteTourDescription = useRef("");
  const virtualTourDescription = useRef("");
  const [live, setLive] = useState("Draft");
  const [taxable, setTaxable] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [country, setCountry] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [newCategories, setNewCategories] = useState([]);
  const [checkInDates, setCheckInDates] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [citiesAndNeighbors, setCitiesAndNeighbors] = useState([]);
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [adverts, setAdverts] = useState([]);
  const [videos, setVideos] = useState([]);
  const [bannerImage, setBannerImage] = useState(undefined);
  const [images, setImages] = useState([]);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [marketingType, setMarketingType] = useState("Rent"); // not added to form
  const [productType, setProductType] = useState("");
  const [priceDependent, setPriceDependent] = useState("Day"); // not added to form
  const [features, setFeatures] = useState([]);
  const [isVirtualTour, setIsVirtualTour] = useState(false);
  const [isOnsiteTour, setIsOnsiteTour] = useState(false);
  const [serviceCharge, setServiceCharge] = useState(0);
  const [openAllProducts, setOpenAllProducts] = useState(false);
  const [openBanner, setOpenBanner] = useState(false);
  const [openMediaFiles, setOpenMediaFiles] = useState(false);
  const [openVideoFiles, setOpenVideoFiles] = useState(false);
  const [openFeatures, setOpenFeatures] = useState(false);

  // Version 1.2 implementation

  const handlePrice = (e) => (price.current = e.target.value);
  const handleMinimumPurchase = (e) =>
    (minimumPurchase.current = e.target.value);
  const handleMaximumPurchase = (e) =>
    (maximumPurchase.current = e.target.value);

  const handleAgencyFee = (e) => (agencyFee.current = e.target.value);
  const handleLegalFee = (e) => (legalFee.current = e.target.value);
  const handlePlatformFee = (e) => (platformFee.current = e.target.value);
  const handleCautionFee = (e) => (cautionFee.current = e.target.value);
  const handleServiceCharge = (e) => setServiceCharge(e.target.value);
  const handleDiscount = (e) => (discount.current = e.target.value);
  const handleBathroom = (e) => (bathrooms.current = e.target.value);
  const handleCarPark = (e) => (parking.current = e.target.value);
  const handleVirtualTourFee = (e) => (virtualTourFee.current = e.target.value);
  const handleOnsiteTourFee = (e) => (onsiteTourFee.current = e.target.value);
  const handleVirtualTourDescription = (e) =>
    (virtualTourDescription.current = e.target.value);
  const handleOnsiteTourDescription = (e) =>
    (onsiteTourDescription.current = e.target.value);
  const handleServiceChargeDescription = (e) =>
    (serviceChargeDescription.current = e.target.value);
  const handleFullDescription = (e) =>
    (fullDescription.current = e.target.value);
  const handleBedroom = (e) => (bedrooms.current = e.target.value);
  const handleToilets = (e) => (toilets.current = e.target.value);

  const handleTaxable = (e) => setTaxable(e.target.checked);
  const handleisVirtualTour = (e) => setIsVirtualTour(e.target.checked);
  const handleisOnsiteTour = (e) => setIsOnsiteTour(e.target.checked);

  const handleTermsAndConditions = (e) =>
    (termsAndConditions.current = e.target.value);
  const handleMarketingType = (e) => setMarketingType(e.target.value);
  const handlePriceDependent = (e) => setPriceDependent(e.target.value);
  const handleLive = (e) => setLive(e.target.value);
  const handleNeighborhood = (e) => setNeighborhood(e.target.value);
  const handleCity = (e) => {
    let search = e.target.value;
    setCity(e.target.value);
    let found = citiesAndNeighbors.find((x) => x.name === search);
    if (!!found?.neighborhood?.length) {
      for (let item of found?.neighborhood) {
        setNeighborhoods((prev) => [...prev, item]);
      }
    }
  };

  const runOnce = useRef(true);
  useEffect(() => {
    if (isAdmin && props?.match?.params.slug && runOnce.current) {
      dispatch(getProduct(props?.match?.params.slug));
      return (runOnce.current = false);
    }
  }, [dispatch, isAdmin, props]);

  useEffect(() => {
    if (!!locations?.length && onceCount.current && newProduct?._id) {
      for (let item of locations) {
        setCountries((prev) => [...prev, item.country]);
      }
      return () => (onceCount.current = false);
    }
  }, [locations, newProduct]);

  const handleCountry = (e) => {
    let search = e.target.value;
    setCountry(e.target.value);
    let found = locations.find((x) => x.country === search);

    setCitiesAndNeighbors(found.cities);
    for (let item of found.cities) {
      setCities((prev) => [...prev, item.name]);
    }
  };

  useEffect(() => {
    if (product && isAdmin) {
      fullDescription.current = product?.description;
      shortDescription.current = product?.shortDescription;
      productTitle.current = product?.title;
      price.current = product?.price;
      // // taxRate.current = product?.taxRate;
      discount.current = product?.discount;
      otherFeatures.current = product?.otherFeatures;
      bedrooms.current = product?.bedrooms;
      minimumPurchase.current = product?.minimumPurchase;
      maximumPurchase.current = product?.maximumPurchase;
      toilets.current = product?.toilets;
      bathrooms.current = product?.bathrooms;
      serviceChargeDescription.current = product?.serviceChargeDescription;
      legalFee.current = product?.legalFee;
      agencyFee.current = product?.agencyFee;
      cautionFee.current = product?.cautionFee;
      platformFee.current = product?.platformFee;
      parking.current = product?.parking;
      virtualTourFee.current = product?.virtualTourFee;
      onsiteTourFee.current = product?.onsiteTourFee;
      onsiteTourDescription.current = product?.onsiteTourDescription;
      virtualTourDescription.current = product?.virtualTourDescription;
      termsAndConditions.current = product?.termsAndConditions;
      setFeatures(product?.fearures);
      setPolicies(product?.policies);
      setMarketingType(product?.marketingType);
      setPriceDependent(product?.priceDependent);
      setAdverts(product?.adverts);
      setLive(product?.live ? "Live" : "Draft");
      setCountry(product?.location?.country);
      setCity(product?.location?.city);
      setNeighborhood(product?.location?.neighborhood);
      setTaxable(product?.taxable);
      setDocuments(product?.documents);
      setBannerImage(product?.bannerImage);
      setImages(product?.images);
      setVideos(product?.videos);
      setCheckInDates(product?.unavailableDates);
      setCheckInTime(product?.checkInTime);
      setCheckOutTime(product?.checkOutTime);
      setIsVirtualTour(product?.isVirtualTour);
      setIsOnsiteTour(product?.isOnsiteTour);
    }
  }, [product, isAdmin]);

  const handleProductTitle = (e) => (productTitle.current = e.target.value);
  const handleShortDescription = (e) =>
    (shortDescription.current = e.target.value);
  const handleOtherFeatures = (e) => (otherFeatures.current = e.target.value);

  const calendarProps = useMemo(
    () => ({
      unavailableDates: checkInDates,
      selection: true,
      setCheckInDates,
      title: "Unavailable days",
      isUser: false,
    }),
    [checkInDates]
  );

  // const handleFeatures = useCallback(
  //   (item) => () => {
  //     setFeatures((prev) => {
  //       let check = prev.find((x) => x === item);
  //       if (check) {
  //         return prev.filter((x) => x !== item);
  //       } else {
  //         return [...prev, item];
  //       }
  //     });
  //   },
  //   []
  // );

  const initOnce = useRef(true);
  useEffect(() => {
    if (!product && ptype && initOnce.current) {
      dispatch(
        productCrud({
          date: new Date(),
          crud: "INITIALIZE",
          productType: ptype,
          addedBy: accountId,
        })
      );
      return (initOnce.current = false);
    }
  }, [dispatch, ptype, product, accountId]);

  useEffect(() => {
    if (newProduct || product) {
      setProductType(newProduct?.productType || product?.productType);
    }
  }, [newProduct, product]);

  function sendToServer(e) {
    e.preventDefault();

    const data = {
      productId: product?._id || newProduct?._id,
      admin: isAdmin && accountId,
      addedBy: accountId,
      crud: product?._id ? "UPDATE" : "CREATE",
      description: fullDescription.current,
      shortDescription: shortDescription.current,
      title: productTitle.current,
      price: Number(price.current),
      agencyFee: Number(agencyFee.current),
      legalFee: Number(legalFee.current),
      platformFee: Number(platformFee.current),
      cautionFee: Number(cautionFee.current),
      minimumPurchase: Number(minimumPurchase.current),
      maximumPurchase: Number(maximumPurchase.current),
      virtualTourDescription: isVirtualTour
        ? virtualTourDescription.current
        : "",
      onsiteTourDescription: isOnsiteTour ? onsiteTourDescription.current : "",
      virtualTourFee: isVirtualTour ? Number(virtualTourFee.current) : 0,
      onsiteTourFee: isOnsiteTour ? Number(onsiteTourFee.current) : 0,
      discount: discount.current,
      serviceChargeDescription: serviceChargeDescription.current,
      termsAndConditions: termsAndConditions.current,
      bedrooms: bedrooms.current,
      toilets: toilets.current,
      bathrooms: bathrooms.current,
      parking: parking.current,
      otherFeatures: otherFeatures.current,
      productType: product?.productType || newProduct?.productType, //String
      category: selectedCategories,
      newCategories,
      marketingType,
      checkInTime,
      checkOutTime,
      documents,
      priceDependent,
      live: live === "Live" ? true : false,
      location: {
        country: country === "Select country" ? "" : country,
        city: city === "Select city" ? "" : city,
        neighborhood:
          neighborhood === "Select neighborhood" ? "" : neighborhood,
      },
      serviceCharge,
      isVirtualTour,
      isOnsiteTour,
      taxable,
      unavailableDates: checkInDates,
      bannerImage,
      videos,
      policies,
      features,
      recommendations,
      adverts,
      images,
    };
    dispatch(productCrud(data));
    setBannerImage(null);
    setCheckInDates([]);
    if (ptype) {
      props.history.push(`/?c=${ptype}`);
    } else {
      // props.history.back()
    }
  }
  const handleCloseBanner = () => setOpenBanner((prev) => !prev);
  const handleCloseVideoFiles = () => setOpenVideoFiles((prev) => !prev);
  // const handleCloseAdverts = () => setOpenAdverts((prev) => !prev);

  const imageUploadBannerProps = {
    accountId,
    openSlideComponent: openBanner,
    handleClose: handleCloseBanner,
    isArray: false,
    selectedMedia: bannerImage,
    setSelectedMedia: setBannerImage,
    imagesOnly: true,
  };
  const videoFilesProps = {
    accountId,
    openSlideComponent: openVideoFiles,
    handleClose: handleCloseVideoFiles,
    isArray: true,
    selectedMediaArray: videos,
    setSelectedMediaArray: setVideos,
    videosOnly: true,
  };
  const handleCheckInTime = (value) => setCheckInTime(value);
  const handleCheckOutTime = (value) => setCheckOutTime(value);

  // const featureSelect = ({ item, i }) => (
  //   <div
  //     className={
  //       features.includes(item)
  //         ? "productPageFormSection3CheckBoxesItem productPageFormSection3CheckBoxesSelected"
  //         : "productPageFormSection3CheckBoxesItem"
  //     }
  //     key={i}
  //     onClick={handleFeatures(item)}
  //   >
  //     {" "}
  //     {item}{" "}
  //   </div>
  // );

  const handleCloseProducts = useCallback(
    () => setOpenAllProducts((prev) => !prev),
    []
  );
  const allProductsProps = useMemo(
    () => ({
      open: openAllProducts,
      handleClose: handleCloseProducts,
      setSelectedContent: setRecommendations,
      selectedContent: recommendations,
      isAdmin,
      accountId,
    }),
    [recommendations, isAdmin, openAllProducts, handleCloseProducts, accountId]
  );
  const handleCloseMediaFiles = () => setOpenMediaFiles((prev) => !prev);

  const handleOpenFeatures = useCallback(
    () => setOpenFeatures((prev) => !prev),
    []
  );
  const propertiesFeaturesTemplate = () => {
    return (
      <div className="featuresDisplay">
        {/* propertyFeatures */}

        {propertyFeatures.map(
          (item, i) =>
            item.feature?.active && (
              <div className="featuresDisplayItem" key={i}>
                <div className="featuresDisplayItemParent">
                  {item.feature?.name}
                </div>
                {item.feature.active &&
                  !!item?.subFeatures?.length &&
                  item?.subFeatures.map(
                    (sub, i) =>
                      sub.name.active && (
                        <div className="featuresDisplayItemSub" key={i}>
                          <div className="featuresDisplayItemSubTitle">
                            {" "}
                            {sub.name.name}
                          </div>
                          <div className="featuresDisplayItemSubContainer">
                            {item.feature.active &&
                              sub.name.active &&
                              !!sub?.subFeatureItem?.length &&
                              sub?.subFeatureItem.map(
                                (subItem, i) =>
                                  subItem.active && (
                                    <div
                                      className="featuresDisplayItemSubContainerItem"
                                      key={i}
                                    >
                                      {subItem.name}
                                    </div>
                                  )
                              )}
                          </div>
                        </div>
                      )
                  )}
              </div>
            )
        )}

        <div className="featuresBtn" onClick={handleOpenFeatures}>
          Add more
        </div>
      </div>
    );
  };
  const allPropertiesFeatures = useMemo(
    () => ({
      open: openFeatures,
      handleClose: handleOpenFeatures,
      features: propertyFeatures,
    }),
    [openFeatures, handleOpenFeatures, propertyFeatures]
  );

  const mediaFilesProps = {
    accountId,
    openSlideComponent: openMediaFiles,
    handleClose: handleCloseMediaFiles,
    isArray: true,
    selectedMediaArray: images,
    setSelectedMediaArray: setImages,
    imagesOnly: true,
  };

  return (
    <>
      {loadingNew ? (
        componentLoader
      ) : newProduct?._id || product?._id ? (
        <div className="productPage">
          <form className="productPageForm" onSubmit={sendToServer}>
            <div className="productPageFormSection1">
              <InputComponent
                type={"text"}
                placeholder="Name"
                defaultValue={productTitle.current}
                title="Product name"
                showLabel={true}
                required={true}
                display={true}
                onChange={handleProductTitle}
              />
              <MultipleSelect
                name="Select category"
                data={
                  productType === "Automobile"
                    ? autoCategories
                    : buildingCategories
                }
                display={
                  !["Interior", "Service", "Product"].includes(productType)
                    ? true
                    : false
                }
                selectedItems={selectedCategories}
                setSelectedItems={setSelectedCategories}
                newItems={newCategories}
                setNewItems={setNewCategories}
              />
            </div>
            <div className="productPageFormSectionImage">
              <div className="productPageFormSectionImageTitle">
                {" "}
                Product banner{" "}
              </div>
              <ImageUpload
                isSingle={true}
                media={bannerImage}
                display={true}
                filesFor={"banner"}
                local={true}
                htmlFor={"banner"}
                isImage={true}
                title={""}
                btnText={bannerImage ? "Change image" : "Click to add image"}
                isVideo={false}
                setMedia={setBannerImage}
                target={"Product"}
                targetId={product?._id || newProduct?._id}
                accountId={accountId}
              />
            </div>

            {["Hotel", "Shortlet", "Automobile", "Property"].includes(
              productType
            ) && (
              <div className="productPageFormSectionImage">
                <div className="productPageFormSectionImageTitle">
                  Post media
                </div>
                <ImageUpload
                  filesFor={"videos"}
                  local={true}
                  htmlFor={"videos"}
                  isSingle={false}
                  media={videos}
                  display={true}
                  target={"Product"}
                  title={""}
                  isVideo={true}
                  btnText={"Add videos"}
                  setMedia={setVideos}
                  targetId={product?._id || newProduct?._id}
                  accountId={accountId}
                />
              </div>
            )}
            <div className="productPageFormSectionImage">
              <div className="productPageFormSectionImageTitle"> images</div>
              <ImageUpload
                filesFor={"images"}
                local={true}
                isSingle={false}
                media={images}
                display={true}
                htmlFor={"images"}
                title={""}
                isImage={true}
                isVideo={false}
                btnText={"Add image files. Images only"}
                setMedia={setImages}
                targetId={product?._id || newProduct?._id}
                accountId={accountId}
                target={"Product"}
              />
            </div>

            <div className="productPageFormSection3 priceSection">
              <SelectComponent
                name={"Market type"}
                required={true}
                placeholder={"Market type"}
                options={["Sale", "Rent"]}
                defaultValue={marketingType}
                handleChangeSelect={handleMarketingType}
                display={
                  !["Interior", "Service", "Product"].includes(productType)
                    ? true
                    : false
                }
                showLabel={true}
                title="Market type"
              />
              <SelectComponent
                name={"Rent period"}
                required={true}
                placeholder={"Rent period"}
                options={[
                  "Select period",
                  "Minute",
                  "Hour",
                  "Day",
                  "Night",
                  "Month",
                  "Year",
                ]}
                defaultValue={priceDependent}
                handleChangeSelect={handlePriceDependent}
                display={
                  !["Interior", "Service", "Product"].includes(productType) &&
                  marketingType === "Rent"
                    ? true
                    : false
                }
                showLabel={true}
                title="Rent period"
              />
              <InputComponent
                type={"number"}
                placeholder="Price"
                defaultValue={product?.price || 0}
                title="Price"
                showLabel={true}
                display={true}
                required={false}
                min={1000}
                max={100000000000}
                onChange={handlePrice}
              />

              <InputComponent
                type={"number"}
                placeholder="discount"
                defaultValue={product?.discount || 0}
                title="discount"
                showLabel={true}
                display={true}
                required={false}
                min={0}
                max={10000000}
                onChange={handleDiscount}
              />
            </div>
            {marketingType === "Rent" &&
            ["Hotel", "Shortlet", "Automobile", "Property"].includes(
              productType
            ) ? (
              <div className="productPageFormSection3 priceSection">
                <InputComponent
                  type={"number"}
                  placeholder={
                    ["Hotel", "Shortlet", "Property"].includes
                      ? "Minimum stay"
                      : productType === "Automobile"
                      ? "Minimum hire"
                      : "Minimum purchase"
                  }
                  defaultValue={minimumPurchase.current}
                  title={
                    ["Shortlet", "Property"].includes(productType)
                      ? "Minimum stay"
                      : productType === "Automobile"
                      ? "Minimum hire"
                      : "Minimum purchase"
                  }
                  showLabel={true}
                  display={true}
                  required={false}
                  min={1}
                  max={10000000}
                  onChange={handleMinimumPurchase}
                />
                <InputComponent
                  type={"number"}
                  placeholder={
                    ["Hotel", "Shortlet", "Property"].includes
                      ? "Maximum stay"
                      : productType === "Automobile"
                      ? "Maximum hire"
                      : "Maximum purchase"
                  }
                  defaultValue={maximumPurchase.current}
                  title={
                    ["Shortlet", "Property"].includes(productType)
                      ? "Maximum stay"
                      : productType === "Automobile"
                      ? "Maximum hire"
                      : "Maximum purchase"
                  }
                  showLabel={true}
                  display={true}
                  required={false}
                  min={1}
                  max={1000000000}
                  onChange={handleMaximumPurchase}
                />
              </div>
            ) : null}

            <div className="productPageFormSection3 priceSection">
              <InputComponent
                type={"number"}
                placeholder="Agency fee"
                defaultValue={agencyFee.current}
                title="Agency fee"
                showLabel={true}
                display={
                  !["Interior", "Service", "Product", "Automobile"].includes(
                    productType
                  )
                    ? true
                    : false
                }
                required={false}
                min={0}
                max={100000000000}
                onChange={handleAgencyFee}
              />
              <InputComponent
                type={"number"}
                placeholder="Legal fee"
                defaultValue={legalFee.current}
                title="Legal fee"
                showLabel={true}
                display={
                  !["Interior", "Service", "Product", "Automobile"].includes(
                    productType
                  )
                    ? true
                    : false
                }
                required={false}
                min={0}
                max={100000000000}
                onChange={handleLegalFee}
              />
              <InputComponent
                type={"number"}
                placeholder="Platform fee"
                defaultValue={platformFee.current}
                title="Platform fee"
                showLabel={true}
                display={
                  isAdmin
                    ? app?.settings?.howAreWeEarning ===
                      "Earning will be manually set during product upload."
                      ? true
                      : false
                    : false
                }
                required={true}
                min={0}
                max={100000000000}
                onChange={handlePlatformFee}
              />
              <InputComponent
                type={"number"}
                placeholder="Caution fee"
                defaultValue={cautionFee.current}
                title="Caution fee"
                showLabel={true}
                display={
                  !["Interior", "Service", "Product", "Automobile"].includes(
                    productType
                  )
                    ? true
                    : false
                }
                required={false}
                min={0}
                max={100000000000}
                onChange={handleCautionFee}
              />
              <InputComponent
                type={"number"}
                placeholder="Service charge"
                defaultValue={serviceCharge}
                title="Service charge"
                showLabel={true}
                display={
                  !["Interior", "Service", "Product", "Automobile"].includes(
                    productType
                  )
                    ? true
                    : false
                }
                required={false}
                min={0}
                max={100000000000}
                onChange={handleServiceCharge}
              />
            </div>
            {serviceCharge ? (
              <div className="productPageFormSection2">
                <TextAreaComponent
                  defaultValue={serviceChargeDescription.current}
                  onChange={handleServiceChargeDescription}
                  display={true}
                  placeholder={"Service charge description"}
                  name={"Service charge description"}
                  rows={4}
                  required={true}
                  title="Service charge description"
                />
              </div>
            ) : null}

            {!["Interior", "Service", "Product"].includes(productType) && (
              <div className="productPageFormSection3">
                <TimeComponent
                  minDate={new Date()}
                  onChange={handleCheckInTime}
                  label={
                    productType === "Automobile" ? "Pickup" : "Check-In time"
                  }
                  display={marketingType === "Rent" ? true : false}
                  required={false}
                  defaultValue={null}
                  name={
                    productType === "Automobile" ? "Pickup" : "Check-In time"
                  }
                  title={
                    productType === "Automobile" ? "Pickup" : "Check-In time"
                  }
                />
                <TimeComponent
                  minDate={new Date()}
                  onChange={handleCheckOutTime}
                  label={
                    productType === "Automobile"
                      ? "Return time"
                      : "Check-Out Time"
                  }
                  display={marketingType === "Rent" ? true : false}
                  required={false}
                  defaultValue={null}
                  name={
                    productType === "Automobile"
                      ? "Return time"
                      : "Check-Out Time"
                  }
                  title={
                    productType === "Automobile"
                      ? "Return time"
                      : "Check-Out Time"
                  }
                />
              </div>
            )}

            {!["Interior", "Service", "Product"].includes(productType) && (
              <div className="productPageFormSection3">
                <CheckComponent
                  labelColor={{ color: "#121417" }}
                  placeholder={"Taxable"}
                  defaultValue={taxable}
                  required={false}
                  title="Taxable"
                  display={true}
                  onChange={handleTaxable}
                  showLabel={true}
                />
              </div>
            )}
            {!["Interior", "Service", "Product"].includes(productType) && (
              <div className="productPageFormSection3">
                <CheckComponent
                  labelColor={{ color: "#121417" }}
                  placeholder={"Virtual tour"}
                  defaultValue={isVirtualTour}
                  required={false}
                  title="Virtual tour"
                  display={true}
                  onChange={handleisVirtualTour}
                  showLabel={true}
                />

                <InputComponent
                  type={"number"}
                  placeholder="Virtual tour fee"
                  defaultValue={virtualTourFee.current}
                  title="Virtual tour fee"
                  showLabel={true}
                  display={isVirtualTour}
                  required={isVirtualTour}
                  min={1}
                  max={1000000000}
                  onChange={handleVirtualTourFee}
                />
                <TextAreaComponent
                  defaultValue={virtualTourDescription.current}
                  onChange={handleVirtualTourDescription}
                  display={isVirtualTour}
                  required={true}
                  placeholder={"Virtual tour description"}
                  name={"Virtual tour description"}
                  rows={4}
                  title="Virtual tour description"
                />
              </div>
            )}

            {!["Interior", "Service", "Product"].includes(productType) && (
              <div className="productPageFormSection3">
                <CheckComponent
                  labelColor={{ color: "#121417" }}
                  placeholder={"Onsite tour"}
                  defaultValue={isOnsiteTour}
                  required={false}
                  title="Onsite tour"
                  display={true}
                  onChange={handleisOnsiteTour}
                  showLabel={true}
                />

                <InputComponent
                  type={"number"}
                  placeholder="Onsite tour fee"
                  defaultValue={onsiteTourFee.current}
                  title="Onsite tour fee"
                  showLabel={true}
                  display={isOnsiteTour}
                  required={true}
                  min={1}
                  max={1000000000}
                  onChange={handleOnsiteTourFee}
                />
                <TextAreaComponent
                  defaultValue={onsiteTourDescription.current}
                  onChange={handleOnsiteTourDescription}
                  display={isOnsiteTour}
                  required={true}
                  placeholder={"Onsite tour description"}
                  name={"Onsite tour description"}
                  rows={4}
                  title="Onsite tour description"
                />
              </div>
            )}

            <div className="productPageFormSection2">
              <TextAreaComponent
                defaultValue={shortDescription.current}
                onChange={handleShortDescription}
                display={true}
                placeholder={"Short description"}
                name={"Short description"}
                rows={4}
                required={true}
                title="Short description"
              />
              <TextAreaComponent
                defaultValue={fullDescription.current}
                onChange={handleFullDescription}
                display={true}
                required={true}
                placeholder={"Full description"}
                name={"Full description"}
                rows={4}
                title="Full description"
              />
            </div>

            {!["Interior", "Service", "Product"].includes(productType) && (
              <div className="productPageFormSection3">
                <SelectComponent
                  name={"Country"}
                  required={true}
                  placeholder={"Country"}
                  options={["Select country", ...countries]}
                  defaultValue={country}
                  handleChangeSelect={handleCountry}
                  display={true}
                  showLabel={true}
                  title="Select country"
                />

                <SelectComponent
                  name={"City"}
                  required={true}
                  placeholder={"City"}
                  options={["Select city", ...cities]}
                  defaultValue={city}
                  handleChangeSelect={handleCity}
                  display={country ? true : false}
                  showLabel={true}
                  title="Select city"
                />

                <SelectComponent
                  name={"Neighborhood"}
                  options={["Select neighborhood", ...neighborhoods]}
                  required={true}
                  placeholder={"Neighborhood"}
                  defaultValue={neighborhood}
                  handleChangeSelect={handleNeighborhood}
                  display={city ? true : false}
                  showLabel={true}
                  title="Select neighborhood"
                />
              </div>
            )}

            {!["Interior", "Service", "Product"].includes(productType) && (
              <div className="productPageFormSection3">
                <InputComponent
                  type={"number"}
                  placeholder="Bedrooms"
                  defaultValue={bedrooms.current}
                  title="Bedrooms"
                  showLabel={true}
                  display={productType === "Automobile" ? false : true}
                  required={true}
                  min={0}
                  max={10}
                  onChange={handleBedroom}
                />
                <InputComponent
                  type={"number"}
                  placeholder="Toilets"
                  defaultValue={toilets.current}
                  title="Toilets"
                  showLabel={true}
                  display={productType === "Automobile" ? false : true}
                  required={true}
                  min={0}
                  max={10}
                  onChange={handleToilets}
                />
                <InputComponent
                  type={"number"}
                  placeholder="Bathroom"
                  defaultValue={bathrooms.current}
                  title="Bathroom"
                  showLabel={true}
                  display={productType === "Automobile" ? false : true}
                  required={true}
                  min={0}
                  max={10}
                  onChange={handleBathroom}
                />
                <InputComponent
                  type={"number"}
                  placeholder="Car parking"
                  defaultValue={parking.current}
                  title="Car parking"
                  showLabel={true}
                  display={productType === "Automobile" ? false : true}
                  required={true}
                  min={0}
                  max={10}
                  onChange={handleCarPark}
                />
              </div>
            )}
            {/* {!["Interior", "Service", "Product"].includes(productType) &&  <div className="productPageFormSection3 productPageFormSection3Column">
                    <div className="productPageFormSection3Title">
                      Features{" "}
                    </div>
                    <div className="productPageFormSection3CheckBoxes">
                      {AllHouseFeatures.map((item, i) =>
                        featureSelect({ i, item })
                      )}
                    </div>
                  </div>} */}

            {!["Interior", "Service", "Product", "Automobile"].includes(
              productType
            ) && (
              <div className="productPageFormSection6 arrayAndAddContainer">
                <div className="arrayAndAddContainerTitle">Features</div>
                {propertiesFeaturesTemplate()}
              </div>
            )}
            {!["Interior", "Service", "Product"].includes(productType) && (
              <div className="productPageFormSection3 ">
                <TextAreaComponent
                  defaultValue={otherFeatures.current}
                  onChange={handleOtherFeatures}
                  display={true}
                  required={false}
                  placeholder={"Other features"}
                  name={"Other features"}
                  rows={4}
                  title="Other features"
                />
              </div>
            )}
            {!["Interior", "Service", "Product"].includes(productType) && (
              <div className="productPageFormSection6">
                <TextAreaComponent
                  defaultValue={termsAndConditions.current}
                  onChange={handleTermsAndConditions}
                  display={true}
                  placeholder={"Terms and conditions"}
                  name={"Terms and conditions"}
                  rows={4}
                  required={false}
                  title="Terms and conditions"
                />{" "}
              </div>
            )}
            {!["Interior", "Service", "Product"].includes(productType) && (
              <div className="productPageFormSection6 arrayAndAddContainer">
                <div className="arrayAndAddContainerTitle">Policies</div>
                <AddObjectToArray
                  name={"Policies"}
                  setInitial={setPolicies}
                  initValue={policies}
                />
              </div>
            )}
            {!["Interior", "Service", "Product"].includes(productType) &&
              marketingType !== "Rent" && (
                <div className="productPageFormSection6 arrayAndAddContainer">
                  <div className="arrayAndAddContainerTitle">
                    Available documents
                  </div>
                  <ArrayAndAdd
                    name={"Available documents"}
                    setInitial={setDocuments}
                    initValue={documents}
                  />
                </div>
              )}

            {!["Interior", "Service", "Product"].includes(productType) && (
              <div className="productPageFormRecommendations">
                <div className="productPageFormRecommendationsTitle">
                  Recommendations with this product
                </div>
                <RecommendationTemplate
                  data={recommendations}
                  display={true}
                  isMobile={isMobile}
                  setData={setRecommendations}
                  accountId={accountId}
                  isAdmin={isAdmin}
                />
                <div
                  className="productPageFormRecommendationsAdd"
                  onClick={handleCloseProducts}
                >
                  Add recommended products
                </div>
              </div>
            )}
            {!["Interior", "Service", "Product"].includes(productType) &&
              marketingType === "Rent" && (
                <div className="productPageFormSection4">
                  <CalendarSelectComponent {...calendarProps} />
                </div>
              )}

            {!["Interior", "Service", "Product"].includes(productType) && (
              <div className="productPageFormSection3 priceSection">
                <SelectComponent
                  name={"Product status"}
                  required={true}
                  placeholder={"Product status"}
                  options={["Select product status", "Live", "Draft"]}
                  defaultValue={live === "Live" ? "Live" : live}
                  handleChangeSelect={handleLive}
                  display={true}
                  showLabel={true}
                  title="Go live"
                />
              </div>
            )}

            <button className="productFormBtn">
              {product?._id ? "Update product" : "Upload product"}
            </button>
          </form>
        </div>
      ) : null}
      <TheMediaModal {...imageUploadBannerProps} />
      <TheMediaModal {...videoFilesProps} />

      <TheMediaModal {...mediaFilesProps} />
      <AllProductsSlide {...allProductsProps} />
      <AllPropertiesFeatures {...allPropertiesFeatures} />
    </>
  );
};

export default AddProduct;
