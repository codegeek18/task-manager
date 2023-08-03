import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const LineItem = ({ task, handleCheck, handleDelete }) => {
  const statusValue = task.status === "Pending" ? false : true;
  return (
    <li className="item">
      <input
        type="checkbox"
        title={task.status}
        onChange={() => handleCheck(task.id)}
        checked={statusValue}
      />
      <div className="itemContent">
        <label
          style={
            statusValue
              ? {
                  textDecoration: "line-through",
                  textDecorationColor: "rgb(153, 25, 25)",
                }
              : null
          }
          onDoubleClick={() => handleCheck(task.id)}
        >
          {task.title}
        </label>
        <p
          className="taskdescription"
          style={
            statusValue
              ? {
                  textDecoration: "line-through",
                  fontSize: "0.7rem",
                  textDecorationColor: "rgb(153, 25, 25)",
                }
              : { fontSize: "0.7rem" }
          }
        >
          {task.description.length <= 25
            ? task.description
            : `${task.description.slice(0, 25)}...`}
        </p>
      </div>
      <Link to={`edit/${task.id}`}>
        <FaEdit title="Edit Task" />
      </Link>
      <FaTrashAlt
        onClick={() => handleDelete(task.id)}
        title="Delete Task"
        role="button"
        tabIndex="0"
        aria-label={`Delete ${task.item}`}
      />
    </li>
  );
};

export default LineItem;
