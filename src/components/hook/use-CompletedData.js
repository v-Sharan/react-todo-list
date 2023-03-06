import { useQuery } from "react-query";
import axios from "axios";

const fetchTodo = async () => {
  return axios.get(`${process.env.REACT_APP_BASE_URL_TO_ADD_COMPLETE}.json`);
};

export const useFetchCompletedData = () => {
  const { data, isLoading, isError, error, refetch } = useQuery(
    "Todo-list",
    fetchTodo
  );
  const loadedData = [];
  for (const key in data?.data) {
    loadedData.push({
      id: key,
      name: data?.data[key].name,
      date: data?.data[key].date,
      description: data?.data[key].description,
    });
  }

  return { loadedData, isLoading, isError, error, refetch };
};
