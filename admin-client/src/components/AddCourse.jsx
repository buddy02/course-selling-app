import { Button, Card, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../config.js";

function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageLink, setImage] = useState("");
  const [price, setPrice] = useState(0);
  return (
    <div>
      <div
        style={{
          paddingTop: 150,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">Add your course below</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ width: 400, padding: 20 }} variant="outlined">
          <TextField
            style={{ marginBottom: 18 }}
            fullWidth
            label="Title"
            variant="outlined"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextField
            style={{ marginBottom: 18 }}
            fullWidth
            label="Description"
            variant="outlined"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <TextField
            style={{ marginBottom: 18 }}
            fullWidth
            label="Image Link"
            variant="outlined"
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
          <TextField
            style={{ marginBottom: 18 }}
            fullWidth
            label="Price"
            variant="outlined"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <Button
            size="large"
            variant="contained"
            onClick={async () => {
              await axios.post(
                `${BASE_URL}/admin/courses`,
                {
                  title,
                  description,
                  imageLink,
                  price,
                  published: true,
                },
                {
                  headers: {
                    authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );
              alert("Course added");
            }}
          >
            Add course
          </Button>
        </Card>
      </div>
    </div>
  );
}
export default AddCourse;
