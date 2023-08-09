import { Card, Typography, TextField, Button, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config.js";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { courseState } from "../store/atoms/course";
import {
  courseImage,
  coursePrice,
  courseTitle,
  isCourseLoading,
} from "../store/selectors/course";

function Course() {
  const { courseId } = useParams();
  const setCourse = useSetRecoilState(courseState);
  const courseLoading = useRecoilValue(isCourseLoading);

  useEffect(() => {
    setCourse({ isLoading: true, course: null });
    axios
      .get(`${BASE_URL}/admin/course/${courseId}`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCourse({ isLoading: false, course: res.data.course });
      })
      .catch((e) => setCourse({ isLoading: false, course: null }));
  }, []);
  if (courseLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <GrayTopper />
      <Grid container>
        <Grid item lg={8} md={12} sm={12}>
          <UpdatedCard />
        </Grid>
        <Grid item lg={4} md={12} sm={12}>
          <CourseCard />
        </Grid>
      </Grid>
    </>
  );
}

function GrayTopper() {
  const title = useRecoilValue(courseTitle);
  return (
    <div
      style={{
        height: 250,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "#222222",
        marginBottom: -250,
      }}
    >
      <Typography
        variant="h3"
        style={{ textAlign: "center", color: "#ffffff", fontWeight: 600 }}
      >
        {title}
      </Typography>
    </div>
  );
}

function UpdatedCard() {
  const [courseDetails, setCourse] = useRecoilState(courseState);
  const [title, setTitle] = useState(courseDetails.course.title);
  const [description, setDescription] = useState(
    courseDetails.course.description
  );
  const [imageLink, setImage] = useState(courseDetails.course.imageLink);
  const [price, setPrice] = useState(courseDetails.course.price);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card varint={"outlined"} style={{ maxWidth: 600, marginTop: 200 }}>
        <div style={{ padding: 20 }}>
          <Typography style={{ marginBottom: 10 }}>
            Update course details
          </Typography>
          <TextField
            fullWidth
            style={{ marginBottom: 15 }}
            label="Title"
            value={title}
            variant="outlined"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextField
            fullWidth
            style={{ marginBottom: 15 }}
            label="Description"
            value={description}
            variant="outlined"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <TextField
            fullWidth
            style={{ marginBottom: 15 }}
            label="Image Link"
            value={imageLink}
            variant="outlined"
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
          <TextField
            fullWidth
            style={{ marginBottom: 15 }}
            label="Price"
            value={price}
            variant="outlined"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <Button
            size="large"
            variant="contained"
            onClick={() => {
              fetch(
                `${BASE_URL}/admin/courses/` + courseDetails.course["_id"],
                {
                  method: "PUT",
                  body: JSON.stringify({
                    title,
                    description,
                    imageLink,
                    price,
                    published: true,
                  }),
                  headers: {
                    "Content-type": "application/json",
                    authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              ).then((resp) => {
                resp.json().then((data) => {
                  setCourse({
                    isLoading: false,
                    course: {
                      _id: courseDetails.course._id,
                      title,
                      description,
                      imageLink,
                      price,
                    },
                  });
                });
              });
            }}
          >
            Update course
          </Button>
        </div>
      </Card>
    </div>
  );
}

function CourseCard() {
  const title = useRecoilValue(courseTitle);
  const imageLink = useRecoilValue(courseImage);
  return (
    <div
      style={{
        display: "flex",
        marginTop: 50,
        justifyContent: "center",
      }}
    >
      <Card
        style={{
          margin: 10,
          width: 350,
          minHeight: 200,
          borderRadius: 10,
          marginRight: 50,
          paddingBottom: 15,
        }}
      >
        <img src={imageLink} style={{ width: 350 }}></img>
        <div style={{ marginLeft: 10 }}>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="subtitle2" style={{ color: "gray" }}>
            Price
          </Typography>
          <Price />
        </div>
      </Card>
    </div>
  );
}

function Price() {
  const price = useRecoilValue(coursePrice);
  return (
    <Typography variant="subtitle1">
      <b>₹ {price} </b>
    </Typography>
  );
}

export default Course;
