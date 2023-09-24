import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../store/atoms/user";

function Landing() {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  return (
    <>
      <Grid container style={{ padding: "5vw" }}>
        <Grid item md={12} lg={6} style={{ marginTop: 100 }}>
          <Typography variant="h2">Coursera User</Typography>
          <Typography variant="h5" style={{ marginBottom: 10 }}>
            A place to learn, earn and grow
          </Typography>
          {!user.userEmail && (
            <div>
              <Button
                style={{ marginRight: 10 }}
                size="large"
                variant="contained"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign Up
              </Button>
              <Button
                size="large"
                variant="contained"
                onClick={() => {
                  navigate("/signin");
                }}
              >
                Sign in
              </Button>
            </div>
          )}
        </Grid>
        <Grid item md={12} lg={6}>
          <img
            src="https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Landing;
