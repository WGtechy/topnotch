import { useCallback, useEffect, useRef, useState } from "react";
import { PiHash, PiHashFill, PiPhoneLight, PiUserThin } from "react-icons/pi";
import InputComponent from "../bucket/formComponent/InputComponent";
import { useDispatch, useSelector } from "react-redux";
import { signIn, signUp } from "../redux/actions/auth.actions";
import useUrlSearchParams from "../utilities-config/useUrlSearchParams";
import CheckComponent from "../bucket/formComponent/CheckBoxComponent";

const Authorization = (props) => {
  const { history, isCheckout, open, handleClose } = props;
  const dispatch = useDispatch(); // the useDispatch stored in a constant variable will dispatch the input of the user into a dispatch function like the sign in function
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const email = useRef("");
  const firstName = useRef("");
  const surname = useRef("");
  const [isoOS360, setIsoOS360] = useState(true);
  const [isNewsLetter, setIsNewsLetter] = useState(true);
  const [termsAndConditions, setTermsAndConditions] = useState(null);
  const phone = useRef("");
  const [forgot, setForgot] = useState(false);
  const { authenticate, loading, user } = useSelector((state) => state.signIn);
  const { loading: creatAcountLoading, completed } = useSelector((state) => state.createAccount);
  const { target, redirect } = useUrlSearchParams();

  const handleForgot = () => setForgot((prev) => !prev);

  useEffect(() => {
    if (target === "new") {
      setIsSignUp(true);
    }
    if(completed){
      setIsSignUp(false)
    }
  }, [target, completed]);

  const submitHandler = useCallback(
    (e, target) => {
      e.preventDefault();
      if (password && email.current && !loading) {
        let user;
        if (target === "create") {
          user = {
            firstName: firstName.current,
            surname: surname.current,
            password,
            email: email.current,
            phone: phone.current,
            isoOS360,
            isNewsLetter,
            termsAndConditions: termsAndConditions === "on" ? true : false,
          };
          dispatch(signUp(user));
        } else {
          user = {
            password,
            email: email.current,
            phone: phone.current,
            history: redirect ? history : undefined,
          };
          dispatch(signIn(user));
        }
      }
    },
    [
      redirect,
      history,
      loading,
      dispatch,
      isoOS360,
      isNewsLetter,
      termsAndConditions,
      password,
    ]
  );

  // const handleChangeForm = useCallback((type)=> ()=> setformType(type),[])
  useEffect(() => {
   if(authenticate){
      // history.push("/");
      history.goBack()
      if(open){
        handleClose()
      }
    }
  }, [authenticate, handleClose, open, history]);
console.log({authenticate, user})
  // useEffect(()=>{
  //   if (user?.user?._id) {
  //     if(handleClose){
  //       handleClose()
  //     }
  //   }
  // },[user, handleClose])

  const [isSignUp, setIsSignUp] = useState(false);
  const createAccountSwitch = () => setIsSignUp((prev) => !prev);
 

  const errorMessage =
    password && confirmPassword
      ? password === confirmPassword
        ? "Password match"
        : "Password mismatch check and try again"
      : "";

  return (
    <>
      <div className="authentication">
        <div className="authenticationLeft">
          {/* {!isCheckout &&<div className='title'>{forgot ? "Forgot your password ?" : isSignUp ? 'Create an account today' : 'Sign in to your account'}</div>} */}
          {/* <div className='authenticationLeftText'>

      but also the leap into electronic typeset but also the leap into electronic typeset but also the leap into electronic typeset but also the leap into electronic typeset but also the leap into electronic typeset
      </div> */}
        </div>
        <div className="authenticationRight">
          {!isCheckout && (
            <h2 className="title">
              {forgot
                ? "Provide your email"
                : isSignUp
                ? "Create account"
                : "Sign In"}
            </h2>
          )}
          {isSignUp && !isCheckout && (
            <h3 className="subTitle">It's quick and simple</h3>
          )}
          {forgot ? (
            <form className="authenticationContentForm">
              <InputComponent
                type="email"
                display={isSignUp ? true : false}
                onChange={(e) => (email.current = e.target.value)}
                title="Email"
                required={true}
                placeholder="Your email"
              />
            </form>
          ) : (
            <form
              className="authenticationContentForm"
              onSubmit={(e) => submitHandler(e, isSignUp ? "create" : "login")}
            >
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
                title="Phone"
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
                display={true}
                onChange={(e) => setPassword(e.target.value)}
                errorMessage={errorMessage}
                title="Password"
                required={true}
                placeholder="Your password"
                icon={PiHash}
              />
              <InputComponent
                type="password"
                display={isSignUp ? true : false}
                onChange={(e) => setConfirmPassword(e.target.value)}
                title="Confirm password"
                required={true}
                placeholder="Confirm password"
                icon={PiHashFill}
              />
              {/* <SelectComponent handleChangeSelect={handleuserType} display={isSignUp ? true : false} title='Account type' required={true} defaultValue={'User'} placeholder='Account type' options={userTypeArray} /> */}
              <CheckComponent
                showLabel={true}
                placeholder={"Early sign-up to receive oOS360 deals"}
                defaultValue={isoOS360}
                required={true}
                title={"Early sign-up for oOS360."}
                display={isSignUp ? true : false}
                onChange={(e) => setIsoOS360(e.target.value)}
              />
              <CheckComponent
                showLabel={true}
                placeholder={"Receive news letters and offers"}
                defaultValue={isNewsLetter}
                required={true}
                title={"Receive news letters and offers."}
                display={isSignUp ? true : false}
                onChange={(e) => setIsNewsLetter(e.target.value)}
              />
              <CheckComponent
                showLabel={true}
                placeholder={"Agree to terms and condition"}
                defaultValue={termsAndConditions}
                required={true}
                title={"Agree to terms and condition."}
                display={isSignUp ? true : false}
                onChange={(e) => setTermsAndConditions(e.target.value)}
              />
              {!isSignUp && (
                <button className="authenticationRightFormBtn">
                  {loading ? "Authenticating..." : "Login"}
                </button>
              )}
              {}
              {isSignUp && (
                <button className="authenticationRightFormBtn">
                  {creatAcountLoading ? "Please wait..." : "Create account"}
                </button>
              )}
              {/* <div className="authenticationRightFormAuth">
                {isSignUp ? "Create" : "Login"} with oOS360
              </div> */}
              {/* <div className="authenticationRightFormAuth">
                {isSignUp ? "Create" : "Login"} with Google
              </div> */}

              <p
                className="authenticationRightFormNew"
                onClick={createAccountSwitch}
              >
                {isSignUp ? "Login instead" : "Create an account instead"}
              </p>
              {!isSignUp && (
                <div
                  onClick={handleForgot}
                  className="authenticationRightFormForgot"
                >
                  Forgot password
                </div>
              )}
            </form>
          )}
        </div>
      </div>
      {/* {!isCheckout || !component ? <TheFooter token={token} /> : null} */}
    </>
  );
};

export default Authorization;
