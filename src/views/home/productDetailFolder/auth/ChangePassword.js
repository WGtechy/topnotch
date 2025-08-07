import React, { useEffect, useState } from "react";
import { PiHash, PiHashFill } from "react-icons/pi";
import InputComponent from "../../../../bucket/formComponent/InputComponent";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../../../redux/actions/auth.actions";
import useUrlSearchParams from "../../../../utilities-config/useUrlSearchParams";
import Error404 from "../../../Error404";
import { componentLoader } from "../../../../bucket/loading-components/componentLoader";
import Image from "../../../../bucket/Image";

const ChangePassword = (props) => {
  const dispatch = useDispatch(); // the useDispatch stored in a constant variable will dispatch the input of the user into a dispatch function like the sign in function
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const params = useUrlSearchParams();
  const { status, loading, info } = useSelector((state) => state.signIn);

  useEffect(() => {
    if (info === "Password successfully changed") {
      props.history.push("/auth");
    }
  }, [props, info]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword && !loading) {
      const user = {
        password,
        otp: params?.ot,
        id: params?.id,
        email: "requestPass@topnotch.com",
        passPhraseQuestion: "initial",
        passPhraseAnswer: "initial",
      };
      dispatch(forgotPassword(user));
    }
  };
  useEffect(() => {
    if (params?.ot && params?.id) {
      dispatch(
        forgotPassword({
          target: "get",
          email: "requestPass@topnotch.com",
          passPhraseQuestion: "initial",
          passPhraseAnswer: "initial",
          otp: params.ot,
          _id: params.id,
        })
      );
    }
  }, [params?.ot, params?.id, dispatch]);
  return status === 404 ? (
    <Error404 />
  ) : loading ? (
    componentLoader
  ) : (
    <div className="authentication page">
      <div className="authenticationLeft">
        <div className="authenticationLeftImage">
          <Image src="/auth.png" />
        </div>
      </div>

      <div className="authenticationRight">
        <div style={{ fontSize: "2.5rem" }}>Change password</div>
        <form className="authenticationContentForm" onSubmit={handleSubmit}>
          <InputComponent
            type="password"
            display={true}
            min={8}
            onChange={(e) => setPassword(e.target.value)}
            title="New password"
            required={true}
            placeholder="Your new password"
            icon={PiHash}
          />
          <InputComponent
            type="password"
            display={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
            title="Confirm new password"
            required={true}
            placeholder="Confirm new password"
            icon={PiHashFill}
          />
          {password && password === confirmPassword && (
            <div
              className="authenticationRightFormBtn"
              style={{ cursor: loading ? "progress" : "pointer" }}
              onClick={handleSubmit}
            >
              {loading ? "Please wait" : "Change"}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
