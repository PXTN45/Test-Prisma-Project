import Main from "../Layout/Main";
import { createBrowserRouter } from "react-router-dom";
import Homepage from "../Components/Homepage";
import Detail from "../Pages/Detail";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/shoe/:name",
        element: <Detail />,
      },
    ]
  },
]);

export default router;
