import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { useFetchById } from "../hook/use-FectById";
import { StyleButton } from "../UI/StyleButton";
import axios from "axios";

function formatMyDate(value, locale = "en-GB") {
  return new Date(value).toLocaleDateString(locale);
}

const View = () => {
  const params = useParams();
  const [Error, setError] = useState(false);
  const [servity, setServity] = useState("success");
  const [message, setMessage] = useState("");
  const id = params.id;
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useFetchById(id);

  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL_TO_FETCH}/${id}.json`)
      .then(() => {
        setError(true);
        setMessage("Successfully Deleted");
        setServity("success");
      })
      .catch((err) => {
        setError(true);
        setMessage(err.message);
        setServity("error");
      });
    setTimeout(() => {
      navigate("/Edit");
    }, 1000);
  };

  const date = formatMyDate(data?.data?.date);

  return (
    <div className="flex justify-center items-center mx-auto my-auto max-w-3xl md:max-w-md sm:max-w-sm relative">
      <div className="bg-white rounded-xl shadow-md mt-[110px] p-10">
        {isError && <div className="text-red-500">{error.message}</div>}
        {Error && <Alert servity={servity}>{message}</Alert>}
        {isLoading ? (
          <div className="text-red-500">Loading...</div>
        ) : (
          <>
            {!isError && (
              <>
                <div className="font-semibold text-2xl">{data?.data.name}</div>
                <div className="flex flex-col gap-5 mt-3">
                  Description:{data?.data?.description}
                </div>
                <div className="flex flex-col gap-5 mt-3">Created At:{date}</div>
                <div className="flex flex-row justify-around mt-4">
                  <Link to={`/edit/${id}`}>
                    <StyleButton>Edit</StyleButton>
                  </Link>
                  <StyleButton onClick={handleDelete}>Delete</StyleButton>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default View;
