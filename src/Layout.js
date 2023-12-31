import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = ({ length }) => {
  return (
    <div className="App">
      <Header title="Task Manager" />
      <Outlet />
      <Footer length={length} />
    </div>
  );
};

export default Layout;
