import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Client } from "../../../graphqlClient";
import "./verifyAccount.css";
import "./login.css";
import { MdVerifiedUser } from "react-icons/md";
import IphoneLoginScreen from "./demoScreens/IphoneScrrens";
function VerifyAccount() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("uid");
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const [v1, setV1] = useState("");
  const [v2, setV2] = useState("");
  const [v3, setV3] = useState("");
  const [v4, setV4] = useState("");
  const [v5, setV5] = useState("");
  const [v6, setV6] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    const code = `${v1}${v2}${v3}${v4}${v5}${v6}`;
    console.log("1" + "2");
    const ACTIVATION_MUTATION = `
        mutation ActivateAccount($id: String!,$token: String!,$code: String!)
        {
            verifyAccount(uid: $id, token: $token, code: $code)
            {
            success
            errors
            }
        }
    `;
    try {
      const response = await Client(ACTIVATION_MUTATION, { id, token, code });
      console.log(response);
      console.log("h2");
      if (response.data.verifyAccount.success) {
        navigate("/");
      } else {
        setError(response.data.register.errors[0].message);
      }
    } catch (error) {
      setError("An error occurred during verify account");
    }
  };

  return (
    <div className="login-container" style={{ height: "100vh" }}>
      <div className="login-form ">
        <div className="text-center mt-0">
          <p className="text-center">
            <MdVerifiedUser className="verify-icon" />
          </p>
          <p className="paragraph ">
            We've already sent you a{" "}
            <b>
              <i>verification code</i>
            </b>{" "}
            to this {email}
          </p>
        </div>

        <form className="form mx-auto" onSubmit={handleVerify}>
          <div className="code-container">
            <input
              type="text"
              maxLength="1"
              className="code-box text-center fw-bold"
              onChange={(e) => setV1(e.target.value)}
              value={v1}
              required
            />
            <input
              type="text"
              maxLength="1"
              className="code-box text-center fw-bold"
              onChange={(e) => setV2(e.target.value)}
              value={v2}
              required
            />
            <input
              type="text"
              maxLength="1"
              className="code-box text-center fw-bold"
              onChange={(e) => setV3(e.target.value)}
              value={v3}
              required
            />
            <input
              type="text"
              maxLength="1"
              className="code-box text-center fw-bold"
              onChange={(e) => setV4(e.target.value)}
              value={v4}
              required
            />
            <input
              type="text"
              maxLength="1"
              className="code-box text-center fw-bold"
              onChange={(e) => setV5(e.target.value)}
              value={v5}
              required
            />
            <input
              type="text"
              maxLength="1"
              className="code-box text-center fw-bold"
              onChange={(e) => setV6(e.target.value)}
              value={v6}
              required
            />
          </div>
          <button className="login-button" type="submit">
            verify
          </button>
        </form>
      </div>
      <div className="left-content">
        <IphoneLoginScreen />
      </div>
      <div className="box-div1"></div>
      <div className="box-div2"></div>
      <div className="box-div3"></div>
      <div className="triangle"></div>
      <div className="box-div5"></div>
    </div>
  );
}

export default VerifyAccount;
