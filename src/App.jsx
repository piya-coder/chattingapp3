

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { RegistrationPage } from "./Pages/RegistrationPage";
import { LoginPage } from "./Pages/LoginPage";
const route = createBrowserRouter(
  createRoutesFromElements(
   <Route>
     <Route path="/" element={<RegistrationPage/>} />
     <Route path="/login" element={<LoginPage/>} />    
   </Route>
  )
)
 function App() {

  return (
    <RouterProvider router={route}>
    </RouterProvider>
  )
}
export default App

