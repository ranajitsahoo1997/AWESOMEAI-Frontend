import React, { useEffect, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { Client } from "../../../graphqlClient";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import IphoneLoginScreen from "./demoScreens/IphoneScrrens";
import { TbPasswordUser } from "react-icons/tb";
import { MdOutlineMailLock } from "react-icons/md";
import ErrorModal from "../../utils/ErrorModal";
import SucessModal from "../../utils/SucessModal";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal,setShowSuccessModal] = useState(false);


  const [sss,setSss]=useState("")
  const handleShowModal =()=>setShowSuccessModal(true)
  
  const handleCloseModal = () => setShowErrorModal(false);
    

  const handleShow = () => {
    setShow(!show);
  };

  const handleLogin = async (e) => {
    localStorage.clear()
    e.preventDefault();
    setLoading(true);
    setError("");

    const LOGIN_MUTATION = `
    mutation Login($email: String!, $password: String!)
    {
      tokenAuth(email: $email, password: $password)
      {
        success
        token
        errors
      }
    }
    `;
    const ME_QUERY = ` 
      query{
        me{
            id,
            username,
            email,
            phoneNumber,
            dateOfBirth,
            isStudent,
            isMentor,        
        }
      }
    `
    try {
      const response = await Client(LOGIN_MUTATION, { email, password });
      if(response =='undefined'){
        setError("something went wrong")
      }
      console.log("Login response:", response);
      const token = response.data.tokenAuth.token;
      localStorage.setItem("token", token);
      console.log(token);
      
      const success = response.data.tokenAuth.success;
      const errors = response.data.tokenAuth.errors;
      
      const res = await Client(ME_QUERY);
      console.log(res?.data?.me);
      
      console.log("login_user",res?.data?.me);
      
      const user = res?.data?.me
      localStorage.setItem("currentUser", JSON.stringify(user))
      if (success && token != null) {
        setSss("Sucessfuly Logged in")
        if (user.isStudent) {
          navigate("/student-dashboard")
        }
        if (user.isMentor) {
          navigate("/mentor-dashboard")
        }
        
        

      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please check your credentials.");
      setShowErrorModal(true)
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     navigate('/home');
  //   }
  // }, []);
  // useEffect(()=>{
  //   console.log(error);
    
  //   if (error!=""){
  //     setshowErrorModal(true)
  //   }
  // },[])

  return (
    <div className="login-container">
      {sss && <SucessModal show={showSuccessModal} handleClose={handleShowModal} message={sss}/>}
      {error&& <ErrorModal show={showErrorModal} handleClose={handleCloseModal} message={error}/>}
      <div className=" left-content">
        <div>
            <div className="iphone">
              <IphoneLoginScreen/>
            </div>
            <div className="tab">
              
            </div>
        </div>
      </div>
      <div className=" login-form">
        <h2 className="login-text">Login To AwesomeAI</h2>

        <form className="form mx-auto" onSubmit={handleLogin}>
          <div className="email-input-box">
            <label >Email</label>
            <div className="mail-icon"><MdOutlineMailLock/></div>
            <input
              type="email"
              className="input-box"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="form-group password-input-box">
            <label htmlFor="exampleInputPassword1">Password</label>
            <div className="pass-icon"><TbPasswordUser/></div>
            <input
              type={show ? "text" : "password"}
              className="input-box"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <span className="show-password1" onClick={handleShow}>
              {show ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          
        
          <div className="forgot-password">
            <a href="/forgot-password" className="btn btn-link">
              Forgot Password?
            </a>
          </div>
          
          <button type="submit" className="login-button">
            {loading ? "Loading..." : "Login"}
          </button>
          
            <p className="my-3">Don't have an account? <a className="register-text" href="/register-user">Register</a> here?</p>
          
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

export default Login;
