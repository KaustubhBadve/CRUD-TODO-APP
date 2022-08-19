import { Stack,Box } from "@chakra-ui/react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "../component/RequireAuth";
import Sidebar from "../component/Sidebar";
import CreateTask from "./CreateTask";
import Editpage from "./Editpage";
import HomePage from "./HomePage";
import Login from "./Login";
import Signup from "./Signup";

const MainRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            {/* <Stack  direction="row"> */}
              <Box display="flex" width="1500px" ml="-190px" pt="10px" pb="30px">
              <Sidebar />
              <HomePage />
              </Box>
              
            {/* </Stack> */}
          </RequireAuth>
        }
      />
      <Route path="/newtask" element={<RequireAuth><CreateTask/></RequireAuth>}></Route>

      <Route
        path="/task/:id"
        element={
          <RequireAuth>
             <Box display="flex" width="1500px" ml="-190px" pt="10px" pb="30px">
              <Sidebar />
              <Editpage />
            </Box>
          </RequireAuth>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Routes>
  );
};

export default MainRoutes;
