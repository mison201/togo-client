import { Card, ListGroup } from "react-bootstrap";
import React, { useEffect, useRef, useState } from "react";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import TaskService from "../services/task.service";
import moment from "moment";

const Home = () => {
  const form = useRef();

  const [tasks, setTasks] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    retrieveTutorials();
  }, []);

  const onChangeContent = (e) => {
    const content = e.target.value;
    setContent(content);
  };

  const retrieveTutorials = () => {
    let today = moment().utc().format("YYYY-MM-DD");
    TaskService.getByDate(today)
      .then((response) => {
        setTasks(response.data.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSubmitCreateTask = (e) => {
    e.preventDefault();

    setLoading(true);
    if (content) {
      TaskService.createTask(content)
        .then((response) => {
          console.log(response.data);
          let { data } = response.data;
          if (data) {
            if (tasks) {
              setTasks([...tasks, data]);
            } else {
              setTasks([data]);
            }
            setContent("");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
    setLoading(false);
  };

  return (
    <Card style={{ width: "auto" }}>
      <Card.Header style={{ fontWeight: 500, fontSize: "18px" }}>
        Your task today
      </Card.Header>
      <ListGroup variant="flush">
        {tasks &&
          tasks.map((task, index) => (
            <ListGroup.Item key={index}>{task.content}</ListGroup.Item>
          ))}
        {!tasks || tasks.length < 5 ? (
          <ListGroup.Item key="add-task">
            <Form onSubmit={handleSubmitCreateTask} ref={form}>
              <div
                className="form-group"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {loading && (
                  <span
                    className="spinner-border spinner-border-sm"
                    style={{ marginRight: "8px" }}
                  ></span>
                )}
                <div style={{ flex: 1 }}>
                  <Input
                    type="text"
                    className="form-control"
                    name="content"
                    value={content}
                    placeholder="Add content to create new task"
                    disabled={loading}
                    onChange={onChangeContent}
                  />
                </div>
              </div>
            </Form>
          </ListGroup.Item>
        ) : null}
      </ListGroup>
    </Card>
  );
};

export default Home;
