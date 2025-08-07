import { IoClose } from "react-icons/io5";
import Dialog from "../../bucket/dialog/Dialog";
import AppBar from "../../bucket/dialog/AppBar";
import Toolbar from "../../bucket/dialog/Toolbar";
import { useMemo } from "react";
import ProductInfo from "../home/productDetailFolder/productDescription/ProductInfo";
import TheAvatar from "../../bucket/TheAvatar";
const ItemSlide = (props) => {
  const { open, handleClose,accountId,
    account, handleRemove, taxRate, title, data, currency, isMobile, isAdmin,
    manager, handleUpdate } = props;


  const productInfoProps = useMemo(
    () => ({
      product: data,
      currency,
  taxRate,
  isMobile,

      viewOnly: title === "Product" ? true : false,
  accountId,
  account,
  totalComments: data?.postId?.totalComments,
  totalLikes: data?.postId?.totalLikes,
    }),
    [data, accountId, taxRate,
      account, currency, title, isMobile]
  );

  const cartProps = useMemo(
    () => ({
      product: data?.product,
      cartId: data?._id,
      cart: true,
  taxRate,
  currency,
      isMobile,
      viewOnly: true,
      
  accountId,
  account,
  totalComments: data?.postId?.totalComments,
  totalLikes: data?.postId?.totalLikes,
    }),
    [data, currency, taxRate, accountId,
      account, isMobile]
  );
  let isProduct = [
    "Products",
    "Liked products",
    "Shared products",
    "Saved products",
  ].includes(title);
  let canRemove = [
    "Liked products",
    "Shared products",
    "Saved products",
  ].includes(title);
  let isOrder = ["New orders", "Pending orders", "Complete orders"].includes(
    title
  );
  let isUser = ["Managers", "Customers"].includes(title);
  let isCart = ["In Cart"].includes(title);

  const receipt = <div className="orderItem">Order receipt</div>;
  const userTemplate =  <div className="dashboardRight userProfile">

  <div className="dashboardRightProfile">
    <div className="dashboardRightProfileTitle">Profile</div>
    <div className="dashboardRightProfileAvatar">
      <TheAvatar
        firstName={data?.firstName}
        surname={data?.surname}
        imageURL={data?.picture}
        style={{ width: "6rem", height: "6rem" }}
      />
    </div>
    <div className="dashboardRightProfileTable">
      <div className="dashboardRightProfileTableItem"> First Name: {data?.firstName} </div>
      <div className="dashboardRightProfileTableItem"> Surname: {data?.surname} </div>
      <div className="dashboardRightProfileTableItem"> Address: {data?.address} </div>
      <div className="dashboardRightProfileTableItem"> Phone: {data?.phone} </div>
      <div className="dashboardRightProfileTableItem"> Email: {data?.email} </div>
      <div className="dashboardRightProfileTableItem"> Bank: {data?.bankName} </div>
      <div className="dashboardRightProfileTableItem"> Account number: {data?.bankAccountNumber} </div>
      <div className="dashboardRightProfileTableItem"> Country: {data?.country} </div>
      <div className="dashboardRightProfileTableItem"> City: {data?.city} </div>
      <h3>Billing details</h3>
      <div className="dashboardRightProfileTableItem"> First Name: {data?.billing?.firstName} </div>
      <div className="dashboardRightProfileTableItem"> Surname: {data?.billing?.surname} </div>
      <div className="dashboardRightProfileTableItem"> Address: {data?.billing?.address} </div>
      <div className="dashboardRightProfileTableItem"> Phone: {data?.billing?.phone} </div>
      <div className="dashboardRightProfileTableItem"> Email: {data?.billing?.email} </div>
      

    </div>
  </div>
</div>;
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
            {handleRemove && canRemove && <div className="headerRight" onClick={()=>handleRemove(data)}>Remove</div>}
            {handleUpdate && title === "Products" ? isAdmin || manager ? <div className="headerRight" onClick={()=>handleUpdate(data)}>Edit</div> : null : null}
          </Toolbar>
        </AppBar>

        {isProduct && <ProductInfo {...productInfoProps} />}
        {isOrder && receipt}
        {isUser && userTemplate}
        {isCart && <ProductInfo {...cartProps} />}
      </Dialog>
    </>
  );
};

export default ItemSlide;
