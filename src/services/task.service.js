import client from "./client";

const getByDate = (created_date) => {
  return client.get("/tasks", {
    params: {
      created_date,
    },
  });
};

const createTask = (content) => {
  return client.post("/tasks", {
    content,
  });
};

export default {
  getByDate,
  createTask,
};
