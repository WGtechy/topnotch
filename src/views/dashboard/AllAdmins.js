import { memo, useCallback, useEffect, useRef, useState } from "react";
  import {IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "../../bucket/dialog/Dialog";
import AppBar from "../../bucket/dialog/AppBar";
import Toolbar from "../../bucket/dialog/Toolbar";
import useArrayData from "../../utilities-config/useArrayData";
import { userProfile } from "../../redux/actions";
import { loadingIcon } from "../../bucket/loading-components/loadingIcon";
import EmptyDataPage from "../../bucket/EmptyDataPage";
import { componentLoader } from "../../bucket/loading-components/componentLoader";
import AddAndUpdateAdmin from "./AddAndUpdateAdmin";
  const AllAdmins = (props) => {
    const {
      open,
      handleClose,
    isAdmin,
manager,
    accountId,
    } = props;
    const {admins: data, loadingAdmins: loading, loadingAdmin, admin} = useSelector(state=>state.userProfile) 
  
    
  const [page, setPage] = useState(0);
  const cardRef = useRef();
  const [currentData, setCurrentData] = useState([]);
  const [addNew, setAddNew] = useState(false);
  const allData = useArrayData(currentData);

  const dispatch = useDispatch();
  useEffect(() => {
    if(open){
      dispatch(
      userProfile({
       target: 'admins',
       accountId,
        page,
      })
    );}
  }, [open, accountId, page, dispatch]);

  const lastDataRefElement = useCallback(
    (node) => {
      if (loading) return;
      if (cardRef.current) cardRef.current.disconnect();
      cardRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !!data.length) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) cardRef.current.observe(node);
    },
    [loading, data]
  );


  const handleAddNew = () => setAddNew((prev) => !prev);

  useEffect(() => {
    if (!!data?.length && open) {
      setCurrentData((init) => [...data, ...init]);
    }
  }, [data, open]);

  useEffect(() => {
    if (admin?._id && open) {
      setCurrentData((init) => [admin, ...init]);
    }
  }, [admin, open]);

  const cardDisplay = ({ item, i, ref }) => {
    return <div  key={i}
      ref={ref ? lastDataRefElement : null}></div>;
  };

  const handleNew = ()=>setAddNew(prev=>!prev);
    return (<>
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
              <span className="headerLeftSection">All admins</span>
            </div>
           {isAdmin || manager ? <div  onClick={handleAddNew}>New admin</div> : null}
          </Toolbar>
          
        </AppBar>
        {loadingAdmin && loadingIcon}
        {!!allData.length ? (
          <div className="cardDisplayGrid">
            {allData.map((item, i) => {
              if (allData.length === i + 1) {
                return cardDisplay({ item, i, ref: true });
              } else {
                return cardDisplay({ item, i });
              }
            })}
          </div>
        ) : (
          !loading &&
          allData.length === 0 && (
            <EmptyDataPage
              message="No manager"
              displayBtn={isAdmin || manager ? true : false}
              action={handleAddNew}
              actionMessage="Add new manager"
            />
          )
        )}
        {allData.length > 0 && loading && loadingIcon}
        {allData.length === 0 && !data?.length && loading && componentLoader}
      </Dialog>
      <AddAndUpdateAdmin  open={addNew}  handleClose={handleNew} parentDialog={false} accountId={accountId} />
      </>
    );
  };
  
  export default memo(AllAdmins);