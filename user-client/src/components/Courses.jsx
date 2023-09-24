import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  CardContent,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import axios from "axios";

function Courses() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch(`${BASE_URL}/user/courses`, {
      headers: {
        "Content-type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((resp) => {
      resp.json().then((data) => {
        setCourses(data.courses);
      });
    });
  }, []);
  if (courses.length == 0) {
    return <div>Loading...</div>;
  }
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {courses.map((course) => {
        return <Course course={course} />;
      })}
    </div>
  );
}

function Course({ course }) {
  const navigate = useNavigate();
  return (
    <Card sx={{ minWidth: 380, maxWidth: 380, margin: 5 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={course.imageLink}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {course.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {course.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ₹{course.price}
          </Typography>
          <Button
            size="medium"
            variant="contained"
            onClick={async () => {
              const response = await axios.post(
                `${BASE_URL}/user/courses/${course._id}`,
                {},
                {
                  headers: {
                    "Content-type": "application/json",
                    authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );
              // setUser({ isLoading: false, userEmail: email });
              navigate("/purchasedcourses");
            }}
          >
            Buy
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Courses;
