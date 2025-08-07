import React from "react";
import InputComponent from "./formComponent/InputComponent";
import ButtonComponent from "./formComponent/ButtonComponent";
import TextAreaComponent from "./formComponent/TextAreaComponent";
import FormLayout1 from "./formComponent/FormLayout1";
import { useSelector } from "react-redux";
import { social } from "../views/data";
import { componentLoader } from "./loading-components/componentLoader";
const ContactUs = () => {
  const {data: app, loading} = useSelector(state=>state.app)

  const submitToServer = (e) => {
    e.prevendDefault();
  };
  return ( loading ? componentLoader :
    <div className="contactForm">
      <h2 className="title">Contact us</h2>
      <div className="contactFormContent">
        <FormLayout1 submitToServer={submitToServer}>
          <InputComponent
            type="text"
            placeholder="Name"
            title="Your name"
            id="your-name"
            display={true}
          />
          <InputComponent
            type="text"
            placeholder="Email"
            title="Your email"
            id="your-email"
            display={true}
          />

          <TextAreaComponent
            placeholder="Message"
            title="Your message"
            id="your-message"
            display={true}
          />

          <ButtonComponent title={"Submit"} display={true} />
        </FormLayout1>
        <div className="contactFormContentInfo">
          <h3>Address</h3>
          <div className="contactFormContentInfoAddress">
            {" "}
            {app?.contact?.address}
          </div>
          <div className="contactFormContentInfoSocial">
          {
            social(app.contact).map((item, i)=>(item.link && <a href={item.link} className="contactFormContentInfoSocialItem" key={i}>{item.name} <item.icon className={item.className}/></a>))
          } </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
