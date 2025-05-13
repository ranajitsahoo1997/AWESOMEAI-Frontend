import React, { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Client } from "../../../graphqlClient";
import IphoneLoginScreen from "./demoScreens/IphoneScrrens";
import { TbPasswordUser } from "react-icons/tb";
function ResetPassword() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('uid');
  const token = searchParams.get('token');
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setError("");
    if(newPassword !== confirmPassword){
      setError("Passwords do not match");
      return;
    }
    console.log("enter-1")
    const RESET_PASSWORD_MUTATION = `
      mutation ResetPassword($id: ID!, $token: String!, $newPassword: String!){
      
        passwordReset(uid: $id, token: $token, newPassword: $newPassword) {
          success
        }
      }
    `
    try {
      
      const response = await Client(RESET_PASSWORD_MUTATION, { id, token, newPassword });
      console.log(response);
      
      if (response.data.passwordReset.success) {
        navigate("/");
      } else {
        setError("Password reset failed");
      }
    } catch (error) {
      
      setError("An error occurred during password reset");
    }
  }
  return (
    <div className="login-container">
    <div className="left-content">
      <IphoneLoginScreen></IphoneLoginScreen>
    </div>
      <div className="login-form">
        <h1 className="login-text">Reset Password</h1>
      <form className="form mx-auto" onSubmit={handleSubmit}>
        <div className="email-input-box">
          <label>New Password:</label>
          <div className="pass-icon"><TbPasswordUser/></div>
          <input
            className="input-box"
            type="password"
            id="newPassword"
            name="newPassword"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            required
          />
        </div>
        <div className="email-input-box">
          <label>Confirm Password:</label>
          <div className="pass-icon"><TbPasswordUser/></div>
          <input
            className="input-box"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button className="login-button" type="submit">Reset Password</button>
      </form>
      </div>
      <div className="box-div1"></div>
      <div className="box-div2"></div>
      <div className="box-div3"></div>
      <div className="triangle"></div>
      <div className="box-div5"></div>
      
    </div>
  );
}

export default ResetPassword;
