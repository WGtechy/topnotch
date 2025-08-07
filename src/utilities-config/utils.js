const caseLetters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
]



  
const months = [
    "",
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthsAndValue = [
    { name: "January", value: 1 },
    { name: "Febuary", value: 2 },
    { name: "March", value: 3 },
    { name: "April", value: 4 },
    { name: "May", value: 5 },
    { name: "June", value: 6 },
    { name: "July", value: 7 },
    { name: "August", value: 8 },
    { name: "September", value: 9 },
    { name: "October", value: 10 },
    { name: "November", value: 11 },
    { name: "December", value: 12 },
  ];

  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const imageMimtype = ["image/png", "image/jpeg", "image/png", "image/jpg"];

  const videoMimtype = [
    "video/mp4",
    "video/mob",
    "video/webm",
    "video/x-m4v",
    "video/avi",
  ];
  
  const  handleImageError = (e)=>{
    e.currentTarget.style.display = "none";
    e.currentTarget.onerror = null;
  }

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
export {
  caseLetters, months,
  monthsAndValue,
  timeout,
  imageMimtype,
videoMimtype,
handleImageError,
toSelectOptionsName
  
}