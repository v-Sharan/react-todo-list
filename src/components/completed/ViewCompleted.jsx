import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TodoByIdCompleted } from "../hook/use-FectById";
import { StyleButton } from "../UI/StyleButton";
import { Alert } from "@mui/material";
import axios from "axios";

function formatMyDate(value, locale = "en-GB") {
  return new Date(value).toLocaleDateString(locale);
}

const ViewComplted = () => {
  const params = useParams();
  const id = params.id;
  const { data, isLoading, isError, error } = TodoByIdCompleted(id);
  const navigate = useNavigate();
  const [servity, setServity] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState();

  const handleCompleteDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL_TO_ADD_COMPLETE}/${id}.json`)
      .then(() => {
        setServity("success");
        setMessage("Successfully Deleted from Completed List");
        setErrors(true);
        setTimeout(() => {
          navigate("/Completed");
          setErrors(false);
        }, 1000);
      })
      .catch((err) => {
        setServity("error");
        setMessage(err.message);
        setErrors(true);
      });
  };

  const date = formatMyDate(data?.data?.date);

  return (
    <div className=" w-72 rounded bg-white flex text-center mx-auto shadow-lg flex-col p-3 gap-3 md:w-30">
      {errors && <Alert servity={servity}>{message}</Alert>}
      {isLoading ? (
        <div className="text-red-500">Loading...</div>
      ) : (
        <>
          {!isError ? (
            <>
              <div className="font-semibold text-2xl">{data?.data.name}</div>
              <div className="flex flex-col gap-5">
                Description:{data?.data?.description}
              </div>
              <div className="flex flex-col gap-5">Created At:{date}</div>
              <div>
                <StyleButton onClick={handleCompleteDelete}>Delete</StyleButton>
              </div>
            </>
          ) : (
            <div className="text-xl text-center text-red-500">
              {error.message}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ViewComplted;
