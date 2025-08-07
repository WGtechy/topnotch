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
  const AllLikedPosts = (props) => {
    const {
      open,
      handleClose,
    accountId,
    } = props;
    const {likedPosts: data, loadingCarts: loading} = useSelector(state=>state.userProfile) 
  
    
  const [page, setPage] = useState(0);
  const cardRef = useRef();
  const [currentData, setCurrentData] = useState([]);
  const allData = useArrayData(currentData);

  const dispatch = useDispatch();
  useEffect(() => {
    if(open){
      dispatch(
      userProfile({
       target: 'likedPosts',
       accountId,
        page,
      })
    );}
  }, [open, accountId, page, dispatch]);

    useEffect(() => {
      if (!!data?.length && open) {
        setCurrentData((init) => [...data, ...init]);
      }
    }, [data, open]);

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

  const cardDisplay = ({ item, i, ref }) => {
    return <div  key={i}
      ref={ref ? lastDataRefElement : null}></div>;
  };

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
              <span className="headerLeftSection">All liked posts</span>
            </div>
          </Toolbar>
          
        </AppBar>
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
              message="No liked post"
            />
          )
        )}
        {allData.length > 0 && loading && loadingIcon}
        {allData.length === 0 && !data?.length && loading && componentLoader}
      </Dialog>
      </>
    );
  };
  
  export default memo(AllLikedPosts);