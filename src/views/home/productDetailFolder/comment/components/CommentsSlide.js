import { memo } from "react";
  import {IoClose } from "react-icons/io5";
import AppBar from "../../../../../bucket/dialog/AppBar";
import Dialog from "../../../../../bucket/dialog/Dialog";
import Toolbar from "../../../../../bucket/dialog/Toolbar";
import Comment from "../Comment";
  const CommentsSlide = (props) => {
    const {
      isMobile, product,
  history,
  accountId,
  ctype,
  handleClose
    } = props;


    const info = {
        product,
  isMobile,
  history,
  accountId,
  parentDialog: false,
  ctype,
    }

  
    return (
      <Dialog
        parentDialog={true}
        open={ctype === "comment" ? true : false}
        adjustFullscreen={isMobile ? true : false}
        onClose={handleClose}
        className="adjustable"
      >
        <AppBar>
          <Toolbar>
            <div onClick={handleClose} className="modalBack">
              <IoClose className="arrowStyle" />
              <span className="headerLeftSection">What people are saying</span>
            </div>
          </Toolbar>
        </AppBar>
        <Comment {...info} />
      </Dialog>
    );
  };
  
  export default memo(CommentsSlide);
  