import AppBar from "../../bucket/dialog/AppBar";
import Dialog from "../../bucket/dialog/Dialog";
import Toolbar from "../../bucket/dialog/Toolbar";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toSelectOptionsName } from "../../utilities-config/utils";
import InputComponent from "../../bucket/formComponent/InputComponent";
import SelectComponent from "../../bucket/formComponent/SelectComponent";
import TextAreaComponent from "../../bucket/formComponent/TextAreaComponent";
import { formattedAmount } from "../../utilities-config/numberFormatter";
// import { cashout, paystackEvent } from "../../redux/actions";
// import { toSelectOptionsName } from "../reuseableFunctions";

const btn = {
  display: "flex",
  alignItems: "center",
  width: "5rem",
  textAlign: "center",
  justifyContent: "center",
  margin: "auto",
  background: "#e55353",
};

const bankOptions = [];

const Cashout = ({ open, handleClose, profileData }) => {
  // const { banks: bankOptions, loading: verifyingAccount, verifyAccNum } = useSelector((state) => state.paystackResponse);

  const [amount, setAmount] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // const [accountNumber, setAccountNumber] = useState('');
  const [bankCode, setBankCode] = useState("");
  const [nairaBankName, setNairaBankName] = useState("");
  const [nairaAccountNumber, setNairaAccountNumber] = useState("");
  const [usdBankName, setUSDBankName] = useState("");
  const [usdAccountNumber, setUSDAccountNumber] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      targetId: profileData._id,
      usdBankName,
      amount,
      crud: "NEW",
      usdAccountNumber,
      bankCode,
      nairaBankName,
      nairaAccountNumber,
    };
    // dispatch(cashout(data))
  };

  useEffect(() => {
    if (open) {
      //   dispatch(paystackEvent({
      //   currency: 'NGN',
      //   target: 'getBanks'
      // }))
    }
  }, [dispatch, open]);

  // useEffect(()=>{
  //   if( open && !!bankOptions?.data?.length && nairaAccountNumber){
  //     setBankCode(()=>{
  //       return bankOptions.data.find(x=>x.name === nairaAccountNumber)?.code
  //     })
  //   }
  // }, [open, bankOptions, nairaAccountNumber]);


  const handleSetNairaBankName = (item) => setNairaBankName(item);

  // useEffect(()=>{
  //   if(open && verifyAccNum){
  //     if(verifyAccNum?.status){
  //     setNairaBankName(verifyAccNum.data.account_name)
  //     } else {setNairaBankName('')}
  // }
  // },[open, verifyAccNum])

  useEffect(() => {
    if (open && profileData) {
      setFirstName(profileData?.firstName);
      setSurname(profileData?.surname);
      setAddress(profileData?.address);
      setPhone(profileData?.phone);
      setEmail(profileData?.email);
      setNairaBankName(profileData?.nairaBankName);
      setNairaAccountNumber(profileData?.nairaAccountNumber);
      setBankCode(profileData?.bankCode);
      setUSDBankName(profileData?.usdBankName);
      setUSDAccountNumber(profileData?.usdAccountNumber);
    }
  }, [open, profileData]);
  const data = [
    {
      name: "First Name",
      display: true,
      value: firstName,
      type: "input",
      disabled: true,
      setChange: setFirstName,
    },

    {
      name: "Last Name",
      display: true,
      value: surname,
      disabled: true,
      type: "input",
      setChange: setSurname,
    },

    {
      name: "Your Email",
      display: true,
      value: email,
      disabled: true,
      type: "email",
      setChange: setEmail,
    },
    {
      name: "Your Address",
      display: true,
      required: true,
      value: address,
      type: "textArea",
      setChange: setAddress,
    },

    {
      name: "Phone",
      display: true,
      required: true,
      value: phone,
      type: "input",
      setChange: setPhone,
    },

    {
      name: "Naira Account Bank Name",
      display: true,
      value: nairaBankName,
      required: true,
      type: "select",
      setChange: setNairaBankName,
      placeholder: "Currency",
      id: "nairaBankName",
      onChange: handleSetNairaBankName,
      defaultValue: nairaBankName,
      options: toSelectOptionsName(bankOptions),
    },

    {
      name: "Naira Account Number",
      display:true,
      value: nairaAccountNumber,
      required: true,
      type: "input",
      setChange: setNairaAccountNumber,
    },
  ];

  return (
    <Dialog
      parentDialog={true}
      adjustFullscreen={true}
      open={open}
      onClose={handleClose}
    >
      <AppBar>
        <Toolbar>
          <div onClick={handleClose} className="modalBack">
            <IoClose className="arrowStyle" />
            <span>Cashout</span>
          </div>
        </Toolbar>
      </AppBar>
      <div className="cashout">
      <div className="cashoutBalance">Your balance: {formattedAmount({amount: profileData?.earningNGN || 0})}</div>
        <div className="cashoutAmount">
          <label htmlFor="amount">Amount</label>
          <div className="cashoutAmountContainer">
            <InputComponent
              type="number"
              required={true}
              defaultValue={0}
              autoComplete="off"
              display={true}
              min={1600}
              max={profileData?.earningNGN}
              onChange={(e) => setAmount(Number(e.target.value))}
              title={"Amount to cashout"}
              id={"amount"}
              autoFocus={false}
              name={"amount"}
              className="cashoutAmountContainerInput"
            />
          </div>
          <form className="cashoutAmountForm" onSubmit={handleSubmit}>
            {data?.map((item, i) =>
              ["input", "email"].includes(item.type) ? (
                <InputComponent
                  type={item.type}
                  defaultValue={item?.value}
                  disabled={item?.disabled}
                  required={item?.required}
                  key={i}
                  display={item?.display}
                  placeholder="Enter text here"
                  onChange={(e) => item.setChange(e.target.value)}
                />
              ) : item.type === "select" ? (
                <SelectComponent
                  options={item.options}
                  required={item?.required}
                  key={i}
                  placeholder={item?.placeholder}
                  id={item?.id}
                  onChange={(e) => item?.onChange(e.target.value)}
                  defaultValue={item?.defaultValue}
                />
              ) : (
                item.type === "textArea" && (
                  <TextAreaComponent
                    defaultValue={item?.value}
                    key={i}
                    placeholder="Enter text here"
                    onChange={(e) => item.setChange(e.target.value)}
                  />
                )
              )
            )}
            <button className="cashoutAmountFormBtn"> Request payment</button>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default Cashout;
