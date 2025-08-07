import ScrollableTemplate1 from "../../../../../bucket/ScrollableTemplate1";

const Recommendations = ({
  product,
  currency,
  selectedRecommendations,
  isMobile,
  handleSelectRecommendation,
}) => {
  return (
    <>
      <div className="productInfoRecommendations">
        <div className="productInfoRecommendationsTitle" id="Recommendation">
          You may be interested
        </div>
        <ScrollableTemplate1
          isMobile={isMobile}
          data={product.recommendations}
          isLink={false}
          alreadySelectedItems={selectedRecommendations}
          onClick={handleSelectRecommendation}
          cardType="recommendation"
          currency={currency}
          isShop={true}
          disableScroll={undefined}
        />
      </div>
    </>
  );
};

export default Recommendations;
