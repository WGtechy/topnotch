import React, { useCallback, useEffect, useRef, useState } from "react";
import { PiHash, PiHashFill, PiPhoneLight, PiUserThin } from "react-icons/pi";
import InputComponent from "../../../../bucket/formComponent/InputComponent";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import {
  checkOTP,
  forgotPassword,
  signIn,
  signUp,
} from "../../../../redux/actions/auth.actions";
import {
  countries,
  timezones,
  countryCode,
} from "../../../../utilities-config/countryCode";
import useUrlSearchParams from "../../../../utilities-config/useUrlSearchParams";
import { loadingIcon } from "../../../../bucket/loading-components/loadingIcon";
import TextAreaComponent from "../../../../bucket/formComponent/TextAreaComponent";
import { IoCheckmark } from "react-icons/io5";
import SelectComponent from "../../../../bucket/formComponent/SelectComponent";
import Image from "../../../../bucket/Image";
function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const AuthorizationOTPVersion = (props) => {
  const { history, token, component } = props;
  const dispatch = useDispatch(); // the useDispatch stored in a constant variable will dispatch the input of the user into a dispatch function like the sign in function
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const email = useRef("");
  const phone = useRef("");
  const firstName = useRef("");
  const surname = useRef("");
  const [countCode, setCounCode] = useState("");
  const [passPhraseQuestion, setPassPhraseQuestion] = useState("");
  const passPhraseAnswer = useRef("");
  const params = useUrlSearchParams();
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const { authenticate, loading, info } = useSelector((state) => state.signIn);
  const { loading: loadingOtp, info: infoOtp } = useSelector(
    (state) => state.otp
  );
  const {
    data: newAccount,
    loading: createLoading,
    info: createInfo,
  } = useSelector((state) => state.createAccount);
  const inputsRef = useRef(null);
  const [otpValue, setOtpValue] = useState(new Array(6).fill(""));
  const [accountId, setaccountId] = useState(null);
  const [otpResetPassword, setOtpResetPassword] = useState("");

  useEffect(() => {
    let id = localStorage.getItem("accountId");
    if (![null, undefined, "null"].includes(id)) {
      setaccountId(id);
    }
  }, []);

  useEffect(() => {
    let id = localStorage.getItem("otpResetPassword");
    if (![null, undefined, "null"].includes(id)) {
      setOtpResetPassword(id);
    }
  }, []);

  // const { uid, c } = useUrlSearchParams();

  // useEffect(() => {
  //   dispatch(
  //     signUp({
  //       _id: uid,
  //       crypt: c,
  //       action: "otp",
  //     })
  //   );
  // }, [dispatch, uid, c]);

  const handleResend = () => {
    const data = { resend: true, accountId };
    dispatch(checkOTP(data));
    setOtpValue(new Array(6).fill(""));
    // setDisplayResend(false)
  };

  // cAccountId
  useEffect(() => {
    if (accountId) {
      let value = otpValue
        .filter((x) => x !== "")
        .toString()
        .replaceAll(",", "");

      let isCancelled = false;
      const handleCheck = async () => {
        await timeout(1000);
        dispatch(
          checkOTP({
            otp: value,
            accountId,
            target:
              otpResetPassword === "FORGOT-PASSWORD" ? "FORGOT-PASSWORD" : "",
          })
        );
      };
      if (!isCancelled && value.length === 6) {
        handleCheck();
      } else {
      }

      return () => {
        isCancelled = true;
      };
    }
  }, [dispatch, accountId, otpResetPassword, otpValue]);

  const handleInput = (e, i) => {
    if (isNaN(e.target.value)) return false;
    setOtpValue((prev) => [
      ...prev.map((data, index) => (index === i ? e.target.value : data)),
    ]);
    if (e.target.value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  };

  // useEffect(()=>{
  //   if(!props.token && accountId && info !== "FORGOT-PASSWORD"){
  //     history.push(`/auth?target=one-time-password&c=${accountId}`)
  //   }
  // },[props, accountId, history, info, newAccount])

  useEffect(() => {
    if (!props.token && !component) {
      if (otpResetPassword === "FORGOT-PASSWORD") {
        history.push(`/auth?target=one-time-password&c=${accountId}`);
      }
    }
  }, [
    props,
    accountId,
    history,
    info,
    otpResetPassword,
    component,
    createInfo,
    newAccount,
  ]);

  useEffect(() => {
    if (!props.token && createInfo === "Provide token" && !component) {
      history.push(`/auth`);
      // history.push(`/auth?target=one-time-password&c=${accountId}`);
    }
  }, [props, createInfo, history, component]);
  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timezone === "" || !timezone) {
      return null;
    }
    const _country = timezones[timezone].c[0];
    const state = timezone.split("/")[1].replace("_", " ");
    setCountry(countries[_country]);
    setCity(state);
    let mobile = countryCode.find((x) => x.name === countries[_country]);
    setCounCode(mobile.mobileCode);
  }, []);

  const handleAuth = useCallback(
    (link) => () => {
      if (component) {
        setIsSignUp((prev) => !prev);
      } else {
        history.push(`/auth?${link}`);
      }
    },
    [history, component]
  );

  // const handleChangeForm = useCallback((type)=> ()=> setformType(type),[])
  useEffect(() => {
    if (authenticate || token) {
      if (component) {
        history.goBack();
      } else {
        history.push("/");
      }
    }
  }, [authenticate, token, component, history]);

  const [isSignUp, setIsSignUp] = useState(false);
  let userType = useRef("User");

  useEffect(() => {
    if (!component) {
      if (params?.target === "create-account") {
        setIsSignUp(true);
      } else if (params?.target === "recover-password") {
        setIsSignUp(false);
      } else {
        setIsSignUp(false);
      }
    }
  }, [params, component]);

  const handleuserType = (event) => {
    userType.current = event.target.value;
  };

  const userTypeArray = ["User", "Property owner"];
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSignUp && params?.target !== "recover-password") {
      if (password && !loading) {
        const user = {
          password,
          email: email.current,
          target: "signIn",
        };
        dispatch(signIn(user));
      }
    } else if (params?.target === "recover-password") {
      if (!loading) {
        const user = {
          email: email.current,
          passPhraseQuestion: passPhraseQuestion.toLocaleLowerCase(),
          target: "new",
          passPhraseAnswer: passPhraseAnswer.current.toLocaleLowerCase(),
        };
        dispatch(forgotPassword(user));
      }
    } else if (isSignUp && password === confirmPassword) {
      if (email.current && password === confirmPassword && !createLoading) {
        let phoneNumber =
          phone.current[0] === "0"
            ? phone.current.replace(0, "")
            : phone.current;

        const account = {
          firstName: firstName.current,
          surname: surname.current,
          password,
          email: email.current,
          phone: phoneNumber.includes(countCode)
            ? phoneNumber
            : `${countCode}${phoneNumber}`,
          countryCode: countCode,
          userType: userType.current === "Property owner" ? "manager" : "user",
          country,
          city,
        };
        dispatch(signUp(account));
      }
    }
  };
  const authActions = [
    {
      name: "Sign In",
      params: "",
      activeClass: "authenticationRightHeader",
      inActiveClass: "authenticationRightHeader authActive",
      display: isSignUp ? true : false,
    },
    {
      name: "Create Account",
      params: "target=create-account",
      inActiveClass: "authenticationRightHeader",
      activeClass: "authenticationRightHeader authActive",
      display: isSignUp ? false : true,
    },
  ];
  return (
    <div className="authentication page">
      {/* <div className="authenticationLeft">
        <div className="authenticationLeftText">
          As a one-stop shop for Hospitality, real estate and luxury
          automobiles, we streamline the process for our clients, saving them
          time and effort.
        </div>
      </div> */}
      <div className="authenticationRight">
        {params?.target === "one-time-password" ? (
          <div>Recorver Password</div>
        ) : (
          params?.target === "recover-password" && <div>Recorver Password</div>
        )}

        {info === "Incorrect credentials..." && (
          <p className="subTitle">Incorrect credentials...</p>
        )}
        {params?.target === "one-time-password" ? (
          <div className="otpCard">
            <div className="otpCardTitle">Provide OTP</div>
            <div className="otpCardInputs" ref={inputsRef}>
              {otpValue.map((item, i) => (
                <input
                  key={i}
                  value={item}
                  onChange={(e) => handleInput(e, i)}
                  className="otpCardInputsInput"
                  type="tel"
                  maxLength="1"
                />
              ))}
            </div>
            <div className="">
              <span className="otpCardErrorText">Didn't get the OTP ? </span>{" "}
              {accountId && (
                <span className="otpCardErrorResend" onClick={handleResend}>
                  Resend
                </span>
              )}
            </div>
            {loadingOtp ? (
              loadingIcon
            ) : (
              <div className="otpCardInfo">{infoOtp}</div>
            )}
          </div>
        ) : (
          <form className="authenticationContentForm" onSubmit={handleSubmit}>
            <InputComponent
              type="text"
              display={isSignUp ? true : false}
              onChange={(e) => (firstName.current = e.target.value)}
              title="First name"
              required={true}
              placeholder="First name"
              icon={PiUserThin}
            />
            <InputComponent
              type="text"
              display={isSignUp ? true : false}
              onChange={(e) => (surname.current = e.target.value)}
              title="Surname"
              required={true}
              placeholder="Surname"
              icon={PiUserThin}
            />
            <InputComponent
              type="tel"
              display={isSignUp ? true : false}
              onChange={(e) => (phone.current = e.target.value)}
              title={`Phone: ${countCode}`}
              required={true}
              placeholder="Your phone number"
              icon={PiPhoneLight}
            />
            <InputComponent
              type="email"
              display={true}
              onChange={(e) => (email.current = e.target.value)}
              title="Email"
              required={true}
              placeholder="Your email"
            />
            <InputComponent
              type="password"
              display={params?.target === "recover-password" ? false : true}
              min={8}
              onChange={(e) => setPassword(e.target.value)}
              title="Password"
              required={true}
              placeholder="Your password"
              icon={PiHash}
            />
            <InputComponent
              type="password"
              display={
                params?.target === "recover-password"
                  ? false
                  : isSignUp
                  ? true
                  : false
              }
              onChange={(e) => setConfirmPassword(e.target.value)}
              title="Confirm password"
              required={true}
              placeholder="Confirm password"
              icon={PiHashFill}
            />
            {/* <SelectComponent
              handleChangeSelect={handleuserType}
              display={isSignUp ? true : false}
              title="Account type"
              required={true}
              defaultValue={"User"}
              placeholder="Account type"
              options={userTypeArray}
            />
            <TextAreaComponent
              cols={2}
              placeholder="Security question"
              required={true}
              title="Recovery security question"
              display={
                params?.target === "recover-password" || isSignUp ? true : false
              }
              onChange={(e) => setPassPhraseQuestion(e.target.value)}
            />
            <InputComponent
              type="text"
              display={
                passPhraseQuestion &&
                (params?.target === "recover-password" || isSignUp
                  ? true
                  : false)
              }
              onChange={(e) => (passPhraseAnswer.current = e.target.value)}
              title="Answer"
              required={true}
              placeholder="Answer"
              icon={IoCheckmark}
            /> */}

            {!isSignUp && params?.target !== "recover-password" && (
              <div
                className="authenticationRightFormBtn"
                onClick={handleSubmit}
              >
                {loading ? "Please wait" : "Sign In"}
              </div>
            )}
            {params?.target === "recover-password" && (
              <div
                className="authenticationRightFormBtn"
                style={{ cursor: loading ? "progress" : "pointer" }}
                onClick={handleSubmit}
              >
                {loading ? "Please wait" : "Reset"}
              </div>
            )}

            {isSignUp && password === confirmPassword && (
              <div
                className="authenticationRightFormBtn"
                onClick={handleSubmit}
              >
                {createLoading ? "Please wait" : "Create account"}
              </div>
            )}
            {!isSignUp && params?.target !== "recover-password" ? (
              <Link
                to="/auth?target=recover-password"
                className="authenticationRightFormForgot"
              >
                Forgot your password ?
              </Link>
            ) : null}

            <div className="authContainer">
              {authActions.map(
                (item, i) =>
                  item.display && (
                    <div
                      className={
                        isSignUp ? item.activeClass : item.inActiveClass
                      }
                      onClick={handleAuth(item.params)}
                      key={i}
                    >
                      {item.name}
                    </div>
                  )
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthorizationOTPVersion;
