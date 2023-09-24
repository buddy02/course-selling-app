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

function PurchasedCourses() {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  useEffect(() => {
    fetch(`${BASE_URL}/user/purchasedCourses`, {
      headers: {
        "Content-type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((resp) => {
      resp.json().then((data) => {
        setPurchasedCourses(data.purchasedCourses);
      });
    });
  }, []);
  if (purchasedCourses.length == 0) {
    return <div>No Courses Purchased</div>;
  }
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {purchasedCourses.map((course) => {
        return <PurchasedCourse course={course} />;
      })}
    </div>
  );
}

function PurchasedCourse({ course }) {
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
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
export default PurchasedCourses;
