import React, { useContext } from "react";
import {Routes, Route} from 'react-router-dom';
import {publicRoutes, privateRoutes} from '../router'
import { AuthContext } from "../context";
const AppRouter = () => {
  const {isAuth} = useContext(AuthContext);
  return(
    isAuth 
    ? <Routes>
    {privateRoutes.map(route => 
      <Route element={route.element} path={route.path} exact={route.exact}></Route>
      )}  
    </Routes>
    : <Routes>
    {publicRoutes.map(route => 
      <Route element={route.element} path={route.path} exact={route.exact}></Route>
      )}  
    </Routes>
  );
};
export default AppRouter;