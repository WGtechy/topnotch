import { forwardRef, useMemo } from "react";
import { IoArrowBack } from "react-icons/io5";
import { appBarStyle, toolStyle, arrowStyle } from "../utilities-config/style";


const TheUsersTableData = ({
  data,
  getMoreData,
  open,
  tableName,
  setOpen,
  close,
  dataType,
canGetData
}) => {
  const productRows = useMemo(() => {
    let arr = [];
    let count = 0;
    data?.length > 0 &&
      data?.forEach((item) => {
        arr?.push({
          id: ++count,
        
        });
      });
    return arr;
  }, [data]);

  const handleClose = () => {
    setOpen(false);
    close && close();
  };

  const productColumns =[]

  return (''
    // <Dialog
    //   fullScreen
    //   open={open}
    //   onClose={handleClose}
    //   TransitionComponent={Transition}
    //   sx={{ marginTop: "3rem", zIndex: "5" }}
    // >
    //   <AppBar sx={appBarStyle}>
    //     <Toolbar sx={toolStyle}>
    //       <div onClick={handleClose} className="modalBack">
    //         <IoArrowBack style={arrowStyle} />
    //         <span className="headerRightSection">
    //           {" "}
    //           {dataType === "product" ? "Product tabular display" : ""}{tableName}
    //         </span>
    //       </div>
    //       {canGetData && <div className="loadMore" onClick={getMoreData}>Load more</div>}
    //     </Toolbar>
    //   </AppBar>
      
      
    // </Dialog>

    // <Box sx={boxStyle}>

    // </Box>
  );
};

export default TheUsersTableData;
