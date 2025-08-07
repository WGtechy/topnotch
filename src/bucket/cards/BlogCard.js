import React, { forwardRef } from "react";
import Image from "../Image";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const BlogCard = forwardRef(({ image, title, description, _id }, ref) => {
  return (
    <Link to={`/${_id}`} className="blogCard" ref={ref}>
      <div className="blogCardImage">
        <Image src={image} alt={"blog image"}  />

      </div>
      <div className="blogCardContent">
        <div className="blogCardContentTitle">{title}</div>
        <div className="blogCardContentDescription reduceText">
          {description}
        </div>
      </div>
    </Link>
  );
});

export default BlogCard;
