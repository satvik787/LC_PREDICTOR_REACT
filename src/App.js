import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Contests from "./Components/Contests";
import Ranks from "./Components/Ranks";

const routes = createBrowserRouter([
    {
        path:'/',
        element:<Contests/>
    },
    {
        path:'/ranks/:contestName/:contestId',
        element:<Ranks/>
    }
])
function App() {
  return <RouterProvider router={routes}/>
}

export default App;
