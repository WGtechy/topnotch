import { memo, useEffect } from "react";
  import {IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "../../bucket/dialog/Dialog";
import AppBar from "../../bucket/dialog/AppBar";
import Toolbar from "../../bucket/dialog/Toolbar";
import { userProfile } from "../../redux/actions";
  const AddAndUpdateAdmin = (props) => {
    const {
      open,
      handleClose,
    parentDialog,
    accountId,
    } = props;
    const { loadingAdmin, admin} = useSelector(state=>state.userProfile)   
    

  const dispatch = useDispatch();
  useEffect(() => {
    if(open){
      dispatch(
      userProfile({
       target: 'admin',
       action: 'new',
       accountId,
      })
    );}
  }, [open, accountId, dispatch]);

    return (
      <Dialog
        parentDialog={parentDialog}
        open={open}
        adjustFullscreen={true}
        onClose={handleClose}
      >
        <AppBar>
          <Toolbar>
            <div onClick={handleClose} className="modalBack">
              <IoClose className="arrowStyle" />
              <span className="headerLeftSection">Add admin</span>
            </div>
          </Toolbar>
          
        </AppBar>
      
      </Dialog>
    );
  };
  
  export default memo(AddAndUpdateAdmin);
  