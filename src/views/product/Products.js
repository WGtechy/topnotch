import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import CardTwo from "../../bucket/cards/CardTwo";
import EmptyDataPage from "../../bucket/EmptyDataPage";
import useArrayData from "../../utilities-config/useArrayData";
import { useSelector } from "react-redux";
import { loadingIcon } from "../../bucket/loading-components/loadingIcon";
import { componentLoader } from "../../bucket/loading-components/componentLoader";

const Products = (props) => {
  const { currency, history, isMobile } = props;
  const { loading, products: data } = useSelector((state) => state.products);
  const [page, setPage] = useState(0);
  const cardRef = useRef();
  const [currentData, setCurrentData] = useState([]);
  const allData = useArrayData(currentData);

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(
  //     getProducts({
  //       condition: {
  //         productType: "Shortlet",
  //         live: true,
  //       },
  //       page,
  //     })
  //   );
  // }, [name, page, dispatch]);

  const lastDataRefElement = useCallback(
    (node) => {
      if (loading) return;
      if (cardRef.current) cardRef.current.disconnect();
      cardRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !!data.length) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) cardRef.current.observe(node);
    },
    [loading, data]
  );

  useEffect(() => {
    if (!!data?.length) {
      setCurrentData((init) => [...data, ...init]);
    }
  }, [data]);

  const cardDisplay = ({ item, i, ref }) => {
    const obj = {
      key: i,
      ref: ref ? lastDataRefElement : null,
      options: item?.options,
      bannerImage: item?.bannerImage,
      title: item?.title,
      link: `/product-details/pn=${item?.slug}&pid=${item?._id}`,
      description: item?.description,
      price: item?.price,
      product: item,
      discount: item?.discount,
      priceDependent: item?.priceDependent,
      location: item?.location,
      date: item?.date,
      currency,
      productType: "Shortlet",
      slug: item.slug,
    };
    return <CardTwo {...obj} />;
  };
  const template = (!!allData.length ? (
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
    allData.length === 0 && <EmptyDataPage message="No products" />
  ))

  return (
    <>
{/* {
    isMobile ? template : <div className="products">
      <div className="productsFilter">Filter</div>
      {template}
    </div>} */}
    {template}
      {allData.length === 0 && !data?.length && loading && componentLoader}
      {allData.length > 0 && loading && loadingIcon}
   </>
  );
};

export default memo(Products);
