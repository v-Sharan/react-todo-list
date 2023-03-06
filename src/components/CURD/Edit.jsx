import React from "react";
import ToDoListItem from "../Home/List";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { useFetch } from "../hook";
import { StyleButton } from "../UI/StyleButton";

const Edit = () => {
  const { loadedData, isLoading, isError, error, refetch } = useFetch();
  const navigate = useNavigate();
  console.log("Edit", loadedData);

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
              Todo List
            </div>
            <div className="translate-y-6">
              <StyleButton variant="contained" onClick={refetch}>
                Refetch
              </StyleButton>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white rounded-lg text-5xl p-4 mt-3 shadow-xl">
              <div className="flex flex-co">
                <div className="text-black font-semibold">No Todo is found</div>
              </div>
              <StyleButton
                onClick={() => {
                  navigate("/AddTodo");
                }}
              >
                Click here to Add Todo
              </StyleButton>
            </div>
          </>
        )}
      </div>
      <ul>
        {loadedData.map((item) => (
          <Grid item xs={12} md={6} key={`${item.id}`}>
            <ToDoListItem
              date={item.date}
              id={item.id}
              name={item.name}
              description={item.description}
            />
          </Grid>
        ))}
      </ul>
    </>
  );
};

export default Edit;
