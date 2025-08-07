import { FaShapes } from "react-icons/fa6";
const Features = ({ product, handleClose }) => {

  return (
    <div className="productInfoFeatures">
      <div className="productInfoFeaturesTitle" id="Features">
        <span className="productInfoFeaturesTitleIcon">
          {" "}
          <FaShapes />
        </span>
        Features
      </div>
      {!!product.features?.length && (
        <div className="productInfoFeaturesContent">
          {product.features
            .filter((x) => x.feature?.active)
            .slice(0, 3)
            .map(
              (feat, i) =>
                feat?.feature?.active && (
                  <div className="productInfoFeaturesContentItem" key={i}>
                    <div className="productInfoFeaturesContentItemTitle">
                      {feat.feature?.name}
                    </div>
                    {!!feat?.subFeatures?.length && (
                      <div className="productInfoFeaturesContentItemSub">
                        {feat.subFeatures.map(
                          (sub, i) =>
                            sub.name.active && (
                              <div
                                className="productInfoFeaturesContentItemSubItem"
                                key={i}
                              >
                                <div className="productInfoFeaturesContentItemSubItemTitle">
                                  {" "}
                                  {sub?.name?.name}{" "}
                                </div>
                                <div
                                      className="productInfoFeaturesContentItemSubItemSub"
                                    >
                                {!!sub.subFeatureItem.length &&
                                  sub.subFeatureItem.map((subItem, i) => (
                                    <div
                                      className="productInfoFeaturesContentItemSubItemSubItem"
                                      key={i}
                                    >
                                      {" "}
                                      {subItem?.name}{" "}
                                    </div>
                                  ))}
                              </div>
                              </div>
                            )
                        )}
                      </div>
                    )}
                  </div>
                )
            )}
        </div>
      )}
      {product.features.length > 5 && (
        <div className="productInfoFeaturesBtn" onClick={handleClose}>
          See more features
        </div>
      )}
    </div>
  );
};

export default Features;
