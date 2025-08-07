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

const copyHandler = ({ copy, close }) => {
  close(null);
  navigator.clipboard.writeText(copy);
};
const replyHander = ({ close, item, action }) => {
  close(null);
  action(item);
};
const deleteHander = ({ close, item, action }) => {
  close(null);
  action(item, "Delete");
};
const commentOption = ({
  accountId,
  item,
  sendCommentToServer,
  setComposeNewComment,
  setOpenCardMenu,
}) => [
  {
    name: "Delete",
    icon: "cil-trash",
    action: () =>
      deleteHander({
        close: setOpenCardMenu,
        action: sendCommentToServer,
        item,
      }),
    display: accountId === item.accountId._id ? true : false,
  },
  // {
  //   name: 'Edit',
  //   icon: 'cil-pen',
  //   action: null,
  //   display: false},
  {
    name: "Reply",
    icon: "cil-at",
    action: () =>
      replyHander({
        close: setOpenCardMenu,
        action: setComposeNewComment,
        item,
      }),
    display: true,
  },
  {
    name: "Copy",
    icon: "cil-clone",
    action: () => copyHandler({ copy: item.content, close: setOpenCardMenu }),
    display: true,
  },
  // {
  //   name: 'Read',
  //   icon: 'cil-check-alt',
  //   action: null,
  //   display: accountId === item.accountId._id ? true : false},
  // {
  //   name: 'Replies',
  //   icon: 'cil-chat-bubble',
  //   action: null,
  //   display: true
  // }
];

export { handleImage, deleteImage };
