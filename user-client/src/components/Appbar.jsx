import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../store/atoms/user";

function Appbar() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);

  if (user.isLoading) {
    return <></>;
  }

  if (user.userEmail) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "white",
          padding: 10,
        }}
      >
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          SkillAcademy
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          <div style={{ marginRight: 10 }}>
            <Button
              onClick={() => {
                navigate("/courses");
              }}
            >
              Courses
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                navigate("/purchasedcourses");
              }}
            >
              Purchased Course
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              style={{ marginLeft: 10 }}
              onClick={() => {
                localStorage.setItem("token", null);
                setUser({ isLoading: false, userEmail: null });
                navigate("/signin");
              }}
            >
              Log out
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "white",
        padding: 10,
      }}
    >
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate("/");
        }}
      >
        SkillAcademy
      </div>
      <div>
        <Button
          style={{ marginRight: 10 }}
          variant="contained"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Sign Up
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/signin");
          }}
        >
          Sign in
        </Button>
      </div>
    </div>
  );
}

export default Appbar;
