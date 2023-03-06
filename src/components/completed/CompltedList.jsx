import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

const CompltedList = ({ name, id }) => {
  console.log(name);
  return (
    <li>
      <div className="block group rounded-lg max-w-md sm:max-w-sm mx-auto bg-white shadow-lg space-y-3 hover:bg-sky-500 cursor-pointer md:max-w-xl">
        <div className="mx-auto mt-5 group-hover:text-white">
          <div className="shadow-md p-4 md:max-w-2xl text-2xl flex flex-row ">
            {name}
            <div className="flex flex-row-reverse flex-auto">
              <IconButton
                component={Link}
                to={`/Completed/${id}`}
                className="group-hover:white"
              >
                <Tooltip title="View">
                  <RemoveRedEyeOutlinedIcon />
                </Tooltip>
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CompltedList;
