import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../Components/Home/Home";
import AddItem from "../Components/AddItem/AddItem";
import EditItem from "../Components/EditItem/EditItem";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/addItem",
        element: <AddItem />,
      },
      {
        path: "/editItem/:id",
        element: <EditItem />,
      },
    ],
  },
]);

export default router;
