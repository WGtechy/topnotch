import React, {
  memo,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import useArrayData from "../utilities-config/useArrayData";
import CardTwo from "../bucket/cards/CardTwo";
import { loadingIcon } from "../bucket/loading-components/loadingIcon";
import { ShortletSearchAndFilterBoard } from "../bucket/ShortletSearchAndFilterBoard";
import { PropertSearch } from "../bucket/PropertSearch";
import { pageLoader } from "../bucket/pageLoader";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions/products.action";
import EmptyDataPage from "../bucket/EmptyDataPage";
import { componentLoader } from "../bucket/loading-components/componentLoader";
import Error404 from "./Error404";

const DraftProducts = (props) => {
  const {
    isAdmin,
    currency,
    manager,
    history,
    name,
    locations,
    accountId,
    buildingCategories,
  } = props;
  const { draft, loading } = useSelector((state) => state.products);
  const [page, setPage] = useState(0);
  const cardRef = useRef();
  const [currentData, setCurrentData] = useState([]);
  const [addNew, setAddNew] = useState(false);
  const allData = useArrayData(currentData);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getProducts({
        condition: {
          live: false,
        },
        accountId,
        target: "Draft",
        from: isAdmin ? "admin" : "manager",
        page,
      })
    );
  }, [isAdmin, accountId, page, dispatch]);

  const lastDataRefElement = useCallback(
    (node) => {
      if (loading) return;
      if (cardRef.current) cardRef.current.disconnect();
      cardRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !!draft.length) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) cardRef.current.observe(node);
    },
    [loading, draft]
  );

  const handleAddNew = () => setAddNew((prev) => !prev);
  useEffect(() => {
    if (!!draft?.length) {
      setCurrentData((init) => [...draft, ...init]);
    }
  }, [draft]);

  const cardDisplay = ({ item, i, ref }) => {
    const slug =
      item?.productType === "Shortlet"
        ? "shortlets"
        : item?.productType === "Property"
        ? "properties"
        : item?.productType === "Hotel"
        ? "hotels"
        : item?.productType === "Automobile" && "automobiles";
    const obj = {
      key: i,
      ref: ref ? lastDataRefElement : null,
      options: item?.options,
      bannerImage: item?.bannerImage,
      title: item?.title,
      link: `/${slug}/p?id=${item?._id}`,
      description: item?.description,
      price: item?.price,
      priceDependent: item?.priceDependent,
      location: item?.location,
      date: item?.date,
      currency,
      history,
      productType: item.productType,
      slug: item.slug,
    };
    return <CardTwo {...obj} />;
  };

  const shotletPropertiesProps = {
    placeholder: "Search property name",
    locations,
    productType: "Shortlet",
    buildingCategories,
    page,
    setPage,
    setCurrentData,
  };

  return !isAdmin || !manager ? (
    <>
      <Suspense fallback={pageLoader} className="cardDisplay page">
        <ShortletSearchAndFilterBoard banner={"./homeBanner4.jpg"}>
          <PropertSearch {...shotletPropertiesProps} />
        </ShortletSearchAndFilterBoard>
        {!!allData.length ? (
          <div className="cardDisplayGrid">
            {allData.map((item, i) => {
              if (allData.length === i + 1) {
                return cardDisplay({ item, i, ref: true });
              } else {
                return cardDisplay({ item, i });
              }
            })}
          </div>
        ) : (
          !loading &&
          allData.length === 0 && (
            <EmptyDataPage message="No products in draft" />
          )
        )}
        {allData.length > 0 && loading && loadingIcon}
        {allData.length === 0 && loading && componentLoader}
      </Suspense>
    </>
  ) : (
    <Error404 />
  );
};

export default memo(DraftProducts);
