import FormLayout1 from "../bucket/formComponent/FormLayout1";
import InputComponent from "../bucket/formComponent/InputComponent";
import ButtonComponent from "../bucket/formComponent/ButtonComponent";
import TextAreaComponent from "../bucket/formComponent/TextAreaComponent";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { contactUsCRUD } from "../redux/actions/contactUs.action";
import { social } from "./data";
import { componentLoader } from "../bucket/loading-components/componentLoader";
const ContactUs = ({ noDescription }) => {
  const email = useRef(null);
  const name = useRef(null);
  const message = useRef(null);
  const phone = useRef(null);
  const { data: app, loading } = useSelector((state) => state.app);

  const dispatch = useDispatch();
  const submitToServer = (e) => {
    e.preventDefault();
    if (name.current && email.current && message.current && phone.current)
      dispatch(
        contactUsCRUD({
          name: name.current,
          email: email.current,
          message: message.current,
          phone: phone.current,
        })
      );
  };
  return loading ? (
    componentLoader
  ) : (
    <div className="contactForm">
      <h2 className="title">Contact us</h2>
      {!noDescription && (
        <p className="contactFormDescription">
          Thank you for considering Topnotch NG Ltd. for your hospitality. I
          need content here.
        </p>
      )}
      <div className="contactFormContent">
        <form className="contactFormContainer">
          <InputComponent
            type="text"
            placeholder="Name"
            title="Your name *"
            id="your-name"
            display={true}
            required={true}
            onChange={(e) => (name.current = e.target.value)}
            showLabel={true}
          />
          <InputComponent
            type="text"
            placeholder="Email"
            title="Your email *"
            id="your-email"
            display={true}
            required={true}
            onChange={(e) => (email.current = e.target.value)}
            showLabel={true}
          />
          <InputComponent
            type="tel"
            placeholder="Phone"
            title="Your phone *"
            id="your-phone"
            display={true}
            required={true}
            onChange={(e) => (phone.current = e.target.value)}
            showLabel={true}
          />
          <TextAreaComponent
            placeholder="Message"
            title="Your message *"
            id="your-message"
            display={true}
            required={true}
            onChange={(e) => (message.current = e.target.value)}
            showLabel={true}
          />

          <ButtonComponent
            title={"Submit"}
            display={true}
            onClick={(e) => submitToServer(e)}
          />
        </form>
        <div className="contactFormContentInfo">
          <h3>Address</h3>
          <div className="contactFormContentInfoAddress">
            {app?.contact?.address}
          </div>
          {!noDescription && app?.contact && (
            <div className="contactFormContentInfoSocial">
              {social(app.contact).map(
                (item, i) =>
                  item.link && (
                    <a
                      href={item.link}
                      className="contactFormContentInfoSocialItem"
                      key={i}
                      title={item.name}
                    >
                      <item.icon className={item.className} />
                    </a>
                  )
              )}{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
