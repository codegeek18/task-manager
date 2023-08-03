import React from "react";
import Content from "./Content";

const TaskItems = ({
  search,
  isLoading,
  fetchError,
  tasks,
  handleCheck,
  handleDelete,
}) => {
  return (
    <main>
      {isLoading && <p className="msgCenter">Loading Tasks...</p>}
      {fetchError && (
        <p
          className="msgCenter"
          style={{ color: "red" }}
        >{`Error: ${fetchError}`}</p>
      )}
      {!fetchError && !isLoading && (
        <Content
          tasks={tasks.filter(
            (task) =>
              task.title.toLowerCase().includes(search.toLowerCase()) ||
              task.description.toLowerCase().includes(search.toLowerCase())
          )}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      )}
    </main>
  );
};

export default TaskItems;
