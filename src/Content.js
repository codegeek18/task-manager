import ItemList from "./ItemList";

const Content = ({ tasks, handleCheck, handleDelete }) => {
  return (
    <>
      {tasks.length ? (
        <ItemList
          tasks={tasks}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <p className="msgCenter" style={{ marginTop: "2rem" }}>
          Your list is empty.
        </p>
      )}
    </>
  );
};

export default Content;
