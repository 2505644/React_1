import React, { useState } from 'react';
import './styles/app.css'
import {BrowserRouter} from 'react-router-dom';
import Navbar from './components/UI/Navbar/Navbar';
import AppRouter from './components/AppRouter';
import { AuthContext } from './context';
function App() {
  const [isAuth, setIsAuth] = useState(false)
  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth
    }}>
      <BrowserRouter>
      <Navbar></Navbar>
      <AppRouter></AppRouter>
      </BrowserRouter>
    </AuthContext.Provider>
    );
  }
export default App;
