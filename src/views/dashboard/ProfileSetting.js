import { IoClose } from "react-icons/io5";
import Dialog from "../../bucket/dialog/Dialog";
import AppBar from "../../bucket/dialog/AppBar";
import Toolbar from "../../bucket/dialog/Toolbar";
import { useRef } from "react";
import TheAvatar from "../../bucket/TheAvatar";
import InputComponent from "../../bucket/formComponent/InputComponent";
const ProfileSetting = (props) => {
  const { open, handleClose, data } = props;

  const firstNameBilling = useRef("");
  const surnameBilling = useRef("");
  const addressBilling = useRef("");
  const phoneBilling = useRef("");
  const emailBilling = useRef("");
  const firstName = useRef("");
  const surname = useRef("");
  const address = useRef("");
  const phone = useRef("");
  const email = useRef("");

  const submitToServer = ()=>{
    const serverData = {
      billing:{
      firstName: firstNameBilling.current,
      surname: surnameBilling.current,
      address: addressBilling.current,
      phone: phoneBilling.current,
      email: emailBilling.current,
      },
      firstName: firstName.current,
      surname: surname.current,
      address: address.current,
      phone: phone.current,
      email: email.current,
      accountId: data?._id
    }
  }

  const profileFormData = [
    {
      title: "First Name",
      placehoder: "First Name",
      display: true,
      value: firstName.current,
      chan: (e) => firstName.current(e.target.value),
      type: "input",
      disabled: false,
    },

    {
      title: "Last Name",
      placehoder: "Last Name",
      display: true,
      value: surname.current,
      chan: (e) => surname.current(e.target.value),
      disabled: false,
      type: "input",
    },

    {
      title: "Your Email",
      placehoder: "Your Email",
      display: true,
      value: email.current,
      chan: (e) => email.current(e.target.value),
      disabled: true,
      type: "email",
    },
    {
      title: "Your Address",
      placehoder: "Your Address",
      display: true,
      required: true,
      value: address.current,
      chan: (e) => address.current(e.target.value),
      type: "textArea",
    },

    {
      title: "Phone",
      placehoder: "Phone",
      display: true,
      required: true,
      value: phone.current,
      chan: (e) => phone.current(e.target.value),
      type: "input",
    },
  ];

  const billingDetails = [
    {
      title: "First Name",
      placehoder: "First Name",
      display: true,
      value: firstNameBilling.current,
      chan: (e) => firstNameBilling.current(e.target.value),
      type: "input",
      disabled: false,
    },

    {
      title: "Last Name",
      placehoder: "Last Name",
      display: true,
      value: surnameBilling.current,
      chan: (e) => surnameBilling.current(e.target.value),
      disabled: false,
      type: "input",
    },

    {
      title: "Your Email",
      placehoder: "Your Email",
      display: true,
      value: emailBilling.current,
      chan: (e) => emailBilling.current(e.target.value),
      disabled: false,
      type: "email",
    },
    {
      title: "Your Address",
      placehoder: "Your Address",
      display: true,
      required: true,
      value: addressBilling.current,
      chan: (e) => addressBilling.current(e.target.value),
      type: "textArea",
    },

    {
      title: "Phone",
      placehoder: "Phone",
      display: true,
      required: true,
      value: phoneBilling.current,
      chan: (e) => phoneBilling.current(e.target.value),
      type: "input",
    },
  ];

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
              <span className="headerLeftSection">Profile setting</span>
            </div>
          </Toolbar>
        </AppBar>
        <div className="profileSetting">
          <div className="profileSettingTop">
            <TheAvatar style={{ width: "7rem", height: "7rem" }} firstName = {data?.firstName} surname={data?.surname} imageURL={data?.picture?.media} />
          </div>
          <form className="profileSettingForm">
            <div className="profileSettingFormContent">
              <div className="profileSettingFormContentTitle">
                Profile details
              </div>

              {profileFormData.map((item, i) => (
                <InputComponent
                  key={i}
                  autoFocus={item?.autoFocus}
                  disabled={item?.disabled}
                  type={item?.type}
                  placeholder={item?.placeholder}
                  defaultValue={item.defaultValue}
                  required={item?.required}
                  title={item?.title}
                  display={item?.display}
                  onChange={item?.onChange}
                  showLabel={true}
                  name
                />
              ))}
            </div>
            <div className="profileSettingFormContent">
              <div className="profileSettingFormContentTitle">
                Billing details
              </div>

              {billingDetails.map((item, i) => (
                <InputComponent
                  key={i}
                  autoFocus={item?.autoFocus}
                  disabled={item?.disabled}
                  type={item?.type}
                  placeholder={item?.placeholder}
                  defaultValue={item.defaultValue}
                  required={item?.required}
                  title={item?.title}
                  display={item?.display}
                  onChange={item?.onChange}
                  showLabel={true}
                  name
                />
              ))}
            </div>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default ProfileSetting;
