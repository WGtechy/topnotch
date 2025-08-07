const date = new Date();
function monthDateFunc(value) {
  return new Date(date.getFullYear(), value, date.getDate());
}
const months = [
  { name: "January", value: monthDateFunc(0) },
  { name: "Febuary", value: monthDateFunc(1) },
  { name: "March", value: monthDateFunc(2) },
  { name: "April", value: monthDateFunc(3) },
  { name: "May", value: monthDateFunc(4) },
  { name: "June", value: monthDateFunc(5) },
  { name: "July", value: monthDateFunc(6) },
  { name: "August", value: monthDateFunc(7) },
  { name: "September", value: monthDateFunc(8) },
  { name: "October", value: monthDateFunc(9) },
  { name: "November", value: monthDateFunc(10) },
  { name: "December", value: monthDateFunc(11) },
];
const years = [
  {
    name: new Date(
      date.getFullYear() - 2,
      date.getMonth(),
      date.getDate()
    ).getFullYear(),
    value: new Date(date.getFullYear() - 2, date.getMonth(), date.getDate()),
  },
  {
    name: new Date(
      date.getFullYear() - 1,
      date.getMonth(),
      date.getDate()
    ).getFullYear(),
    value: new Date(date.getFullYear() - 1, date.getMonth(), date.getDate()),
  },
  {
    name: new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ).getFullYear(),
    value: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
  },
];
function tableHeight(item) {
  if (item < 5) {
    return "300px";
  } else if (item >= 5 && item < 8) {
    return "400px";
  } else if (item > 8 && item <= 10) {
    return "580px";
  }
}

export { monthDateFunc, months, years, tableHeight };
