import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Client, EmailValidationClient } from "../../../graphqlClient";
import { EMAIL_API_KEY } from "../../utils/api_keys";
import IphoneLoginScreen from "./demoScreens/IphoneScrrens";

function Register() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const naviagte = useNavigate();
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [role, setRole] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleShow1 = () => {
    setShow1(!show1);
  };
  const handleShow2 = () => {
    setShow2(!show2);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    console.log("entered");
    console.log(role);
    console.log(dob);
    console.log(phoneNumber);
    

    const REGISTRATION_MUTATION = `
            mutation Register($username: String!, $email: String!, $password: String!, $confirmPassword: String!,$role: String!,$dob: Date!,$phoneNumber: String!){
                register(username: $username,email: $email, password1: $password, password2: $confirmPassword,role: $role, dateOfBirth: $dob, phoneNumber: $phoneNumber){
                    success
                    errors
                }
            }
        `;
    try {
      setLoading(true);
      const e_response = await EmailValidationClient(EMAIL_API_KEY(), email);
      const email_del = e_response.data.email_deliverability.status;
      const is_email_valid = e_response.data.email_deliverability.is_smtp_valid;
      console.log(email_del);
      console.log(is_email_valid);

      if (is_email_valid) {
        const response = await Client(REGISTRATION_MUTATION, {
          username,
          email,
          password,
          confirmPassword,
          role,
          dob,
          phoneNumber
        });
        console.log(response.data);

        if (response.data.register.success) {
          setLoading(false);
          naviagte("/");
        } else {
          setError(response.data.register.errors[0].message);
        }
      } else {
        setError("Provide a valid email to register");
      }
    } catch (error) {
      console.log("error");

      setLoading(false);
      setError("Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="scrollable">
          <h2 className="login-text">Register Here</h2>

          <form className="form mx-auto" onSubmit={handleRegister}>
            <div className="">
              <label>Name</label>
              <input
                type="text"
                className="input-box"
                placeholder="Enter Name"
                onChange={(e) => setUserName(e.target.value)}
                value={username}
                required
              />
            </div>
            <div className="">
              <label>Email address</label>
              <input
                type="email"
                className="input-box"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className="row">
              <label>Are you a?</label>
              <br />
              <div className="col-md-6">
                <input
                  type="radio"
                  className="check-box"
                  name="role"
                  onChange={(e) => setRole(e.target.value)}
                  value="student"
                  // checked={role=="student"}
                  required
                />{" "}
                <label htmlFor="role1" className="ml-2">
                  {" "}
                  Student
                </label>
              </div>

              <div className="col-md-6">
                <input
                  type="radio"
                  className="check-box"
                  name="role"
                  onChange={(e) => setRole(e.target.value)}
                  value="mentor"
                  // checked={role=="mentor"}
                  required
                />{" "}
                <label htmlFor="role2" className="ml-2">
                  {" "}
                  Mentor
                </label>
              </div>
            </div>

            <div className="row">
            <div className="col-md-6">
              <label>Date of Birth</label>
              <input
                type="date"
                className="input-box"
                placeholder="Date of birth"
                onChange={(e) => setDob(e.target.value)}
                value={dob}
                required
              />
            </div>

            <div className="col-md-6">
              <label>Phone Number</label>
              <input
                type="text"
                className="input-box"
                placeholder="Enter your phone number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
                required
              />
            </div>
            </div>

            <div className="form-group password-input-box">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type={show1 ? "text" : "password"}
                className="input-box"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <span className="show-password1" onClick={handleShow1}>
                {show1 ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <div className="form-group password-input-box">
              <label htmlFor="exampleInputPassword1">Confirm Password</label>
              <input
                type={show2 ? "text" : "password"}
                className="input-box"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
              />
              <span className="show-password2" onClick={handleShow2}>
                {show2 ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            {error && <p style={{ color: "red" }}>Error: {error}</p>}

            <button type="submit" className="login-button">
              {loading ? "Registering..." : "Register"}
            </button>

            <p className="my-3">
              Already have an account?{" "}
              <a className="register-text" href="/">
                Login
              </a>{" "}
              here?
            </p>
          </form>
        </div>
      </div>
      <div className=" left-content" >
        <div>
          <IphoneLoginScreen style={{position: "fixed"}}></IphoneLoginScreen>
        </div>
      </div>
      <div className="box-div1"></div>
      <div className="box-div2"></div>
      <div className="box-div3"></div>
      <div className="triangle"></div>
      <div className="box-div5"></div>
    </div>
  );
}

export default Register;
