import React from "react";
import { IoIosFingerPrint } from "react-icons/io";
import { MdVerifiedUser } from "react-icons/md";

const IphoneLoginScreen = () => {

  // const emailText = "user@example.com";
  // const appName = " Welcome To AwesomeAI";

  // let emailIndex = 0;
  // let nameIndex = 0;
  // useEffect(() => {
  //   const typeEmail = () => {
  //     if (emailIndex < emailText.length) {
  //       email = email + emailText.charAt(emailIndex);
  //       setEmail(email);
  //       emailIndex++;
  //       setTimeout(typeEmail, 80);
  //     } else {
  //       setTimeout(typeEmail, 500);
  //     }
  //   };
  //   const typeName = () => {
  //     console.log(nameIndex);

  //     if (nameIndex < appName.length) {
  //       name = appName.charAt(nameIndex);
  //       setName(name);
  //       nameIndex++;
  //       setTimeout(typeName, 100);
  //     } else {
  //       setBig(false);
  //       setSmall(true);
  //     }
  //   };

  //   typeName();
  // }, []);

  // const handleLogin = () => {
  //   alert("Logging in...");
  // };

  return (
    <div style={styles.container}>
      {console.log("--->", window.location.pathname)}
      <div style={styles.iphone}>
        <div style={styles.notch}></div>
        <div style={styles.screen}>
          <div style={styles.appName}>
            {/* {window.location.pathname === "/"
              ? "Login "
              : window.location.pathname === "/register-user"
              ? "Register"
              : window.location.pathname === "/forgot-password/"
              ? "Forgot"
              : window.location.pathname === "/reset-password/"
              ? "Reset Password"
              : window.location.pathname === "/activate-user"
              ? "Activate User"
              : ""} */}
              <MdVerifiedUser></MdVerifiedUser>
          </div>

          <div
            className="text-center text-white "
            style={styles.smallbrandName}
          >
            {/* {big?name:appName} */}
            <div direction="left" >Welcome To AwesomeAI  Welcome To AwesomeAI  Welcome To AwesomeAI </div>
            <div direction="right">Welcome To AwesomeAI  Welcome To AwesomeAI  Welcome To AwesomeAI </div>
            <div direction="left">Welcome To AwesomeAI  Welcome To AwesomeAI  Welcome To AwesomeAI </div>
            <div direction="right">Welcome To AwesomeAI  Welcome To AwesomeAI  Welcome To AwesomeAI </div>
            <div direction="uleft" >Welcome To AwesomeAI  Welcome To AwesomeAI  Welcome To AwesomeAI </div>
            <div direction="right">Welcome To AwesomeAI  Welcome To AwesomeAI  Welcome To AwesomeAI </div>
            <div direction="left">Welcome To AwesomeAI  Welcome To AwesomeAI  Welcome To AwesomeAI </div>
            <div direction="right">Welcome To AwesomeAI  Welcome To AwesomeAI  Welcome To AwesomeAI </div>
            <div direction="left">Welcome To AwesomeAI  Welcome To AwesomeAI  Welcome To AwesomeAI </div>
            <div direction="right">Welcome To AwesomeAI  Welcome To AwesomeAI  Welcome To AwesomeAI </div>
            <div direction="left">Welcome To AwesomeAI  Welcome To AwesomeAI  Welcome To AwesomeAI </div>
            <div direction="right">Welcome To AwesomeAI  Welcome To AwesomeAI  Welcome To AwesomeAI </div>
            <div direction="left">Welcome To AwesomeAI  Welcome To AwesomeAI  Welcome To AwesomeAI </div>
            <div direction="right">Welcome To AwesomeAI  Welcome To AwesomeAI  Welcome To AwesomeAI </div>
            <div direction="left">Welcome To AwesomeAI  Welcome To AwesomeAI  Welcome To AwesomeAI </div>
            <div direction="right">Welcome To AwesomeAI  Welcome To AwesomeAI  Welcome To AwesomeAI </div>
            <div direction="left">Welcome To AwesomeAI  Welcome To AwesomeAI  Welcome To AwesomeAI </div>
            <div direction="right">Welcome To AwesomeAI  Welcome To AwesomeAI  Welcome To AwesomeAI </div>
          </div>

          <div style={styles.formGroup}></div>
          
        </div>
        <div>
          <IoIosFingerPrint style={styles.homeButton}></IoIosFingerPrint>
        </div>
      </div>
      <div style={styles.btn1}></div>
      <div style={styles.btn2}></div>
      <div style={styles.btn3}></div>
    </div>
  );
};

const styles = {
 
  smallbrandName: {
    position: "absolute",
    fontSize: "2rem",
    fontWeight: "bold",
    width: "600px",
    height: "1000px",
    rotate: "25deg",
    // left: "-20%",
    top: "-11%",
    right: "-8%",
  },
  container: {
    backgroundColor: "transparent",
    width: "300px",
    // height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Segoe UI, sans-serif",
    position: "relative",
  },
  iphone: {
    width: "300px",
    height: "600px",
    backgroundColor: "#fff",
    borderRadius: "40px",
    border: "5px solid black",
    position: "relative",
    boxShadow: "0 0 20px rgba(0,0,0,0.2)",
    overflow: "hidden",
  },
  notch: {
    width: "140px",
    height: "30px",
    backgroundColor: "black",
    borderRadius: "0 0 20px 20px",
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 10,
  },
  screen: {
    backgroundColor: "rebeccapurple",
    width: "100%",
    height: "100%",
    padding: "60px 20px 20px 20px",
    boxSizing: "border-box",
    color: "#333",
    position: "relative",
  },
  appName: {
    textAlign: "center",
    fontSize: "15rem",
    fontWeight: "bold",
    marginBottom: "40px",
    color: "white",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    fontSize: "0.9rem",
    marginBottom: "6px",
    display: "block",
    color: "rebeccapurple",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    outline: "none",
    backgroundColor: "#fff",
    color: "#333",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "10px",
    backgroundColor: "white",
    border: "none",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
  },
  homeButton: {
    width: "60px",
    height: "60px",
    color: "white",
    borderRadius: "50%",
    position: "absolute",
    bottom: "15px",
    left: "50%",
    transform: "translateX(-50%)",
  },
  btn1: {
    position: "absolute",
    width: "5px",
    height: "40px",
    backgroundColor: "black",
    borderRadius: "0px 2px 2px 0px",
    right: "-1%",
    top: "43%",
  },
  btn2: {
    position: "absolute",
    width: "5px",
    height: "40px",
    backgroundColor: "black",
    borderRadius: "0px 2px 2px 0px",
    right: "-1%",
    top: "35%",
  },
  btn3: {
    position: "absolute",
    width: "5px",
    height: "40px",
    backgroundColor: "black",
    borderRadius: "0px 2px 2px 0px",
    left: "-1%",
    top: "35%",
  },
};

export default IphoneLoginScreen;
