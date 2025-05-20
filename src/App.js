// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/containers/LoginContainer/login";
import ResetPassword from "./screens/containers/LoginContainer/resetPassword";
import ForgotPassword from "./screens/containers/LoginContainer/forgotPassword";
import Register from "./screens/containers/LoginContainer/register";
import VerifyAccount from "./screens/containers/LoginContainer/verifyAccount";
import { useEffect, useState } from "react";
import SplashScreen from "./screens/containers/showSplashScreenContainer/splashScreen";
import LoginHome from "./screens/containers/LoginContainer/loginHome";
import MentorDashboard from "./screens/containers/DashBoardContainer/MentorDashboard";
import StudentDashboard from "./screens/containers/DashBoardContainer/StudentDashboard";
import CreateQuestion from "./screens/containers/QuestionContainer/CreateQuestion";
import QuestionsView from "./screens/containers/QuestionContainer/QuestionsView";
import UpdateQuiz from "./screens/containers/DashBoardContainer/ResourceContainer/UpdateResource";
import UpdateResource from "./screens/containers/DashBoardContainer/ResourceContainer/UpdateResource";
import CreateResource from "./screens/containers/DashBoardContainer/ResourceContainer/CreateResource";


function App() {
  const [showSplash, setShowSplash] = useState(false);
  const [checkingFirstVisit, setCheckingFirstVisit] = useState(true);
  useEffect(() => {
    const hasSeenSplash = localStorage.getItem("hasSeenSplash");

    if (!hasSeenSplash) {
      setShowSplash(true);
      localStorage.setItem("hasSeenSplash", "true");
      setTimeout(() => {
        setShowSplash(false);
        setCheckingFirstVisit(false);
      }, 2000);
    } else {
      setCheckingFirstVisit(false);
    }
  }, []);

  if (checkingFirstVisit || showSplash) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <LoginHome>
              <Login />
            </LoginHome>
          }
        />
        <Route
          exact
          path="/register-user"
          element={
            <LoginHome>
              <Register />
            </LoginHome>
          }
        />
        <Route
          exact
          path="/forgot-password"
          element={
            <LoginHome>
              <ForgotPassword />
            </LoginHome>
          }
        />
        <Route
          exact
          path="/reset-password"
          element={
            <LoginHome>
              <ResetPassword />
            </LoginHome>
          }
        />
        <Route
          exact
          path="/activate-user"
          element={
            <LoginHome>
              <VerifyAccount />
            </LoginHome>
          }
        />

        <Route exact path="/student-dashboard" element={<StudentDashboard />} />
        <Route exact path="/mentor-dashboard" element={<MentorDashboard />} >
        
        </Route>
        <Route path="/update-resource/:id" element={<UpdateResource />} />
        <Route
          exact
          path="/create-resource"
          element={<CreateResource />}
        />
        

        <Route
          exact
          path="/create-question"
          element={<CreateQuestion />}
        />

        <Route exact path="/questions" element={<QuestionsView />} />
      </Routes>
    </Router>
  );
}

export default App;
