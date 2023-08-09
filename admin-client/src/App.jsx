import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./components/Signin.jsx";
import Signup from "./components/Signup.jsx";
import Appbar from "./components/Appbar.jsx";
import AddCourse from "./components/AddCourse.jsx";
import Courses from "./components/Courses";
import Course from "./components/Course";
import Landing from "./components/Landing.jsx";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { userState } from "./store/atoms/user.js";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./config.js";
function App() {
  return (
    <RecoilRoot>
      <Router>
        <Appbar></Appbar>
        <InitUser />
        <Routes>
          <Route path={"/courses"} element={<Courses />} />
          <Route path={"/course/:courseId"} element={<Course />} />
          <Route path={"/addcourse"} element={<AddCourse />} />
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/signin"} element={<Signin />} />
          <Route path={"/"} element={<Landing />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

function InitUser() {
  const setUser = useSetRecoilState(userState);
  const init = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/me`, {
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
      });
      setUser({ isLoading: false, userEmail: response.data.username });
    } catch (e) {
      setUser({ isLoading: false, userEmail: null });
    }
  };
  useEffect(() => {
    init();
  }, []);
}

export default App;
