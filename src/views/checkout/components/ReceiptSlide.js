import { IoClose } from "react-icons/io5";
import AppBar from "../../../bucket/dialog/AppBar";
import Toolbar from "../../../bucket/dialog/Toolbar";
import Dialog from "../../../bucket/dialog/Dialog";
import Receipt from "../Receipt";
const ReceiptSlide = (props) => {
  const { open, handleClose, title, data, isAdmin,
    manager, handleUpdate } = props;

 const receiptProps = {
    item: data
 }

  return (
    <>
      <Dialog
        parentDialog={true}
        open={open}
        adjustFullscreen={true}
        onClose={handleClose}
      >
        <AppBar>
          <Toolbar>
            <div onClick={handleClose} className="modalBack">
              <IoClose className="arrowStyle" />
              <span className="headerLeftSection">{title}</span>
            </div>
            {handleUpdate && title === "Products" ? isAdmin || manager ?<div className="headerRight" onClick={()=>handleUpdate(data)}>Edit</div> : null : null}
          </Toolbar>
        </AppBar>
        <Receipt {...receiptProps} />
      </Dialog>
    </>
  );
};

export default ReceiptSlide;
