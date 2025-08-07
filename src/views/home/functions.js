import {
  IoChatbubble,
  IoClose,
  IoEllipsisVertical,
  IoEye,
  IoPencil,
  IoPersonAdd,
  IoReader,
  IoStar,
  IoTrash,
} from "react-icons/io5";

const handleImage = ({
  e,
  setLocalFiles,
  setServerFiles,
  localFiles,
  serverFiles,
}) => {
  let aImg = [];
  let server = [];
  let imgArray = [...e.target.files];
  imgArray.forEach((x) => {
    const reader = new FileReader();
    reader.readAsDataURL(x);
    reader.onload = () => {
      aImg = [...aImg, reader.result].concat(localFiles);
      server = [...server, x].concat(serverFiles);
      setServerFiles([...new Set(server)]);
      setLocalFiles([...new Set(aImg)]);
    };
    // reader.onprogress = (data) => {
    //   aImg = [
    //     ...aImg,
    //     ...localFiles,
    //     { progress: Math.round((data.loaded * 100) / data.total), src: "" },
    //   ];
    //   if (data.lengthComputable) {
    //     setLocalFiles([...new Set(aImg)]);
    //   }
    // };
  });
};

const deleteImage = ({ item, setServerFiles, setLocalFiles }) => {
  setServerFiles((arr) => arr.filter((x) => item !== x));
  setLocalFiles((arr) => arr.filter((x) => item !== x));
};

const postOption = ({
  post,
  accountId,
  meetitngAvailable,
  handlerSetView,
  accessToCreatePosts,
}) => [
  // {
  //   name: "Comments",
  //   icon: IoChatbubble,
  //   action: handlerSetView("Comment"),
  //   display: true,
  // },
  {
    name: "Edit",
    icon: IoPencil,
    action: handlerSetView("Edit"),
    display: accountId === post?.addedBy?._id ? true : false,
  },
  {
    name: "Invite",
    icon: IoPersonAdd,
    action: handlerSetView("Invite"),
    display: true,
    // display: post?.settings?.allowParticipation && meetitngAvailable ? true : false,
  },

  {
    name: "Seen",
    icon: IoEye,
    action: handlerSetView("PostSeen"),
    display: accountId === post?.addedBy?._id ? true : false,
  },
  {
    name: "Registration",
    icon: IoReader,
    action: handlerSetView("Registration"),
    display:
      post?.settings?.allowParticipation && meetitngAvailable ? true : false,
  },
];




const checkIfIncludedId = ({item, accountId, action})=>{
  if(action === 'like'){
    let res = false
    for(let x of item){
      if(x?._id === accountId){
       res= true
      } else { 
        res = false}
    }
    return res
  } else {return}
};
export {
  postOption,
  handleImage,
  deleteImage,
  // convertNumbers,
  checkIfIncludedId
};
