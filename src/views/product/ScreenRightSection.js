import React, { useMemo } from "react";
import useUrlSearchParams from "../../utilities-config/useUrlSearchParams";
import { IoArrowBack } from "react-icons/io5";
import Comment from "../home/productDetailFolder/comment/Comment";
import ProductInfo from "../home/productDetailFolder/productDescription/ProductInfo";
import Authorization from "../Authorization";

const 
ScreenRightSection = ({
  product,
  postId,
  history,
  account,
  currency,
  taxRate,
  isMobile,
  track,
  toggleVolume,
  setSelectedMedia,
  setTrack,
  accountId,
  token,

  totalComments,
  totalLikes,
}) => {
  const { ctype } = useUrlSearchParams();
  // const [checkInDates, setCheckInDates] = useState([]);
  // const [totalAmount, setTotalAmount] = useState([]);
  // const [checkInTime, setCheckInTime] = useState(null);
  // const { cartItem } = useSelector((state) => state.cart);
  const submitUpdateMedia = () => {};

  const handleBack = () => {
    history.goBack();
  };
  const authorizationProps = useMemo(
    () => ({
      history,
      accountId,

      token,
      component: true,
    }),
    [history, accountId, token]
  );

  const commentProps = useMemo(
    () => ({
      accountId,
      account,
      isMobile,
      postId,
      history,
    }),
    [postId, history, isMobile, account, accountId]
  );

  const pageTitle = (data) => {
    let titles = [
      { path: "", title: "roduct details" },
      { path: "update", title: "Update" },
      { path: "checkout", title: "Checkout" },
      { path: "auth", title: "Account" },
      { path: "comment", title: "Comment" },
    ];
    let res = titles.find((x) => x.path === data);
    if (res) {
      return res.title;
    } else {
      return;
    }
  };
  const productInfoProps = useMemo(
    () => ({
      product,
      currency,
      isMobile,
      taxRate,
      history,
      setTrack,
      toggleVolume,
      setSelectedMedia,
      accountId,
      track,

      totalComments,
      totalLikes,
      ctype,
    }),
    [
      product,
      accountId,

      totalComments,
      totalLikes,
      taxRate,
      isMobile,
      ctype,
      setTrack,
      setSelectedMedia,
      toggleVolume,
      history,
      currency,
      track,
    ]
  );
  // const pageTitle =   ctype === "update" ? "Update" : ctype === "checkout" ? "Checkout" : ctype === "auth" ? "Account" : !ctype && "Product details"
  return (
    <div className="homeContentScreenItemDetails">
      <div className="homeContentScreenItemDetailsHeader">
        {ctype && (
          <span
            className="homeContentScreenItemDetailsHeaderBack"
            onClick={handleBack}
          >
            <IoArrowBack />
          </span>
        )}
        {pageTitle(ctype)}
      </div>
      <div className="homeContentScreenItemDetailsAbout">
        {ctype === "checkout" ? (
          <ProductInfo {...productInfoProps} />
        ) : ctype === "cart" ? (
          "Cart"
        ) : (
          <ProductInfo {...productInfoProps} />
        )}
      </div>
    </div>
  );
};

export default 
ScreenRightSection;
