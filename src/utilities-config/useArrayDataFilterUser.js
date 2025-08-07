export default function useArrayDataFilterUser(data, targetId) {
  let result = [];
  const equalObj = (a, b) => a._id === b._id;
  data.forEach((item) => {
    const itemResult = result.find((resultItem) => equalObj(item, resultItem));
    if (!itemResult) {
      result.push(item);
    }
  });
  let filtered = result.filter((x) => x.accountId._id !== targetId);
  return filtered;

  // return ({...obj})
}
