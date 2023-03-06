import React from "react";
import CompltedList from "./CompltedList";
import { Link } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import { useFetchCompletedData } from "../hook";
import { StyleButton } from "../UI/StyleButton";

const Edit = () => {
  const { loadedData, isLoading, isError, error, refetch } =
    useFetchCompletedData();

  let noData = false;

  if (loadedData.length === 0) {
    noData = true;
  }

  if (isLoading) {
    return <>Loading...</>;
  }
  if (isError) {
    return <>{error.message}</>;
  }
  return (
    <>
      <div className="text-center flex justify-evenly">
        {!noData ? (
          <>
            <div className="text-6xl text-slate-700 dark:text-gray-200 mt-3">
              Completed List
            </div>
            <div className="translate-y-6">
              <StyleButton variant="contained" onClick={refetch}>
                Refetch
              </StyleButton>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white rounded-lg text-5xl p-4 mt-3 shadow-lg">
              <div className="flex flex-co">
                <div className="text-black font-semibold">No Todo is found</div>
              </div>
              <Button component={Link} to="/Edit">
                Click to go Edit
              </Button>
            </div>
          </>
        )}
      </div>
      <ul>
        {loadedData.map((item) => (
          <Grid item xs={12} md={6} key={`${item.id}`}>
            <CompltedList
              id={item.id}
              name={item.name}
              decription={item.description}
            />
          </Grid>
        ))}
      </ul>
    </>
  );
};

export default Edit;
