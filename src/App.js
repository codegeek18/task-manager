import AddTask from "./AddTask";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import apiRequest from "./apiRequest";
import Layout from "./Layout";
import TaskList from "./TaskList";
import EditTask from "./EditTask";

function App() {
  const API_URL = "https://task-manager-api-3cdk.onrender.com";

  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskBody, setTaskBody] = useState("");
  const [taskStatus, setTaskStatus] = useState("Pending");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not receive expected data");
        const listTasks = await response.json();
        setTasks(listTasks);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => fetchItems(), 2000);
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    const newTask = {
      id,
      title: taskTitle,
      description: taskBody,
      status: taskStatus,
    };
    const allTasks = [...tasks, newTask];
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    };
    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
    navigate("/");
    setTasks(allTasks);
    setTaskTitle("");
    setTaskBody("");
    setTaskStatus("Pending");
  };

  const handleEdit = async (id) => {
    const updatedTask = {
      id,
      title: editTitle,
      description: editBody,
      status: editStatus,
    };

    const updateOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
    setTasks(tasks.map((task) => (task.id === id ? { ...updatedTask } : task)));
    setEditTitle("");
    setEditBody("");
    setEditStatus("");
    navigate("/");
  };

  const handleCheck = async (id) => {
    const listTasks = tasks.map((task) => {
      return task.id === id
        ? task.status === "Pending"
          ? { ...task, status: "Completed" }
          : { ...task, status: "Pending" }
        : task;
    });
    setTasks(listTasks);

    const myTask = listTasks.filter((task) => task.id === id);
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: myTask[0].status }),
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  };

  const handleDelete = async (id) => {
    const listTasks = tasks.filter((task) => task.id !== id);
    setTasks(listTasks);

    const deleteOptions = { method: "DELETE" };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  };

  return (
    <Routes>
      <Route path="/" element={<Layout length={tasks.length} />}>
        <Route
          index
          element={
            <TaskList
              search={search}
              setSearch={setSearch}
              isLoading={isLoading}
              fetchError={fetchError}
              tasks={tasks}
              handleCheck={handleCheck}
              handleDelete={handleDelete}
            />
          }
        />
        <Route path="task">
          <Route
            index
            element={
              <AddTask
                taskTitle={taskTitle}
                setTaskTitle={setTaskTitle}
                setTaskBody={setTaskBody}
                setTaskStatus={setTaskStatus}
                taskBody={taskBody}
                taskStatus={taskStatus}
                handleSubmit={handleSubmit}
              />
            }
          />
        </Route>
        <Route
          path="edit/:id"
          element={
            <EditTask
              tasks={tasks}
              handleEdit={handleEdit}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editStatus={editStatus}
              setEditStatus={setEditStatus}
              editBody={editBody}
              setEditBody={setEditBody}
              handleDelete={handleDelete}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
