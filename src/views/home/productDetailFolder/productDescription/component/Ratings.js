import React, { useRef } from 'react'
import { IoArrowBack, IoArrowForward, IoStar } from 'react-icons/io5';
import { ratingArr } from '../../../../../redux/reducers/utilities';
import { convertNumbers } from '../../../../../utilities-config/numberFormatter';
import TheItemsScrollTemplate from '../../../../../bucket/TheItemsScrollTemplate';

const Ratings = ({product, isMobile,}) => {

    let ratingRef = useRef(null);

 

  const handleBackRating = () => {
    const scrollAmount = (ratingRef.current.clientWidth * -1) / 4;
    ratingRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };
  const handleForwardRating = () => {
    const scrollAmount = (ratingRef.current.clientWidth * 1) / 4;
    ratingRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

     const customerRatingTemplate = (custormerRating) => (
        <div className="productInfoCustomerRatingItem">
          <div className="productInfoCustomerRatingItemTitle">
            {custormerRating?.name}
          </div>
          <div className="productInfoCustomerRatingItemRating">
            {custormerRating?.responses.map((item, i) => (
              <div className="productInfoCustomerRatingItemRatingItem" key={i}>
                <span className="productInfoCustomerRatingItemRatingItemCount">
                  {item.count}
                </span>
                <span className="productInfoCustomerRatingItemRatingItemStars">
                  {ratingArr.map((item, star) => (
                    <span className="" key={star}>
                      <IoStar
                        className={
                          item.activeIndex.includes(
                            custormerRating?.responses.length - i
                          )
                            ? "productInfoCustomerRatingItemRatingItemStarsIcon"
                            : "productInfoCustomerRatingItemRatingItemStarsInactive"
                        }
                      />
                    </span>
                  ))}
                </span>
                <span className="productInfoCustomerRatingItemRatingItemPeople">
                  {convertNumbers({ value: item.people })}{" "}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
  return (
    <div className="productInfoCustomer">
            <div className="productInfoCustomerTop">Rating </div>
            <div className="productInfoCustomerRating" ref={ratingRef}>
          <TheItemsScrollTemplate scrollRef = {ratingRef} isMobile={isMobile}>

              {customerRatingTemplate(product?.customerRating?.ratingCount)}
              {customerRatingTemplate(product?.customerRating?.cleanliness)}
              {customerRatingTemplate(product?.customerRating?.accuracy)}
              {customerRatingTemplate(product?.customerRating?.value)}
              {customerRatingTemplate(product?.customerRating?.service)}
          </TheItemsScrollTemplate>
            </div>
           
          </div>
  )
}

export default Ratings