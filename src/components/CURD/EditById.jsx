import React, { useState } from "react";
import { useFetchById } from "../hook";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Alert, FormControl } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { StyleButton } from "../UI/StyleButton";
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

const EditById = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [isErrorAlert, setIsErrorAlert] = useState(false);
  const [servity, setServity] = useState("");
  const [message, setMessage] = useState("");
  const id = params.id;
  const { data, isLoading, isError, error } = useFetchById(id);

  let formValid = true;

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: ValidationSchema,
      onSubmit: (values, action) => {
        axios
          .put(`${process.env.REACT_APP_BASE_URL_TO_FETCH}/${id}.json`, values)
          .then((res) => {
            setMessage("Sucessfully Changed");
            setIsErrorAlert(true);
            setServity("success");
            setTimeout(() => {
              navigate("/Edit");
            }, 1000);
          })
          .catch((err) => {
            setMessage(err.message);
            setIsErrorAlert(true);
            setServity("error");
          });
        action.resetForm();
      },
    });

  if (values.name.length >= 2 && values.description.length >= 5) {
    formValid = false;
  }

  if (isError) {
    return (
      <div className="rounded max-w-sm bg-white flex text-center mx-auto shadow-lg flex-col p-3 gap-3 text-5xl">
        {error.message}
      </div>
    );
  }
  return (
    <div className="rounded xl:max-w-sm bg-white flex text-center mx-auto shadow-lg flex-col p-3 gap-3">
      {isErrorAlert && <Alert severity={servity}>{message}</Alert>}
      {isLoading ? (
        <>Loading...</>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="font-extrabold text-4xl">Edit {data?.data?.name}</div>
          <div className="flex flex-col gap-5">
            <FormControl error={errors.name && touched.name ? true : false}>
              <div className="text-xl">
                <label className="flex flex-end">Name:</label>
                <TextField
                  name="name"
                  fullWidth
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.name && touched.name && true}
                  helperText={errors.name && touched.name && <>{errors.name}</>}
                />
              </div>
            </FormControl>
            <FormControl error={errors.name && touched.name ? true : false}>
              <div className="text-xl">
                <label className="flex flex-end">Description:</label>
                <TextField
                  name="description"
                  fullWidth
                  value={values.description}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.description && touched.description && true}
                  helperText={
                    errors.description &&
                    touched.description && <>{errors.description}</>
                  }
                />
              </div>
            </FormControl>
          </div>
          <div className={"flex mt-4 justify-end"}>
            <StyleButton variant="outlined" type="submit" disabled={formValid}>
              Change
            </StyleButton>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditById;
