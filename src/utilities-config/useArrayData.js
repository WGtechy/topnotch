import { useLocation } from "react-router-dom";

export default function useArrayData(data) {
  let result = [];
  const equalObj = (a, b) => a?._id === b?._id;
  data.forEach((item) => {
    const itemResult = result.find((resultItem) => equalObj(item, resultItem));
    if (!itemResult) {
      result.push(item);
    }
  });
  return result;

  // return ({...obj})
}
