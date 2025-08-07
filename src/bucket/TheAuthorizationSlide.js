import { memo, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import Dialog from "./dialog/Dialog";
import Toolbar from "./dialog/Toolbar";
import AppBar from "./dialog/AppBar";
import Authorization from "../views/Authorization";
import { useSelector } from "react-redux";
const AuthorizationSlide = (props) => {
  const { history, token, handleClose, className, isMobile, ctype, open } =
    props;
  const { authenticate, user } = useSelector((state) => state.signIn);
console.log({user, authenticate})
  useEffect(()=>{
    if(ctype === "auth"){

      if(user?._id || authenticate){
        handleClose()
      }
    }
  },[ctype, handleClose, user, authenticate  ])

  const info = {
    isMobile,
    history,
    handleClose,
    open: open || ctype === "auth" ? true : false,
    token,
    component: true,
    parentDialog: false,
  };
  return (
    <Dialog
      parentDialog={true}
      open={open ? true : ctype === "auth" ? true : false}
      adjustFullscreen={isMobile ? true : false}
      onClose={handleClose}
      className={className}
    >
      <AppBar>
        <Toolbar>
          <div onClick={handleClose} className="modalBack">
            <IoClose className="arrowStyle" />
            <div className="headerLeftSection">Account</div>
          </div>
        </Toolbar>
      </AppBar>
      <Authorization {...info} />
    </Dialog>
  );
};

export default memo(AuthorizationSlide);
