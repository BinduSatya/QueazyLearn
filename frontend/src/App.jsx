import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// import Login from "./pages/Auth/Login.jsx";
// import SignUp from "./pages/Auth/SignUp.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Dashboard from "./pages/Home/Dashboard.jsx";
import InterviewPrep from "./pages/InterviewPrep/interviewPrep.jsx";
import UserProvider from "./context/userContext.jsx";

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/interview-prep/:sessionId"
              element={<InterviewPrep />}
            />
          </Routes>
        </Router>

        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{ className: "", style: { fontSize: "13px" } }}
        />
      </div>
    </UserProvider>
  );
};

export default App;
