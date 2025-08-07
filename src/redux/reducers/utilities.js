const instantUpdate = (current, newItem) => {
  let updatedArray = []
  if (newItem) {
    for (let item of current) {
      updatedArray.push({ ...item, newItem })
    }
  }
  return updatedArray
}

const deleteMembers = (currentArr, deleteArr) => {
  if(deleteArr.length > 0){
    return currentArr.filter((data) => {
      return !deleteArr.find((item) => item._id === data._id);
    });
  }
}

const addItem = (currentArr, newItem ) => {
  if(newItem){
    return [newItem, ...currentArr];
  }
}

const allData = (currentData, newData)=> {
  if(currentData.length > 0){
    return currentData.filter(data => {
      return newData.find(item => item._id === data._id)
    })
  } else { return newData}
}

const updateMemberActivity= (currentArr, newArray, crud) =>{
  if(crud === 'DELETE'){
  } else if(crud === 'NEW') {
    if(newArray?.length > 0){
      return [...newArray, ...currentArr]
    }
  } else if(crud === 'UPDATE'){
    return currentArr

  } else{
  return currentArr}
}

// const updateArray = (oldData, newData)=>{
//   if(oldData.length > 0){
//     oldData.forEach(item=>{

//     })
//   }
// }

const ratingArr = [
  { value: 1, activeIndex: [1, 2, 3, 4, 5] },
  { value: 2, activeIndex: [2, 3, 4, 5] },
  { value: 3, activeIndex: [3, 4, 5] },
  { value: 4, activeIndex: [4, 5] },
  { value: 5, activeIndex: [5] },
];


export {
  instantUpdate,
deleteMembers,
addItem,
allData,
ratingArr,
updateMemberActivity
}