import { Link } from "react-router-dom";

const AddTask = ({
  taskTitle,
  setTaskTitle,
  taskBody,
  taskStatus,
  setTaskBody,
  setTaskStatus,
  handleSubmit,
}) => {
  return (
    <main className="NewPost">
      <h2>New Task</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input
          autoComplete="off"
          id="postTitle"
          type="text"
          required
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <label htmlFor="postBody">Description:</label>
        <textarea
          id="postBody"
          required
          value={taskBody}
          onChange={(e) => setTaskBody(e.target.value)}
        />
        <label htmlFor="status">Status:</label>
        <label>
          <input
            type="radio"
            value="Pending"
            name="status"
            checked={taskStatus === "Pending"}
            onChange={(e) => setTaskStatus(e.target.value)}
          />
          Pending
        </label>
        <label>
          <input
            type="radio"
            value="Completed"
            name="status"
            checked={taskStatus === "Completed"}
            onChange={(e) => setTaskStatus(e.target.value)}
          />
          Completed
        </label>
        <button type="submit">Submit</button>
        <Link to="/">
          <button type="button" className="deleteButton">
            Cancel
          </button>
        </Link>
      </form>
    </main>
  );
};

export default AddTask;
