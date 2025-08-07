import React from "react";
import CardOne from "./cards/CardOne";
import SectionLayout1 from "./SectionLayout1";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const BlogComponent = ({ currency }) => {
  const recommendations = [
    {
      images: ["benz1.jpg"],
      title: "Car name",
      description:
        "but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset ",
    },
    {
      options: { bathrooms: 4, toilets: 5, bedrooms: 4 },
      images: ["benz2.webp"],
      title: "Property name",
      description:
        "but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset ",
    },
    {
      options: { bathrooms: 4, toilets: 5, bedrooms: 4 },
      images: ["benz3.jpg", "benz3.jpeg"],
      title: "Property name",
      description:
        "but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset ",
    },

    {
      options: { bathrooms: 4, toilets: 5, bedrooms: 4 },
      images: ["benz3.jpeg"],
      title: "Property name",
      description:
        "but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset ",
    },
  ];
  const sectionProps = {
    title: "Blog",
    cardType: "blog",
    data: recommendations,
    className: "blogContainer",
  };
  return (
    <div className="blogContainer">
      <SectionLayout1 {...sectionProps} />
      <div className="blogContainerMore">
        <Link to="/blog" className=" btn">
          {" "}
          See More
        </Link>
      </div>
    </div>
  );
};

export default BlogComponent;
