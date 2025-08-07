import React, { useCallback, useEffect, useRef, useState } from "react";
import { ScreenTemplate } from "../home";
import useUrlSearchParams from "../../utilities-config/useUrlSearchParams";
import { getProduct } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Error404 } from "..";
import { componentLoader } from "../../bucket/loading-components/componentLoader";
import ProductInfo from "../home/productDetailFolder/productDescription/ProductInfo";
import EmptyDataPage from "../../bucket/EmptyDataPage";

// const product = {
//   _id: '1',
//   likeCounts: 45,
//   isPost: true,
//   totalLikes: 4999,
//   totalComments: 340,
//   postLikes: [],
//   postSaved: [],
//   productId: {
//     _id: 0,
//     title: "Test product one testing testing product one testing",
//     country: "Nigeria",
//     city: "Lagos",
//     neighborhood: "Maryland",
//     price: 2000000000,
//     productType: "Shortlet",
//     priceDependent: "Night",
//     marketingType: "Rent",
//     agencyFee: 545555,
//      isVirtualTour: true,
// virtualTourDescription: " tour description to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s withto make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s withto make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s withto make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in theto make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s withto make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s withto make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s withto make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s withto make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s withto make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s withto make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with 1960s withto make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with",
// virtualTourFee: 30900,
// isOnsiteTour: true,
// onsiteTourDescription: " tour description to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s withto make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s withto make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s withto make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in theto make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s withto make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s withto make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s withto make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s withto make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s withto make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s withto make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with 1960s withto make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with",
// onsiteTourFee: 30900,
//     minimumPurchase: 6,
//     unavailableDates: [],
//     slug: "test-1",
//     customerRating: {
//       ratingCount: {
//         name: "Rating count",
//         responses: [
//           { count: 5, people: 12554340 },
//           { count: 4, people: 12554340 },
//           { count: 3, people: 12554340 },
//           { count: 2, people: 12554340 },
//           { count: 1, people: 12554340 },
//         ],
//       },
//       cleanliness: {
//         name: "Cleanliness",
//         responses: [
//           { count: 5, people: 12554340 },
//           { count: 4, people: 12554340 },
//           { count: 3, people: 12554340 },
//           { count: 2, people: 12554340 },
//           { count: 1, people: 12554340 },
//         ],
//       },
//       accuracy: {
//         name: "Accuracy",
//         responses: [
//           { count: 5, people: 12554340 },
//           { count: 4, people: 12554340 },
//           { count: 3, people: 12554340 },
//           { count: 2, people: 12554340 },
//           { count: 1, people: 12554340 },
//         ],
//       },
//       value: {
//         name: "Value for money",
//         responses: [
//           { count: 5, people: 12554340 },
//           { count: 4, people: 12554340 },
//           { count: 3, people: 12554340 },
//           { count: 2, people: 12554340 },
//           { count: 1, people: 12554340 },
//         ],
//       },
//       service: {
//         name: "Good service",
//         responses: [
//           { count: 5, people: 12554340 },
//           { count: 4, people: 12554340 },
//           { count: 3, people: 12554340 },
//           { count: 2, people: 12554340 },
//           { count: 1, people: 12554340 },
//         ],
//       },
//     },
//     policies: [
//       { name: "No smoking", description: "We do not allow smoking" },
//       { name: "No music", description: "We do not allow music" },
//       { name: "No visitors", description: "We do not allow visitors" },
//       { name: "No parking", description: "We do not allow parking" },
//       { name: "No loitring", description: "We do not allow loitring" },
//       { name: "No noise", description: "We do not allow noise" },
//       { name: "No jumping", description: "We do not allow jumping" },
//     ],
//     rating: 5,
//     bannerImage: "",
//     discount: 400,
//     features: [
//       {
//         feature: { name: "Toilet", active: true },
//         subFeatures: [
//           {
//             name: { name: "Utils", active: true },
//             subFeatureItem: [
//               { name: "Tissues", active: true },
//               { name: "Brooms", active: true },
//               { name: "Handwash", active: true },
//             ],
//           },
//           {
//             name: { name: "Bathroom", active: true },
//             subFeatureItem: [
//               { name: "Soap", active: true },
//               { name: "Towel", active: true },
//             ],
//           },
//         ],
//       },
//       {
//         feature: { name: "Thjkoilet", active: true },
//         subFeatures: [
//           {
//             name: { name: "Ujktils", active: true },
//             subFeatureItem: [
//               { name: "Tissjkues", active: true },
//               { name: "Brjklooms", active: true },
//               { name: "Hajkndwash", active: true },
//             ],
//           },
//           {
//             name: { name: "Bathjkroom", active: true },
//             subFeatureItem: [
//               { name: "Sjkloap", active: true },
//               { name: "Tojkwel", active: true },
//             ],
//           },
//           {
//             name: { name: "Ujktils", active: true },
//             subFeatureItem: [
//               { name: "Tissjkues", active: true },
//               { name: "Brjklooms", active: true },
//               { name: "Hajkndwash", active: true },
//             ],
//           },
//           {
//             name: { name: "Bathjkroom", active: true },
//             subFeatureItem: [
//               { name: "Sjkloap", active: true },
//               { name: "Tojkwel", active: true },
//             ],
//           },
//           {
//             name: { name: "Ujktils", active: true },
//             subFeatureItem: [
//               { name: "Tissjkues", active: true },
//               { name: "Brjklooms", active: true },
//               { name: "Hajkndwash", active: true },
//             ],
//           },
//           {
//             name: { name: "Bathjkroom", active: true },
//             subFeatureItem: [
//               { name: "Sjkloap", active: true },
//               { name: "Tojkwel", active: true },
//             ],
//           },
//         ],
//       },
//       {
//         feature: { name: "Toilet", active: true },
//         subFeatures: [
//           {
//             name: { name: "Utils", active: true },
//             subFeatureItem: [
//               { name: "Tissues", active: true },
//               { name: "Brooms", active: true },
//               { name: "Handwash", active: true },
//             ],
//           },
//           {
//             name: { name: "Bathroom", active: true },
//             subFeatureItem: [
//               { name: "Soap", active: true },
//               { name: "Towel", active: true },
//             ],
//           },
//         ],
//       },
//       {
//         feature: { name: "Thjkoilet", active: true },
//         subFeatures: [
//           {
//             name: { name: "Ujktils", active: true },
//             subFeatureItem: [
//               { name: "Tissjkues", active: true },
//               { name: "Brjklooms", active: true },
//               { name: "Hajkndwash", active: true },
//             ],
//           },
//           {
//             name: { name: "Bathjkroom", active: true },
//             subFeatureItem: [
//               { name: "Sjkloap", active: true },
//               { name: "Tojkwel", active: true },
//             ],
//           },
//           {
//             name: { name: "Ujktils", active: true },
//             subFeatureItem: [
//               { name: "Tissjkues", active: true },
//               { name: "Brjklooms", active: true },
//               { name: "Hajkndwash", active: true },
//             ],
//           },
//           {
//             name: { name: "Bathjkroom", active: true },
//             subFeatureItem: [
//               { name: "Sjkloap", active: true },
//               { name: "Tojkwel", active: true },
//             ],
//           },
//           {
//             name: { name: "Ujktils", active: true },
//             subFeatureItem: [
//               { name: "Tissjkues", active: true },
//               { name: "Brjklooms", active: true },
//               { name: "Hajkndwash", active: true },
//             ],
//           },
//           {
//             name: { name: "Bathjkroom", active: true },
//             subFeatureItem: [
//               { name: "Sjkloap", active: true },
//               { name: "Tojkwel", active: true },
//             ],
//           },
//         ],
//       },
//       {
//         feature: { name: "Toilet", active: true },
//         subFeatures: [
//           {
//             name: { name: "Utils", active: true },
//             subFeatureItem: [
//               { name: "Tissues", active: true },
//               { name: "Brooms", active: true },
//               { name: "Handwash", active: true },
//             ],
//           },
//           {
//             name: { name: "Bathroom", active: true },
//             subFeatureItem: [
//               { name: "Soap", active: true },
//               { name: "Towel", active: true },
//             ],
//           },
//         ],
//       },
//       {
//         feature: { name: "Thjkoilet", active: true },
//         subFeatures: [
//           {
//             name: { name: "Ujktils", active: true },
//             subFeatureItem: [
//               { name: "Tissjkues", active: true },
//               { name: "Brjklooms", active: true },
//               { name: "Hajkndwash", active: true },
//             ],
//           },
//           {
//             name: { name: "Bathjkroom", active: true },
//             subFeatureItem: [
//               { name: "Sjkloap", active: true },
//               { name: "Tojkwel", active: true },
//             ],
//           },
//           {
//             name: { name: "Ujktils", active: true },
//             subFeatureItem: [
//               { name: "Tissjkues", active: true },
//               { name: "Brjklooms", active: true },
//               { name: "Hajkndwash", active: true },
//             ],
//           },
//           {
//             name: { name: "Bathjkroom", active: true },
//             subFeatureItem: [
//               { name: "Sjkloap", active: true },
//               { name: "Tojkwel", active: true },
//             ],
//           },
//           {
//             name: { name: "Ujktils", active: true },
//             subFeatureItem: [
//               { name: "Tissjkues", active: true },
//               { name: "Brjklooms", active: true },
//               { name: "Hajkndwash", active: true },
//             ],
//           },
//           {
//             name: { name: "Bathjkroom", active: true },
//             subFeatureItem: [
//               { name: "Sjkloap", active: true },
//               { name: "Tojkwel", active: true },
//             ],
//           },
//         ],
//       },
//       {
//         feature: { name: "Toilet", active: true },
//         subFeatures: [
//           {
//             name: { name: "Utils", active: true },
//             subFeatureItem: [
//               { name: "Tissues", active: true },
//               { name: "Brooms", active: true },
//               { name: "Handwash", active: true },
//             ],
//           },
//           {
//             name: { name: "Bathroom", active: true },
//             subFeatureItem: [
//               { name: "Soap", active: true },
//               { name: "Towel", active: true },
//             ],
//           },
//         ],
//       },
//       {
//         feature: { name: "Thjkoilet", active: true },
//         subFeatures: [
//           {
//             name: { name: "Ujktils", active: true },
//             subFeatureItem: [
//               { name: "Tissjkues", active: true },
//               { name: "Brjklooms", active: true },
//               { name: "Hajkndwash", active: true },
//             ],
//           },
//           {
//             name: { name: "Bathjkroom", active: true },
//             subFeatureItem: [
//               { name: "Sjkloap", active: true },
//               { name: "Tojkwel", active: true },
//             ],
//           },
//           {
//             name: { name: "Ujktils", active: true },
//             subFeatureItem: [
//               { name: "Tissjkues", active: true },
//               { name: "Brjklooms", active: true },
//               { name: "Hajkndwash", active: true },
//             ],
//           },
//           {
//             name: { name: "Bathjkroom", active: true },
//             subFeatureItem: [
//               { name: "Sjkloap", active: true },
//               { name: "Tojkwel", active: true },
//             ],
//           },
//           {
//             name: { name: "Ujktils", active: true },
//             subFeatureItem: [
//               { name: "Tissjkues", active: true },
//               { name: "Brjklooms", active: true },
//               { name: "Hajkndwash", active: true },
//             ],
//           },
//           {
//             name: { name: "Bathjkroom", active: true },
//             subFeatureItem: [
//               { name: "Sjkloap", active: true },
//               { name: "Tojkwel", active: true },
//             ],
//           },
//         ],
//       },
//     ],
//     recommendations: [
//       {
//         title: "sldkjf lksjf lkjsdflkjsdf lkjsdf lkj",
//         _id: 1,
//         bannerImage: { media: "./shortlet2.jpg" },
//         productType: "Shortlet",
//         priceDependent: "Night",
//         marketingType: "Rent",
//         price: 4399,
//         country: "Nigeria",
//         city: "Lagos",
//         neighborhood: "Maryland",
//       },
//       {
//         title: "sldkjf lksjf lkjsdflkjsdf lkjsdf lkj",
//         _id: 12,
//         bannerImage: { media: "./shortlet1.jpg" },
//         productType: "Shortlet",
//         priceDependent: "Night",
//         marketingType: "Rent",
//         price: 4399,
//         country: "Nigeria",
//         city: "Lagos",
//         neighborhood: "Maryland",
//       },
//       {
//         title: "sldkjf lksjf lkjsdflkjsdf lkjsdf lkj",
//         _id: 2,
//         bannerImage: { media: "./shortlet2.jpg" },
//         productType: "Shortlet",
//         priceDependent: "Night",
//         marketingType: "Rent",
//         price: 4399,
//         country: "Nigeria",
//         city: "Lagos",
//         neighborhood: "Maryland",
//       },
//       {
//         title: "sldkjf lksjf lkjsdflkjsdf lkjsdf lkj",
//         _id: 3,
//         bannerImage: { media: "./shortlet1.jpg" },
//         country: "Nigeria",
//         price: 4399,
//         city: "Lagos",
//         neighborhood: "Maryland",
//       },
//       {
//         title: "sldkjf lksjf lkjsdflkjsdf lkjsdf lkj",
//         _id: 6,
//         bannerImage: { media: "./shortlet2.jpg" },
//         productType: "Shortlet",
//         priceDependent: "Night",
//         marketingType: "Rent",
//         price: 4399,
//         country: "Nigeria",
//         city: "Lagos",
//         neighborhood: "Maryland",
//       },
//       {
//         title: "sldkjf lksjf lkjsdflkjsdf lkjsdf lkj",
//         _id: 7,
//         bannerImage: { media: "./shortlet1.jpg" },
//         country: "Nigeria",
//         city: "Lagos",
//         neighborhood: "Maryland",
//       },
//     ],
//     description:
//       "to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s withto make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s withto make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s withto make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in theto make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s withto make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s withto make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s withto make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s withto make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s withto make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s withto make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with 1960s withto make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with",
//     media: [
//       {
//         name: "View",
//         _id: "1",
//         mimetype: "video/mp4",
//         mediaTime: "5.454",
//         description:
//           "1 to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letras to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with",
//         media: "../video3.mp4",
//       },
//       {
//         name: "view2",
//         _id: "2",
//         mimetype: "video/mp4",
//         mediaTime: "13.454",
//         description:
//           "ok. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It 2 to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s withto make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with It was popularised in the 1960s with the release of Letras",
//         media: "../video4.mp4",
//       },
//       {
//         name: "view 3",
//         _id: "3",
//         mimetype: "image/jpg",
//         // mediaTime: "56.454",
//         description:
//           "vived not only five centuries, but also the leap into electronic typesetting, remaining essentia2 to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s withto make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with It was popularised in the 1960s with the release of Letras",
//         media: "../shortlet1.jpg",
//       },
//     ],
//   },
// }
const ProductDetails = ({
  accountId,
  isMobile,
  currency,
  isAdmin,
isManager,
  account,
  history,
  taxRate,
}) => {
    const { loadingProduct, product, status } = useSelector(
      (state) => state.products
    );
  console.log({product})
    const dispatch = useDispatch();
    const {pid} = useUrlSearchParams();
    const once = useRef(true);
  
    useEffect(()=>{
      if(pid && once.current){
        dispatch(getProduct(pid))
        return ()=>once.current = false
      }
    },[pid, dispatch]);

  const info = {
    product,
    currency,
    isMobile,
    history,
    accountId,
    isAdmin,
    isManager,
    taxRate,
    account,
    parentDialog: false,
    totalComments: product?.totalComments,
    totalLikes: product?.totalLikes,
  };
  return status === 404 ? (
    <Error404 />
  ) : loadingProduct ? (
    componentLoader
  ) : (
    product ?  <ProductInfo {...info} /> : <EmptyDataPage title={"Unknown product"} message={"Please check the product link you are trying to view"} />

  );
};

export default ProductDetails;
