import React from "react";
import { IconButton, Tooltip, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import axios from "axios";
import { useState } from "react";

const ToDoListItem = ({ name, id, date, description }) => {
  const navigate = useNavigate();
  const [servity, setServity] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState();
  const data = { name, id, date, description };
  const handleComplete = () => {
    axios.post(`${process.env.REACT_APP_BASE_URL_TO_ADD_COMPLETE}.json`, data);
    axios
      .delete(`${process.env.REACT_APP_BASE_URL_TO_FETCH}/${id}.json`)
      .then(() => {
        setServity("success");
        setMessage("Successfully Added to Completed List");
        setError(true);
        setTimeout(() => {
          navigate("/Completed");
          setError(false);
        }, 1000);
      })
      .catch((err) => {
        setServity("error");
        setMessage(err.message);
        setError(true);
      });
  };

  return (
    <li>
      <div className="block group rounded-lg max-w-md sm:max-w-sm mx-auto bg-white shadow-lg space-y-3 hover:bg-sky-500 cursor-pointer md:max-w-xl">
        <div className="mx-auto mt-5 group-hover:text-white">
          {error && <Alert severity={servity}>{message}</Alert>}
          <div className="shadow-md p-4 md:max-w-2xl text-2xl flex flex-row ">
            {name}
            <div className="flex flex-row-reverse flex-auto">
              <IconButton
                component={Link}
                to={`/view/${id}`}
                className="group-hover:white"
              >
                <Tooltip title="View">
                  <RemoveRedEyeOutlinedIcon />
                </Tooltip>
              </IconButton>
              <IconButton component={Link} to={`/edit/${id}`}>
                <Tooltip title="Edit">
                  <BorderColorTwoToneIcon />
                </Tooltip>
              </IconButton>
              <IconButton onClick={handleComplete}>
                <Tooltip title="Move to Complete">
                  <CheckOutlinedIcon />
                </Tooltip>
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ToDoListItem;
