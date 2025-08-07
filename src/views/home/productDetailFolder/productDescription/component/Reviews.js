import React from 'react'
import { ratingArr } from '../../../../../redux/reducers/utilities'
import { IoStar } from 'react-icons/io5'
import { formattedAmount, formattedNumber } from '../../../../../utilities-config/numberFormatter'

const Reviews = ({rating, currency, totalLikes, discount, totalComments}) => {
  return (
    <ul className="productInfoReviews">
        <li className="productInfoReviewsItem">
          <div className="productInfoReviewsItemTitle">{rating} </div>
          <div className="productInfoReviewsItemRating">
            {ratingArr.map((item, i) => (
              <span className="" key={i}>
                <IoStar
                  className={
                    item.activeIndex.includes(rating) ? "Icon" : ""
                  }
                />
              </span>
            ))}
          </div>
        </li>
        <li className="productInfoReviewsItem">
          <div className="productInfoReviewsItemTitle">Likes</div>
          <div className="productInfoReviewsItemCount">
            {formattedNumber(totalLikes)}
          </div>
        </li>
        <li className="productInfoReviewsItem">
          <div className="productInfoReviewsItemTitle">Discount</div>
          <div className="productInfoReviewsItemCount">{discount ? formattedAmount({
            amount: discount,
            currencyValue: currency.value,
          }) : 0}</div>
        </li>
        <li className="productInfoReviewsItem">
          <div className="productInfoReviewsItemTitle">Reviews</div>
          <div className="productInfoReviewsItemCount">
            {formattedNumber(totalComments)}
          </div>
        </li>
      </ul>
  )
}

export default Reviews