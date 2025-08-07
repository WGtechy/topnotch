const toSelectOptions = (data, value) => {
  let arr = [];
  if (data?.length > 0) {
    // let initName = data
    data.forEach((item) => item.display || item.display === undefined ? arr.push({ value: item._id, name: `${item?.title || ""} ${item?.name || ""} ${item?.firstName || ""} ${item?.surname || ""} ` }) : null);
    return arr;
  } else {
    return arr;
  }
};

const toSelectStringOption = (data, value) => {
  let arr = [];
  if (data?.length > 0) {
    // let initName = data
    data.forEach((item) => item.display || item.display === undefined ? arr.push({ value: item, name: item }) : null);
    return arr;
  } else {
    return arr;
  }
};

const optionsFromCAccount = (data, value) => {
  let arr = [];
  if (data?.length > 0) {
    // let initName = data
    data.forEach((item) =>  arr.push({ value: item, name: item }));
    return arr;
  } else {
    return arr;
  }
};

const  toSelectOptionsName = (data, value) => {
  let arr = [];
  if (data?.length > 0) {
    // let initName = data
    data.forEach((item) => item.display || item.display === undefined ? arr.push({ value: item.name, name: item?.name }) : null);
    return arr;
  } else {
    return arr;
  }
};

const  toSelectOptionsNameAndValue = (data, value) => {
  let arr = [];
  if (data?.length > 0) {
    // let initName = data
    data.forEach((item) => item.display || item.display === undefined ? arr.push({ value: item.value, name: item?.name }) : null);
    return arr;
  } else {
    return arr;
  }
};

const  toSelectCountry = (data, value) => {
  let arr = [{ value: {}, name: 'Select' }];
  if (data?.length > 0) {
    // let initName = data
    data.forEach((item) =>  arr.push({ value:item.name, name: item?.name }));
    return arr;
  } else {
    return arr;
  }
};

const toSelectOptionsCurrency = (data, value) => {
  let arr = [];
  if (data?.length > 0) {
    // let initName = data
    data.forEach((item) => item.display || item.display === undefined ? arr.push({ 
      value: item?.id,
name: item?.name,
symbol_native: item?.symbol_native,
decimal_digits: item?.decimal_digits,
rounding: item?.rounding,
code: item?.code,
name_plural: item?.name_plural,
    }) : null);
    return arr;
  } else {
    return arr;
  }
};

export { toSelectOptions, toSelectOptionsNameAndValue, toSelectStringOption, toSelectOptionsName, toSelectCountry, optionsFromCAccount, toSelectOptionsCurrency };
