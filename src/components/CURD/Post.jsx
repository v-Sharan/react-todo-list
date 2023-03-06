import React, { useState } from "react";
import {
  Stack,
  Grid,
  TextField,
  Typography,
  FormControl,
  Alert,
} from "@mui/material";
import { StyleButton } from "../UI/StyleButton";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";

const ValidationSchema = Yup.object({
  name: Yup.string().min(2).required("Enter a valid name"),
  description: Yup.string().min(5).required("Enter a description"),
});

const initialValues = {
  name: "",
  date: new Date(),
  description: "",
  update: Date(),
};

const Post = () => {
  const [error, setError] = useState(false);
  const [servity, setServity] = useState("success");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  let formValid = true;

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: ValidationSchema,
      onSubmit: (values, action) => {
        axios
          .post(`${process.env.REACT_APP_BASE_URL_TO_FETCH}.json`, values)
          .then((res) => {
            setError(true);
            setMessage("Successfully Added Todo List");
            setServity("success");
            setTimeout(() => {
              navigate("/Edit");
            }, 1000);
          })
          .catch((err) => {
            setError(true);
            setMessage(err.message);
            setServity("error");
          });
        action.resetForm();
      },
    });

  if (values.name.length >= 2 && values.description.length >= 5) {
    formValid = false;
  }

  return (
    <div className="flex justify-center items-center mx-auto my-auto md:max-w-md sm:max-w-sm relative">
      <div className="bg-white rounded-xl shadow-md p-3 mt-[110px]">
        {error && <Alert severity={servity}>{message}</Alert>}
        <Typography variant="h2" className="text-center text-gray-500">
          Add TodoList
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid justifyContent="center">
            <div className="flex flex-col">
              <FormControl error={errors.name && touched.name ? true : false}>
                <label
                  htmlFor="name"
                  className={errors.name && touched.name && "text-red-600"}
                >
                  Name:
                </label>
                <TextField
                  type={"text"}
                  placeholder="Name"
                  value={values.name}
                  onBlur={handleBlur}
                  name="name"
                  onChange={handleChange}
                  fullWidth
                  error={errors.name && touched.name && true}
                  helperText={errors.name && touched.name && <>{errors.name}</>}
                />
              </FormControl>
              <FormControl error={errors.description ? true : false}>
                <label
                  htmlFor="description"
                  className={
                    errors.description && touched.description && "text-red-600"
                  }
                >
                  Description:
                </label>
                <TextField
                  placeholder="Description"
                  name="description"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  error={errors.description && touched.description && true}
                  helperText={
                    errors.description &&
                    touched.description && <>{errors.description}</>
                  }
                  fullWidth
                />
              </FormControl>
            </div>
          </Grid>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-end"
            m={1}
          >
            <StyleButton type="submit" disabled={formValid}>
              Post
            </StyleButton>
          </Stack>
        </form>
      </div>
    </div>
  );
};

export default Post;
