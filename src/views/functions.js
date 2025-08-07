export const remainingMembers = (existing, members) => {
  if(existing.length > 0){
    return members.filter((data) => {
      return !existing.find((item) => item._id === data._id);
    });
  } else { return members}
}
