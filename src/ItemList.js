import LineItem from "./LineItem";

const ItemList = ({ tasks, handleCheck, handleDelete }) => {
  return (
    <ul className="showItems">
      {tasks.map((task) => (
        <LineItem
          key={task.id}
          task={task}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default ItemList;
