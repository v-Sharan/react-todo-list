import { useQuery } from "react-query";
import axios from "axios";

const fetchTodo = async (id) => {
  return axios.get(`${process.env.REACT_APP_BASE_URL_TO_FETCH}/${id}.json`);
};
export const useFetchById = (id) => {
  const { data, isLoading, isError, error } = useQuery("Todo-list-By-Id", () =>
    fetchTodo(id)
  );

  return { data, isLoading, isError, error };
};

const fetchTodoByIdCompleted = async (id) => {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL_TO_ADD_COMPLETE}/${id}.json`
  );
};
export const TodoByIdCompleted = (id) => {
  const { data, isLoading, isError, error } = useQuery("Todo-list-By-Id", () =>
    fetchTodoByIdCompleted(id)
  );

  return { data, isLoading, isError, error };
};
