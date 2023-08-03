import React from "react";
import SearchItem from "./SearchItem";
import TaskItems from "./TaskItems";
import { Link } from "react-router-dom";

const TaskList = ({
  search,
  setSearch,
  isLoading,
  fetchError,
  tasks,
  handleCheck,
  handleDelete,
}) => {
  return (
    <>
      {!fetchError && (
        <Link to="/task">
          <button className="addbtn">Add Task</button>
        </Link>
      )}
      {tasks.length !== 0 && (
        <SearchItem search={search} setSearch={setSearch} />
      )}
      <TaskItems
        isLoading={isLoading}
        fetchError={fetchError}
        tasks={tasks}
        search={search}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default TaskList;
