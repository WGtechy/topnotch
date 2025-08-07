import { memo, useCallback, useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import Toolbar from "../../../bucket/dialog/Toolbar";
import { toast } from "react-toastify";
import Dialog from "../../../bucket/dialog/Dialog";
import AppBar from "../../../bucket/dialog/AppBar";
import { formattedAmount } from "../../../utilities-config/numberFormatter";
import { useDispatch, useSelector } from "react-redux";
import { initiateNewPayment } from "../../../redux/actions";
import { toastObject } from "../../../redux/toastObject";
const TourSlide = (props) => {
  const { open, handleClose, accountId, currency, data, account } = props;
  const [selected, setSelected] = useState(null)

  const { data: newTransaction } = useSelector((state) => state.newTransaction);
  const dispatch = useDispatch(); 
  const [proceedToPayment, setProceedToPayment] = useState(false);
  const [authorizationUrl, setAuthorizationUrl] = useState(null);
  const firstName = useRef("");
  const surname = useRef("");
  const role = useRef("");
  const phone = useRef("");
  const email = useRef("");
  const [onsiteSwitch, setOnsiteSwitch] = useState(false)
  const morePeople = useRef("");
  const [contact, setContact] = useState(null);
  const [seeMore, setSeeMore] = useState("")

  const { newOrder } = useSelector((state) => state.order);
  const handleOnsiteSwitch = ()=>setOnsiteSwitch(prev=>!prev)

  const handleForm = (e) => {
    e.preventDefault()
    setContact({
      firstName: firstName.current,
      surname: surname.current,
      role: role.current,
      phone: phone.current,
      email: email.current,
      morePeople: morePeople.current,
    });
    // handleTourPayment({})
    setOnsiteSwitch(false)
  };

   useEffect(() => {
      if (newOrder && selected) {
        props.history.push(`/successful-transaction?r=${newOrder._id}`);
      }
    }, [newOrder, selected, props]);

  
  const handleSeeMore = useCallback(item=>()=>{
  if(item === seeMore){
    setSeeMore("")
  }else{

    setSeeMore(item)
  }
  },[seeMore])

   

  useEffect(() => {
    if(selected){

      let _authorization = localStorage.getItem("authorization_url");
      if (![null, undefined, "null"].includes(_authorization)) {
        setAuthorizationUrl(_authorization);
      }
    }
  }, [selected]);

  useEffect(() => {
    if (selected && newTransaction?.data?.access_code) {
      localStorage.setItem(
        "authorization_url",
        newTransaction.data.authorization_url
      );
    }
  }, [newTransaction, selected]);

  useEffect(() => {
    if (accountId && selected) {
      let purchase = {
        crud: "CREATE",
        userId: accountId,
        price: selected.price,
                  isTour: true,
          tourType: selected?.tourType,
          totalAmount: selected?.price,
        billingDetails: {
          firstName: account?.firstName,
          surname: account?.surname,
          address: account?.address,
          phone: account?.phone,
          email: account?.email,
        },
      };
      if (selected.price && account?.email && account?.address) {
        setProceedToPayment(true);
        props.history.replace(
          `${props.location.pathname}${props.location.search}&payment=true`
        );
        dispatch(
          initiateNewPayment({
            email: email.current,
            amount: `${selected.price * 100}`,
            currency: "NGN",
            ...purchase,
          })
        );
      } else if (!account?.email || account?.address) {
        toast.error(
          `Can not complete your request, Please update your profile`,
          toastObject
        );
      }
    }
  }, [account, accountId, selected, dispatch, props]);

  const handleDelete = ()=>setContact(null)

  const handleSelect = useCallback(data=>()=>{
    setSelected(data)
  },[])
  const close = ()=>{
    if(selected){

      setSelected(null)
    } else {
      handleClose()
    }
  }
  return (
    <Dialog
      parentDialog={true}
      open={open}
      adjustFullscreen={true}
      onClose={close}
    >
      <AppBar>
        <Toolbar>
          <div onClick={close} className="modalBack">
            <IoClose className="arrowStyle" />
            <span className="headerLeftSection">Tour</span>
          </div>
        </Toolbar>
      </AppBar>
      <div className="tour">
        <div className="tourTitle">{data?.title}</div>

        {!selected && data?.isVirtualTour && (
          <div className="tourInfo">
            <div className="tourInfoTitle">Virtual Tour</div>
            <div className="tourInfoPrice ">
              {currency?.symbol}
              {formattedAmount({
                amount: data?.virtualTourFee,
                currencyValue: currency?.value,
              })}
            </div>
            <div className={seeMore === "virtual" ? "tourInfoDescription" : "tourInfoDescription reduceText2"} onClick={handleSeeMore('virtual')}>
              {data?.virtualTourDescription}
            </div>
            <div className="tourInfoPay" onClick={handleSelect({
              price: data?.virtualTourFee,
              tourType: "Virtual"
            })}>Proceed to payment </div>
            </div>
        )}
        <hr />

        {!selected && data?.isOnsiteTour && (
          <div className="tourInfo">
            <div className="tourInfoTitle">Onsite Tour</div>
            <div className="tourInfoPrice ">
              {currency?.symbol}
              {formattedAmount({
                amount: data?.onsiteTourFee,
                currencyValue: currency?.value,
              })}
            </div>
            {data?.onsiteTourDescription && (
              <div className={seeMore === "onsite" ? "tourInfoDescription" : "tourInfoDescription reduceText2"} onClick={handleSeeMore('onsite')}>
              {data?.onsiteTourDescription}
              </div>
            )}
            {/* {contact && <div className="tourInfoDetails">
            <li className="tourInfoDetailsItem"><span className="tourInfoDetailsItemName">First name: </span><span className="tourInfoDetailsItemValue">{contact?.firstName}</span></li>
            <li className="tourInfoDetailsItem"><span className="tourInfoDetailsItemName">Surname: </span><span className="tourInfoDetailsItemValue">{contact?.surname}</span></li>
            <li className="tourInfoDetailsItem"><span className="tourInfoDetailsItemName">Phone: </span><span className="tourInfoDetailsItemValue">{contact?.phone}</span></li>
            <li className="tourInfoDetailsItem"><span className="tourInfoDetailsItemName">Email: </span><span className="tourInfoDetailsItemValue">{contact?.email}</span></li>
            <li className="tourInfoDetailsItem"><span className="tourInfoDetailsItemName">Role: </span><span className="tourInfoDetailsItemValue">{contact?.role}</span></li>
            <li className="tourInfoDetailsItem"><span className="tourInfoDetailsItemName">Associates: </span><span className="tourInfoDetailsItemValue">{contact?.morePeople}</span></li>
            <li className="tourInfoDetailsDelete" onClick={handleDelete}>Delete</li>
                        </div>} */}
            {/* {contact &&  */}
            <div className="tourInfoPay" onClick={handleSelect({
              price: data?.onsiteTourFee,
              tourType: "Onsite"
            })}>Proceed to payment </div>
            {/* } */}
            {/* {!onsiteSwitch && !contact && <div className="tourInfoPay" onClick={handleOnsiteSwitch}>Set up onsite meeting </div>} */}

            {/* {onsiteSwitch && (
              <div className="tourInfoForm">
                <div className="tourInfoFormTitle">
                  Who is coming to take a tour
                </div>
                <form
                  className="checkoutSummaryBottomForm tourForm"
                  onSubmit={handleForm}
                >
                  <InputComponent
                    type="text"
                    display={true}
                    onChange={(e) => (firstName.current = e.target.value)}
                    defaultValue={firstName.current}
                    title="firstName"
                    required={true}
                    placeholder="First name"
                  />
                  <InputComponent
                    type="text"
                    display={true}
                    onChange={(e) => (surname.current = e.target.value)}
                    defaultValue={surname.current}
                    title="surname"
                    required={true}
                    placeholder="Surname"
                  />
                  <InputComponent
                    type="role"
                    display={true}
                    onChange={(e) => (role.current = e.target.value)}
                    defaultValue={role.current}
                    title="role"
                    required={true}
                    placeholder="Role"
                  />
                  <InputComponent
                    type="tel"
                    display={true}
                    onChange={(e) => (phone.current = e.target.value)}
                    defaultValue={phone.current}
                    title="Phone"
                    required={true}
                    placeholder="Phone"
                  />
                  <InputComponent
                    type="email"
                    display={true}
                    onChange={(e) => (email.current = e.target.value)}
                    defaultValue={email.current}
                    title="Email"
                    required={true}
                    placeholder="Email"
                  />
                  <MonthAndDay 
                  label="Tour date"
                        onChange={setTourDate}
                        defaultValue={tourDate} 
                        display={true}
                        required={true}
                        maxDate={new Date()}
                        name="Tour date"
                        inputContainerStyle={{flexDirection: 'row', border: 'none'}}
                        title="Tour date"
                  />

                  <TextAreaComponent
                    cols={5}
                    rows={6}
                    placeholder={"Who is comming with you?"}
                    defaultValue={morePeople.current}
                    required={false}
                    display={true}
                    onChange={(e) => (morePeople.current = e.target.value)}
                  />

                  <button className="checkoutSummaryBottomFormBtn">
                    Proceed{" "}
                  </button>
                </form>
              </div>
            )} */}
          </div>
        )}
        {selected && 
        <div className="checkout">
          <div className="checkoutList">
            <ul className="checkoutListBilling">
              <div className="checkoutListBillingTitle">Billing details</div>
              <li className="checkoutListBillingItem">
                <span className="checkoutListBillingItemTitle">First name</span>{" "}
                <span className="checkoutListBillingItemValue">
                  {account?.firstName}
                </span>
              </li>
              <li className="checkoutListBillingItem">
                <span className="checkoutListBillingItemTitle">Surname</span>{" "}
                <span className="checkoutListBillingItemValue">
                  {account?.surname}
                </span>
              </li>
              <li className="checkoutListBillingItem">
                <span className="checkoutListBillingItemTitle">Email</span>{" "}
                <span className="checkoutListBillingItemValue">
                  {account?.email}
                </span>
              </li>
              <li className="checkoutListBillingItem">
                <span className="checkoutListBillingItemTitle">
                  Phone number
                </span>{" "}
                <span className="checkoutListBillingItemValue">
                  {account?.phone}
                </span>
              </li>
              <li className="checkoutListBillingItem">
                <span className="checkoutListBillingItemTitle">Address</span>{" "}
                <span className="checkoutListBillingItemValue">
                  {account?.address}
                </span>
              </li>
            </ul>
            <ul className="checkoutListSummary">
              <div className="checkoutListSummaryTitle">You are paying</div>
              <h1 className="checkoutListSummaryTitle">
                {" "}
                {currency?.symbol}
                {formattedAmount({
                  amount: selected?.price,
                  currencyValue: 1,
                })}
              </h1>
            </ul>
          </div>
          {
            (authorizationUrl || newTransaction?.data?.authorization_url) && (
              <a
                href={
                  authorizationUrl || newTransaction?.data?.authorization_url
                }
                className="checkoutBtn"
              >
                Proceed to payment
              </a>
            )}
        </div>
      }
      </div>
    </Dialog>
  );
};

export default memo(TourSlide);
