import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const EditTask = ({
  tasks,
  editTitle,
  setEditTitle,
  editBody,
  setEditBody,
  handleEdit,
  editStatus,
  setEditStatus,
}) => {
  const { id } = useParams();
  const task = tasks.find((task) => task.id.toString() === id);

  useEffect(() => {
    if (task) {
      setEditTitle(task.title);
      setEditBody(task.description);
      setEditStatus(task.status);
    }
  }, [task, setEditTitle, setEditBody, setEditStatus]);

  return (
    <main className="NewPost">
      {task && (
        <>
          <h2>Edit Post</h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle">Title:</label>
            <input
              autoComplete="off"
              id="postTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="postBody">Description:</label>
            <textarea
              id="postBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <label htmlFor="status">Status:</label>
            <label>
              <input
                type="radio"
                value="Pending"
                name="status"
                checked={editStatus === "Pending"}
                onChange={(e) => setEditStatus(e.target.value)}
              />
              Pending
            </label>
            <label>
              <input
                type="radio"
                value="Completed"
                name="status"
                checked={editStatus === "Completed"}
                onChange={(e) => setEditStatus(e.target.value)}
              />
              Completed
            </label>
            <button type="submit" onClick={() => handleEdit(id)}>
              Submit
            </button>
            <Link to="/">
              <button type="button" className="deleteButton">
                Cancel
              </button>
            </Link>
          </form>
        </>
      )}
    </main>
  );
};

export default EditTask;
